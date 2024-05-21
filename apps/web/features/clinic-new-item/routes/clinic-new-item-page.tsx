"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { Form as AddItemForm } from "@/lezzform/_generated/additemform";
import { useCreateMedicineCategory } from "@/services/medicine-category/hooks/use-create-medicine-category";
import type { CreateMedicineCategoryDto } from "@/services/medicine-category/types/dto";
import { MedicineCategoryQueryKeyFactory } from "@/services/medicine-category/utils/query-key.factory";

export function ClinicNewItemPage(): JSX.Element {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const { mutateAsync } = useCreateMedicineCategory();

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      console.log({ dto });
      const formattedData: CreateMedicineCategoryDto = {};

      await mutateAsync(formattedData);
      await queryClient.invalidateQueries({
        queryKey: new MedicineCategoryQueryKeyFactory().lists(),
      });
      toast({ title: "Berhasil Membuat User Baru!", variant: "success" });
    },
    [mutateAsync, queryClient, toast],
  );
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname.replace("/new", "")}>
              Data Inventori
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Tambah Item</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Add New Item
        </h1>
        <p className="text-muted-foreground">
          Fill the form below to add new item
        </p>
      </div>

      <ClinicCard title="Add New Item">
        <AddItemForm onSubmit={onSubmit} />
      </ClinicCard>
    </div>
  );
}
