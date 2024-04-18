import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Public, QueryPayload } from 'src/utils';
import { CreateVitalSignDto } from '../patients-vital-sign/dto/create-vital-sign.dto';
import { PatientsVitalSignService } from 'src/patients-vital-sign/patients-vital-sign.service';
import { Prisma } from '@prisma/client';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientService: PatientsService,
    private readonly patientVitalSignService: PatientsVitalSignService,
  ) {}
  @Post()
  @Public()
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Post(':id/vital_sign')
  @Public()
  createVitalSign(@Param('id') id: string, @Body() dto: CreateVitalSignDto) {
    dto.patientId = id;
    return this.patientVitalSignService.create(dto);
  }

  @Get()
  @Public()
  async findAll(
    @QueryPayload() dto: Prisma.PatientFindManyArgs['select'],
    @Query('search') search: string,
  ) {
    return this.patientService.findAll(dto, search);
  }
}
