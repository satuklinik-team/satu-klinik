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
import { Form as AddPatientForm } from "@/lezzform/_generated/addpatientwithoutvitalform";
import { useCreatePatient } from "@/services/patient/hooks/use-create-patient";
import type { CreatePatientDto } from "@/services/patient/types/dto";
import { PatientQueryKeyFactory } from "@/services/patient/utils/query-key.factory";

export function ClinicNewPatientPage(): JSX.Element {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const { clinicId } = useParams();

  const { mutateAsync } = useCreatePatient();

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      const formattedData: CreatePatientDto = {
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
      toast({ title: "Berhasil Membuat Pasien!", variant: "success" });
      router.push(`/clinic/${clinicId as string}/patient`);
    },
    [clinicId, mutateAsync, queryClient, router, toast],
  );

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname.replace("/new", "")}>
              Data Pasien
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Tambah Pasien</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Add New Patient
        </h1>
        <p className="text-muted-foreground">detail patient information</p>
      </div>

      <ClinicCard title="Add New Patient">
        <AddPatientForm
          defaultValues={{ nik: "0000000000000000" }}
          onSubmit={onSubmit}
        />
      </ClinicCard>
    </div>
  );
}
