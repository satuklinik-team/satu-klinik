"use client";

import { UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ClinicUsersTable } from "../components/table";

export function ClinicUsersPage(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <TooltipProvider>
        <Tooltip>
          <Link href={`${pathname}/new`}>
            <TooltipTrigger className="h-fit px-3.5 py-3 border border-sky-500 rounded-lg">
              <UserPlus className="text-foreground" size={20} />
            </TooltipTrigger>
          </Link>
          <TooltipContent>Tambah User Baru</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ClinicUsersTable />
    </div>
  );
}
