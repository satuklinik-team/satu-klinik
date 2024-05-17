import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api";
import type { AuthEntity, AuthLoginDto } from "../types";

export const useAuthLogin = () => {
  return useMutation<AuthEntity, Error, AuthLoginDto>({
    mutationFn: (dto) => authApi.login(dto),
  });
};
