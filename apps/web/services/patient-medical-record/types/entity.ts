import type { PatientEntity } from "@/services/patient/types/entity";
import type { VitalSignEntity } from "@/services/patient-vital-sign/types/entity";

export interface PatientMedicalRecordEntity {
  id: string;
  visitAt: string;
  queue: string;
  Patient: PatientEntity;
  status: string;
  vitalSign: VitalSignEntity[];
}
