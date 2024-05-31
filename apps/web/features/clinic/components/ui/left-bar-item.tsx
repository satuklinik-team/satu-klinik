import Link from "next/link";
import type { HTMLAttributes } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { LeftBarItem as ILeftBarItem } from "../../types";

interface LeftBarItemProps
  extends HTMLAttributes<HTMLDivElement>,
    ILeftBarItem {
  isOpen?: boolean;
  isActive?: boolean;
}

export function LeftBarItem({
  isActive = false,
  isOpen = false,
  className,
  icon,
  text,
  path,
  ...rest
}: LeftBarItemProps): JSX.Element {
  const Icon = icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <div className={cn("px-2.5", className)}>
          <TooltipTrigger asChild>
            <Link href={path}>
              <div
                className={cn(
                  "relative flex flex-row justify-center items-center gap-3 px-2.5 py-2.5 cursor-pointer rounded-lg hover:bg-muted-foreground/10 transition",
                  isActive && "bg-primary/10",
                )}
                {...rest}
              >
                <Icon
                  className={cn(
                    "text-foreground/90",
                    isActive && "text-primary",
                  )}
                  size={20}
                />
                <p
                  className={cn(
                    "flex-1 text-sm text-foreground/90",
                    isActive && "text-primary",
                    !isOpen &&
                      "block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden",
                  )}
                >
                  {text}
                </p>
                <Badge
                  variant="destructive"
                  className={cn(
                    "text-xs font-normal flex justify-center items-center w-5 h-5 p-0 rounded-full",
                    !isOpen &&
                      "flex sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden",
                  )}
                >
                  2
                </Badge>
                <Badge
                  variant="destructive"
                  className={cn(
                    "absolute top-1.5 right-3 w-2 h-2 p-0 rounded-full hidden",
                    !isOpen && "hidden sm:block",
                  )}
                />
              </div>
            </Link>
          </TooltipTrigger>
        </div>
        <TooltipContent className={cn(isOpen && "hidden")}>
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
