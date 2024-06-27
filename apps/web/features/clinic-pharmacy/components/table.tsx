"use client";

import dayjs, { extend } from "dayjs";
import duration from "dayjs/plugin/duration";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { BaseTable as PharmacyTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFindPharmacyTask } from "@/services/pharmacy-task/hooks/use-find-pharmacy-task";
import type { PharmacyTaskEntity } from "@/services/pharmacy-task/types/entity";
import type { Pagination } from "@/types";

extend(duration);

export function ClinicPharmacyTable(): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindPharmacyTask(pagination);

  const columns = useMemo(() => {
    return [
      {
        key: "taskId",
        name: "Nomor Antrian",
        renderCell: (row: PharmacyTaskEntity) => <Cell>{row.id}</Cell>,
      },
      {
        key: "name",
        name: "Name",
        renderCell: (row: PharmacyTaskEntity) => (
          <Cell className="flex flex-col items-start gap-1 text-xs">
            <p className="font-semibold text-sm">
              {row.patient.fullname} -{" "}
              {dayjs().diff(dayjs(row.patient.birthAt), "year")}
            </p>
            <p>{row.patient.norm}</p>
            <p>{row.patient.phone}</p>
            <p>{row.patient.address}</p>
          </Cell>
        ),
      },
      {
        key: "status",
        name: "Status",
        renderCell: (row: PharmacyTaskEntity) => (
          <Cell>
            <Badge className="text-sm cursor-default">{row.status}</Badge>
          </Cell>
        ),
      },
      {
        key: "action",
        name: "Action",
        renderCell: (row: PharmacyTaskEntity) => (
          <Cell>
            <Button
              className="w-min h-min p-1.5 rounded-full"
              onClick={() => {
                router.push(
                  `${pathname}/${row.id}?patientId=${row.patient.id}`
                );
              }}
              variant="ghost"
            >
              <SearchIcon />
            </Button>
          </Cell>
        ),
      },
    ];
  }, [pathname, router]);

  return (
    <PharmacyTable<PharmacyTaskEntity>
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
