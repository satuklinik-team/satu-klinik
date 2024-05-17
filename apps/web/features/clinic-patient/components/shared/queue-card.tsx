import type { HTMLAttributes } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PatientEntity } from "@/services/patient/types/entity";
import { getInitial } from "@/utils";

type QueueCardProps = HTMLAttributes<HTMLDivElement> &
  PatientEntity & {
    isActive: boolean;
  };

export function QueueCard({
  isActive,
  className,
  mr,
  fullname,
  norm,
  address,
  ...rest
}: QueueCardProps): JSX.Element {
  return (
    <Card
      className={cn(
        "flex-row justify-between items-center gap-2 px-4 py-3",
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
        <p className="text-base">{getInitial(fullname)}</p>
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-base font-bold">
          <span className="text-sm font-semibold">No Antrian:</span>{" "}
          {mr[0].queue}
        </p>
        <p className="text-sm font-normal">
          <span className="font-semibold">Nama Lengkap:</span> {fullname}
        </p>
        <p className="text-sm font-normal">
          <span className="font-semibold"> Nomor Rekam Medis:</span> {norm}
        </p>
        <p className="text-sm font-normal">
          <span className="font-semibold">Alamat:</span> {address}
        </p>
      </div>
      {isActive && (
        <Badge className="p-0 w-3 h-3 rounded-full" variant="destructive" />
      )}
    </Card>
  );
}
