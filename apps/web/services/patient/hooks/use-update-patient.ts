"use client";

import { useMutation } from "@tanstack/react-query";

import { patientApi } from "../api";
import type { UpdatePatientDto } from "../types/dto";
import type { PatientEntity } from "../types/entity";

export const useUpdatePatient = (id: string) => {
  return useMutation<PatientEntity, Error, UpdatePatientDto>({
    mutationFn: (dto) => patientApi.updatePatient(id, dto),
  });
};
