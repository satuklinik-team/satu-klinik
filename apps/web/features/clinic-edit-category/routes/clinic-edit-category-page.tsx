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
import { Form as EditMedicineCategoryForm } from "@/lezzform/_generated/addmedicinecategoryform";
import { useUpdateMedicineCategory } from "@/services/medicine-category/hooks/use-update-medicine-category";
import type { UpdateMedicineCategoryDto } from "@/services/medicine-category/types/dto";
import { MedicineCategoryQueryKeyFactory } from "@/services/medicine-category/utils/query-key.factory";
// import { useGetMedicineCategory } from "@/services/medicine-category/hooks/use-get-medicine-category";
// import { useGetMedicine } from "@/services/medicine/hooks/use-get-medicine";

export function ClinicEditCategoryPage(): JSX.Element | undefined {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { categoryId, clinicId } = useParams();

  const queryClient = useQueryClient();

  const { mutateAsync } = useUpdateMedicineCategory(categoryId as string);

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      const formattedData: UpdateMedicineCategoryDto = {
        name: dto.name as string,
      };

      await mutateAsync(formattedData);
      await queryClient.invalidateQueries({
        queryKey: new MedicineCategoryQueryKeyFactory().lists(),
      });
      toast({ title: "Berhasil Memperbarui Kategori!", variant: "success" });
      router.push(`/clinic/${clinicId as string}/categories`);
    },
    [clinicId, mutateAsync, queryClient, router, toast],
  );

  //   const { data: medicineCategoryData } = useGetMedicineCategory(
  //     categoryId as string
  //   );

  //   if (!medicineCategoryData) return;

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={pathname.replace(`/${categoryId as string}/edit`, "")}
            >
              Data Kategori
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Edit Kategori</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Edit Kategori
        </h1>
        <p className="text-muted-foreground">
          Fill the form below to edit this category
        </p>
      </div>

      <ClinicCard title="Edit Item">
        <EditMedicineCategoryForm onSubmit={onSubmit} />
      </ClinicCard>
    </div>
  );
}
