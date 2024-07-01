import Link from "next/link";
import type { HTMLAttributes } from "react";

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
                  <div
                    className={cn(
                      isOpen &&
                        "text-sm static font-medium flex justify-center items-center min-w-5 min-h-5 px-1 p-0 rounded-full",
                      !isOpen &&
                        "font-medium md:absolute md:-top-2 md:-right-2 min-h-5 min-w-5 flex items-center justify-center text-xs px-1 py-0 rounded-full"
                    )}
                  >
                    <span className="relative flex min-h-5 min-w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                      <div
                        className={cn(
                          "rounded-full min-h-5 min-w-5 bg-destructive text-white flex justify-center items-center"
                        )}
                      >
                        {notifCount}
                      </div>
                    </span>
                  </div>
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
