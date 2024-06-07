"use client";

import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api";
import type { UserEntity } from "../types/entity";
import { UserQueryKeyFactory } from "../utils/query-key.factory";

export const useGetUser = (id: string, dto?: object) => {
  const queryKeyFactory = new UserQueryKeyFactory();

  return useQuery<UserEntity>({
    queryFn: () => userApi.getUser(id, dto),
    queryKey: queryKeyFactory.detail(id, dto),
    refetchInterval: 10000,
  });
};
