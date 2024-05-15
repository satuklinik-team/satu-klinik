import { HeartPulse, Stethoscope } from "lucide-react";

import { BloodBagOutlineIcon } from "@/components/icons/blood-bag-outline";
import { HeightFilledIcon } from "@/components/icons/height-filled";
import { LungOutlineIcon } from "@/components/icons/lung-outline";
import { ScaleOutlineIcon } from "@/components/icons/scale-outline";
import { ThermometerOutlineIcon } from "@/components/icons/thermometer-outline";
import { Cell } from "@/components/shared/table/cell";
import type { PatientEntity } from "@/services/patient/types/entity";
import type { VitalSignEntity } from "@/services/patient-vital-sign/types/entity";

import { ClinicPatientVitals } from "../shared/vitals";

export function ClinicPatientNameCell(row: PatientEntity): JSX.Element {
  const vitalSign = row.mr[0]?.vitalSign[0] as VitalSignEntity | undefined;

  return (
    <Cell className="gap-3">
      <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
        <p>PA</p>
      </div>
      <div>
        <p className="font-bold">{row.fullname}</p>
        <p className="font-normal">{row.norm}</p>
        <p className="font-normal">{row.address}</p>
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
              icon: <ThermometerOutlineIcon size={16} />,
              value: vitalSign ? `${vitalSign.temperature} C` : "-",
              label: "Suhu Badan",
            },
            {
              icon: <HeightFilledIcon size={16} />,
              value: vitalSign ? `${vitalSign.height} cm` : "-",
              label: "Tinggi Badan",
            },
            {
              icon: (
                <ScaleOutlineIcon
                  className="fill-transparent stroke-foreground"
                  size={16}
                />
              ),
              value: vitalSign ? `${vitalSign.weight} kg` : "-",
              label: "Berat Badan",
            },
            {
              icon: <HeartPulse size={16} />,
              value: vitalSign?.pulse ?? "-",
              label: "Detak Jantung",
            },
            {
              icon: <LungOutlineIcon size={18} />,
              value: vitalSign?.respiration ?? "-",
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
}
