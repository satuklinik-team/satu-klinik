"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { clinicApi } from "../api";
import type { ClinicEntity } from "../types/entity";
import { ClinicQueryKeyFactory } from "../utils/query-key.factory";

export const useFindClinic = (dto?: object) => {
  const queryKeyFactory = new ClinicQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<ClinicEntity>>({
    queryFn: () => clinicApi.findClinic(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
