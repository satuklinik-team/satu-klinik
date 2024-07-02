"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFindUser } from "@/services/user/hooks/use-find-user";
import type { UserEntity } from "@/services/user/types/entity";
import type { Pagination } from "@/types";
import { getWhatsappUrl } from "@/utils";

export function ClinicDashboardUsersTable(): JSX.Element {
  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindUser({
    ...pagination,
    count: true,
  });

  return (
    <BaseTable<UserEntity>
      columns={[
        {
          key: "name",
          name: "Nama",
          renderCell: (row) => (
            <Cell className="gap-3">
              <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
                <p>AD</p>
              </div>
              <div>
                <p className="font-bold">{row.fullname}</p>
                <p className="font-normal text-muted-foreground">{row.email}</p>
              </div>
            </Cell>
          ),
        },
        {
          key: "action",
          name: "Action",
          renderCell: (row) => (
            <Cell className="gap-2">
              <TooltipProvider>
                <Tooltip>
                  <Link href={getWhatsappUrl(row.phone)}>
                    <TooltipTrigger className="h-min p-2">
                      <Image
                        alt="whatsapp icon"
                        height={20}
                        src="/icons/whatsapp-icon.svg"
                        width={20}
                      />
                    </TooltipTrigger>
                  </Link>
                  <TooltipContent>Kontak WA</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Cell>
          ),
        },
      ]}
      isLoading={isLoading}
      onPaginationChange={(currentPagination) => {
        setPagination(currentPagination);
      }}
      rows={data?.data ?? []}
      totalRows={data?.count}
    />
  );
}
