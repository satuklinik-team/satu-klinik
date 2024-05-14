"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { BaseTable as PatientTable } from "@/components/shared/table/base-table";
import { useFindPatient } from "@/services/patient/hooks/use-find-patient";
import type { PatientEntity } from "@/services/patient/types/entity";
import type { Pagination } from "@/types";

import { ClinicPatientActionsCell } from "./cell/actions-cell";
import { ClinicPatientNameCell } from "./cell/name-cell";

export function ClinicPatientTable(): JSX.Element {
  const { clinicId } = useParams();

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindPatient({
    ...pagination,
    clinicsId: clinicId,
    type: "ENTRY",
    count: true,
  });

  const columns = useMemo(() => {
    return [
      {
        key: "name",
        name: "Nama",
        renderCell: ClinicPatientNameCell,
      },
      {
        key: "action",
        name: "Action",
        renderCell: ClinicPatientActionsCell,
      },
    ];
  }, []);

  return (
    <PatientTable<PatientEntity>
      columns={columns}
      isLoading={isLoading}
      onPaginationChange={(currentPagination) => {
        setPagination(currentPagination);
      }}
      pagination={pagination}
      rows={data?.data ?? []}
      totalRows={data?.count}
    />
  );
}
