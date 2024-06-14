import type { PatientEntity } from "@/services/patient/types/entity";
import type {
  PrescriptionDto,
  PrescriptionEntity,
} from "@/services/prescription/types/entity";

export interface PharmacyTaskEntity {
  id: number;
  status: string;
  assessmentReffId: string;
  patient: PatientEntity;
  prescriptions: PrescriptionDto[];
}

export interface PharmacyTaskDetailEntity {
  pharmacyTask: PharmacyTaskEntity;
  cancelledPrescriptions: Required<PrescriptionEntity>[];
  newPrescriptions: Required<PrescriptionEntity>[];
}
