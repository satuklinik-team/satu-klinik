"use client";

import { Download } from "lucide-react";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MemberSection } from "@/features/members/components/shared/section";
import type { InvoiceEntity } from "@/services/invoice/types/entity";

export function MembersInvoicesTable(): JSX.Element {
  return (
    <MemberSection>
      <BaseTable<InvoiceEntity>
        columns={[
          {
            key: "invoiceNumber",
            name: "Invoice Number",
            renderCell: (row) => (
              <Cell>
                <p>{row.invoiceNumber}</p>
              </Cell>
            ),
          },
          {
            key: "amount",
            name: "Amount",
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
                <Badge className="text-sm cursor-pointer">{row.status}</Badge>
              </Cell>
            ),
          },
          {
            key: "date",
            name: "Date",
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
                <Button className="h-min p-2" variant="ghost">
                  <Download size={18} />
                </Button>
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
