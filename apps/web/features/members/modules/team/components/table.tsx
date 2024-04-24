"use client";

import { BaseTable } from "@/components/shared/table/base-table";
import { MemberSection } from "@/features/members/components/shared/section";

export function MembersTeamsTable(): JSX.Element {
  return (
    <MemberSection>
      <BaseTable
        columns={[
          { key: "clinic", name: "Clinic", renderCell: (row) => <></> },
          { key: "statistics", name: "Statistics", renderCell: (row) => <></> },
          { key: "actions", name: "", renderCell: (row) => <></> },
        ]}
        rows={[]}
      />
    </MemberSection>
  );
}
