import type { VitalSignEntity } from "./entity";

export interface CreatePatientVitalSignDto extends VitalSignEntity {
  patientId: string;
}
