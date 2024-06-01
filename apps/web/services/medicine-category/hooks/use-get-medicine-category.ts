"use client";

import { useQuery } from "@tanstack/react-query";

import { medicineCategoryApi } from "../api";
import type { MedicineCategoryEntity } from "../types/entity";
import { MedicineCategoryQueryKeyFactory } from "../utils/query-key.factory";

export const useGetMedicineCategory = (id: string, dto?: object) => {
  const queryKeyFactory = new MedicineCategoryQueryKeyFactory();

  return useQuery<MedicineCategoryEntity>({
    queryFn: () => medicineCategoryApi.getMedicineCategory(id, dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
