import Image from "next/image";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface AuthFormWrapperProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: JSX.Element | string;
  description: JSX.Element | string;
}

export function AuthFormWrapper({
  children,
  className,
  description,
  title,
  ...rest
}: AuthFormWrapperProps): JSX.Element {
  return (
    <div
      className={cn("w-full max-w-xl flex flex-col gap-4 p-6", className)}
      {...rest}
    >
      <div>
        <Image
          alt="Brand Logo"
          className="w-14 h-14 mb-2"
          height={44}
          src="/brand-logo-2.png"
          width={253}
        />

        {typeof title === "string" && (
          <p className="text-2xl font-semibold mb-2">{title}</p>
        )}
        {typeof title === "object" && title}
        {typeof description === "string" && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {typeof description === "object" && description}
      </div>

      {children}
    </div>
  );
}
