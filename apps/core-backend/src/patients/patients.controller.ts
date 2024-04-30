import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { QueryPayload } from 'src/utils';
import { Prisma } from '@prisma/client';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Post()
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  async findAll(
    @QueryPayload() dto: Prisma.PatientFindManyArgs['select'],
    @Query('search') search: string,
  ) {
    return this.patientService.findAll(dto, search);
  }
}
