import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface LeftBarGroupProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

export function LeftBarGroup({
  isOpen = false,
  children,
  className,
  ...rest
}: LeftBarGroupProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 w-full py-2.5",
        !isOpen &&
          "border-t-0 sm:border-t md:border-t lg:border-t xl:border-t 2xl:border-t",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
