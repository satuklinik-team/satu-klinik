"use client";

import { useMemo, useState } from "react";

import { BaseTable as ClinicTable } from "@/components/shared/table/base-table";
import { MemberSection } from "@/features/members/components/shared/section";
import { useFindClinic } from "@/services/clinic/hooks/use-find-clinic";
import type { ClinicEntity } from "@/services/clinic/types/entity";
import type { Pagination } from "@/types";

import { MembersTeamsActionsCell } from "./cells/actions-cell";
import { MembersTeamsClinicCell } from "./cells/clinic-cell";
import { MembersTeamsStatisticsCell } from "./cells/statistics-cell";

export function MembersTeamsTable(): JSX.Element {
  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindClinic(pagination);

  const columns = useMemo(() => {
    return [
      {
        key: "clinic",
        name: "Klinik",
        renderCell: MembersTeamsClinicCell,
      },
      {
        key: "statistics",
        name: "Statistik",
        renderCell: MembersTeamsStatisticsCell,
      },
      {
        key: "actions",
        name: "",
        renderCell: MembersTeamsActionsCell,
      },
    ];
  }, []);

  return (
    <MemberSection>
      <ClinicTable<ClinicEntity>
        columns={columns}
        isLoading={isLoading}
        onPaginationChange={(currentPagination) => {
          setPagination(currentPagination);
        }}
        pagination={pagination}
        rows={data?.data ?? []}
        totalRows={data?.count}
      />
    </MemberSection>
  );
}
