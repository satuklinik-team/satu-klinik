import { Hospital } from "lucide-react";

import { Cell } from "@/components/shared/table/cell";
import type { ClinicEntity } from "@/services/clinic/types/entity";
import type { FormatterCellProps } from "@/types";

export function MembersTeamsClinicCell({
  row,
}: FormatterCellProps): JSX.Element {
  const typedRow = row as ClinicEntity;

  return (
    <Cell className="gap-3">
      <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full border-2">
        <Hospital size={28} />
      </div>
      <div className="flex flex-col ">
        <p className="text-base font-semibold">{typedRow.name}</p>
        <p className="text-xs">No: {typedRow.phone}</p>
        <p className="text-xs">Alamat: {typedRow.address}</p>
      </div>
    </Cell>
  );
}
