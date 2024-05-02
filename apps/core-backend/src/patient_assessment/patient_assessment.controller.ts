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
import { UpdatePatientAssessmentDto } from './dto/update-patient_assessment.dto';

@Controller('patient-assessment')
export class PatientAssessmentController {
  constructor(
    private readonly patientAssessmentService: PatientAssessmentService,
  ) {}

  @Post()
  create(@Body() createPatientAssessmentDto: CreatePatientAssessmentDto) {
    return this.patientAssessmentService.create(createPatientAssessmentDto);
  }
}
