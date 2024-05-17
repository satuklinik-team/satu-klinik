import { useMutation } from "@tanstack/react-query";

import { patientApi } from "../api";
import type { CreatePatientDto } from "../types/dto";
import type { PatientEntity } from "../types/entity";

export const useCreatePatient = () => {
  return useMutation<PatientEntity, Error, CreatePatientDto>({
    mutationFn: (dto) => patientApi.createPatient(dto),
  });
};
