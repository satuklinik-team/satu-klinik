"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { medicineCategoryApi } from "../api";
import type { MedicineCategoryEntity } from "../types/entity";
import { MedicineCategoryQueryKeyFactory } from "../utils/query-key.factory";

export const useFindMedicineCategory = (dto?: object) => {
  const queryKeyFactory = new MedicineCategoryQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<MedicineCategoryEntity>>({
    queryFn: () => medicineCategoryApi.findMedicineCategory(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
