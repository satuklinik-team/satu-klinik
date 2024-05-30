import type { QueryKey } from "@tanstack/react-query";
import { stringify } from "qs";

export class QueryKeyFactory {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  all(): QueryKey {
    return [this.endpoint];
  }

  paginations(): QueryKey {
    return [...this.all(), "pagination"];
  }

  pagination(filters?: object): QueryKey {
    return [
      ...this.paginations(),
      { filters: stringify(filters, { encode: false }) },
    ];
  }

  lists(): QueryKey {
    return [...this.all(), "list"];
  }

  list(filters?: object): QueryKey {
    return [
      ...this.lists(),
      { filters: stringify(filters, { encode: false }) },
    ];
  }

  details(): QueryKey {
    return [...this.all(), "detail"];
  }

  detail(id: string, filters?: object): QueryKey {
    if (filters)
      return [
        ...this.details(),
        id,
        { filters: stringify(filters, { encode: false }) },
      ];

    return [...this.details(), id];
  }
}
