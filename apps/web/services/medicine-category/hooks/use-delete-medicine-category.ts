"use client";

import { useMutation } from "@tanstack/react-query";

import { medicineCategoryApi } from "../api";
import type { MedicineCategoryEntity } from "../types/entity";

export const useDeleteMedicineCategory = (id: string) => {
  return useMutation<MedicineCategoryEntity>({
    mutationFn: () => medicineCategoryApi.deleteMedicineCategory(id),
  });
};
