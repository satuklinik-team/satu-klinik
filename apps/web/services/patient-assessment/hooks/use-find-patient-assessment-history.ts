"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { patientAssessmentApi } from "../api";
import type { PatientAssessmentEntity } from "../types/entity";
import { PatientAssessmentHistoryQueryKeyFactory } from "../utils/query-key.factory";

export const useFindPatientAssessment = (dto?: object) => {
  const queryKeyFactory = new PatientAssessmentHistoryQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<PatientAssessmentEntity>>({
    queryFn: () => patientAssessmentApi.findPatientAssessmentHistory(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
