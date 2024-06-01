"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ClinicCategoryTable } from "../components/table";

export function ClinicCategoriesPage(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Categories
        </h1>
        <p className="text-muted-foreground">Manage categories</p>
      </div>

      <div className="flex flex-row justify-start items-center mb-6">
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

      <ClinicCategoryTable />
    </div>
  );
}
