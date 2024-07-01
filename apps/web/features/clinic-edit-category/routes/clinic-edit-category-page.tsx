"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { Form as EditMedicineCategoryForm } from "@/lezzform/_generated/addmedicinecategoryform";
import { useGetMedicineCategory } from "@/services/medicine-category/hooks/use-get-medicine-category";
import { useUpdateMedicineCategory } from "@/services/medicine-category/hooks/use-update-medicine-category";
import type { UpdateMedicineCategoryDto } from "@/services/medicine-category/types/dto";
import { MedicineCategoryQueryKeyFactory } from "@/services/medicine-category/utils/query-key.factory";

export function ClinicEditCategoryPage(): JSX.Element | undefined {
  const { toast } = useToast();
  const router = useRouter();
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
    [clinicId, mutateAsync, queryClient, router, toast]
  );

  const { data: medicineCategoryData } = useGetMedicineCategory(
    categoryId as string
  );

  if (!medicineCategoryData) return;

  return (
    <div className="flex flex-col gap-4">
      <ClinicCard title="Edit Item">
        <EditMedicineCategoryForm
          defaultValues={{ name: medicineCategoryData.name }}
          onSubmit={onSubmit}
        />
      </ClinicCard>
    </div>
  );
}
