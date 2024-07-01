"use client";

import { useState } from "react";

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

import { SearchMedicalRecordInput } from "../components/search-input";
import { MedicalRecordTable } from "../components/tables/medical-record-table";
import { timeRangeOptions } from "../utils";

export function ClinicMedicalRecordPage(): JSX.Element {
  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const [search, setSearch] = useState("");

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
      search,
      type: selectedTimeRange,
    });

  return (
    <div className="h-full">
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
          <SearchMedicalRecordInput onChange={setSearch} />
        </div>

        <MedicalRecordTable
          isLoading={isFetching}
          onPaginationChange={setPagination}
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
