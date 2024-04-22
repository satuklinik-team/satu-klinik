"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Inventories
        </h1>
        <p className="text-muted-foreground">Manage inventories</p>
      </div>

      <div className="flex flex-row justify-between items-center mb-2">
        <div className="hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex flex-row items-center flex-wrap gap-2">
          <Badge>All</Badge>
          <Badge variant="outline">Main Service</Badge>
          <Badge variant="outline">Medicine</Badge>
          <Badge variant="outline">Other Service</Badge>
          <Badge variant="outline">Supplement</Badge>
        </div>

        <Select>
          <SelectTrigger className="flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden w-[180px]">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pilih kategori</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="mainService">Main Service</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="otherService">Other Service</SelectItem>
              <SelectItem value="supplement">Supplement</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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
