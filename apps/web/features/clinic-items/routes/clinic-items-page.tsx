"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useDeleteMedicine } from "@/services/medicine/hooks/use-delete-medicine";
import { useFindMedicineByCategory } from "@/services/medicine/hooks/use-find-medicine-by-category";
import { MedicineQueryKeyFactory } from "@/services/medicine/utils/query-key.factory";
import { useFindMedicineCategory } from "@/services/medicine-category/hooks/use-find-medicine-category";

import { ClinicItemCard } from "../components/shared/card";

export function ClinicItemsPage(): JSX.Element {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const [toBeDeletedId, setToBeDeletedId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { mutateAsync: deleteMedicine } = useDeleteMedicine(toBeDeletedId);
  const { data: medicineCategoryData } = useFindMedicineCategory();
  const { data: medicineByCategoryData } = useFindMedicineByCategory(
    selectedCategory === "All" ? "" : selectedCategory,
  );

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
          <Badge
            onClick={() => {
              setSelectedCategory("All");
            }}
            variant={selectedCategory === "All" ? "default" : "outline"}
          >
            All
          </Badge>
          {medicineCategoryData?.data.map((item) => (
            <Badge
              key={item.id}
              onClick={() => {
                setSelectedCategory(String(item.id));
              }}
              variant={
                String(item.id) === selectedCategory ? "default" : "outline"
              }
            >
              {item.name}
            </Badge>
          ))}
        </div>

        <Select
          onValueChange={(value) => {
            setSelectedCategory(value);
          }}
          value={selectedCategory}
        >
          <SelectTrigger className="flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden w-[180px]">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pilih kategori</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              {medicineCategoryData?.data.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.name}
                </SelectItem>
              ))}
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
        {medicineByCategoryData?.data.map((item) => (
          <ClinicItemCard
            key={item.kfaCode}
            {...item}
            onSelectDelete={() => {
              setToBeDeletedId(String(item.id));
            }}
          />
        ))}
      </div>

      <AlertDialog
        onOpenChange={(value) => {
          if (!value) setToBeDeletedId("");
        }}
        open={Boolean(toBeDeletedId)}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              medicine.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
              onClick={async () => {
                await deleteMedicine();
                await queryClient.invalidateQueries({
                  queryKey: new MedicineQueryKeyFactory().lists(),
                });
                setToBeDeletedId("");
              }}
              variant="ghost"
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
