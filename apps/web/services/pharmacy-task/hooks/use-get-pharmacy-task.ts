"use client";

import { useQuery } from "@tanstack/react-query";

import { pharmacyTaskApi } from "../api";
import type { PharmacyTaskDetailEntity } from "../types/entity";
import { PharmacyTaskQueryKeyFactory } from "../utils/query-key.factory";

export const useGetPharmacyTask = (id: string, dto?: object) => {
  const queryKeyFactory = new PharmacyTaskQueryKeyFactory();

  return useQuery<PharmacyTaskDetailEntity>({
    queryFn: () => pharmacyTaskApi.getPharmacyTask(id, dto),
    queryKey: queryKeyFactory.detail(id, dto),
  });
};
