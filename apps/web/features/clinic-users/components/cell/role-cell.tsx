import { Cell } from "@/components/shared/table/cell";
import type { UserEntity } from "@/services/user/types/entity";

export function ClinicUsersRoleCell(row: UserEntity): JSX.Element {
  const currentRole =
    row.roles.slice(0, 1) +
    row.roles.slice(1, row.roles.length).toLocaleLowerCase();

  return (
    <Cell>
      <p className="font-bold">{currentRole}</p>
    </Cell>
  );
}
