"use client";

import { useQuery } from "@tanstack/react-query";

import { patientMedicalRecordApi } from "../api";
import type { PatientMedicalRecordEntity } from "../types/entity";
import { PatientMedicalRecordQueryKeyFactory } from "../utils/query-key.factory";

export const useGetPatientMedicalRecord = (id: string, dto?: object) => {
  const queryKeyFactory = new PatientMedicalRecordQueryKeyFactory();

  return useQuery<PatientMedicalRecordEntity>({
    queryFn: () => patientMedicalRecordApi.getPatientMedicalRecord(id, dto),
    queryKey: queryKeyFactory.detail(id, dto),
  });
};
