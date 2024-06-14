import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { CompletePharmacyTaskDto } from "./types/dto";
import type {
  PharmacyTaskDetailEntity,
  PharmacyTaskEntity,
} from "./types/entity";

class PharmacyTaskApi {
  api: AxiosInstance = api;

  async completePharmacyTask(
    id: string,
    dto: CompletePharmacyTaskDto
  ): Promise<PharmacyTaskEntity> {
    const { data } = await this.api.post<PharmacyTaskEntity>(
      `/pharmacy-tasks/${id}`,
      dto
    );

    return data;
  }

  async getPharmacyTask(
    id: string,
    dto?: object
  ): Promise<PharmacyTaskDetailEntity> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<PharmacyTaskEntity>(
      `/pharmacy-tasks/${id}?${queryParams}`
    );

    return data;
  }

  async findPharmacyTask(
    dto?: object
  ): Promise<BaseFindConnectionResponse<PharmacyTaskEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<PharmacyTaskEntity>
    >(`/pharmacy-tasks?count=true&${queryParams}`);

    return data;
  }
}

export const pharmacyTaskApi = new PharmacyTaskApi();
