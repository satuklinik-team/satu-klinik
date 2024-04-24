import {
  EllipsisVertical,
  HeartPulse,
  MessageCircle,
  Ruler,
  Stethoscope,
  Thermometer,
  Trash,
  Weight,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
                <div className="flex flex-row items-center gap-2 font-normal mt-1">
                  <Stethoscope size={16} />
                  <p>
                    {row.vitals.sistole} / {row.vitals.diastole}
                  </p>
                  <Thermometer size={16} />
                  <p>{row.vitals.temperature} C</p>
                  <Ruler size={16} />
                  <p>{row.vitals.height} cm</p>
                  <Weight size={16} />
                  <p>{row.vitals.weight} kg</p>
                  <HeartPulse size={16} />
                  <p>{row.vitals.pulse}</p>
                  <p>{row.vitals.respiration}</p>
                  <p>{row.bloodType}</p>
                </div>
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
                    href={`/clinic/${clinicId as string}/mr/${row.medicalRecordNumber}`}
                  >
                    <TooltipTrigger className="h-min p-2">
                      <EllipsisVertical size={20} />
                    </TooltipTrigger>
                  </Link>
                  <TooltipContent>Lihat Detail</TooltipContent>
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
