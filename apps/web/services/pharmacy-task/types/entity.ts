import type { PatientEntity } from "@/services/patient/types/entity";
import type { PrescriptionDto } from "@/services/prescription/types/entity";

export interface PharmacyTaskEntity {
  id: number;
  status: string;
  assessmentReffId: string;
  patient: PatientEntity;
  prescriptions: PrescriptionDto[];
}
