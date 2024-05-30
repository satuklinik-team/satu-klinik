import { Cell } from "@/components/shared/table/cell";
import { Badge } from "@/components/ui/badge";
import type { UserEntity } from "@/services/user/types/entity";

export function ClinicUsersStatusCell(row: UserEntity): JSX.Element {
  return (
    <Cell className="gap-2">
      <Badge className="text-sm cursor-default">
        {row.isActive ? "Active" : "Inactive"}
      </Badge>
    </Cell>
  );
}
