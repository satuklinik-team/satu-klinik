import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionContainerProps = HTMLAttributes<HTMLDivElement>;

export function SectionContainer({
  className,
  children,
  ...rest
}: SectionContainerProps): JSX.Element {
  return (
    <div
      className={cn("mx-auto max-w-[96rem] px-[200px] py-[100px]", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
