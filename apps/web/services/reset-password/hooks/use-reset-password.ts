"use client";

import { useMutation } from "@tanstack/react-query";

import type { UserEntity } from "@/services/user/types/entity";

import { ResetPasswordApi } from "../api";
import type { ResetPasswordRequestDto } from "../types/dto";

export const useResetPassword = () => {
  const api = new ResetPasswordApi();
  return useMutation<
    UserEntity,
    Error,
    Omit<ResetPasswordRequestDto, "confirmPassword">
  >({
    mutationFn: (dto) => api.reset(dto),
  });
};
