import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { clinicDashboardServices } from "../../utils";
import { ClinicCard } from "./card";

type ClinicCardProps = HTMLAttributes<HTMLDivElement>;

export function ClinicServicesCard({
  className,
  ...rest
}: ClinicCardProps): JSX.Element {
  const pathname = usePathname();

  return (
    <ClinicCard
      borderPosition="left"
      className={cn("my-4 border-sky-500", className)}
      title="Services"
      {...rest}
    >
      <div className="flex flex-row flex-wrap gap-4">
        {clinicDashboardServices.map((item) => {
          const Icon = item.icon;

          return (
            <Link href={`${pathname}${item.path}`} key={item.text}>
              <Button
                className="flex flex-col items-center gap-1 h-fit text-primary hover:text-primary border border-primary"
                variant="ghost"
              >
                <Icon className="text-primary" size={20} />
                {item.text}
              </Button>
            </Link>
          );
        })}
      </div>
    </ClinicCard>
  );
}
