import { Edit, Eye, MessageCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Cell } from "@/components/shared/table/cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PatientEntity } from "@/services/patient/types/entity";
import { getWhatsappUrl } from "@/utils";

export function ClinicPatientActionsCell(row: PatientEntity): JSX.Element {
  const { clinicId } = useParams();

  return (
    <Cell className="gap-2">
      <TooltipProvider>
        <Tooltip>
          <Link href={getWhatsappUrl(row.phone)}>
            <TooltipTrigger className="h-min p-2">
              <MessageCircle className="text-green-500" size={20} />
            </TooltipTrigger>
          </Link>
          <TooltipContent>Kontak WA</TooltipContent>
        </Tooltip>
        <Tooltip>
          <Link href={`/clinic/${clinicId as string}/patient/${row.id}`}>
            <TooltipTrigger className="h-min p-2">
              <Eye size={20} />
            </TooltipTrigger>
          </Link>
          <TooltipContent>Lihat Detail</TooltipContent>
        </Tooltip>
        <Tooltip>
          <Link href={`/clinic/${clinicId as string}/patient/${row.id}/edit`}>
            <TooltipTrigger className="h-min p-2">
              <Edit size={20} />
            </TooltipTrigger>
          </Link>
          <TooltipContent>Edit Pasien</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger className="h-min p-2">
            <Trash className="text-red-500" size={20} />
          </TooltipTrigger>
          <TooltipContent>Hapus Pasien</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Cell>
  );
}
