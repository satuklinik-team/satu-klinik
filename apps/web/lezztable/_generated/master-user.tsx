import * as React from "react";
import {
  Table as TableElement,
  TableProps as TableElementProps,
} from "@lezztable-demo/react";

import { Column } from "@lezztable-demo/types";

import {} from "lucide-react";

interface TableRecord {
  name: unknown;
  role: unknown;
  status: unknown;
  action: unknown;
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

export const TABLE_ID = "a87d309f-18d8-4752-9f5e-419b1d5707d0";

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
        id: "0ea72889-94c1-47cf-ae00-3dbbd130bd14",
        key: "name",
        name: "Nama",
        type: "Custom",
        attributes: { isVisible: true },
      },
      {
        id: "c4ea6372-34dd-466c-8bb4-be05796b8ae2",
        key: "role",
        name: "Role",
        type: "Custom",
        attributes: { isVisible: true },
      },
      {
        id: "acba5c57-8bd3-4b1f-b2a3-76699477c4b5",
        key: "status",
        name: "Status",
        type: "Custom",
        attributes: { isVisible: true },
      },
      {
        id: "5bbf2003-01a5-4948-838c-3d46407d7052",
        key: "action",
        name: "Action",
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
      type: "static",
      columns: [
        {
          id: "0ea72889-94c1-47cf-ae00-3dbbd130bd14",
          key: "name",
          name: "Nama",
          type: "Custom",
          attributes: { isVisible: true },
        },
        {
          id: "c4ea6372-34dd-466c-8bb4-be05796b8ae2",
          key: "role",
          name: "Role",
          type: "Custom",
          attributes: { isVisible: true },
        },
        {
          id: "acba5c57-8bd3-4b1f-b2a3-76699477c4b5",
          key: "status",
          name: "Status",
          type: "Custom",
          attributes: { isVisible: true },
        },
        {
          id: "5bbf2003-01a5-4948-838c-3d46407d7052",
          key: "action",
          name: "Action",
          type: "Custom",
          attributes: { isVisible: true },
        },
      ],
      attributes: {
        data: [
          {
            id: "123121ee",
            role: "Admin",
            email: "admin@demo.id",
            phone: "082228883006",
            status: "Active",
            fullname: "Admin Demo",
          },
        ],
      },
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
            limit: 50,
            source: { key: "Limit", type: "header" },
          }
        }
        queryBuilder={queryBuilder}
      >
        <TableElement.Grid
          id="e4f187f7-f025-4b51-ba52-82e9f86a2b3f"
          columns={columns}
          type="static"
          attributes={{
            ...datasource.attributes,
            data: data ?? datasource.attributes.data,
          }}
        />
      </TableElement>
    </>
  );
};
