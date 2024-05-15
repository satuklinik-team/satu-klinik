import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class PatientVitalSignQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("patient-vital-signs");
  }
}
