import { Cell } from "@/components/shared/table/cell";
import type { UserEntity } from "@/services/user/types/entity";

export function ClinicUsersRoleCell(row: UserEntity): JSX.Element {
  return (
    <Cell>
      <p className="font-bold">{row.role}</p>
    </Cell>
  );
}
