import type { PatientEntity } from "@/services/patient/types/entity";

export interface TaskEntity {
  queue: string;
  status: string;
  patient: PatientEntity;
}
