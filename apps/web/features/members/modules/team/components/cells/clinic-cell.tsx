import { Hospital } from "lucide-react";

import { Cell } from "@/components/shared/table/cell";
import type { ClinicEntity } from "@/services/clinic/types/entity";

export function MembersTeamsClinicCell(row: ClinicEntity): JSX.Element {
  return (
    <Cell className="gap-3">
      <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full border-2">
        <Hospital size={28} />
      </div>
      <div className="flex flex-col ">
        <p className="text-base font-semibold">{row.name}</p>
        <p className="text-xs">No: {row.phone}</p>
        <p className="text-xs">Alamat: {row.address}</p>
      </div>
    </Cell>
  );
}
