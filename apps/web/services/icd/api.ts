import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { Icd9cmEntity, Icd10Entity } from "./types/entity";

class IcdApi {
  api: AxiosInstance = api;

  async findIcd10(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<Icd10Entity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<Icd10Entity>
    >(`/icd10?count=true&${queryParams}`);

    return data;
  }

  async findIcd9cm(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<Icd9cmEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<Icd9cmEntity>
    >(`/icd9cm?count=true&${queryParams}`);

    return data;
  }
}

export const icdApi = new IcdApi();
