import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ClinicCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  borderPosition?: "left" | "top" | "right" | "bottom";
  title?: string | JSX.Element;
  classNames?: {
    header?: string;
    content?: string;
  };
}

export function ClinicCard({
  borderPosition,
  title,
  children,
  className,
  classNames,
  ...rest
}: ClinicCardProps): JSX.Element {
  return (
    <Card
      className={cn(
        "rounded-lg",
        "border",
        borderPosition === "left" && "border-l-4",
        borderPosition === "top" && "border-t-4",
        borderPosition === "right" && "border-r-4",
        borderPosition === "bottom" && "border-b-4",
        className,
        "border-gray-400"
      )}
      {...rest}
    >
      <CardHeader className={cn("px-4 pt-3 pb-0", classNames?.header)}>
        {typeof title === "object" && title}
        {typeof title === "string" && (
          <CardTitle className="text-sm sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-lg font-semibold">
            {title}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent
        className={cn(
          "flex-1 px-4 py-3 text-2xl font-medium",
          classNames?.content
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}
