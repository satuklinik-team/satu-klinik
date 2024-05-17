import { Cell } from "@/components/shared/table/cell";
import type { UserEntity } from "@/services/user/types/entity";
import type { FormatterCellProps } from "@/types";

export function ClinicUsersRoleCell({ row }: FormatterCellProps): JSX.Element {
  const typedRow = row as UserEntity;

  return (
    <Cell>
      <p className="font-bold">{typedRow.role}</p>
    </Cell>
  );
}
