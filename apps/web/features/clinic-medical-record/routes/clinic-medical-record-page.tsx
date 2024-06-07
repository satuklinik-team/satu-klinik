"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { HeartPulse, MessageCircle, Stethoscope, Trash } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { BloodBagOutlineIcon } from "@/components/icons/blood-bag-outline";
import { HeightFilledIcon } from "@/components/icons/height-filled";
import { LungOutlineIcon } from "@/components/icons/lung-outline";
import { ScaleOutlineIcon } from "@/components/icons/scale-outline";
import { ThermometerOutlineIcon } from "@/components/icons/thermometer-outline";
import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { ClinicPatientVitals } from "@/features/clinic-patient/components/shared/vitals";
import { useDeletePatientMedicalRecord } from "@/services/patient-medical-record/hooks/use-delete-patient-medical-record";
import { useFindPatientMedicalRecord } from "@/services/patient-medical-record/hooks/use-find-patient-medical-record";
import type { PatientMedicalRecordEntity } from "@/services/patient-medical-record/types/entity";
import { PatientMedicalRecordQueryKeyFactory } from "@/services/patient-medical-record/utils/query-key.factory";
import type { Pagination } from "@/types";
import { getInitial, getWhatsappUrl } from "@/utils";

import { timeRangeOptions } from "../utils";

export function ClinicMedicalRecordPage(): JSX.Element {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("today");

  const selectedTimeRangeOption = useMemo(() => {
    return timeRangeOptions.find((item) => item.value === selectedTimeRange);
  }, [selectedTimeRange]);

  const { data: patiendMedicalRecordData, isFetching } =
    useFindPatientMedicalRecord({
      ...pagination,
      count: true,
      from: selectedTimeRangeOption?.getFrom(),
      to: selectedTimeRangeOption?.getTo(),
      search: debouncedSearch,
    });

  const [toBeDeletedId, setToBeDeletedId] = useState<string>("");

  const { mutateAsync: deletePatientMedicalRecord } =
    useDeletePatientMedicalRecord(toBeDeletedId);

  const columns = useMemo(() => {
    return [
      {
        key: "visit",
        name: "VISIT",
        renderCell: (row: PatientMedicalRecordEntity) => (
          <Cell>{row.visitAt}</Cell>
        ),
      },
      {
        key: "name",
        name: "NAME",
        renderCell: (row: PatientMedicalRecordEntity) => {
          const vitalSign = row.vitalSign?.[0];

          return (
            <Cell className="gap-3">
              <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
                <p>{getInitial(row.Patient.fullname)}</p>
              </div>
              <div>
                <p className="font-bold">{row.Patient.fullname}</p>
                <p className="font-normal">{row.Patient.norm}</p>
                <p className="font-normal">{row.Patient.address}</p>
                <ClinicPatientVitals
                  vitals={[
                    {
                      icon: <Stethoscope size={16} />,
                      value: vitalSign
                        ? `${vitalSign.systole} / ${vitalSign.diastole}`
                        : "-",
                      label: "Sistole / Diastole",
                    },
                    {
                      icon: <ThermometerOutlineIcon size={16} />,
                      value: vitalSign ? `${vitalSign.temperature} C` : "-",
                      label: "Suhu Badan",
                    },
                    {
                      icon: <HeightFilledIcon size={16} />,
                      value: vitalSign ? `${vitalSign.height} cm` : "-",
                      label: "Tinggi Badan",
                    },
                    {
                      icon: (
                        <ScaleOutlineIcon
                          className="fill-transparent stroke-foreground"
                          size={16}
                        />
                      ),
                      value: vitalSign ? `${vitalSign.weight} kg` : "-",
                      label: "Berat Badan",
                    },
                    {
                      icon: <HeartPulse size={16} />,
                      value: vitalSign?.pulse ?? "-",
                      label: "Detak Jantung",
                    },
                    {
                      icon: <LungOutlineIcon size={18} />,
                      value: vitalSign?.respiration ?? "-",
                      label: "Respirasi",
                    },
                    {
                      icon: <BloodBagOutlineIcon size={18} />,
                      value: row.Patient.blood.toLocaleUpperCase(),
                      label: "Golongan Darah",
                    },
                  ]}
                />
              </div>
            </Cell>
          );
        },
      },
      {
        key: "action",
        name: "ACTION",
        renderCell: (row: PatientMedicalRecordEntity) => (
          <Cell className="gap-2">
            <TooltipProvider>
              <Tooltip>
                <Link href={getWhatsappUrl(row.Patient.phone)}>
                  <TooltipTrigger className="h-min p-2">
                    <MessageCircle className="text-green-500" size={20} />
                  </TooltipTrigger>
                </Link>
                <TooltipContent>Kontak WA</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  className="h-min p-2"
                  onClick={() => {
                    setToBeDeletedId(String(row.id));
                  }}
                >
                  <Trash className="text-red-500" size={20} />
                </TooltipTrigger>
                <TooltipContent>Hapus Patient Medical Record</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Cell>
        ),
      },
    ];
  }, []);

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Medical Record
        </h1>
        <p className="text-muted-foreground">patient visit history</p>
      </div>

      <ClinicCard>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-row items-center gap-2">
            <Select
              onValueChange={(value) => {
                setSelectedTimeRange(value);
              }}
              value={selectedTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pilih waktu</SelectLabel>
                  {timeRangeOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Input
            className="py-2 h-fit"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal"
            value={search}
          />
        </div>

        <BaseTable<PatientMedicalRecordEntity>
          columns={columns}
          isLoading={isFetching}
          onPaginationChange={(currentPagination) => {
            setPagination(currentPagination);
          }}
          pagination={pagination}
          rows={patiendMedicalRecordData?.data ?? []}
          totalRows={patiendMedicalRecordData?.count}
        />
      </ClinicCard>

      <AlertDialog
        onOpenChange={(value) => {
          if (!value) setToBeDeletedId("");
        }}
        open={Boolean(toBeDeletedId)}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              patient medical record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
              onClick={async () => {
                await deletePatientMedicalRecord();
                await queryClient.invalidateQueries({
                  queryKey: new PatientMedicalRecordQueryKeyFactory().lists(),
                });
                setToBeDeletedId("");
                toast({
                  title: "Berhasil Menghapus Medical Record Pasien!",
                  variant: "success",
                });
              }}
              variant="ghost"
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
