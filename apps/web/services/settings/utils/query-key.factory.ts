import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class SettingQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("settings");
  }
}
