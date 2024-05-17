import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedErrorMessages } from '../messages';

export class RoleNotAuthorizedException extends HttpException {
  constructor() {
    super(
      UnauthorizedErrorMessages.ROLE_NOT_AUTHORIZED,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
