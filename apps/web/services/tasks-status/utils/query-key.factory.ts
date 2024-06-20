import type { QueryKey } from "@tanstack/react-query";
import { stringify } from "qs";

import { QueryKeyFactory } from "@/services/shared/query-key.factory";

export class TasksStatusQueryKeyFactory extends QueryKeyFactory {
  constructor() {
    super("tasks-status");
  }

  notifications(): QueryKey {
    return [this.endpoint];
  }

  chart(dto?: object): QueryKey {
    return [
      ...this.all(),
      "chart",
      { filters: stringify(dto, { encode: false }) },
    ];
  }
}
