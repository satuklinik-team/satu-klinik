import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class MedicineQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("medicines");
  }
}
