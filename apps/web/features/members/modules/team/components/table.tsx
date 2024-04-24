"use client";

import { Hospital, LogIn, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Button } from "@/components/ui/button";
import { MemberSection } from "@/features/members/components/shared/section";
import type { ClinicEntity } from "@/services/clinic/types/entity";
import { redirectToWhatsapp } from "@/utils";

export function MembersTeamsTable(): JSX.Element {
  const router = useRouter();

  return (
    <MemberSection>
      <BaseTable<ClinicEntity>
        columns={[
          {
            key: "clinic",
            name: "Clinic",
            renderCell: (row) => (
              <Cell className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full border-2">
                  <Hospital size={28} />
                </div>

                <div className="flex flex-col ">
                  <p className="text-base font-semibold">{row.name}</p>
                  <p className="text-xs">
                    {row.city} - {row.phoneNumber}
                  </p>
                </div>
              </Cell>
            ),
          },
          {
            key: "statistics",
            name: "Statistics",
            renderCell: (row) => (
              <Cell className="flex flex-row items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <p className="text-center text-xs">Total Records</p>
                  <p className="text-lg font-semibold text-center text-green-600">
                    {row._count.totalRecords}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <p className="text-center text-xs">Total Users</p>
                  <p className="text-lg font-semibold text-center text-blue-600">
                    {row._count.totalUsers}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <p className="text-center text-xs">Total Patients</p>
                  <p className="text-lg font-semibold text-center text-red-600">
                    {row._count.totalPatient}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <p className="text-center text-xs">Total Department</p>
                  <p className="text-lg font-semibold text-center text-blue-600">
                    {row._count.totalDepartment}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <p className="text-center text-xs">Total Category</p>
                  <p className="text-lg font-semibold text-center text-blue-600">
                    {row._count.totalCategory}
                  </p>
                </div>
              </Cell>
            ),
          },
          {
            key: "actions",
            name: "",
            renderCell: (row) => (
              <Cell className="flex flex-row items-center gap-2">
                <Button
                  className="h-min p-2"
                  onClick={() => {
                    redirectToWhatsapp(row.phoneNumber);
                  }}
                  variant="ghost"
                >
                  <MessageCircle className="text-green-500" />
                </Button>
                <Button
                  className="h-min p-2"
                  onClick={() => {
                    router.push(`/clinic/${row.id}`);
                  }}
                  variant="ghost"
                >
                  <LogIn className="text-primary" />
                </Button>
              </Cell>
            ),
          },
        ]}
        rows={[
          {
            id: "123121ee",
            name: "Klinik Demo Husada",
            city: "Kab. Semarang",
            phoneNumber: "62812345678901",
            _count: {
              totalRecords: 4,
              totalUsers: 3,
              totalPatient: 10,
              totalDepartment: 1,
              totalCategory: 1,
            },
          },
        ]}
      />
    </MemberSection>
  );
}
