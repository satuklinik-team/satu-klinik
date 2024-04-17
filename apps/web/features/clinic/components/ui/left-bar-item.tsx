import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { LeftBarItem as ILeftBarItem } from "../../types";
import Link from "next/link";

interface LeftBarItemProps
  extends HTMLAttributes<HTMLDivElement>,
    ILeftBarItem {
  isOpen?: boolean;
  isActive?: boolean;
}

export function LeftBarItem({
  isActive = false,
  isOpen = false,
  children,
  className,
  icon,
  text,
  path,
  ...rest
}: LeftBarItemProps): JSX.Element {
  const Icon = icon;

  return (
    <div className={cn("px-2.5", className)}>
      <Link href={path}>
        <div
          className={cn(
            "flex flex-row justify-center items-center gap-3 px-2.5 py-2.5 cursor-pointer rounded-lg hover:bg-muted-foreground/10 transition",
            isActive && "bg-primary/10"
          )}
          {...rest}
        >
          <Icon
            className={cn("text-muted-foreground", isActive && "text-primary")}
            size={20}
          />
          {isOpen && (
            <p
              className={cn(
                "flex-1 text-sm text-muted-foreground",
                isActive && "text-primary"
              )}
            >
              {text}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
