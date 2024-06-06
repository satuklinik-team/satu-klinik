import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class PatientMedicalRecordQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("patient-medical-record");
  }
}
