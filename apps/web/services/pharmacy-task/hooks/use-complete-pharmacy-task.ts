import { useMutation } from "@tanstack/react-query";

import { pharmacyTaskApi } from "../api";
import type { CompletePharmacyTaskDto } from "../types/dto";
import type { PharmacyTaskEntity } from "../types/entity";

export const useCompletePharmacyTask = (id: string) => {
  return useMutation<PharmacyTaskEntity, Error, CompletePharmacyTaskDto>({
    mutationFn: (dto) => pharmacyTaskApi.completePharmacyTask(id, dto),
  });
};
