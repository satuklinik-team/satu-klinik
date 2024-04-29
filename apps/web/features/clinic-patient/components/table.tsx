import {
  Edit,
  Eye,
  HeartPulse,
  MessageCircle,
  Stethoscope,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { BloodBagOutlineIcon } from "@/components/icons/blood-bag-outline";
import { HeightFilledIcon } from "@/components/icons/height-filled";
import { LungOutlineIcon } from "@/components/icons/lung-outline";
import { ScaleOutlineIcon } from "@/components/icons/scale-outline";
import { ThermometerOutlineIcon } from "@/components/icons/thermometer-outline";
import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PatientEntity } from "@/services/patient/types/entity";
import { redirectToWhatsapp } from "@/utils";

import { ClinicPatientVitals } from "./shared/vitals";

export function ClinicPatientTable(): JSX.Element {
  const { clinicId } = useParams();

  return (
    <BaseTable<PatientEntity>
      columns={[
        {
          key: "name",
          name: "Nama",
          renderCell: (row) => (
            <Cell className="gap-3">
              <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
                <p>PA</p>
              </div>
              <div>
                <p className="font-bold">{row.name}</p>
                <p className="font-normal">{row.medicalRecordNumber}</p>
                <p className="font-normal">{row.address}</p>
                <ClinicPatientVitals
                  vitals={[
                    {
                      icon: <Stethoscope size={16} />,
                      value: `${row.vitals.sistole} / ${row.vitals.diastole}`,
                      label: "Sistole / Diastole",
                    },
                    {
                      icon: <ThermometerOutlineIcon size={16} />,
                      value: `${row.vitals.temperature} C`,
                      label: "Suhu Badan",
                    },
                    {
                      icon: <HeightFilledIcon size={16} />,
                      value: `${row.vitals.height} cm`,
                      label: "Tinggi Badan",
                    },
                    {
                      icon: (
                        <ScaleOutlineIcon
                          className="fill-transparent stroke-foreground"
                          size={16}
                        />
                      ),
                      value: `${row.vitals.weight} kg`,
                      label: "Berat Badan",
                    },
                    {
                      icon: <HeartPulse size={16} />,
                      value: row.vitals.pulse,
                      label: "Detak Jantung",
                    },
                    {
                      icon: <LungOutlineIcon size={18} />,
                      value: row.vitals.respiration,
                      label: "Respirasi",
                    },
                    {
                      icon: <BloodBagOutlineIcon size={18} />,
                      value: row.bloodType,
                      label: "Golongan Darah",
                    },
                  ]}
                />
              </div>
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
                  <TooltipTrigger
                    className="h-min p-2"
                    onClick={() => {
                      redirectToWhatsapp(row.phoneNumber);
                    }}
                  >
                    <MessageCircle className="text-green-500" size={20} />
                  </TooltipTrigger>
                  <TooltipContent>Kontak WA</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <Link
                    href={`/clinic/${clinicId as string}/patient/${row.medicalRecordNumber}`}
                  >
                    <TooltipTrigger className="h-min p-2">
                      <Eye size={20} />
                    </TooltipTrigger>
                  </Link>
                  <TooltipContent>Lihat Detail</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <Link
                    href={`/clinic/${clinicId as string}/patient/${row.medicalRecordNumber}/edit`}
                  >
                    <TooltipTrigger className="h-min p-2">
                      <Edit size={20} />
                    </TooltipTrigger>
                  </Link>
                  <TooltipContent>Edit Pasien</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger className="h-min p-2">
                    <Trash className="text-red-500" size={20} />
                  </TooltipTrigger>
                  <TooltipContent>Hapus Pasien</TooltipContent>
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
      ]}
      totalRows={80}
    />
  );
}
