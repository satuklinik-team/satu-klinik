"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { medicineApi } from "../api";
import type { MedicineEntity } from "../types/entity";
import { MedicineQueryKeyFactory } from "../utils/query-key.factory";

export const useFindMedicine = (dto?: object) => {
  const queryKeyFactory = new MedicineQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<MedicineEntity>>({
    queryFn: () => medicineApi.findMedicine(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};