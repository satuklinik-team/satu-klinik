import { Controller, Get } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtPayload } from 'src/auth/types';
import { RoleNotAuthorizedException } from 'src/exceptions/unauthorized/role-not-authorized';
import { SatusehatRawatJalanService } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.service';
import { TokenData } from 'src/utils';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('satusehat-admin')
export class SatusehatAdminController {
  constructor(
    private readonly satusehatRawatJalanService: SatusehatRawatJalanService,
  ) {}

  @Get()
  @Roles(Role.SATUKLINIKADMIN)
  async satuSehatIntegration(@TokenData() tokenData: JwtPayload) {
    if (tokenData.role !== Role.SATUKLINIKADMIN) {
      throw new RoleNotAuthorizedException();
    }
    return await this.satusehatRawatJalanService.handleCron();
  }
}
