import { Module } from '@nestjs/common';
import { PatientAssessmentService } from './patient_assessment.service';
import { PatientAssessmentController } from './patient_assessment.controller';

@Module({
  controllers: [PatientAssessmentController],
  providers: [PatientAssessmentService],
})
export class PatientAssessmentModule {}
