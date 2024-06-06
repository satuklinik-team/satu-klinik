"use client";

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

export function ClinicMedicalRecordPage(): JSX.Element {
  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Medical Record
        </h1>
        <p className="text-muted-foreground">patient visit history</p>
      </div>

      <ClinicCard>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pilih waktu</SelectLabel>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="twoWeeksAgo">7 Days Ago</SelectItem>
                  <SelectItem value="threeWeeksAgo">21 Days Ago</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Input
            className="py-2 h-fit"
            placeholder="Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal"
          />
        </div>
      </ClinicCard>
    </div>
  );
}
