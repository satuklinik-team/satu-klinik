"use client";

import { CheckBadgeIcon } from "@/components/icons/check-badge";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface FeatureBenefitItemProps extends HTMLAttributes<HTMLDivElement> {
  leftIcon?: JSX.Element;
  title: string;
  description: string;
  classNames?: {
    title?: string;
    description?: string;
  };
}

export function FeatureBenefitItem({
  leftIcon = (
    <CheckBadgeIcon
      className="fill-secondary shrink-0"
      classNames={{ tick: "fill-background" }}
      size={40}
    />
  ),
  title,
  description,
  className,
  classNames,
  ...rest
}: FeatureBenefitItemProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...rest}>
      <div className="flex flex-row items-center gap-4">
        {leftIcon}
        <h4
          className={cn(
            "text-secondary text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-type-heading4 2xl:text-type-heading4 font-bold",
            classNames?.title,
          )}
        >
          {title}
        </h4>
      </div>
      <p
        className={cn(
          "text-secondary text-xl max-w-[598px] ps-14",
          classNames?.description,
        )}
      >
        {description}
      </p>
    </div>
  );
}
