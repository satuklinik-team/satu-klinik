export interface PatientAssessmentEntity {
  id: number;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  icd9CM: {
    code: string;
    str: string;
  };
  icd10: {
    code: string;
    strt: string;
  };
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
  icd10Code: string;
  icd9CMCode: string;
}
