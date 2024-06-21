"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { settingApi } from "../api";
import type { UpdateSettingDto } from "../types/dto";
import type { SettingEntity } from "../types/entity";
import { SettingQueryKeyFactory } from "../utils/query-key.factory";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const queryKeyFactory = new SettingQueryKeyFactory();

  return useMutation<SettingEntity, Error, UpdateSettingDto>({
    mutationFn: (dto) => settingApi.updateSetting(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeyFactory.details(),
      });
    },
  });
};
