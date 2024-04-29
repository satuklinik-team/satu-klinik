import type { AxiosInstance } from "axios";
import Cookies from "js-cookie";

import { api } from "@/lib/api";

import type { AuthEntity, AuthLoginDto, AuthRegisterDto } from "./types";

class AuthApi {
  api: AxiosInstance = api;

  async login(values: AuthLoginDto): Promise<AuthEntity> {
    const { data } = await this.api.post<AuthEntity>("/auth/login", values);

    Cookies.set("accessToken", data.token);

    return data;
  }

  async register(values: AuthRegisterDto): Promise<AuthEntity> {
    const { data } = await this.api.post<AuthEntity>("/auth/register", values);

    Cookies.set("accessToken", data.token);

    return data;
  }

  async logout(): Promise<AuthEntity> {
    const { data } = await this.api.post<AuthEntity>("/auth/logout");

    return data;
  }
}

export const authApi = new AuthApi();
