"use client";

import { MessageCircle } from "lucide-react";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { UserEntity } from "@/services/user/types/entity";
import { redirectToWhatsapp } from "@/utils";

export function ClinicDashboardUsersTable(): JSX.Element {
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
                <p className="font-bold">{row.fullName}</p>
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
              </TooltipProvider>
            </Cell>
          ),
        },
      ]}
      // pagination={{
      //   skip: 0,
      //   limit: 20,
      // }}
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
      // totalRows={80}
    />
  );
}