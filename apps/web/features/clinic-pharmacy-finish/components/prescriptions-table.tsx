"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useCompletePharmacyTask } from "@/services/pharmacy-task/hooks/use-complete-pharmacy-task";
import { useGetPharmacyTask } from "@/services/pharmacy-task/hooks/use-get-pharmacy-task";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";
import { TasksStatusQueryKeyFactory } from "@/services/tasks-status/utils/query-key.factory";

export function ClinicPharmacyFinishPrescriptionsTable():
  | JSX.Element
  | undefined {
  const { toast } = useToast();
  const router = useRouter();
  const { pharmacyId, clinicId } = useParams();

  const queryClient = useQueryClient();

  const { data: pharmacyTaskData, isFetching } = useGetPharmacyTask(
    pharmacyId as string,
  );

  const { mutateAsync: completePharmacyTask, isPending } =
    useCompletePharmacyTask(pharmacyId as string);

  const onCompletePharmacyTask = useCallback(async () => {
    if (!pharmacyTaskData) return;

    await completePharmacyTask({
      boughtPrescriptionsId: pharmacyTaskData.prescriptions.map((item) =>
        Number(item.id),
      ),
    });

    toast({ title: "Berhasil Menyelesaikan Tugas!", variant: "success" });

    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: new TasksStatusQueryKeyFactory().notifications(),
      }),
      queryClient.invalidateQueries({
        queryKey: new TasksStatusQueryKeyFactory().list({ type: "PHARMACY" }),
      }),
    ]);

    router.push(`/clinic/${clinicId as string}/pharmacy`);
  }, [
    clinicId,
    completePharmacyTask,
    pharmacyTaskData,
    queryClient,
    router,
    toast,
  ]);

  if (!pharmacyTaskData) return;

  return (
    <ClinicCard title="Prescription">
      <div className="flex flex-col gap-2">
        <Button disabled={isPending} onClick={onCompletePharmacyTask}>
          Selesai
        </Button>
        <BaseTable<PrescriptionEntity>
          columns={[
            {
              key: "name",
              name: "Nama",
              renderCell: (row) => (
                <Cell>
                  {/* <p>{row.medicine?.title}</p> */}
                  <p>
                    Total: <b>{row.totalQuantity} pcs</b>
                  </p>
                </Cell>
              ),
            },
            {
              key: "procedure",
              name: "How to Use",
              renderCell: (row) => {
                return (
                  <Cell className="gap-3">
                    <Badge className="text-xs">
                      {row.frequency} x {row.doseQuantity}
                    </Badge>
                  </Cell>
                );
              },
            },
          ]}
          isLoading={isFetching}
          rows={pharmacyTaskData.prescriptions}
        />
      </div>
    </ClinicCard>
  );
}
