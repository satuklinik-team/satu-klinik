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
    <div className={cn("flex flex-row gap-4", className)} {...rest}>
      {leftIcon}
      <div>
        <p
          className={cn(
            "text-secondary text-[32px] font-bold mb-2",
            classNames?.title,
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-secondary text-xl max-w-[598px]",
            classNames?.description,
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
