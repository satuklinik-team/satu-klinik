import { useMutation } from "@tanstack/react-query";

import type { PatientEntity } from "@/services/patient/types/entity";

import { patientAssessmentApi } from "../api";
import type { CreatePatientAssessmentDto } from "../types/dto";

export const useCreatePatientAssessment = () => {
  return useMutation<PatientEntity, Error, CreatePatientAssessmentDto>({
    mutationFn: (dto) => patientAssessmentApi.createPatientAssessment(dto),
  });
};
