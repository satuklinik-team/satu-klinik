import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export interface Column<T extends object> {
  key: string;
  name: string;
  renderCell: (row: T) => JSX.Element;
  renderHeader?: () => JSX.Element;
}

export interface Pagination {
  skip: number;
  limit: number;
}

export interface FormatterCellProps {
  row: unknown;
}

export interface RouteParams extends Params {
  clinicId: string;
  mrId: string;
  patientId: string;
}
