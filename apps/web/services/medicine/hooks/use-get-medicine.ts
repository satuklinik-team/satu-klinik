"use client";

import { useQuery } from "@tanstack/react-query";

import { medicineApi } from "../api";
import type { MedicineEntity } from "../types/entity";
import { MedicineQueryKeyFactory } from "../utils/query-key.factory";

export const useGetMedicine = (id: number, dto?: object) => {
  const queryKeyFactory = new MedicineQueryKeyFactory();

  return useQuery<MedicineEntity>({
    queryFn: () => medicineApi.getMedicine(id, dto),
    queryKey: queryKeyFactory.detail(String(id), dto),
  });
};
