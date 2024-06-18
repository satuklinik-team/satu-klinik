"use client";

import { useMutation } from "@tanstack/react-query";

import type { UserEntity } from "@/services/user/types/entity";

import { ResetPasswordApi } from "../api";
import type { ForgotPasswordRequestDto } from "../types/dto";

export const useForgotPassword = () => {
  const api = new ResetPasswordApi();
  return useMutation<UserEntity, Error, ForgotPasswordRequestDto>({
    mutationFn: (dto) => api.forgot(dto),
  });
};
