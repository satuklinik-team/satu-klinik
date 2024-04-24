export interface Column {
  key: string;
  name: string;
  renderCell: (row: unknown) => JSX.Element;
}

export interface Pagination {
  skip: number;
  limit: number;
}
