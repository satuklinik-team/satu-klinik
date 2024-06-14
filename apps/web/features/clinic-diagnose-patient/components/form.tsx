"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { DiagnosePatientForm } from "@/features/clinic-medical-record-detail/components/form";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";
import { useCreatePatientAssessment } from "@/services/patient-assessment/hooks/use-create-patient-assessment";
import type {
  CreatePatientAssessmentDto,
  CreatePatientAssessmentSchema,
} from "@/services/patient-assessment/types/dto";
import { createPatientAssessmentSchema } from "@/services/patient-assessment/types/dto";
import { PharmacyTaskQueryKeyFactory } from "@/services/pharmacy-task/utils/query-key.factory";
import { TasksStatusQueryKeyFactory } from "@/services/tasks-status/utils/query-key.factory";
import type { RouteParams } from "@/types";

export function ClinicDiagnosePatientForm(): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { clinicId, mrId } = useParams<RouteParams>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");

  const { data: patientData } = useGetPatient(String(patientId));

  const form = useForm<CreatePatientAssessmentSchema>({
    resolver: zodResolver(createPatientAssessmentSchema),
    defaultValues: { mrid: mrId, prescriptions: [] },
  });

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
    [clinicId, mrId, mutateAsync, queryClient, router, toast],
  );

  useEffect(() => {
    const defaultSubjective = patientData?.mr[0]?.vitalSign[0].pain;

    if (defaultSubjective) {
      form.setValue("subjective", defaultSubjective);
    }
  }, [form, patientData?.mr]);

  return <DiagnosePatientForm isLoading={isPending} onSubmit={onSubmit} />;
}
