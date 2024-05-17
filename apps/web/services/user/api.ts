import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { CreateUserDto } from "./types/dto";
import type { UserEntity } from "./types/entity";

class UserApi {
  api: AxiosInstance = api;

  async findUser(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<UserEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<BaseFindConnectionResponse<UserEntity>>(
      `/clinics/users?&${queryParams}`,
    );

    return data;
  }

  async createUser(values?: CreateUserDto): Promise<UserEntity> {
    const { data } = await this.api.post<UserEntity>("/clinics/users", values);

    return data;
  }
}

export const userApi = new UserApi();
