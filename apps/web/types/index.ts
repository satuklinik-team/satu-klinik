export interface Column {
  key: string;
  name: string;
  renderCell: (row: unknown) => JSX.Element;
}
