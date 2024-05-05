import { Module } from '@nestjs/common';
import { PatientAssessmentService } from './patient-assessment.service';
import { PatientAssessmentController } from './patient-assessment.controller';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  controllers: [PatientAssessmentController],
  providers: [PatientAssessmentService],
  imports: [PatientsModule],
})
export class PatientAssessmentModule {}
