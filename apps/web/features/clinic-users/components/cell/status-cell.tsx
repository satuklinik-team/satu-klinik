import { Cell } from "@/components/shared/table/cell";
import { Badge } from "@/components/ui/badge";
import type { UserEntity } from "@/services/user/types/entity";
import type { FormatterCellProps } from "@/types";

export function ClinicUsersStatusCell({
  row,
}: FormatterCellProps): JSX.Element {
  const typedRow = row as UserEntity;

  return (
    <Cell className="gap-2">
      <Badge className="text-sm cursor-default">{typedRow.status}</Badge>
    </Cell>
  );
}
