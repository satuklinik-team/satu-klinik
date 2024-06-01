import { useMutation } from "@tanstack/react-query";

import type { PatientEntity } from "@/services/patient/types/entity";

import { patientVitalSignApi } from "../api";
import type { CreatePatientVitalSignDto } from "../types/dto";

export const useCreateNewPatientVitalSign = () => {
  return useMutation<PatientEntity, Error, CreatePatientVitalSignDto>({
    mutationFn: (dto) => patientVitalSignApi.createNewPatientVitalSign(dto),
  });
};
