"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { satuSehatKfaApi } from "../api";
import type { SatuSehatKfaEntity } from "../types/entity";
import { SatuSehatKfaQueryKeyFactory } from "../utils/query-key.factory";

export const useFindSatuSehatKfa = (
  dto?: object,
  options?: { enabled?: boolean },
) => {
  const queryKey = new SatuSehatKfaQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<SatuSehatKfaEntity>>({
    queryKey: queryKey.list(dto),
    queryFn: () => satuSehatKfaApi.findAll(dto),
    enabled: options?.enabled,
  });
};
