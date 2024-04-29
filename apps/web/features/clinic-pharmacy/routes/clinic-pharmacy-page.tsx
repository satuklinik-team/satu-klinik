"use client";

import { ClinicCard } from "@/features/clinic/components/ui/card";

export function ClinicPharmacyPage(): JSX.Element {
  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Pharmacy</h1>
        <p className="text-muted-foreground">manajemen tugas preskripsi</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mb-4">
        <ClinicCard
          borderPosition="bottom"
          className="border-sky-500"
          title="To Do"
        >
          0
        </ClinicCard>

        <ClinicCard
          borderPosition="bottom"
          className="border-green-500"
          title="Done"
        >
          0
        </ClinicCard>

        <ClinicCard
          borderPosition="bottom"
          className="border-red-500"
          title="Total"
        >
          0
        </ClinicCard>
      </div>

      <ClinicCard
        borderPosition="left"
        className="border-green-500"
        title="Today Patient"
      />
    </div>
  );
}
