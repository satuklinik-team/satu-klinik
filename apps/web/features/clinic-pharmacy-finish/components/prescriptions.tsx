"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useDisclose } from "@/hooks/use-disclose";
import { useGetClinic } from "@/services/clinic/hooks/use-get-clinic";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";
import { useCompletePharmacyTask } from "@/services/pharmacy-task/hooks/use-complete-pharmacy-task";
import { useGetPharmacyTask } from "@/services/pharmacy-task/hooks/use-get-pharmacy-task";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";
import { TasksStatusQueryKeyFactory } from "@/services/tasks-status/utils/query-key.factory";

import { PrescriptionPrintReceipt } from "./prescription/print-receipt";
import { PharmacyPrescriptionTable } from "./prescription/table";
import { PrescriptionVerifyModal } from "./prescription/verify-modal";

export function ClinicPharmacyPrescriptions(): JSX.Element | undefined {
  const { toast } = useToast();
  const router = useRouter();
  const { pharmacyId, clinicId } = useParams();

  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");

  const { isOpen: isVerifyOpen, setIsOpen: setIsVerifyOpen } = useDisclose();

  const queryClient = useQueryClient();

  const { data: pharmacyTaskData, isFetching } = useGetPharmacyTask(
    pharmacyId as string
  );
  const { data: patientData, isFetching: isPatientFetching } = useGetPatient(
    String(patientId)
  );
  const { data: clinicData, isFetching: isClinicDataFetching } = useGetClinic(
    String(clinicId)
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

  const selectedPrescriptions = useMemo(() => {
    if (!pharmacyTaskData?.newPrescriptions) return [];

    return pharmacyTaskData.newPrescriptions.filter((item) =>
      selectedIds.includes(item.id)
    );
  }, [pharmacyTaskData?.newPrescriptions, selectedIds]);

  useEffect(() => {
    if (!pharmacyTaskData?.newPrescriptions) return;

    setSelectedIds(pharmacyTaskData.newPrescriptions.map((item) => item.id));
  }, [pharmacyTaskData?.newPrescriptions]);

  const isLoading =
    !patientData ||
    !pharmacyTaskData ||
    isFetching ||
    isPatientFetching ||
    isClinicDataFetching ||
    !clinicData;

  if (isLoading) return;

  return (
    <>
      {Boolean(pharmacyTaskData.newPrescriptions.length) && (
        <ClinicCard title="Prescription">
          <div className="flex flex-col gap-2 text-base font-normal">
            <PharmacyPrescriptionTable
              onSelectChange={setSelectedIds}
              rows={pharmacyTaskData.newPrescriptions}
              selectedIds={selectedIds}
            />

            <PrescriptionVerifyModal
              isLoading={isPending}
              onConfirm={onCompletePharmacyTask}
              onOpenChange={setIsVerifyOpen}
              open={isVerifyOpen}
            />

            <PrescriptionPrintReceipt
              clinic={clinicData}
              patient={patientData}
              prescriptions={selectedPrescriptions}
            />
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
