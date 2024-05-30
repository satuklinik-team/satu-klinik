import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type { PatientEntity } from "../patient/types/entity";
import type { BaseFindConnectionResponse } from "../shared/types";
import type { CreatePatientAssessmentDto } from "./types/dto";
import type { PatientAssessmentEntity } from "./types/entity";

class PatientAssessmentApi {
  api: AxiosInstance = api;

  async findPatientAssessmentHistory(
    dto?: object,
  ): Promise<BaseFindConnectionResponse<PatientAssessmentEntity>> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<
      BaseFindConnectionResponse<PatientAssessmentEntity>
    >(`/patient-assessment?counts=true&${queryParams}`);

    return data;
  }

  async createPatientAssessment(
    values?: CreatePatientAssessmentDto,
  ): Promise<PatientEntity> {
    const { data } = await this.api.post<PatientEntity>(
      "/patient-assessment",
      values,
    );

    return data;
  }
}

export const patientAssessmentApi = new PatientAssessmentApi();
