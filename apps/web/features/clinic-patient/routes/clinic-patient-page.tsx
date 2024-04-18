"use client";

import { Download, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClinicCard } from "@/features/clinic/components/ui/card";

export function ClinicPatientPage(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Dashbor</h1>
        <p className="text-muted-foreground">Atur semua data pasien</p>
      </div>

      <ClinicCard>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <TooltipProvider>
              <Tooltip>
                <Link href={`${pathname}/new`}>
                  <TooltipTrigger className="h-fit px-3.5 py-3 border border-sky-500 rounded-lg">
                    <UserPlus className="text-foreground" size={20} />
                  </TooltipTrigger>
                </Link>
                <TooltipContent>Tambah Pasien Baru</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className="h-fit px-3.5 py-3 border border-green-500 rounded-lg">
                  <Download className="text-foreground" size={20} />
                </TooltipTrigger>
                <TooltipContent>Unduh Data Pasien</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            className="py-2 h-fit"
            placeholder="Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal"
          />
        </div>
      </ClinicCard>
    </div>
  );
}
