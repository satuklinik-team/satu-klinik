import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Cell } from "@/components/shared/table/cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { UserEntity } from "@/services/user/types/entity";
import { getWhatsappUrl } from "@/utils";

export function ClinicUsersActionsCell(row: UserEntity): JSX.Element {
  return (
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
  );
}
