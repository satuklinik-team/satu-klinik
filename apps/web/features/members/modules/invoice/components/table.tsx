"use client";

import { Download } from "lucide-react";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MemberSection } from "@/features/members/components/shared/section";
import type { InvoiceEntity } from "@/services/invoice/types/entity";

export function MembersInvoicesTable(): JSX.Element {
  return (
    <MemberSection>
      <BaseTable<InvoiceEntity>
        columns={[
          {
            key: "invoiceNumber",
            name: "Nomor Invoice",
            renderCell: (row) => (
              <Cell>
                <p>{row.invoiceNumber}</p>
              </Cell>
            ),
          },
          {
            key: "amount",
            name: "Jumlah",
            renderCell: (row) => (
              <Cell>
                <p className="font-semibold">{row.amount}</p>
              </Cell>
            ),
          },
          {
            key: "status",
            name: "Status",
            renderCell: (row) => (
              <Cell>
                <Badge className="text-sm cursor-default">{row.status}</Badge>
              </Cell>
            ),
          },
          {
            key: "date",
            name: "Tanggal",
            renderCell: (row) => (
              <Cell>
                <p>{row.updatedAt}</p>
              </Cell>
            ),
          },
          {
            key: "download",
            name: "",
            renderCell: () => (
              <Cell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="h-min p-2 rounded-lg">
                      <Download size={18} />
                    </TooltipTrigger>
                    <TooltipContent>Unduh Invoice</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Cell>
            ),
          },
        ]}
        rows={[
          {
            id: "123121ee",
            invoiceNumber: "a4780",
            amount: 320000,
            status: "Init",
            updatedAt: "2024-03-27",
          },
        ]}
      />
    </MemberSection>
  );
}
