import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { CreatePatientDto, UpdatePatientDto } from "./types/dto";
import type { PatientEntity } from "./types/entity";

class PatientApi {
  api: AxiosInstance = api;

  async getPatient(id: string, dto?: object): Promise<PatientEntity> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<PatientEntity>(
      `/patients/${id}?&${queryParams}`,
    );

    return data;
  }

  async findPatient(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<PatientEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<PatientEntity>
    >(`/patients?&${queryParams}`);

    return data;
  }

  async createPatient(values?: CreatePatientDto): Promise<PatientEntity> {
    const { data } = await this.api.post<PatientEntity>("/patients", values);

    return data;
  }

  async updatePatient(
    id: string,
    values?: UpdatePatientDto,
  ): Promise<PatientEntity> {
    const { data } = await this.api.patch<PatientEntity>(
      `/patients/${id}`,
      values,
    );

    return data;
  }

  async deletePatient(id: string): Promise<PatientEntity> {
    const { data } = await this.api.delete<PatientEntity>(`/patients/${id}`);

    return data;
  }
}

export const patientApi = new PatientApi();
