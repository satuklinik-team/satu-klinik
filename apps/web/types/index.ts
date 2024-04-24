export interface Column<T extends object> {
  key: string;
  name: string;
  renderCell: (row: T) => JSX.Element;
}

export interface Pagination {
  skip: number;
  limit: number;
}
