import { HeartPulse, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
import type { TaskEntity } from "@/services/task/types/entity";

export function ClinicDoctorTable(): JSX.Element {
  const { clinicId } = useParams();

  return (
    <ClinicCard className="mt-4">
      <BaseTable<TaskEntity>
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
            renderCell: (row) => (
              <Cell className="gap-3">
                <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
                  <p>PA</p>
                </div>
                <div>
                  <p className="font-bold">{row.patient.name}</p>
                  <ClinicPatientVitals
                    vitals={[
                      {
                        icon: <Stethoscope size={16} />,
                        value: `${row.patient.vitals.sistole} / ${row.patient.vitals.diastole}`,
                        label: "Sistole / Diastole",
                      },
                      {
                        icon: <HeartPulse size={16} />,
                        value: row.patient.vitals.pulse,
                        label: "Detak Jantung",
                      },
                      {
                        icon: <LungOutlineIcon size={18} />,
                        value: row.patient.vitals.respiration,
                        label: "Respirasi",
                      },
                      {
                        icon: <BloodBagOutlineIcon size={18} />,
                        value: row.patient.bloodType,
                        label: "Golongan Darah",
                      },
                    ]}
                  />
                </div>
              </Cell>
            ),
          },
          {
            key: "status",
            name: "Status",
            renderCell: (row) => (
              <Cell className="gap-2">
                <Badge className="text-sm cursor-default">{row.status}</Badge>
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
                      href={`/clinic/${clinicId as string}/mr/${row.patient.medicalRecordNumber}/diagnose`}
                    >
                      <TooltipTrigger className="h-min p-2">
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
        pagination={{
          skip: 0,
          limit: 20,
        }}
        rows={[
          {
            queue: "A-4",
            patient: {
              id: "123121ee",
              name: "Pasien 1",
              nik: "2024.04.00006",
              medicalRecordNumber: "2024.04.00006",
              phoneNumber: "082228883006",
              address: "Keputih Tegal Timur",
              sex: "Male",
              bloodType: "O",
              vitals: {
                height: 182,
                weight: 64,
                allergy: "Gak Ada",
                sistole: 122,
                diastole: 132,
                temperature: 37,
                respiration: 128,
                pulse: 90,
              },
            },
            status: "Sedang Mengantri",
          },
        ]}
        totalRows={80}
      />
    </ClinicCard>
  );
}
