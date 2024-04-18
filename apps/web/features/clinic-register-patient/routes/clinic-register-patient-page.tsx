"use client";

import { Input } from "@/components/ui/input";
import { ClinicCard } from "@/features/clinic/components/ui/card";

export function ClinicRegisterPatientPage(): JSX.Element {
  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Pendaftaran Pasien</h1>
        <p className="text-muted-foreground">Daftar baru atau member</p>
      </div>

      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-4">
        <div className="flex-1">
          <Input
            className="w-full mb-5 bg-white"
            placeholder="Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal"
          />
          <div className="w-full flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-4">
            <ClinicCard
              borderPosition="top"
              className="flex-1 border-sky-500"
              title="Profil"
            />
            <ClinicCard
              borderPosition="top"
              className="flex-1 border-green-500"
              title="Tanda Vital"
            />
          </div>
        </div>
        <ClinicCard
          borderPosition="top"
          className="border-green-500 w-full h-full max-w-none sm:max-w-none md:max-w-none lg:max-w-xs xl:max-w-xs 2xl:max-w-xs"
          title={<h3 className="text-base font-semibold">Antrian Sekarang</h3>}
        />
      </div>
    </div>
  );
}
