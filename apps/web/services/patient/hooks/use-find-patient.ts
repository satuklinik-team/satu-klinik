"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { patientApi } from "../api";
import type { PatientEntity } from "../types/entity";
import { PatientQueryKeyFactory } from "../utils/query-key.factory";

export const useFindPatient = (
  dto?: object,
  option?: { enabled?: boolean },
) => {
  const queryKeyFactory = new PatientQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<PatientEntity>>({
    queryFn: () => patientApi.findPatient(dto),
    queryKey: queryKeyFactory.list(dto),
    enabled: option?.enabled,
  });
};
