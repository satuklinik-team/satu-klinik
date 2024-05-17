import { Cell } from "@/components/shared/table/cell";
import type { UserEntity } from "@/services/user/types/entity";
import { getInitial } from "@/utils";

export function ClinicUsersNameCell(row: UserEntity): JSX.Element {
  return (
    <Cell className="gap-3">
      <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
        <p>{getInitial(row.fullname)}</p>
      </div>
      <div>
        <p className="font-bold">{row.fullname}</p>
        <p className="font-normal text-muted-foreground">{row.email}</p>
      </div>
    </Cell>
  );
}
