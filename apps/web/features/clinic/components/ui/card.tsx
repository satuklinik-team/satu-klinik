import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ClinicCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  borderPosition?: "left" | "top" | "right" | "bottom";
  title?: string | JSX.Element;
}

export function ClinicCard({
  borderPosition,
  title,
  children,
  className,
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
        className
      )}
      {...rest}
    >
      <CardHeader className="px-4 pt-3 pb-0">
        {typeof title === "object" && title}
        {typeof title === "string" && (
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1 px-4 py-3 text-2xl font-medium">
        {children}
      </CardContent>
    </Card>
  );
}
