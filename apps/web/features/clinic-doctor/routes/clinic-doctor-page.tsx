"use client";

import { ClinicCard } from "@/features/clinic/components/ui/card";
// import { ClinicServicesCard } from "@/features/clinic/components/ui/services-card";

export function ClinicDoctorPage(): JSX.Element {
  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Dashbor</h1>
        <p className="text-muted-foreground">Selamat datang Dokter!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
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

      {/* <ClinicServicesCard /> */}
    </div>
  );
}
