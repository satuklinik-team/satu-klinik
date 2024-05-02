import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientAssessmentDto } from './create-patient_assessment.dto';

export class UpdatePatientAssessmentDto extends PartialType(CreatePatientAssessmentDto) {}
