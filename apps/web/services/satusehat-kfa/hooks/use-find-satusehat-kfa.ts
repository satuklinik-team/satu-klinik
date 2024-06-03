"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { satusehatKfaApi } from "../api";
import type { SatusehatKfaEntity } from "../types/entity";
import { SatusehatKfaQueryKeyFactory } from "../utils/query-key.factory";

export const useFindSatusehatKfa = (dto?: object) => {
  const queryKeyFactory = new SatusehatKfaQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<SatusehatKfaEntity>>({
    queryFn: () => satusehatKfaApi.findSatusehatKfa(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
