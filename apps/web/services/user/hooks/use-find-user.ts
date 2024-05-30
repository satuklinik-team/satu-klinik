"use client";

import { useQuery } from "@tanstack/react-query";

import type { BaseFindConnectionResponse } from "@/services/shared/types";

import { userApi } from "../api";
import type { UserEntity } from "../types/entity";
import { UserQueryKeyFactory } from "../utils/query-key.factory";

export const useFindUser = (dto?: object) => {
  const queryKeyFactory = new UserQueryKeyFactory();

  return useQuery<BaseFindConnectionResponse<UserEntity>>({
    queryFn: () => userApi.findUser(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
