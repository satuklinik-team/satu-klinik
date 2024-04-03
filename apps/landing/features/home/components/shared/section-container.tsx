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
      className={cn(
        "mx-auto max-w-[96rem] px-[40px] sm:px-[80px] md:px-[120px] lg:px-[160px] xl:px-[200px] 2xl:px-[200px] py-[40px] sm:py-[80px] md:py-[80px] lg:py-[80px] xl:py-[100px] 2xl:py-[100px]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
