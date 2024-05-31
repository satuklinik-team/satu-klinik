import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class PharmacyTaskQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("pharmacy-tasks");
  }
}
