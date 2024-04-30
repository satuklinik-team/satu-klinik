import { Cell } from "@/components/shared/table/cell";
import type { UserEntity } from "@/services/user/types/entity";
import type { FormatterCellProps } from "@/types";

export function ClinicUsersNameCell({ row }: FormatterCellProps): JSX.Element {
  const typedRow = row as UserEntity;

  return (
    <Cell className="gap-3">
      <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
        <p>AD</p>
      </div>
      <div>
        <p className="font-bold">{typedRow.fullname}</p>
        <p className="font-normal text-muted-foreground">{typedRow.email}</p>
      </div>
    </Cell>
  );
}
