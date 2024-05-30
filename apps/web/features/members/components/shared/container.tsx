import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({
  className,
  children,
  ...rest
}: ContainerProps): JSX.Element {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-[96rem] px-lg sm:px-2xl md:px-3xl lg:px-4xl xl:px-5xl 2xl:px-5xl py-lg sm:py-2xl md:py-2xl lg:py-2xl xl:py-3xl 2xl:py-3xl",
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
