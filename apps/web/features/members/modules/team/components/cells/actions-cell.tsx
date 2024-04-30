import { LogIn, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Cell } from "@/components/shared/table/cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ClinicEntity } from "@/services/clinic/types/entity";
import type { FormatterCellProps } from "@/types";
import { getWhatsappUrl } from "@/utils";

export function MembersTeamsActionsCell({
  row,
}: FormatterCellProps): JSX.Element {
  const typedRow = row as ClinicEntity;

  return (
    <Cell className="gap-2">
      <TooltipProvider>
        <Tooltip>
          <Link href={getWhatsappUrl(typedRow.phone)}>
            <TooltipTrigger className="h-min p-2">
              <MessageCircle className="text-green-500" size={20} />
            </TooltipTrigger>
          </Link>
          <TooltipContent>Kontak WA</TooltipContent>
        </Tooltip>
        <Tooltip>
          <Link href={`/clinic/${typedRow.id}`}>
            <TooltipTrigger className="h-min p-2">
              <LogIn className="text-primary" size={20} />
            </TooltipTrigger>
          </Link>
          <TooltipContent>Masuk Klinik</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Cell>
  );
}
