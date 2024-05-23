"use client";

import { useMutation } from "@tanstack/react-query";

import { medicineCategoryApi } from "../api";
import type { UpdateMedicineCategoryDto } from "../types/dto";
import type { MedicineCategoryEntity } from "../types/entity";

export const useUpdateMedicine = (id: string) => {
  return useMutation<MedicineCategoryEntity, Error, UpdateMedicineCategoryDto>({
    mutationFn: (dto) => medicineCategoryApi.updateMedicineCategory(id, dto),
  });
};
