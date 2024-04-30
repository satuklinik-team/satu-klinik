import type { Column as LezztableColumn } from "@lezztable-demo/types";

export interface Column<T extends object> {
  key: string;
  name: string;
  renderCell: (row: T) => JSX.Element;
}

export interface Pagination {
  skip: number;
  limit: number;
}

export interface FormatterCellProps {
  row: unknown;
  column: LezztableColumn;
}
