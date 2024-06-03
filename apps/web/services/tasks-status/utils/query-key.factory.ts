import type { QueryKey } from "@tanstack/react-query";

import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class TasksStatusQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("tasks-status");
  }

  notifications(): QueryKey {
    return [this.endpoint];
  }
}
