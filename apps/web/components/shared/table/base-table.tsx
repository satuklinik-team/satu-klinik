"use client";

import type { ColumnDef, SortingState } from "@tanstack/react-table";
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
import { usePagination } from "@/hooks/use-pagination";
import type { Column, Pagination as PaginationType } from "@/types";

import { HeaderCell } from "./header-cell";
import { LoadingRows } from "./loading-rows";
import { Pagination } from "./pagination";

interface BaseTableProps<T extends object> {
  isLoading?: boolean;
  columns: Column<T>[];
  count?: number;
  rows: T[];
  totalRows?: number;
  pagination?: PaginationType;
  onPaginationChange?: (pagination: PaginationType) => void;
}

export function BaseTable<T extends object>({
  isLoading = false,
  columns: rawColumns,
  rows,
  totalRows = 0,
  pagination,
  onPaginationChange,
}: BaseTableProps<T>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<T>();

  const columns = useMemo(() => {
    const currentColumns = rawColumns.map((column) => {
      const Cell = column.renderCell;

      return columnHelper.accessor(
        (row) => (row as Record<string, unknown>)[column.key],
        {
          id: column.key,
          header: ({ column: headerColumn }) =>
            HeaderCell({ headerColumn, name: column.name }),
          cell: ({ row }) => {
            return Cell(row.original);
          },
        }
      );
    }) as ColumnDef<T>[];

    return currentColumns;
  }, [columnHelper, rawColumns]);

  const { activePageIndex, onChangePage, totalPage } = usePagination({
    skip: pagination?.skip ?? 0,
    limit: pagination?.limit ?? 50,
    totalRows,
    onPaginationChange,
  });

  const { getHeaderGroups, getRowModel, getCanPreviousPage, getCanNextPage } =
    useReactTable({
      columns,
      data: rows,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount: totalPage,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
        pagination: {
          pageIndex: activePageIndex || 0,
          pageSize: pagination?.limit || 50,
        },
      },
      onPaginationChange: (paginationState) => paginationState,
    });

  const firstRecordIndex = activePageIndex * (pagination?.limit ?? 0) + 1;

  const lastRecordIndex =
    activePageIndex * (pagination?.limit ?? 0) + (pagination?.limit ?? 0);

  return (
    <div>
      <div className="flex flex-col w-full">
        <div className="flex-1 w-full border-b">
          {Boolean(isLoading) && (
            <LoadingRows
              totalColumn={columns.length}
              totalRow={pagination?.limit}
            />
          )}

          {!isLoading && (
            <RawTable className="h-full">
              <TableHeader className="bg-[#F9F9F9]">
                {getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead className="h-10 p-0 border" key={header.id}>
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
                          className="max-w-40 min-h-10 h-min p-0 border"
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

      {Boolean(pagination) && (
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm shrink-0">
            Showing <span className="font-semibold">{firstRecordIndex}</span> -{" "}
            <span className="font-semibold"> {lastRecordIndex}</span> from{" "}
            <span className="font-semibold">{totalRows}</span> data
          </p>
          <Pagination
            isCanNextPage={getCanNextPage()}
            isCanPreviousPage={getCanPreviousPage()}
            onChange={onChangePage}
            pageCount={totalPage}
            pageIndex={activePageIndex}
          />
        </div>
      )}
    </div>
  );
}
