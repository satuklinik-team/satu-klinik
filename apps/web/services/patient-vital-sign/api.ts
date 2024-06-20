import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { PatientEntity } from "../patient/types/entity";
import type { BaseFindConnectionResponse } from "../shared/types";
import type {
  CreateNewPatientVitalSignDto,
  CreatePatientVitalSignDto,
} from "./types/dto";
import type { PatientQueue } from "./types/entity";

class PatientVitalSignApi {
  api: AxiosInstance = api;

  async createPatientVitalSign(
    values?: CreatePatientVitalSignDto,
  ): Promise<PatientEntity> {
    const { data } = await this.api.post<PatientEntity>(
      "/patients-vital-signs",
      values,
    );

    return data;
  }

  async createNewPatientVitalSign(
    values?: CreateNewPatientVitalSignDto,
  ): Promise<PatientEntity> {
    const { data } = await this.api.post<PatientEntity>(
      "/patients-vital-signs/new-patient",
      values,
    );

    return data;
  }

  async findPatientQueue(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<PatientQueue>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<PatientQueue>
    >(`/patients-vital-signs?&${queryParams}`);

    return data;
  }
}

export const patientVitalSignApi = new PatientVitalSignApi();
