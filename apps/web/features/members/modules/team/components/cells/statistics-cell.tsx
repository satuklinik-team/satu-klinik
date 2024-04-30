import { Cell } from "@/components/shared/table/cell";
import type { ClinicEntity } from "@/services/clinic/types/entity";
import type { FormatterCellProps } from "@/types";

export function MembersTeamsStatisticsCell({
  row,
}: FormatterCellProps): JSX.Element {
  const typedRow = row as ClinicEntity;

  return (
    <Cell>
      <div className="flex flex-col items-center gap-1">
        <p className="text-center text-xs">Total Records</p>
        <p className="text-lg font-semibold text-center text-green-600">
          {typedRow._count.Pharmacy_Task}
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-center text-xs">Total Users</p>
        <p className="text-lg font-semibold text-center text-blue-600">
          {typedRow._count.users}
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-center text-xs">Total Patients</p>
        <p className="text-lg font-semibold text-center text-red-600">
          {typedRow._count.Patient}
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-center text-xs">Total Department</p>
        <p className="text-lg font-semibold text-center text-blue-600">
          {typedRow._count.Poli}
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-center text-xs">Total Category</p>
        <p className="text-lg font-semibold text-center text-blue-600">
          {typedRow._count.Category}
        </p>
      </div>
    </Cell>
  );
}
