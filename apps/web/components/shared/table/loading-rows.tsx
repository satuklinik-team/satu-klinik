import type { HTMLAttributes } from "react";
import { useMemo } from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface LoadingRowsProps extends HTMLAttributes<HTMLDivElement> {
  totalRow?: number;
  totalColumn?: number;
}

export function LoadingRows({
  totalRow,
  totalColumn,
  className,
  ...rest
}: LoadingRowsProps): JSX.Element {
  const emptyCells = useMemo(() => {
    const totalCells = Number(totalRow) * Number(totalColumn);

    return Array.from({ length: totalCells });
  }, [totalRow, totalColumn]);

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gap: "1.7px",
        gridTemplateRows: `repeat(${Number(totalRow) + 1}, auto)`,
        gridAutoFlow: "column",
      }}
      {...rest}
    >
      {emptyCells.map((_item, index) => (
        <Skeleton className="w-full h-10 p-0" key={index} />
      ))}
    </div>
  );
}
