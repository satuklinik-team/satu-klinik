import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class UserQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("users");
  }
}
