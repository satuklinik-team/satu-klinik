"use client";

import { useMemo } from "react";

import { MemberSection } from "@/features/members/components/shared/section";
import { Table as ClinicTable } from "@/lezztable/_generated/master-clinic";

import { MembersTeamsActionsCell } from "./cells/actions-cell";
import { MembersTeamsClinicCell } from "./cells/clinic-cell";
import { MembersTeamsStatisticsCell } from "./cells/statistics-cell";

export function MembersTeamsTable(): JSX.Element {
  const columns = useMemo(() => {
    return [
      {
        key: "clinic",
        name: "Klinik",
        formatterCell: MembersTeamsClinicCell,
      },
      {
        key: "statistics",
        name: "Statistik",
        formatterCell: MembersTeamsStatisticsCell,
      },
      {
        key: "actions",
        name: "",
        formatterCell: MembersTeamsActionsCell,
      },
    ];
  }, []);

  return (
    <MemberSection>
      <ClinicTable columns={columns} />
    </MemberSection>
  );
}
