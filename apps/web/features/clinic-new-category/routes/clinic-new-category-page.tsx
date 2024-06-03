"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
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
import { Form as AddMedicineCategoryForm } from "@/lezzform/_generated/addmedicinecategoryform";
import { useCreateMedicineCategory } from "@/services/medicine-category/hooks/use-create-medicine-category";
import type { CreateMedicineCategoryDto } from "@/services/medicine-category/types/dto";
import { MedicineCategoryQueryKeyFactory } from "@/services/medicine-category/utils/query-key.factory";
import { TasksStatusQueryKeyFactory } from "@/services/tasks-status/utils/query-key.factory";

export function ClinicNewCategoryPage(): JSX.Element {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { clinicId } = useParams();
  const { toast } = useToast();

  const { mutateAsync } = useCreateMedicineCategory();

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      const formattedData: CreateMedicineCategoryDto = {
        name: dto.name as string,
      };

      await mutateAsync(formattedData);
      await queryClient.invalidateQueries({
        queryKey: new MedicineCategoryQueryKeyFactory().lists(),
      });
      await queryClient.invalidateQueries({
        queryKey: new TasksStatusQueryKeyFactory().notifications(),
      });
      toast({ title: "Berhasil Membuat Kategori!", variant: "success" });
      router.push(`/clinic/${clinicId as string}/categories`);
    },
    [clinicId, mutateAsync, queryClient, router, toast],
  );

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname.replace("/new", "")}>
              Data Kategori
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Tambah Kategori</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Add New Category
        </h1>
        <p className="text-muted-foreground">detail category information</p>
      </div>

      <ClinicCard title="Add New Category">
        <AddMedicineCategoryForm onSubmit={onSubmit} />
      </ClinicCard>
    </div>
  );
}
