import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CellProps = HTMLAttributes<HTMLDivElement>;

export function Cell({ children, className, ...rest }: CellProps): JSX.Element {
  return (
    <div className={cn("w-full h-full px-4 py-2 pt-4", className)} {...rest}>
      {children}
    </div>
  );
}
