import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface LeftBarTitleProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

export function LeftBarTitle({
  isOpen = false,
  children,
  className,
  ...rest
}: LeftBarTitleProps): JSX.Element {
  return (
    <p
      className={cn(
        "text-xs text-muted-foreground px-5 uppercase",
        className,
        !isOpen && "block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden",
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
