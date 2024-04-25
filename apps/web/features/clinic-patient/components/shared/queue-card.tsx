import type { HTMLAttributes } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TaskEntity } from "@/services/task/types/entity";

type QueueCardProps = HTMLAttributes<HTMLDivElement> & TaskEntity;

export function QueueCard({
  className,
  queue,
  patient,
  ...rest
}: QueueCardProps): JSX.Element {
  return (
    <Card
      className={cn(
        "flex-row justify-between items-center gap-2 px-4 py-3",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
        <p className="text-base">DC</p>
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-base font-bold">
          <span className="text-sm font-semibold">No Antrian:</span> {queue}
        </p>
        <p className="text-sm font-normal">
          <span className="font-semibold">Nama Lengkap:</span> {patient.name}
        </p>
        <p className="text-sm font-normal">
          <span className="font-semibold"> Nomor Rekam Medis:</span>{" "}
          {patient.medicalRecordNumber}
        </p>
        <p className="text-sm font-normal">
          <span className="font-semibold">Alamat:</span> {patient.address}
        </p>
      </div>
      <Badge className="p-0 w-3 h-3 rounded-full" variant="destructive" />
    </Card>
  );
}
