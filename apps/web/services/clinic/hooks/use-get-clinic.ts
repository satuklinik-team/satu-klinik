"use client";

import { useQuery } from "@tanstack/react-query";

import { clinicApi } from "../api";
import type { ClinicEntity } from "../types/entity";
import { ClinicQueryKeyFactory } from "../utils/query-key.factory";

export const useGetClinic = (id: string) => {
  const queryKeyFactory = new ClinicQueryKeyFactory();

  return useQuery<ClinicEntity>({
    queryFn: () => clinicApi.getClinicDetail(),
    queryKey: queryKeyFactory.detail(id),
  });
};
