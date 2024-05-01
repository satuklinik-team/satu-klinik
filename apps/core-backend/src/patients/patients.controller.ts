import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FindAllPatientsDto } from './dto/find-all-patients-dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Post()
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  async findAll(@Query() dto: FindAllPatientsDto) {
    return this.patientService.findAll(dto);
  }
}
