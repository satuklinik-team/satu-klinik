import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class MedicineCategoryQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("medicine-categories");
  }
}
