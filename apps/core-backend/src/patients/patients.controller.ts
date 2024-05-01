import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { QueryPayload } from 'src/utils';
import { QueryPayload, TokenData } from 'src/utils';
import { CreateVitalSignDto } from '../patients-vital-sign/dto/create-vital-sign.dto';
import { PatientsVitalSignService } from 'src/patients-vital-sign/patients-vital-sign.service';
import { Prisma } from '@prisma/client';
import { JwtPayload } from 'src/auth/types';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Post()
  createPatient(
    @Body() createPatientDto: CreatePatientDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    return this.patientService.create({
      ...createPatientDto,
      usersId: tokenData.sub,
    });
  }

  @Post(':id/vital_sign')
  createVitalSign(
    @Param('id') id: string,
    @Body() dto: CreateVitalSignDto,
    @TokenData() tokenData: JwtPayload,
  ) {
    dto.patientId = id;
    return this.patientVitalSignService.create({
      ...dto,
      usersId: tokenData.sub,
    });
  }

  @Get()
  async findPatientsByClinicsId(
    @QueryPayload() prismaSelectDto: Prisma.PatientFindManyArgs['select'],
    @Query('search') search: string,
    @Query('clinics_id') clinicsId: string,
  ) {
    return this.patientService.findPatientsByClinicsId(prismaSelectDto, {
      clinicsId,
      search,
    });
  }
}
