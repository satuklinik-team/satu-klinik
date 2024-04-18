import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './create-patient.dto';
import { Public } from 'src/utils';
import { CreateMRDto } from './create-mr.dto';
import { PatientVitalSignService } from 'src/patient-vital-sign/patient-vital-sign.service';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly patientVitalSignService: PatientVitalSignService,
  ) {}
  @Post()
  @Public()
  createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Post(':id/vital_sign')
  @Public()
  createMR(@Param('id') id: string, @Body() createMRDto: CreateMRDto) {
    createMRDto.patientId = id;
    return this.patientVitalSignService.create(createMRDto);
  }

  @Get()
  @Public()
  async findPatientsBySearch(@Query('search') search: string) {
    return this.patientService.findPatientsBySearch(search);
  }
}
