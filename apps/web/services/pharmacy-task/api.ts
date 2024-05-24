import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { PharmacyTaskEntity } from "./types/entity";

class PharmacyTaskApi {
  api: AxiosInstance = api;

  async findPharmacyTask(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<PharmacyTaskEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<PharmacyTaskEntity>
    >(`/pharmacy-tasks?count=true&${queryParams}`);

    return data;
  }
}

export const pharmacyTaskApi = new PharmacyTaskApi();
