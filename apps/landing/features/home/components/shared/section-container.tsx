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
        "mx-auto w-full max-w-[96rem] px-lg sm:px-2xl md:px-4xl lg:px-5xl xl:px-6xl 2xl:px-6xl py-lg sm:py-2xl md:py-2xl lg:py-2xl xl:py-3xl 2xl:py-3xl",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
