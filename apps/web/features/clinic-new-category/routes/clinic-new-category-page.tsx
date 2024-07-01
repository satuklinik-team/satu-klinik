"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

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
    [clinicId, mutateAsync, queryClient, router, toast]
  );

  return (
    <div className="flex flex-col gap-4">
      <ClinicCard title="Add New Category">
        <AddMedicineCategoryForm onSubmit={onSubmit} />
      </ClinicCard>
    </div>
  );
}
