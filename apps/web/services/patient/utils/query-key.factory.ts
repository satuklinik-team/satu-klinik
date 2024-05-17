import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class PatientQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("patients");
  }
}
