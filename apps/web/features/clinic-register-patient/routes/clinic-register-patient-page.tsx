"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import { Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { QueueCard } from "@/features/clinic-patient/components/shared/queue-card";
import { Form as AddPatientForm } from "@/lezzform/_generated/addpatientform";
import { cn } from "@/lib/utils";
import { useCreatePatient } from "@/services/patient/hooks/use-create-patient";
import { useFindPatient } from "@/services/patient/hooks/use-find-patient";
import type { CreatePatientDto } from "@/services/patient/types/dto";
import type { PatientEntity } from "@/services/patient/types/entity";
import { PatientQueryKeyFactory } from "@/services/patient/utils/query-key.factory";
import { useCreatePatientVitalSign } from "@/services/patient-vital-sign/hooks/use-create-patient";
import type { CreatePatientVitalSignDto } from "@/services/patient-vital-sign/types/dto";

export function ClinicRegisterPatientPage(): JSX.Element {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { clinicId } = useParams();

  const { toast } = useToast();

  const [selectedPatient, setSelectedPatient] = useState<PatientEntity>();
  const [isPatientSearchOpen, setIsPatientSearchOpen] =
    useState<boolean>(false);
  const [patientSearch, setPatientSearch] = useState<string>("");
  const debouncedPatientSearch = useDebounce(patientSearch, 300);

  const { data: searchPatientData } = useFindPatient({
    search: debouncedPatientSearch,
    limit: 20,
  });

  const defaultPatient = useMemo(() => {
    if (!selectedPatient) return;

    return {
      nik: selectedPatient.nik,
      fullname: selectedPatient.fullname,
      address: selectedPatient.address,
      sex: selectedPatient.sex,
      blood: selectedPatient.blood,
      phone: selectedPatient.phone,
      birthAt: selectedPatient.birthAt,
      ...selectedPatient.mr[0].vitalSign[0],
      deletedAt: undefined,
      id: undefined,
      patient_medical_recordsId: undefined,
      sugar: undefined,
      cholesterol: undefined,
      saturation: undefined,
    };
  }, [selectedPatient]);

  console.log({ defaultPatient });

  const { data } = useFindPatient({
    skip: 0,
    limit: 20,
    count: true,
    type: "ENTRY",
  });

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

      router.push(`/clinic/${clinicId as string}/doctor`);
    },
    [
      clinicId,
      createPatient,
      createPatientVitalSign,
      queryClient,
      router,
      toast,
    ]
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
          <Popover
            onOpenChange={setIsPatientSearchOpen}
            open={isPatientSearchOpen}
          >
            <PopoverTrigger asChild className="mb-5">
              <Button
                aria-expanded={isPatientSearchOpen}
                className="w-full justify-between text-muted-foreground hover:text-muted-foreground"
                role="combobox"
                variant="outline"
              >
                Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[300px] overflow-y-auto p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  onValueChange={(commandValue) => {
                    setPatientSearch(commandValue);
                  }}
                  placeholder="Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal"
                  value={patientSearch}
                />
                <CommandEmpty>No patients found.</CommandEmpty>
                <CommandGroup>
                  {searchPatientData?.data.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => {
                        setSelectedPatient(item);
                        setIsPatientSearchOpen(false);
                        setPatientSearch("");
                      }}
                      value={item.id}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedPatient?.id === item.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.fullname}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
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
            {data?.data.map((item, index) => (
              <QueueCard isActive={index === 0} key={item.id} {...item} />
            ))}
          </div>
        </ClinicCard>
      </div>
    </div>
  );
}
