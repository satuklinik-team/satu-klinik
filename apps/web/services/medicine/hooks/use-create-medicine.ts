"use client";

import { useMutation } from "@tanstack/react-query";

import { medicineApi } from "../api";
import type { CreateMedicineDto } from "../types/dto";
import type { MedicineEntity } from "../types/entity";

export const useCreateMedicine = () => {
  return useMutation<MedicineEntity, Error, CreateMedicineDto>({
    mutationFn: (dto) => medicineApi.createMedicine(dto),
  });
};
