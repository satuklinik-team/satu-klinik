import { HeartPulse, Stethoscope } from "lucide-react";

import { BloodBagOutlineIcon } from "@/components/icons/blood-bag-outline";
import { HeightFilledIcon } from "@/components/icons/height-filled";
import { LungOutlineIcon } from "@/components/icons/lung-outline";
import { ScaleOutlineIcon } from "@/components/icons/scale-outline";
import { ThermometerOutlineIcon } from "@/components/icons/thermometer-outline";
import { Cell } from "@/components/shared/table/cell";
import type { PatientEntity } from "@/services/patient/types/entity";
import type { FormatterCellProps } from "@/types";

import { ClinicPatientVitals } from "../shared/vitals";

export function ClinicPatientNameCell({
  row,
}: FormatterCellProps): JSX.Element {
  const typedRow = row as PatientEntity;

  return (
    <Cell className="gap-3">
      <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
        <p>PA</p>
      </div>
      <div>
        <p className="font-bold">{typedRow.name}</p>
        <p className="font-normal">{typedRow.medicalRecordNumber}</p>
        <p className="font-normal">{typedRow.address}</p>
        <ClinicPatientVitals
          vitals={[
            {
              icon: <Stethoscope size={16} />,
              value: `${typedRow.vitals.sistole} / ${typedRow.vitals.diastole}`,
              label: "Sistole / Diastole",
            },
            {
              icon: <ThermometerOutlineIcon size={16} />,
              value: `${typedRow.vitals.temperature} C`,
              label: "Suhu Badan",
            },
            {
              icon: <HeightFilledIcon size={16} />,
              value: `${typedRow.vitals.height} cm`,
              label: "Tinggi Badan",
            },
            {
              icon: (
                <ScaleOutlineIcon
                  className="fill-transparent stroke-foreground"
                  size={16}
                />
              ),
              value: `${typedRow.vitals.weight} kg`,
              label: "Berat Badan",
            },
            {
              icon: <HeartPulse size={16} />,
              value: typedRow.vitals.pulse,
              label: "Detak Jantung",
            },
            {
              icon: <LungOutlineIcon size={18} />,
              value: typedRow.vitals.respiration,
              label: "Respirasi",
            },
            {
              icon: <BloodBagOutlineIcon size={18} />,
              value: typedRow.bloodType,
              label: "Golongan Darah",
            },
          ]}
        />
      </div>
    </Cell>
  );
}
