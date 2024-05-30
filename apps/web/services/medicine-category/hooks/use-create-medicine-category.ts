"use client";

import { useMutation } from "@tanstack/react-query";

import { medicineCategoryApi } from "../api";
import type { CreateMedicineCategoryDto } from "../types/dto";
import type { MedicineCategoryEntity } from "../types/entity";

export const useCreateMedicineCategory = () => {
  return useMutation<MedicineCategoryEntity, Error, CreateMedicineCategoryDto>({
    mutationFn: (dto) => medicineCategoryApi.createMedicineCategory(dto),
  });
};
