import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { RoleNotAuthorizedException } from 'src/exceptions/unauthorized/role-not-authorized';
import { IS_PUBLIC_KEY } from 'src/utils';
import { PRACTITIONER_ONLY_KEY } from 'src/utils/decorators/practitioner-only.decorator';
import { ROLES_KEY } from 'src/utils/decorators/roles.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt-access-token') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const practitionerOnly = this.reflector.getAllAndOverride<boolean>(
      PRACTITIONER_ONLY_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (
      roles &&
      !roles.includes(user.role) &&
      ((user.role !== Role.OWNER && user.role !== Role.ADMIN) ||
        practitionerOnly)

    ) {
      throw new RoleNotAuthorizedException();
    }

    return user;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    return super.canActivate(context);
  }
}
