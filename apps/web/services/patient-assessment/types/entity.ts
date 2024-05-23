export interface PatientAssessmentEntity {
  id: number;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  Patient_medical_records: {
    id: string;
    visitLabel: string;
    prescription: {
      id: number;
      createdAt: string;
      medicine: string;
      type: string;
      usage: string;
      dosage: string;
      interval: string;
      quantity: string;
      deletedAt: string;
      patient_medical_recordsId: string;
    }[];
  };
}
