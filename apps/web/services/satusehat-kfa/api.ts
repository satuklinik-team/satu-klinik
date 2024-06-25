import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { SatuSehatKfaEntity } from "./types/entity";

class SatuSehatKfaApi {
  private api: AxiosInstance = api;
  private baseUrl = "/satusehat-kfa";

  async findAll(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<SatuSehatKfaEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<SatuSehatKfaEntity>
    >(`${this.baseUrl}?&${queryParams}`);

    return data;
  }
}

export const satuSehatKfaApi = new SatuSehatKfaApi();
