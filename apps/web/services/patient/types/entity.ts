import type { VitalEntity } from "@/services/vital/types/entity";

export interface PatientEntity {
  id: string;
  name: string;
  medicalRecordNumber: string;
  nik: string;
  phoneNumber: string;
  address: string;
  sex: string;
  bloodType: string;
  vitals: VitalEntity;
}
