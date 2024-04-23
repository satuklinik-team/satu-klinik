"use client";

import { Input } from "@/components/ui/input";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { Form as AddPatientForm } from "@/lezzform/_generated/addpatientform";

export function ClinicRegisterPatientPage(): JSX.Element {
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
            <AddPatientForm />
          </ClinicCard>
        </div>
        <ClinicCard
          borderPosition="top"
          className="border-green-500 w-full h-full max-w-none sm:max-w-none md:max-w-none lg:max-w-md xl:max-w-md 2xl:max-w-md"
          title="Antrian Sekarang"
        />
      </div>
    </div>
  );
}
