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

import { ClinicItemCard } from "../components/shared/card";

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

      <div className="flex flex-row justify-between items-center mb-6">
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

      <div className="grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        <ClinicItemCard
          category=""
          discount={50}
          id="1"
          imageUrl=""
          price={100000}
          quantity={4}
          title="My Item 1"
        />
        <ClinicItemCard
          category=""
          discount={20}
          id="2"
          imageUrl=""
          price={200000}
          quantity={4}
          title="My Item 2"
        />
        <ClinicItemCard
          category=""
          discount={40}
          id="3"
          imageUrl=""
          price={1000000}
          quantity={4}
          title="My Item 3"
        />
        <ClinicItemCard
          category=""
          discount={10}
          id="4"
          imageUrl=""
          price={200000}
          quantity={4}
          title="My Item 4"
        />
        <ClinicItemCard
          category=""
          discount={70}
          id="5"
          imageUrl=""
          price={150000}
          quantity={4}
          title="My Item 5"
        />
        <ClinicItemCard
          category=""
          discount={50}
          id="6"
          imageUrl=""
          price={100000}
          quantity={4}
          title="My Item 6"
        />
      </div>
    </div>
  );
}
