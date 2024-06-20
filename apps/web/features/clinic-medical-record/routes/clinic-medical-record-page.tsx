"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

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
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useFindPatientMedicalRecord } from "@/services/patient-medical-record/hooks/use-find-patient-medical-record";
import type { Pagination } from "@/types";

import { MedicalRecordTable } from "../components/tables/medical-record-table";
import { timeRangeOptions } from "../utils";

export function ClinicMedicalRecordPage(): JSX.Element {
  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("today");

  // const selectedTimeRangeOption = useMemo(() => {
  //   return timeRangeOptions.find((item) => item.value === selectedTimeRange);
  // }, [selectedTimeRange]);

  const { data: patiendMedicalRecordData, isFetching } =
    useFindPatientMedicalRecord({
      ...pagination,
      count: true,
      // from: selectedTimeRangeOption?.getFrom(),
      // to: selectedTimeRangeOption?.getTo(),
      search: debouncedSearch,
      type: selectedTimeRange,
    });

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

        <MedicalRecordTable
          isLoading={isFetching}
          onPaginationChange={(currentPagination) => {
            setPagination(currentPagination);
          }}
          pagination={pagination}
          rows={patiendMedicalRecordData?.data ?? []}
          totalRows={patiendMedicalRecordData?.count}
        />
      </ClinicCard>

      {/* <AlertDialog
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
      </AlertDialog> */}
    </div>
  );
}
