import { useMutation } from "@tanstack/react-query";

import { patientAssessmentApi } from "../api";
import type { CreatePatientAssessmentDto } from "../types/dto";
import type { PatientAssessmentEntity } from "../types/entity";

export const useUpdatePatientAssessment = (id: number) => {
  return useMutation<
    PatientAssessmentEntity,
    Error,
    CreatePatientAssessmentDto
  >({
    mutationFn: (dto) => patientAssessmentApi.updatePatientAssessment(id, dto),
  });
};
