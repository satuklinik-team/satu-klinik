"use client";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback } from "react";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { QueueCard } from "@/features/clinic-patient/components/shared/queue-card";
import { Form as AddPatientForm } from "@/lezzform/_generated/addpatientform";
import { useCreatePatient } from "@/services/patient/hooks/use-create-patient";
import type { CreatePatientDto } from "@/services/patient/types/dto";
import { PatientQueryKeyFactory } from "@/services/patient/utils/query-key.factory";
import { useCreatePatientVitalSign } from "@/services/patient-vital-sign/hooks/use-create-patient";
import type { CreatePatientVitalSignDto } from "@/services/patient-vital-sign/types/dto";

export function ClinicRegisterPatientPage(): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: createPatient } = useCreatePatient();
  const { mutateAsync: createPatientVitalSign } = useCreatePatientVitalSign();

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      const formattedPatientData: CreatePatientDto = {
        nik: dto.nik as string,
        fullname: dto.fullname as string,
        address: dto.address as string,
        sex: dto.sex as string,
        blood: dto.blood as string,
        phone: dto.phone as string,
        birthAt: dayjs(dto.birthAt as string).format("YYYY-MM-DD"),
      };

      const { id } = await createPatient(formattedPatientData);

      const formattedVitalSignData: CreatePatientVitalSignDto = {
        height: dto.height as number,
        weight: dto.weight as number,
        allergic: dto.allergic as string,
        systole: dto.systole as number,
        diastole: dto.diastole as number,
        temperature: dto.temperature as number,
        respiration: dto.respiration as number,
        pulse: dto.pulse as number,
        pain: dto.pain as string,
        patientId: id,
      };

      await createPatientVitalSign(formattedVitalSignData);

      await queryClient.invalidateQueries({
        queryKey: new PatientQueryKeyFactory().lists(),
      });
      toast({ title: "Berhasil Membuat Pasien!", variant: "success" });
    },
    [createPatient, createPatientVitalSign, queryClient, toast]
  );

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Pendaftaran Pasien
        </h1>
        <p className="text-muted-foreground">Daftar baru atau member</p>
      </div>

      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-4">
        <div className="flex-1">
          <Input
            className="w-full mb-5 bg-white"
            placeholder="Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal"
          />
          <ClinicCard
            borderPosition="top"
            className="border-sky-500"
            title="Daftar Pasien"
          >
            <AddPatientForm onSubmit={onSubmit} />
          </ClinicCard>
        </div>
        <ClinicCard
          borderPosition="top"
          className="border-green-500 w-full h-full max-w-none sm:max-w-none md:max-w-none lg:max-w-md xl:max-w-md 2xl:max-w-md"
          title="Antrian Sekarang"
        >
          <QueueCard
            patient={{
              name: "Darren Christian",
              medicalRecordNumber: "2024.04.00012",
              address: "Keputih Tegal Timur",
            }}
            queue="A-4"
            status="Panggilan"
          />
        </ClinicCard>
      </div>
    </div>
  );
}
