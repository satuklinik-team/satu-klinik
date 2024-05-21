"use client";

import { useMemo, useState } from "react";

import { BaseTable as UsersTable } from "@/components/shared/table/base-table";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useFindUser } from "@/services/user/hooks/use-find-user";
import type { UserEntity } from "@/services/user/types/entity";
import type { Pagination } from "@/types";

import { ClinicUsersActionsCell } from "./cell/actions-cell";
import { ClinicUsersNameCell } from "./cell/name-cell";
import { ClinicUsersRoleCell } from "./cell/role-cell";
import { ClinicUsersStatusCell } from "./cell/status-cell";

export function ClinicUsersTable(): JSX.Element {
  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindUser({
    ...pagination,
    count: true,
  });

  const columns = useMemo(() => {
    return [
      {
        key: "name",
        name: "Nama",
        renderCell: ClinicUsersNameCell,
      },
      {
        key: "role",
        name: "Role",
        renderCell: ClinicUsersRoleCell,
      },
      {
        key: "status",
        name: "Status",
        renderCell: ClinicUsersStatusCell,
      },
      {
        key: "action",
        name: "Action",
        renderCell: ClinicUsersActionsCell,
      },
    ];
  }, []);

  return (
    <ClinicCard className="mt-6">
      <UsersTable<UserEntity>
        columns={columns}
        isLoading={isLoading}
        onPaginationChange={(currentPagination) => {
          setPagination(currentPagination);
        }}
        rows={data?.data ?? []}
        totalRows={data?.count}
      />
    </ClinicCard>
  );
}
