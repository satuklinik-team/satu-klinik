"use client";

import { useMemo } from "react";

import { ClinicCard } from "@/features/clinic/components/ui/card";
import { Table } from "@/lezztable/_generated/master-user";

import { ClinicUsersActionsCell } from "./cell/actions-cell";
import { ClinicUsersNameCell } from "./cell/name-cell";
import { ClinicUsersRoleCell } from "./cell/role-cell";
import { ClinicUsersStatusCell } from "./cell/status-cell";

export function ClinicUsersTable(): JSX.Element {
  const columns = useMemo(() => {
    return [
      {
        key: "name",
        name: "Nama",
        formatterCell: ClinicUsersNameCell,
      },
      {
        key: "role",
        name: "Role",
        formatterCell: ClinicUsersRoleCell,
      },
      {
        key: "status",
        name: "Status",
        formatterCell: ClinicUsersStatusCell,
      },
      {
        key: "action",
        name: "Action",
        formatterCell: ClinicUsersActionsCell,
      },
    ];
  }, []);

  return (
    <ClinicCard className="mt-6">
      <Table
        columns={columns}
        // pagination={{
        //   skip: 0,
        //   limit: 20,
        // }}
        // totalRows={80}
      />
    </ClinicCard>
  );
}
