"use client";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { QueueCard } from "@/features/clinic-patient/components/shared/queue-card";
import { Form as AddPatientForm } from "@/lezzform/_generated/addpatientform";
import type { CreatePatientDto } from "@/services/patient/types/dto";
import type { PatientEntity } from "@/services/patient/types/entity";
import { useCreateNewPatientVitalSign } from "@/services/patient-vital-sign/hooks/use-create-new-patient";
import { useCreatePatientVitalSign } from "@/services/patient-vital-sign/hooks/use-create-patient";
import { useFindPatientQueue } from "@/services/patient-vital-sign/hooks/use-find-patient-queue";
import type { CreateNewPatientVitalSignDto } from "@/services/patient-vital-sign/types/dto";
import { PatientVitalSignQueryKeyFactory } from "@/services/patient-vital-sign/utils/query-key.factory";
import { TasksStatusQueryKeyFactory } from "@/services/tasks-status/utils/query-key.factory";

import { PatientSearch } from "../components/patient-search";

export function ClinicRegisterPatientPage(): JSX.Element {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const [selectedPatient, setSelectedPatient] = useState<PatientEntity>();

  const defaultPatient = useMemo(() => {
    const defaultValues = {
      systole: 0,
      diastole: 0,
      pulse: 0,
      respiration: 0,
      temperature: 0,
      nik: "0000000000000000",
    };

    if (!selectedPatient) return defaultValues;

    const latestMedicalRecord =
      selectedPatient.mr[selectedPatient.mr.length - 1];

    let latestVitalSign;
    if (selectedPatient.mr.length) {
      latestVitalSign =
        latestMedicalRecord.vitalSign[latestMedicalRecord.vitalSign.length - 1];
    }

    return {
      ...defaultValues,
      nik: !selectedPatient.nik ? defaultValues.nik : selectedPatient.nik,
      fullname: selectedPatient.fullname,
      address: selectedPatient.address,
      sex: selectedPatient.sex,
      blood: selectedPatient.blood,
      phone: selectedPatient.phone,
      birthAt: new Date(selectedPatient.birthAt),
      deletedAt: undefined,
      id: undefined,
      patient_medical_recordsId: undefined,
      sugar: undefined,
      cholesterol: undefined,
      saturation: undefined,
      height: latestVitalSign?.height ?? 0,
      weight: latestVitalSign?.weight ?? 0,
      allergic: latestVitalSign?.allergic ?? "",
      norm: selectedPatient.norm,
    };
  }, [selectedPatient]);

  const { data: patientQueueData } = useFindPatientQueue({
    skip: 0,
    limit: 20,
    count: true,
  });

  const { mutateAsync: createPatientVitalSign } = useCreatePatientVitalSign();
  const { mutateAsync: createNewPatientVitalSign } =
    useCreateNewPatientVitalSign();

  const onSubmit = useCallback(
    async (rawForm: object, dto: Record<string, unknown>) => {
      const form = rawForm as UseFormReturn<
        CreatePatientDto & CreateNewPatientVitalSignDto
      >;

      if (patientQueueData?.data && selectedPatient) {
        const findPatient = patientQueueData.data.find(
          (item) => item.Patient.norm === selectedPatient.norm
        );

        if (findPatient)
          return toast({ title: "User sudah berada dalam antrian" });
      }

      const formattedPatientData: CreatePatientDto = {
        nik: dto.nik as string,
        fullname: dto.fullname as string,
        address: dto.address as string,
        sex: dto.sex as string,
        blood: dto.blood as string,
        phone: dto.phone as string,
        birthAt: dayjs(dto.birthAt as string).format("YYYY-MM-DD"),
      };

      const formattedVitalSignData: CreateNewPatientVitalSignDto = {
        height: dto.height as number,
        weight: dto.weight as number,
        allergic: dto.allergic as string,
        systole: dto.systole as number,
        diastole: dto.diastole as number,
        temperature: dto.temperature as number,
        respiration: dto.respiration as number,
        pulse: dto.pulse as number,
        pain: dto.pain as string,
      };

      if (selectedPatient) {
        await createPatientVitalSign({
          ...formattedVitalSignData,
          patientId: selectedPatient.id,
        });
      }

      if (!selectedPatient) {
        await createNewPatientVitalSign({
          ...formattedVitalSignData,
          ...formattedPatientData,
        });
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: new PatientVitalSignQueryKeyFactory().lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: new TasksStatusQueryKeyFactory().notifications(),
        }),
      ]);

      toast({ title: "Berhasil Membuat Pasien!", variant: "success" });

      const layoutRef =
        document.querySelector<HTMLDivElement>("#clinic-layout");

      if (layoutRef) {
        layoutRef.scrollTo({ top: 0, behavior: "smooth" });
      }

      form.reset({
        nik: undefined,
        fullname: undefined,
        address: undefined,
        sex: undefined,
        blood: undefined,
        phone: undefined,
        birthAt: undefined,
        height: 0,
        weight: 0,
        allergic: undefined,
        systole: 0,
        diastole: 0,
        temperature: 0,
        respiration: 0,
        pulse: 0,
        pain: undefined,
      });
    },
    [
      createNewPatientVitalSign,
      createPatientVitalSign,
      patientQueueData?.data,
      queryClient,
      selectedPatient,
      toast,
    ]
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Pendaftaran Pasien
        </h1>
        <p className="text-muted-foreground">Daftar baru atau member</p>
      </div>

      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-4">
        <div className="flex-1">
          <PatientSearch
            onChange={setSelectedPatient}
            value={selectedPatient}
          />
          <ClinicCard
            borderPosition="top"
            className="border-sky-500"
            title="Daftar Pasien"
          >
            <AddPatientForm
              defaultValues={defaultPatient}
              onSubmit={onSubmit}
            />
          </ClinicCard>
        </div>

        <ClinicCard
          borderPosition="top"
          className="border-green-500 w-full h-full max-w-none sm:max-w-none md:max-w-none lg:max-w-md xl:max-w-md 2xl:max-w-md"
          title="Antrian Sekarang"
        >
          <div className="flex flex-col gap-2">
            {patientQueueData?.data.map((item, index) => (
              <QueueCard
                isActive={index === 0}
                key={item.id}
                {...item.Patient}
                queue={item.queue}
              />
            ))}
          </div>
        </ClinicCard>
      </div>
    </div>
  );
}
