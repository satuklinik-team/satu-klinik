import type { AxiosInstance } from "axios";

import { api } from "@/lib/api";

import type { UserEntity } from "../user/types/entity";
import type {
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
} from "./types/dto";

export class ResetPasswordApi {
  api: AxiosInstance = api;
  private endpoint = "/reset-password";

  async forgot(dto: ForgotPasswordRequestDto): Promise<UserEntity> {
    const { data } = await this.api.post(this.endpoint, dto);

    return data;
  }

  async reset(
    dto: Omit<ResetPasswordRequestDto, "confirmPassword">,
  ): Promise<UserEntity> {
    const { data } = await this.api.patch(this.endpoint, dto);

    return data;
  }
}
