"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { patientVitalSignApi } from "../api";
import type { PatientQueue } from "../types/entity";
import { PatientVitalSignQueryKeyFactory } from "../utils/query-key.factory";

export const useFindPatientQueue = (
  dto?: object,
  option?: { enabled?: boolean },
) => {
  const queryKeyFactory = new PatientVitalSignQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<PatientQueue>>({
    queryFn: () => patientVitalSignApi.findPatientQueue(dto),
    queryKey: queryKeyFactory.list(dto),
    enabled: option?.enabled,
  });
};
