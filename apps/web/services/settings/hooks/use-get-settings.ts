"use client";

import { useQuery } from "@tanstack/react-query";

import { settingApi } from "../api";
import type { SettingEntity } from "../types/entity";
import { SettingQueryKeyFactory } from "../utils/query-key.factory";

export const useGetSettings = () => {
  const queryKeyFactory = new SettingQueryKeyFactory();

  return useQuery<SettingEntity>({
    queryKey: queryKeyFactory.details(),
    queryFn: () => settingApi.getSetting(),
  });
};
