import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { CreateMedicineDto, UpdateMedicineDto } from "./types/dto";
import type { MedicineCategoryEntity } from "./types/entity";

class MedicineCategoryApi {
  api: AxiosInstance = api;

  async findMedicineCategory(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<MedicineCategoryEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<MedicineCategoryEntity>
    >(`/medicine-category?count=true&${queryParams}`);

    return data;
  }

  async createMedicineCategory(
    values?: CreateMedicineDto,
  ): Promise<MedicineCategoryEntity> {
    const { data } = await this.api.post<MedicineCategoryEntity>(
      "/medicine-category",
      values,
    );

    return data;
  }

  async updateMedicineCategory(
    id: string,
    values?: UpdateMedicineDto,
  ): Promise<MedicineCategoryEntity> {
    const { data } = await this.api.post<MedicineCategoryEntity>(
      `/medicine-category/${id}`,
      values,
    );

    return data;
  }

  async deleteMedicineCategory(id: string): Promise<MedicineCategoryEntity> {
    const { data } = await this.api.delete<MedicineCategoryEntity>(
      `/medicine-category/${id}`,
    );

    return data;
  }
}

export const medicineCategoryApi = new MedicineCategoryApi();
