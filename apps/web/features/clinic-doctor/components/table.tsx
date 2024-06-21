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
import { useFindPatientQueue } from "@/services/patient-vital-sign/hooks/use-find-patient-queue";
import type {
  PatientQueue,
  VitalSignEntity,
} from "@/services/patient-vital-sign/types/entity";
import type { Pagination } from "@/types";
import { getInitial } from "@/utils";

export function ClinicDoctorTable(): JSX.Element {
  const { clinicId } = useParams();

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindPatientQueue({
    ...pagination,
    count: true,
  });

  return (
    <ClinicCard className="mt-4">
      <BaseTable<PatientQueue>
        columns={[
          {
            key: "queue",
            name: "No",
            renderCell: (row) => (
              <Cell>
                <p>{row.queue}</p>
              </Cell>
            ),
          },
          {
            key: "name",
            name: "Nama",
            renderCell: (row) => {
              const vitalSign = row.vitalSign[0] as VitalSignEntity | undefined;

              return (
                <Cell className="gap-3">
                  <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
                    <p>{getInitial(row.Patient.fullname)}</p>
                  </div>
                  <div>
                    <p className="font-bold">{row.Patient.fullname}</p>
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
                          value: row.Patient.blood.toLocaleUpperCase(),
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
                  {patientStatuses[row.status as "e1" | "p1" | "d1"]}
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
                        row.id
                      }/diagnose?patientId=${row.patientId}`}
                    >
                      <TooltipTrigger className="h-min p-2 border border-border hover:bg-primary/50 rounded-md transition">
                        <Stethoscope size={32} />
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
