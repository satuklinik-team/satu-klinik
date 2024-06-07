"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { patientMedicalRecordApi } from "../api";
import type { PatientMedicalRecordEntity } from "../types/entity";
import { PatientMedicalRecordQueryKeyFactory } from "../utils/query-key.factory";

export const useFindPatientMedicalRecord = (dto?: object) => {
  const queryKeyFactory = new PatientMedicalRecordQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<PatientMedicalRecordEntity>>({
    queryFn: () => patientMedicalRecordApi.findPatientMedicalRecord(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
