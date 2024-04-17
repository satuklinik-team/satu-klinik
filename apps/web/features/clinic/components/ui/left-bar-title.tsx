import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

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
        !isOpen && "hidden"
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
