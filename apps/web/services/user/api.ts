import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { CreateUserDto } from "./types/dto";
import type { UserEntity } from "./types/entity";

class UserApi {
  api: AxiosInstance = api;

  async getUser(id: string, dto?: object): Promise<UserEntity> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<UserEntity>(
      `/clinics/users/${id}?&${queryParams}`,
    );

    return data;
  }

  async findUser(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<UserEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<BaseFindConnectionResponse<UserEntity>>(
      `/clinics/users?&${queryParams}`,
    );

    return data;
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const { data } = await this.api.delete<UserEntity>(`/clinics/users/${id}`);

    return data;
  }

  async createUser(values?: CreateUserDto): Promise<UserEntity> {
    const { data } = await this.api.post<UserEntity>("/clinics/users", values);

    return data;
  }
}

export const userApi = new UserApi();
