import { useMutation } from "@tanstack/react-query";

import type { PatientEntity } from "@/services/patient/types/entity";

import { patientVitalSignApi } from "../api";
import type { CreateNewPatientVitalSignDto } from "../types/dto";

export const useCreateNewPatientVitalSign = () => {
  return useMutation<PatientEntity, Error, CreateNewPatientVitalSignDto>({
    mutationFn: (dto) => patientVitalSignApi.createNewPatientVitalSign(dto),
  });
};
