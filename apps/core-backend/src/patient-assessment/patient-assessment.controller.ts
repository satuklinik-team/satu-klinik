import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { PatientAssessmentService } from './patient-assessment.service';
import { CreatePatientAssessmentDto } from './dto/create-patient-assessment.dto';
import { FindAllPatientAssessmentDto } from './dto/find-all-patient-assessment.dto';

@Controller('patient-assessment')
export class PatientAssessmentController {
  constructor(
    private readonly patientAssessmentService: PatientAssessmentService,
  ) {}

  @Post()
  async create(@Body() createPatientAssessmentDto: CreatePatientAssessmentDto) {
    return await this.patientAssessmentService.create({
      ...createPatientAssessmentDto,
    });
  }

  @Get()
  async findAll(@Query() dto: FindAllPatientAssessmentDto) {
    return await this.patientAssessmentService.findAll(dto);
  }
}
