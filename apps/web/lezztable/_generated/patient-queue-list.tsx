import * as React from "react";
import {
  Table as TableElement,
  TableProps as TableElementProps,
} from "@lezztable-demo/react";

import { Column } from "@lezztable-demo/types";

import {} from "lucide-react";

interface TableRecord {
  patient: unknown;
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

export const TABLE_ID = "ac754dcd-d2cc-4a4f-bad0-caab42797115";

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
        key: "patient",
        name: "Patient Object",
        type: "LongText",
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
          key: "patient",
          name: "Patient Object",
          type: "LongText",
          attributes: { isVisible: true },
        },
      ],
      attributes: {
        data: [
          {
            patient: {
              address: "Keputih Tegal Timur",
              fullName: "Darren Christian",
              medicalNumber: "2024.04.00012",
            },
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
          id="3421a2ed-7354-4267-a53f-f688fe2aa2d5"
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
