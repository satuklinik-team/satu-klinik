"use client";

import { useMutation } from "@tanstack/react-query";

import { medicineApi } from "../api";
import type { CreateMedicineDto } from "../types/dto";
import type { MedicineEntity } from "../types/entity";

export const useDeleteMedicine = (id: string) => {
  return useMutation<MedicineEntity, Error, CreateMedicineDto>({
    mutationFn: () => medicineApi.deleteMedicine(id),
  });
};
