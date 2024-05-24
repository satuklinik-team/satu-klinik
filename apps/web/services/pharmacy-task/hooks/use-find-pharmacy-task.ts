"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { pharmacyTaskApi } from "../api";
import type { PharmacyTaskEntity } from "../types/entity";
import { PharmacyTaskQueryKeyFactory } from "../utils/query-key.factory";

export const useFindPharmacyTask = (dto?: object) => {
  const queryKeyFactory = new PharmacyTaskQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<PharmacyTaskEntity>>({
    queryFn: () => pharmacyTaskApi.findPharmacyTask(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
