import type { Column } from "@tanstack/react-table";
// import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { Cell } from "./cell";

interface HeaderCellProps<T> extends HTMLAttributes<HTMLDivElement> {
  name: string;
  headerColumn: Column<T>;
}

export function HeaderCell<T extends object>({
  className,
  headerColumn,
  name,
  ...rest
}: HeaderCellProps<T>): JSX.Element {
  // const sort = headerColumn.getIsSorted();

  const cellClassName = cn(
    "flex items-center text-foreground font-semibold cursor-default",
    className,
  );

  if (!name) return <Cell className={cellClassName} {...rest} />;

  return (
    <Cell
      className={cellClassName}
      onClick={() => {
        headerColumn.toggleSorting(undefined, true);
      }}
      {...rest}
    >
      {name}
      {/* {!sort && <ArrowUpDown className="ml-2 h-4 w-4" />}
      {sort === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
      {sort === "desc" && <ArrowDown className="ml-2 h-4 w-4" />} */}
    </Cell>
  );
}
