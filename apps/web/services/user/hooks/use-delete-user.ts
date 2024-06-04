"use client";

import { useMutation } from "@tanstack/react-query";

import { userApi } from "../api";
import type { UserEntity } from "../types/entity";

export const useDeleteUser = (id: string) => {
  return useMutation<UserEntity>({
    mutationFn: () => userApi.deleteUser(id),
  });
};
