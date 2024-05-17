"use client";

// import ReactApexChart from "react-apexcharts";
import { useState } from "react";

import { ClinicCard } from "@/features/clinic/components/ui/card";
import { QueueCard } from "@/features/clinic-patient/components/shared/queue-card";
import { useFindPatient } from "@/services/patient/hooks/use-find-patient";
import type { Pagination } from "@/types";

import { ClinicDashboardUsersTable } from "../components/table";
// import { ClinicServicesCard } from "@/features/clinic/components/ui/services-card";

export function ClinicDashboardPage(): JSX.Element {
  const [pagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data } = useFindPatient({
    ...pagination,
    count: true,
    type: "ENTRY",
  });

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Dashbor
        </h1>
        <p className="text-muted-foreground">
          Selamat datang di dasbor Klinik Demo Husada
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        <ClinicCard
          borderPosition="bottom"
          className="border-sky-500"
          title="Today's Patient"
        >
          0
        </ClinicCard>

        <ClinicCard
          borderPosition="bottom"
          className="border-red-500"
          title="Today's Revenue"
        >
          0
        </ClinicCard>

        <ClinicCard
          borderPosition="bottom"
          className="border-green-500"
          title="Today's Prescription"
        >
          0
        </ClinicCard>

        <ClinicCard
          borderPosition="bottom"
          className="border-orange-500"
          title="Total Patient"
        >
          7
        </ClinicCard>
      </div>

      <ClinicCard
        borderPosition="left"
        className="my-4 border-sky-500"
        title="Overview"
      >
        {/* <ReactApexChart
          height="25rem"
          options={{
            chart: {
              height: 350,
              type: "line",
              stacked: false,
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: [0.2, 0.3, 0.5, 4],
              curve: "smooth",
            },
            title: {
              text: "",
              align: "left",
              offsetX: 110,
            },
            xaxis: {
              categories: ["Entry", "Doctor", "Pharmacy", "Total"],
            },
            yaxis: [],
            legend: {
              horizontalAlign: "left",
              offsetX: 40,
            },
          }}
          series={[
            {
              name: "Entry",
              type: "column",
              data: [],
              width: 20,
            },
            {
              name: "Doctor",
              type: "column",
              data: [],
            },
            {
              name: "Pharmacy",
              type: "column",
              data: [],
            },
            {
              name: "Total",
              type: "line",
              data: [],
            },
          ]}
          type="line"
          width="100%"
        /> */}
      </ClinicCard>

      {/* <ClinicServicesCard /> */}

      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-4">
        <ClinicCard
          borderPosition="left"
          className="flex-1 flex flex-col gap-2 border-sky-500"
          title="Antrian"
        >
          {data?.data.map((item, index) => (
            <QueueCard isActive={index === 0} key={item.id} {...item} />
          ))}
        </ClinicCard>
        <ClinicCard
          borderPosition="left"
          className="flex-1 border-sky-500"
          title="Staff"
        >
          <ClinicDashboardUsersTable />
        </ClinicCard>
      </div>
    </div>
  );
}
