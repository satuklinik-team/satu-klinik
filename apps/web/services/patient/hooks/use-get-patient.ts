"use client";

import { useQuery } from "@tanstack/react-query";

import { patientApi } from "../api";
import type { PatientEntity } from "../types/entity";
import { PatientQueryKeyFactory } from "../utils/query-key.factory";

export const useGetPatient = (id: string, dto?: object) => {
  const queryKeyFactory = new PatientQueryKeyFactory();

  return useQuery<PatientEntity>({
    queryFn: () => patientApi.getPatient(id, dto),
    queryKey: queryKeyFactory.detail(id, dto),
  });
};
