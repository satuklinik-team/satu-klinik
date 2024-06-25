import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { ClinicEntity } from "./types/entity";

class ClinicApi {
  api: AxiosInstance = api;

  async findClinic(
    dto?: object
  ): Promise<BaseFindConnectionResponse<ClinicEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<ClinicEntity>
    >(`/clinics?count=true&${queryParams}`);

    return data;
  }

  async getClinicDetail(): Promise<ClinicEntity> {
    const { data } = await this.api.get<ClinicEntity>("/clinics/detail");

    return data;
  }
}

export const clinicApi = new ClinicApi();
