import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtPayload } from 'src/auth/types';
import { RoleNotAuthorizedException } from 'src/exceptions/unauthorized/role-not-authorized';
import { SatusehatRawatJalanService } from 'src/satusehat-rawat-jalan/satusehat-rawat-jalan.service';
import { TokenData } from 'src/utils';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { formatDate } from 'src/utils/helpers/format-date.helper';
import { UpdateClinicCredsDto } from './dto/update-clinic-creds.dto';
import { SatusehatAdminService } from './satusehat-admin.service';

@Controller('satusehat-admin')
export class SatusehatAdminController {
  constructor(
    private readonly satusehatRawatJalanService: SatusehatRawatJalanService,
    private readonly satusehatAdminService: SatusehatAdminService,
  ) {}

  @Get()
  @Roles(Role.SATUKLINIKADMIN)
  async satuSehatIntegration(@TokenData() tokenData: JwtPayload) {
    this._checkRole(tokenData.role);
    return await this.satusehatRawatJalanService.handleCron();
  }

  @Patch()
  @Roles(Role.SATUKLINIKADMIN)
  async updateClinicCreds(
    @TokenData() tokenData: JwtPayload,
    @Body() dto: UpdateClinicCredsDto,
  ) {
    this._checkRole(tokenData.role);
    return await this.satusehatAdminService.updateClinicCreds(dto);
  }

  private _checkRole(role: Role) {
    if (role !== Role.SATUKLINIKADMIN) {
      throw new RoleNotAuthorizedException();
    }
  }
}
