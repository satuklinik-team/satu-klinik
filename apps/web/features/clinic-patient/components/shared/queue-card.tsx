import type { HTMLAttributes } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PatientEntity } from "@/services/patient/types/entity";
import { getInitial } from "@/utils";

type QueueCardProps = HTMLAttributes<HTMLDivElement> &
  PatientEntity & {
    isActive: boolean;
    queue: string;
  };

export function QueueCard({
  isActive,
  className,
  queue,
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
          <span className="text-sm font-semibold">No Antrian:</span> {queue}
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
      {Boolean(isActive) && (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
        </span>
      )}
    </Card>
  );
}
