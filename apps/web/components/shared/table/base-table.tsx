"use client";

import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import {
  Table as RawTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Column } from "@/types";

import { HeaderCell } from "./header-cell";
import { LoadingRows } from "./loading-rows";

interface BaseTableProps {
  isLoading?: boolean;
  columns: Column[];
  rows: Record<string, unknown>[];
  pagination?: PaginationState;
}

export function BaseTable({
  isLoading = false,
  columns: rawColumns,
  rows,
  pagination,
}: BaseTableProps): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<Record<string, unknown>>();

  const columns = useMemo(() => {
    const currentColumns = rawColumns.map((column) => {
      const Cell = column.renderCell;

      return columnHelper.accessor((row) => row[column.key], {
        id: column.key,
        header: ({ column: headerColumn }) =>
          HeaderCell({ headerColumn, name: column.name }),
        cell: Cell,
      });
    }) as ColumnDef<Record<string, unknown>>[];

    return currentColumns;
  }, [columnHelper, rawColumns]);

  const { getHeaderGroups, getRowModel, getCanPreviousPage, getCanNextPage } =
    useReactTable({
      columns,
      data: rows,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount: 2,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
        pagination: {
          pageIndex: pagination?.pageIndex || 0,
          pageSize: pagination?.pageSize || 50,
        },
      },
      onPaginationChange: (paginationState) => paginationState,
    });

  return (
    <div>
      <div className="flex flex-col w-full">
        <div className="flex-1 w-full border-b">
          {Boolean(isLoading) && (
            <LoadingRows
              totalColumn={columns.length}
              totalRow={pagination?.pageSize}
            />
          )}

          {!isLoading && (
            <RawTable className="h-full">
              <TableHeader className="bg-[#F9F9F9]">
                {getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        className="h-10 p-0 border cursor-pointer"
                        key={header.id}
                      >
                        {Boolean(!header.isPlaceholder) &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {getRowModel().rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className="max-w-40 h-10 p-0 border"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </RawTable>
          )}
        </div>
      </div>
      {/* {pagination && (
        <Pagination
          isCanNextPage={getCanNextPage()}
          isCanPreviousPage={getCanPreviousPage()}
          pageCount={totalPage}
          pageIndex={activePageIndex}
          onChange={onChangePage}
        />
      )} */}
    </div>
  );
}
