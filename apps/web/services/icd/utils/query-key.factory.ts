import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class Icd9CMQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("icd9cm");
  }
}

export class Icd10QueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("icd10");
  }
}
