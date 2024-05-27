import { useMemo } from "react";

import { Cell } from "@/components/shared/table/cell";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";

interface ClinicDiagnosePatientPrescriptionTable {
  prescriptions: PrescriptionEntity[];
}

export function ClinicDiagnosePatientPrescriptionTable({}: ClinicDiagnosePatientPrescriptionForm): JSX.Element {
  const columns = useMemo(() => {
    return [
      {
        key: "name",
        name: "R/",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell className="flex flex-col gap-2">
            <p>{prescription.medicine.name}</p>
            <p className="text-muted-foreground">{prescription.notes}</p>
          </Cell>
        ),
      },
      {
        key: "dose",
        name: "Dosis",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell>
            {prescription.frequency} x {prescription.doseQuantity}
          </Cell>
        ),
      },
      {
        key: "duration",
        name: "Durasi",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell>{prescription.supplyDuration} hari</Cell>
        ),
      },
      {
        key: "measurement",
        name: "Satuan",
        renderCell: () => <Cell>kaplet</Cell>,
      },
      {
        key: "totalQuantity",
        name: "Jumlah",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell>{prescription.totalQuantity}</Cell>
        ),
      },
    ];
  }, []);

  return <></>;
}
