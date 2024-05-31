"use client";

import { HeartPulse, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { BloodBagOutlineIcon } from "@/components/icons/blood-bag-outline";
import { LungOutlineIcon } from "@/components/icons/lung-outline";
import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { ClinicPatientVitals } from "@/features/clinic-patient/components/shared/vitals";
import { patientStatuses } from "@/features/clinic-patient/utils";
import { useFindPatient } from "@/services/patient/hooks/use-find-patient";
import type { PatientEntity } from "@/services/patient/types/entity";
import type { VitalSignEntity } from "@/services/patient-vital-sign/types/entity";
import type { Pagination } from "@/types";
import { getInitial } from "@/utils";

export function ClinicDoctorTable(): JSX.Element {
  const { clinicId } = useParams();

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindPatient({
    ...pagination,
    count: true,
    type: "ENTRY",
  });

  return (
    <ClinicCard className="mt-4">
      <BaseTable<PatientEntity>
        columns={[
          {
            key: "queue",
            name: "No",
            renderCell: (row) => (
              <Cell>
                <p>{row.mr[0]?.queue}</p>
              </Cell>
            ),
          },
          {
            key: "name",
            name: "Nama",
            renderCell: (row) => {
              const vitalSign = row.mr[0]?.vitalSign[0] as
                | VitalSignEntity
                | undefined;

              return (
                <Cell className="gap-3">
                  <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
                    <p>{getInitial(row.fullname)}</p>
                  </div>
                  <div>
                    <p className="font-bold">{row.fullname}</p>
                    <ClinicPatientVitals
                      vitals={[
                        {
                          icon: <Stethoscope size={16} />,
                          value: vitalSign
                            ? `${vitalSign.systole} / ${vitalSign.diastole}`
                            : "-",
                          label: "Sistole / Diastole",
                        },
                        {
                          icon: <HeartPulse size={16} />,
                          value: vitalSign ? vitalSign.pulse : "-",
                          label: "Detak Jantung",
                        },
                        {
                          icon: <LungOutlineIcon size={18} />,
                          value: vitalSign ? vitalSign.respiration : "-",
                          label: "Respirasi",
                        },
                        {
                          icon: <BloodBagOutlineIcon size={18} />,
                          value: row.blood.toLocaleUpperCase(),
                          label: "Golongan Darah",
                        },
                      ]}
                    />
                  </div>
                </Cell>
              );
            },
          },
          {
            key: "status",
            name: "Status",
            renderCell: (row) => (
              <Cell className="gap-2">
                <Badge className="text-sm cursor-default">
                  {patientStatuses[row.mr[0]?.status as "e1" | "p1" | "d1"]}
                </Badge>
              </Cell>
            ),
          },
          {
            key: "action",
            name: "Action",
            renderCell: (row) => (
              <Cell className="gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <Link
                      href={`/clinic/${clinicId as string}/mr/${
                        row.mr[0]?.id
                      }/diagnose?patientId=${row.id}`}
                    >
                      <TooltipTrigger className="h-min p-2 hover:bg-muted-foreground/10 rounded-md transition">
                        <Stethoscope size={20} />
                      </TooltipTrigger>
                    </Link>
                    <TooltipContent>Diagnosa & Cetak Resep</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Cell>
            ),
          },
        ]}
        isLoading={isLoading}
        onPaginationChange={(currentPagination) => {
          setPagination(currentPagination);
        }}
        pagination={pagination}
        rows={data?.data ?? []}
        totalRows={data?.count}
      />
    </ClinicCard>
  );
}
