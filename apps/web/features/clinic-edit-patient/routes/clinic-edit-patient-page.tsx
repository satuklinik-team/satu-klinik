"use client";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
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
import { Form as EditPatientForm } from "@/lezzform/_generated/addpatientwithoutvitalform";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";
import { useUpdatePatient } from "@/services/patient/hooks/use-update-patient";
import type { UpdatePatientDto } from "@/services/patient/types/dto";
import { PatientQueryKeyFactory } from "@/services/patient/utils/query-key.factory";

export function ClinicEditPatientPage(): JSX.Element | undefined {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
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
    [clinicId, mutateAsync, queryClient, router, toast],
  );

  if (!patientData) return;

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={pathname.replace(`/${patientId as string}/edit`, "")}
            >
              Data Pasien
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname.replace("/edit", "")}>
              Profil Pasien
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Edit Pasien</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Edit Patient&apos;s Profile
        </h1>
        <p className="text-muted-foreground">
          Fill the form below to edit this patient&apos;s profile
        </p>
      </div>

      <ClinicCard title="Edit Patient">
        <EditPatientForm
          defaultValues={{
            ...patientData,
            birthAt: new Date(patientData.birthAt),
          }}
          onSubmit={onSubmit}
        />
      </ClinicCard>
    </div>
  );
}
