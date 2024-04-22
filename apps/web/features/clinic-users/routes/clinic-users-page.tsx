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

export function ClinicUsersPage(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Users
        </h1>
        <p className="text-muted-foreground">Manage user</p>
      </div>

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
    </div>
  );
}
