"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { icdApi } from "../api";
import type { Icd9CMEntity } from "../types/entity";
import { Icd9CMQueryKeyFactory } from "../utils/query-key.factory";

export const useFindIcd9CM = (dto?: object) => {
  const queryKeyFactory = new Icd9CMQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<Icd9CMEntity>>({
    queryFn: () => icdApi.findIcd9cm(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
