import type { PatientEntity } from "@/services/patient/types/entity";

export interface VitalSignEntity {
  height: number;
  weight: number;
  allergic: string;
  systole: number;
  diastole: number;
  temperature: number;
  respiration: number;
  pulse: number;
  pain: string;
}

export interface PatientQueue {
  id: string;
  visitAt: string;
  visitLabel: string;
  queue: string;
  status: string;
  patientId: string;
  encounterId: string | null;
  satuSehatCompleted: boolean;
  poliId: string | null;
  practitionerId: string;
  Patient: PatientEntity;
  vitalSign: VitalSignEntity[];
}
