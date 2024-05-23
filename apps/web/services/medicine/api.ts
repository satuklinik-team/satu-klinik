import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { CreateMedicineDto, UpdateMedicineDto } from "./types/dto";
import type { MedicineEntity } from "./types/entity";

class MedicineApi {
  api: AxiosInstance = api;

  async getMedicine(id: number, dto?: object): Promise<MedicineEntity> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<MedicineEntity>(
      `/medicine/${id}?${queryParams}`,
    );

    return data;
  }

  async findMedicine(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<MedicineEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<MedicineEntity>
    >(`/medicine?count=true&${queryParams}`);

    return data;
  }

  async findMedicineByCategory(
    categoryId: string,
    dto?: object,
  ): Promise<BaseFindConnectionResponse<MedicineEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<MedicineEntity>
    >(`/medicine/category/${categoryId}?count=true&${queryParams}`);

    return data;
  }

  async createMedicine(values?: CreateMedicineDto): Promise<MedicineEntity> {
    const { data } = await this.api.post<MedicineEntity>("/medicine", values);

    return data;
  }

  async updateMedicine(
    id: string,
    values?: UpdateMedicineDto,
  ): Promise<MedicineEntity> {
    const { data } = await this.api.patch<MedicineEntity>(
      `/medicine/${id}`,
      values,
    );

    return data;
  }

  async deleteMedicine(id: string): Promise<MedicineEntity> {
    const { data } = await this.api.delete<MedicineEntity>(`/medicine/${id}`);

    return data;
  }
}

export const medicineApi = new MedicineApi();
