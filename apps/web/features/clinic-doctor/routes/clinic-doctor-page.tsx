"use client";

import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useGetTasksStatus } from "@/services/tasks-status/services/use-get-tasks-status";

import { ClinicDoctorTable } from "../components/table";

export function ClinicDoctorPage(): JSX.Element {
  const { data: tasksStatusData } = useGetTasksStatus({ type: "DOCTOR" });

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        <ClinicCard
          borderPosition="bottom"
          className="border-sky-500"
          title="To Do"
        >
          {tasksStatusData?.todo}
        </ClinicCard>

        <ClinicCard
          borderPosition="bottom"
          className="border-green-500"
          title="Done"
        >
          {tasksStatusData?.completed}
        </ClinicCard>

        <ClinicCard
          borderPosition="bottom"
          className="border-red-500"
          title="Total"
        >
          {tasksStatusData?.total}
        </ClinicCard>
      </div>

      <ClinicDoctorTable />
    </div>
  );
}
