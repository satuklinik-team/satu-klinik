import { useMutation } from "@tanstack/react-query";

import { pharmacyTaskApi } from "../api";
import type { CompletePharmacyTaskDto } from "../types/dto";

export const useCompletePharmacyTask = (id: string) => {
  return useMutation<void, Error, CompletePharmacyTaskDto>({
    mutationFn: (dto) => pharmacyTaskApi.completePharmacyTask(id, dto),
  });
};
