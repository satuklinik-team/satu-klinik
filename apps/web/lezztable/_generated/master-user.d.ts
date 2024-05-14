import * as React from "react";
import { TableProps as TableElementProps } from "@lezztable-demo/react";
import { Column } from "@lezztable-demo/types";
export interface TableProps extends TableElementProps {
  columns?: Partial<Column>[];
  headers?: Record<string, string>;
  onClick?: (args: { record: object }) => unknown;
  data?: object[];
  onAction?: Record<
    string,
    (
      e: React.MouseEvent<unknown, MouseEvent>,
      args: {
        record: object;
      }
    ) => unknown
  >;
}
export declare const TABLE_ID = "a87d309f-18d8-4752-9f5e-419b1d5707d0";
export declare const Table: ({
  filters,
  sorts,
  groups,
  pagination,
  columns: rawColumns,
  headers: rawHeaders,
  queryBuilder,
  onClick,
  data,
  onAction,
}: TableProps) => React.JSX.Element;
