import type { PatientEntity } from "@/services/patient/types/entity";
import type { PatientAssessmentEntity } from "@/services/patient-assessment/types/entity";
import type { VitalSignEntity } from "@/services/patient-vital-sign/types/entity";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";

export interface PatientMedicalRecordEntity {
  id: string;
  visitAt: string;
  queue: string;
  Patient: PatientEntity;
  status: string;
  vitalSign?: VitalSignEntity[];
  assessment?: PatientAssessmentEntity[];
  prescription?: PrescriptionEntity[];
  canModify?: boolean;
}
