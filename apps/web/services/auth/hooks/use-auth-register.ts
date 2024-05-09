import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api";
import type { AuthEntity, AuthRegisterDto } from "../types";

export const useAuthRegister = () => {
  return useMutation<AuthEntity, Error, AuthRegisterDto>({
    mutationFn: (dto) => authApi.register(dto),
  });
};
