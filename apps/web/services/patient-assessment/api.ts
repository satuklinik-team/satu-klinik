import type { AxiosInstance } from "axios";

import { api } from "@/lib/api";

import type { PatientEntity } from "../patient/types/entity";
import type { CreatePatientAssessmentDto } from "./types/dto";

class PatientAssessmentApi {
  api: AxiosInstance = api;

  async createPatientAssessment(
    values?: CreatePatientAssessmentDto,
  ): Promise<PatientEntity> {
    const { data } = await this.api.post<PatientEntity>(
      "/patients-assessment",
      values,
    );

    return data;
  }
}

export const patientAssessmentApi = new PatientAssessmentApi();
