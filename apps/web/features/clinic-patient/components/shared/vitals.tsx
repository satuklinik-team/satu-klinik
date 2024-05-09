import type { HTMLAttributes } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { VitalItem } from "../../types";

interface ClinicPatientVitalsProps extends HTMLAttributes<HTMLDivElement> {
  vitals: VitalItem[];
}

export function ClinicPatientVitals({
  className,
  vitals,
  ...rest
}: ClinicPatientVitalsProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-3 font-normal mt-1",
        className
      )}
      {...rest}
    >
      <TooltipProvider>
        {vitals.map((item) => {
          return (
            <Tooltip key={item.label}>
              <TooltipTrigger>
                <div className="flex flex-row items-center gap-1.5">
                  {item.icon}
                  <p>{item.value}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
