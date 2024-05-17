import * as React from "react";
import {
  Table as TableElement,
  TableProps as TableElementProps,
} from "@lezztable-demo/react";

import { Column } from "@lezztable-demo/types";

import {} from "lucide-react";

interface TableRecord {
  clinic: unknown;
  statistics: unknown;
  actions: unknown;
}

export interface TableProps extends TableElementProps {
  columns?: Partial<Column>[];
  headers?: Record<string, string>;
  onClick?: (args: { record: object }) => unknown;
  data?: object[];
  onAction?: Record<
    string,
    (
      e: React.MouseEvent<unknown, MouseEvent>,
      args: { record: object }
    ) => unknown
  >;
}

export const TABLE_ID = "a7b9253f-504c-41a1-8920-a3551a0343fd";

export const Table = ({
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
}: TableProps) => {
  const columns = React.useMemo(() => {
    return [
      {
        key: "clinic",
        name: "Klinik",
        type: "Custom",
        attributes: { isVisible: true },
      },
      {
        id: "9e46c826-89f3-49c0-b494-b6113a21814d",
        key: "statistics",
        name: "Statistik",
        type: "Custom",
        attributes: { isVisible: true },
      },
      {
        id: "b8e23288-a834-49c9-a65d-ed322b53d75a",
        key: "actions",
        name: "Actions",
        type: "Custom",
        attributes: { isVisible: true },
      },
    ].map((item) => {
      const matchedColumn = rawColumns?.find((col) => col?.key === item.key);
      if (matchedColumn) return { ...item, ...matchedColumn };
      return item;
    });
  }, [rawColumns]);

  const headers = React.useMemo(() => {
    if (!rawHeaders) return;

    return Object.entries(rawHeaders).map(([key, value]) => ({
      key,
      value,
    }));
  }, [rawHeaders]);

  const datasource = React.useMemo(() => {
    return {
      type: "api",
      columns: [
        {
          key: "clinic",
          name: "Klinik",
          type: "Custom",
          attributes: { isVisible: true },
        },
        {
          id: "9e46c826-89f3-49c0-b494-b6113a21814d",
          key: "statistics",
          name: "Statistik",
          type: "Custom",
          attributes: { isVisible: true },
        },
        {
          id: "b8e23288-a834-49c9-a65d-ed322b53d75a",
          key: "actions",
          name: "Actions",
          type: "Custom",
          attributes: { isVisible: true },
        },
      ],
      attributes: { url: "localhost:5050/api", path: "data", headers: [] },
    };
  }, []);

  return (
    <>
      <TableElement
        filters={filters ?? []}
        sorts={sorts ?? []}
        groups={groups ?? []}
        pagination={
          pagination ?? {
            skip: 0,
            limit: 10,
            source: { path: "count", type: "body" },
          }
        }
        queryBuilder={queryBuilder}
      >
        <TableElement.Grid
          id="a4aae24f-7d59-4b51-972f-e1d1256eca46"
          columns={columns}
          type="api"
          attributes={{
            ...datasource.attributes,
            headers: headers ?? datasource.attributes.headers,
          }}
        />
      </TableElement>
    </>
  );
};
