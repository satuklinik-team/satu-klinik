import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientAssessmentService } from './patient_assessment.service';
import { CreatePatientAssessmentDto } from './dto/create-patient_assessment.dto';

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
}
