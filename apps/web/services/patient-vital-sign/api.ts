import type { AxiosInstance } from "axios";

import { api } from "@/lib/api";

import type { PatientEntity } from "../patient/types/entity";
import type {
  CreateNewPatientVitalSignDto,
  CreatePatientVitalSignDto,
} from "./types/dto";

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
}

export const patientVitalSignApi = new PatientVitalSignApi();
