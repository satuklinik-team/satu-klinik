"use client";

import { useMutation } from "@tanstack/react-query";

import { medicineApi } from "../api";
import type { MedicineEntity } from "../types/entity";

export const useDeleteMedicine = (id: string) => {
  return useMutation<MedicineEntity>({
    mutationFn: () => medicineApi.deleteMedicine(id),
  });
};
