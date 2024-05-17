import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class ClinicQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("clinics");
  }
}
