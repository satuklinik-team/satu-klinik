"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// import ReactApexChart from "react-apexcharts";
import { Button } from "@/components/ui/button";
import { ClinicCard } from "@/features/clinic/components/ui/card";

import { clinicDashboardServices } from "../utils";

export function ClinicDashboardPage(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Dashbor</h1>
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
        title={<h3 className="text-lg font-semibold">Overview</h3>}
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

      <ClinicCard
        borderPosition="left"
        className="my-4 border-sky-500"
        title="Services"
      >
        <div className="flex flex-row flex-wrap gap-4">
          {clinicDashboardServices.map((item) => {
            const Icon = item.icon;

            return (
              <Link href={`${pathname}${item.path}`} key={item.text}>
                <Button
                  className="flex flex-col items-center gap-1 h-fit text-primary hover:text-primary border border-primary"
                  variant="ghost"
                >
                  <Icon className="text-primary" size={20} />
                  {item.text}
                </Button>
              </Link>
            );
          })}
        </div>
      </ClinicCard>

      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-4">
        <ClinicCard
          borderPosition="left"
          className="flex-1 border-sky-500"
          title="Antrian"
        />
        <ClinicCard
          borderPosition="left"
          className="flex-1 border-sky-500"
          title="Staff"
        />
      </div>
    </div>
  );
}
