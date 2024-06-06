import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { BaseFindConnectionResponse } from "../shared/types";
import type { PatientMedicalRecordEntity } from "./types/entity";

class PatientMedicalRecordApi {
  api: AxiosInstance = api;

  async getPatientMedicalRecord(
    id: string,
    dto?: object,
  ): Promise<PatientMedicalRecordEntity> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<PatientMedicalRecordEntity>(
      `/patient-medical-record/${id}?${queryParams}`,
    );

    return data;
  }

  async findPatientMedicalRecord(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<PatientMedicalRecordEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<PatientMedicalRecordEntity>
    >(`/patient-medical-record?${queryParams}`);

    return data;
  }

  async deletePatientMedicalRecord(
    id: string,
  ): Promise<PatientMedicalRecordEntity> {
    const { data } = await this.api.delete<PatientMedicalRecordEntity>(
      `/patient-medical-record/${id}`,
    );

    return data;
  }
}

export const patientMedicalRecordApi = new PatientMedicalRecordApi();
