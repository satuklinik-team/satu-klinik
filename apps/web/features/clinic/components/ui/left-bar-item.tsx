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
    Omit<ILeftBarItem, "id"> {
  isOpen?: boolean;
  isActive?: boolean;
  notifCount: number;
}

export function LeftBarItem({
  isActive = false,
  isOpen = false,
  className,
  icon,
  text,
  path,
  notifCount,
  ...rest
}: LeftBarItemProps): JSX.Element {
  const Icon = icon;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <div className={cn("px-2.5", className)}>
          <TooltipTrigger asChild>
            <Link href={path}>
              <div
                className={cn(
                  "relative flex flex-row justify-center items-center gap-3 px-2.5 py-2.5 cursor-pointer rounded-lg hover:bg-muted-foreground/10 transition",
                  isActive && "bg-primary/10"
                )}
                {...rest}
              >
                <Icon
                  className={cn(
                    "text-foreground/90",
                    isActive && "text-primary"
                  )}
                  size={20}
                />
                <p
                  className={cn(
                    "flex-1 text-sm text-foreground/90",
                    isActive && "text-primary",
                    !isOpen &&
                      "block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden"
                  )}
                >
                  {text}
                </p>
                {Boolean(notifCount) && (
                  <Badge
                    variant="destructive"
                    className={cn(
                      isOpen &&
                        "text-sm static font-medium flex justify-center items-center w-5 h-5 p-0 rounded-full",
                      !isOpen &&
                        "md:absolute md:top-0 md:right-0 min-h-5 min-w-5 flex items-center justify-center text-xs px-1 py-0 rounded-full"
                    )}
                  >
                    {notifCount}
                  </Badge>
                )}
              </div>
            </Link>
          </TooltipTrigger>
        </div>
        <TooltipContent className={cn(isOpen && "hidden")} side="right">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
