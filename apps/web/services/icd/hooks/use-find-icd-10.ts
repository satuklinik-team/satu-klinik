"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { icdApi } from "../api";
import type { Icd10Entity } from "../types/entity";
import { Icd10QueryKeyFactory } from "../utils/query-key.factory";

export const useFindIcd10 = (dto?: object, options?: { enabled?: boolean }) => {
  const queryKeyFactory = new Icd10QueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<Icd10Entity>>({
    queryFn: () => icdApi.findIcd10(dto),
    queryKey: queryKeyFactory.list(dto),
    enabled: options?.enabled,
  });
};
