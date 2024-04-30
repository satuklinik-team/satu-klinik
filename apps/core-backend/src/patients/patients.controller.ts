import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { QueryPayload } from 'src/utils';
import { CreateVitalSignDto } from '../patients-vital-signs/dto/create-vital-sign.dto';
import { PatientsVitalSignsService } from 'src/patients-vital-signs/patients-vital-signs.service';
import { Prisma } from '@prisma/client';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientService: PatientsService,
    private readonly patientVitalSignService: PatientsVitalSignsService,
  ) {}
  @Post()
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Post(':id/vital_sign')
  createVitalSign(@Param('id') id: string, @Body() dto: CreateVitalSignDto) {
    dto.patientId = id;
    return this.patientVitalSignService.create(dto);
  }

  @Get()
  async findAll(
    @QueryPayload() dto: Prisma.PatientFindManyArgs['select'],
    @Query('search') search: string,
  ) {
    return this.patientService.findAll(dto, search);
  }
}
