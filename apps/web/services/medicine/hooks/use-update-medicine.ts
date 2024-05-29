"use client";

import { useMutation } from "@tanstack/react-query";

import { medicineApi } from "../api";
import type { UpdateMedicineDto } from "../types/dto";
import type { MedicineEntity } from "../types/entity";

export const useUpdateMedicine = (id: string) => {
  return useMutation<MedicineEntity, Error, UpdateMedicineDto>({
    mutationFn: (dto) => medicineApi.updateMedicine(id, dto),
  });
};
