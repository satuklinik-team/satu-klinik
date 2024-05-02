import { Controller, Post, Body } from '@nestjs/common';
import { PatientAssessmentService } from './patient-assessment.service';
import { CreatePatientAssessmentDto } from './dto/create-patient-assessment.dto';

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
