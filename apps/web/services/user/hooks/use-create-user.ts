import { useMutation } from "@tanstack/react-query";

import { userApi } from "../api";
import type { CreateUserDto } from "../types/dto";
import type { UserEntity } from "../types/entity";

export const useCreateUser = () => {
  return useMutation<UserEntity, Error, CreateUserDto>({
    mutationFn: (dto) => userApi.createUser(dto),
  });
};
