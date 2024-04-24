import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { Cell } from "./cell";

interface HeaderCellProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  headerColumn: Column<Record<string, unknown>>;
}

export function HeaderCell({
  className,
  headerColumn,
  name,
  ...rest
}: HeaderCellProps): JSX.Element {
  const sort = headerColumn.getIsSorted();

  return (
    <Cell
      className={cn(
        "flex items-center text-foreground bg-mmuted-foreground cursor-default",
        className
      )}
      onClick={() => {
        headerColumn.toggleSorting(undefined, true);
      }}
      {...rest}
    >
      {name}
      {!sort && <ArrowUpDown className="ml-2 h-4 w-4" />}
      {sort === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
      {sort === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
    </Cell>
  );
}
