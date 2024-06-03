import type { VitalSignEntity } from "./entity";

export type CreateNewPatientVitalSignDto = VitalSignEntity;

export interface CreatePatientVitalSignDto
  extends CreateNewPatientVitalSignDto {
  patientId: string;
}
