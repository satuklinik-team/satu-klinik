import type { AxiosInstance } from "axios";

import { api } from "@/lib/api";

import type { UpdateSettingDto } from "./types/dto";
import type { SettingEntity } from "./types/entity";

class SettingApi {
  api: AxiosInstance = api;
  private baseUrl = "/settings";

  async getSetting(): Promise<SettingEntity> {
    const { data } = await this.api.get<SettingEntity>(this.baseUrl);

    return data;
  }

  async updateSetting(dto: UpdateSettingDto): Promise<SettingEntity> {
    const { data } = await this.api.put<SettingEntity>(this.baseUrl, dto);

    return data;
  }
}

export const settingApi = new SettingApi();
