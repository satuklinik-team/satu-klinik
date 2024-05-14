import type { VitalEntity } from "@/services/vital/types/entity";

export interface PatientEntity {
  id: string;
  fullname: string;
  norm: string;
  nik: string;
  phone: string;
  address: string;
  sex: string;
  blood: string;
  mr: { id: string; vitalSign: VitalEntity[] }[];
}
