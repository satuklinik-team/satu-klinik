import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class PatientAssessmentHistoryQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("patient-assessment-histories");
  }
}
