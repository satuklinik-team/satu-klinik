import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { SatusehatKfaEntity } from "./types/entity";

class SatusehatKfaApi {
  api: AxiosInstance = api;

  async findSatusehatKfa(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<SatusehatKfaEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<SatusehatKfaEntity>
    >(`/satusehat-kfa?&${queryParams}`);

    return data;
  }
}

export const satusehatKfaApi = new SatusehatKfaApi();
