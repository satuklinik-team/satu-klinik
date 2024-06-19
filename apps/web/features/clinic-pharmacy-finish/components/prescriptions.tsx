"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useCompletePharmacyTask } from "@/services/pharmacy-task/hooks/use-complete-pharmacy-task";
import { useGetPharmacyTask } from "@/services/pharmacy-task/hooks/use-get-pharmacy-task";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";
import { TasksStatusQueryKeyFactory } from "@/services/tasks-status/utils/query-key.factory";

import { PharmacyPrescriptionTable } from "./prescription/table";
import { useDisclose } from "@/hooks/use-disclose";
import { PrescriptionVerifyModal } from "./prescription/verify-modal";

export function ClinicPharmacyPrescriptions(): JSX.Element | undefined {
  const { toast } = useToast();
  const router = useRouter();
  const { pharmacyId, clinicId } = useParams();

  const { isOpen: isVerifyOpen, setIsOpen: setIsVerifyOpen } = useDisclose();

  const queryClient = useQueryClient();

  const { data: pharmacyTaskData, isFetching } = useGetPharmacyTask(
    pharmacyId as string,
  );

  const [selectedIds, setSelectedIds] = useState<
    Required<PrescriptionEntity>["id"][]
  >([]);

  const { mutateAsync: completePharmacyTask, isPending } =
    useCompletePharmacyTask(pharmacyId as string);

  const onCompletePharmacyTask = useCallback(async () => {
    if (!pharmacyTaskData) return;

    await completePharmacyTask({
      boughtPrescriptionsId: selectedIds,
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
    selectedIds,
    toast,
  ]);

  if (!pharmacyTaskData || isFetching) return;

  return (
    <>
      {Boolean(pharmacyTaskData.newPrescriptions.length) && (
        <ClinicCard title="Prescription">
          <div className="flex flex-col gap-2">
            <PharmacyPrescriptionTable
              onSelectChange={setSelectedIds}
              rows={pharmacyTaskData.newPrescriptions}
              selectedIds={selectedIds}
            />

            <PrescriptionVerifyModal
              onConfirm={onCompletePharmacyTask}
              onOpenChange={setIsVerifyOpen}
              open={isVerifyOpen}
              isLoading={isPending}
            />
            {/* 
            <Button disabled={isPending} onClick={onCompletePharmacyTask}>
              Selesai
            </Button> */}
          </div>
        </ClinicCard>
      )}
      {Boolean(pharmacyTaskData.cancelledPrescriptions.length) && (
        <ClinicCard className="ml-2" title="Cancelled Prescription">
          <div className="flex flex-col gap-2">
            <PharmacyPrescriptionTable
              readOnly
              rows={pharmacyTaskData.cancelledPrescriptions}
            />
          </div>
        </ClinicCard>
      )}
    </>
  );
}
