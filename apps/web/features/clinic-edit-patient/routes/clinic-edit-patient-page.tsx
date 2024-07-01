"use client";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { Form as EditPatientForm } from "@/lezzform/_generated/addpatientwithoutvitalform";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";
import { useUpdatePatient } from "@/services/patient/hooks/use-update-patient";
import type { UpdatePatientDto } from "@/services/patient/types/dto";
import { PatientQueryKeyFactory } from "@/services/patient/utils/query-key.factory";

export function ClinicEditPatientPage(): JSX.Element | undefined {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const { clinicId, patientId } = useParams();

  const { data: patientData } = useGetPatient(patientId as string);
  const { mutateAsync } = useUpdatePatient(patientId as string);

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      const formattedData: UpdatePatientDto = {
        nik: dto.nik as string,
        fullname: dto.fullname as string,
        address: dto.address as string,
        sex: dto.sex as string,
        blood: dto.blood as string,
        phone: dto.phone as string,
        birthAt: dayjs(dto.birthAt as string).format("YYYY-MM-DD"),
      };

      await mutateAsync(formattedData);
      await queryClient.invalidateQueries({
        queryKey: new PatientQueryKeyFactory().lists(),
      });
      toast({ title: "Berhasil Memperbarui Pasien!", variant: "success" });
      router.push(`/clinic/${clinicId as string}/patient`);
    },
    [clinicId, mutateAsync, queryClient, router, toast]
  );

  if (!patientData) return;

  return (
    <div className="flex flex-col gap-4">
      <ClinicCard title="Edit Patient">
        <EditPatientForm
          defaultValues={{
            ...patientData,
            birthAt: new Date(patientData.birthAt),
            medicalNumber: patientData.norm,
          }}
          onSubmit={onSubmit}
        />
      </ClinicCard>
    </div>
  );
}
