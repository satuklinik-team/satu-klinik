"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ClinicItemsPage(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Inventories</h1>
        <p className="text-muted-foreground">Manage inventories</p>
      </div>

      <div className="flex flex-row justify-between items-center mb-2">
        <div className="flex flex-row items-center gap-2">
          <Badge>All</Badge>
          <Badge variant="outline">Main Service</Badge>
          <Badge variant="outline">Medicine</Badge>
          <Badge variant="outline">Other Service</Badge>
          <Badge variant="outline">Supplement</Badge>
        </div>

        <TooltipProvider>
          <Tooltip>
            <Link href={`${pathname}/new`}>
              <TooltipTrigger className="h-fit px-3.5 py-3 border border-primary rounded-lg">
                <Plus className="text-primary" size={20} />
              </TooltipTrigger>
            </Link>
            <TooltipContent>Tambah Item Baru</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
