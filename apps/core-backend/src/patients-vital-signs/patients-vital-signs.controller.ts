import { Body, Controller, Get, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { PatientsVitalSignsService } from './patients-vital-signs.service';
import { TokenData } from 'src/utils';
import { JwtPayload } from 'src/auth/types';
import { Role } from '@prisma/client';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { CreateNewPatientVitalSignDto } from './dto/create-new-patient-vital-sign.dto';
import { FindTodayVitalSignDto } from './dto/find-today-vital-sign-dto';
import { UpdateVitalSignDto } from './dto/update-vital-sign.dto';

@Controller('patients-vital-signs')
export class PatientsVitalSignsController {
  constructor(
    private readonly patientVitalSignService: PatientsVitalSignsService,
  ) {}

  @Get()
  @Roles(Role.ADMIN, Role.DOCTOR)
  findTodayVitalSign(
    @Query() dto: FindTodayVitalSignDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.patientVitalSignService.findTodayVitalSign({
      ...dto,
      clinicsId: tokenData.clinicsId,
    });
  }

  @Post()
  @Roles(Role.ADMIN)
  async createExistingPatientVitalSign(
    @Body() dto: CreateVitalSignDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    dto.clinicsId = tokenData.clinicsId;
    dto.usersId = tokenData.sub;
    return await this.patientVitalSignService.create(dto);
  }

  @Post('new-patient')
  @Roles(Role.ADMIN)
  async createNewPatientVitalSign(
    @Body() dto: CreateNewPatientVitalSignDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    dto.clinicsId = tokenData.clinicsId;
    dto.usersId = tokenData.sub;
    return await this.patientVitalSignService.create(dto);
  }

  @Patch()
  @Roles(Role.ADMIN)
  async updateVitalSign(
    @Body() dto: UpdateVitalSignDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    dto.clinicsId = tokenData.clinicsId;
    dto.usersId = tokenData.sub;
    return await this.patientVitalSignService.update(dto);
  }
}
