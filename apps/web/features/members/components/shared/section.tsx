import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type MemberSectionProps = HTMLAttributes<HTMLDivElement>;

export function MemberSection({
  children,
  className,
  ...rest
}: MemberSectionProps): JSX.Element {
  return (
    <div className={cn("p-6 rounded-lg w-full border", className)} {...rest}>
      {children}
    </div>
  );
}
