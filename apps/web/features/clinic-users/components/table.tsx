"use client";

import { MessageCircle, Trash } from "lucide-react";
import Link from "next/link";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import type { UserEntity } from "@/services/user/types/entity";
import { redirectToWhatsapp } from "@/utils";

export function ClinicUsersTable(): JSX.Element {
  return (
    <ClinicCard className="mt-6">
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
                  <p className="font-bold">{row.fullName}</p>
                  <p className="font-normal text-muted-foreground">
                    {row.email}
                  </p>
                </div>
              </Cell>
            ),
          },
          {
            key: "role",
            name: "Role",
            renderCell: (row) => (
              <Cell>
                <p className="font-bold">{row.role}</p>
              </Cell>
            ),
          },
          {
            key: "status",
            name: "Status",
            renderCell: (row) => (
              <Cell className="gap-2">
                <Badge className="text-sm cursor-default">{row.status}</Badge>
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
                    <TooltipTrigger
                      className="h-min p-2"
                      onClick={() => {
                        redirectToWhatsapp(row.phoneNumber);
                      }}
                    >
                      <MessageCircle className="text-green-500" size={20} />
                    </TooltipTrigger>
                    <TooltipContent>Kontak WA</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <Link href={`/clinic/${row.id}`}>
                      <TooltipTrigger className="h-min p-2">
                        <Trash className="text-red-500" size={20} />
                      </TooltipTrigger>
                    </Link>
                    <TooltipContent>Hapus Pengguna</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Cell>
            ),
          },
        ]}
        pagination={{
          skip: 0,
          limit: 20,
        }}
        rows={[
          {
            id: "123121ee",
            fullName: "Admin Demo",
            email: "admin@demo.id",
            phoneNumber: "082228883006",
            role: "Admin",
            status: "Active",
          },
        ]}
        totalRows={80}
      />
    </ClinicCard>
  );
}
