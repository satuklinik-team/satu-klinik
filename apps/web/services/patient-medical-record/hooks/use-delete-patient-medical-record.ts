"use client";

import { useMutation } from "@tanstack/react-query";

import { patientMedicalRecordApi } from "../api";
import type { PatientMedicalRecordEntity } from "../types/entity";

export const useDeletePatientMedicalRecord = (id: string) => {
  return useMutation<PatientMedicalRecordEntity>({
    mutationFn: () => patientMedicalRecordApi.deletePatientMedicalRecord(id),
  });
};
