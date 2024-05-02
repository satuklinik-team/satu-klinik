import { Injectable } from '@nestjs/common';
import { CreatePatientAssessmentDto } from './dto/create-patient_assessment.dto';
import { UpdatePatientAssessmentDto } from './dto/update-patient_assessment.dto';

@Injectable()
export class PatientAssessmentService {
  create(createPatientAssessmentDto: CreatePatientAssessmentDto) {
    return 'This action adds a new patientAssessment';
  }
}
