import { Module } from '@nestjs/common';
import { PatientAssessmentService } from './patient-assessment.service';
import { PatientAssessmentController } from './patient-assessment.controller';

@Module({
  controllers: [PatientAssessmentController],
  providers: [PatientAssessmentService],
})
export class PatientAssessmentModule {}
