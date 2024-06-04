"use client";

import { useMutation } from "@tanstack/react-query";

import { patientApi } from "../api";
import type { PatientEntity } from "../types/entity";

export const useDeletePatient = (id: string) => {
  return useMutation<PatientEntity>({
    mutationFn: () => patientApi.deletePatient(id),
  });
};
