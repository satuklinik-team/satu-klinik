import { Prisma } from '@prisma/client';
import { CreatePatientAssessmentDto } from './create-patient-assessment.dto';
import { UpdatePatientAssessmentDto } from './update-patient-assessment.dto';
import { undefinedToNull } from 'src/utils';

export function createAssessmentData(
  dto: CreatePatientAssessmentDto | UpdatePatientAssessmentDto,
): Prisma.Patient_assessmentCreateArgs['data'] {
  return {
    patient_medical_recordsId: dto.mrid,
    doctorId: dto.usersId,
    subjective: dto.subjective,
    objective: dto.objective,
    assessment: dto.assessment,
    plan: dto.plan,
    icd10Code: undefinedToNull(dto.icd10Code),
    icd9CMCode: undefinedToNull(dto.icd9CMCode),
    syncedWithSatuSehat: false,
  };
}
