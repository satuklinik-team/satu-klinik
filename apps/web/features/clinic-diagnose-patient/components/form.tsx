"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";
import { DiagnosePatientForm } from "@/features/clinic-medical-record-detail/components/form";
import { useCreatePatientAssessment } from "@/services/patient-assessment/hooks/use-create-patient-assessment";
import type {
  CreatePatientAssessmentDto,
  CreatePatientAssessmentSchema,
} from "@/services/patient-assessment/types/dto";
import { PharmacyTaskQueryKeyFactory } from "@/services/pharmacy-task/utils/query-key.factory";
import { TasksStatusQueryKeyFactory } from "@/services/tasks-status/utils/query-key.factory";
import type { RouteParams } from "@/types";

import { useDiagnosePatientStore } from "../stores/use-diagnose-patient-store";

export function ClinicDiagnosePatientForm(): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { clinicId, mrId } = useParams<RouteParams>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");

  const { getDiagnose } = useDiagnosePatientStore();

  const { mutateAsync, isPending } = useCreatePatientAssessment();

  const onSubmit = useCallback(
    async (data: CreatePatientAssessmentDto) => {
      await mutateAsync({ ...data, mrid: mrId });

      toast({ title: "Berhasil Membuat Diagnosa!", variant: "success" });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: new PharmacyTaskQueryKeyFactory().lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: new TasksStatusQueryKeyFactory().notifications(),
        }),
        queryClient.invalidateQueries({
          queryKey: new TasksStatusQueryKeyFactory().list({ type: "DOCTOR" }),
        }),
      ]);

      router.push(`/clinic/${clinicId}/doctor`);
    },
    [clinicId, mrId, mutateAsync, queryClient, router, toast]
  );

  const defaultValues = getDiagnose({
    mrId,
    patientId: patientId!,
  }) as CreatePatientAssessmentSchema;

  return (
    <DiagnosePatientForm
      defaultValues={defaultValues}
      isLoading={isPending}
      onSubmit={onSubmit}
      // onValuesChange={(values) => {
      //   setDiagnose({ mrId, patientId: patientId! }, values);
      // }}
    />
  );
}
