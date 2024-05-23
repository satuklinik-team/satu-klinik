import type { VitalSignEntity } from "@/services/patient-vital-sign/types/entity";

export interface PatientEntity {
  id: string;
  fullname: string;
  norm: string;
  nik: string;
  phone: string;
  address: string;
  sex: string;
  blood: string;
  birthAt: string;
  mr: {
    id: string;
    queue: string;
    status: string;
    vitalSign: VitalSignEntity[];
  }[];
}
