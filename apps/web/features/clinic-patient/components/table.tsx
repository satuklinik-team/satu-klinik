import { useMemo } from "react";

import { Table as PatientTable } from "@/lezztable/_generated/master-patient";

import { ClinicPatientActionsCell } from "./cell/actions-cell";
import { ClinicPatientNameCell } from "./cell/name-cell";

export function ClinicPatientTable(): JSX.Element {
  const columns = useMemo(() => {
    return [
      {
        key: "name",
        name: "Nama",
        formatterCell: ClinicPatientNameCell,
      },
      {
        key: "action",
        name: "Action",
        formatterCell: ClinicPatientActionsCell,
      },
    ];
  }, []);

  return (
    <PatientTable
      columns={columns}
      // pagination={{
      //   skip: 0,
      //   limit: 20,
      // }}
      // rows={[
      //   {
      //     id: "123121ee",
      //     name: "Pasien 1",
      //     nik: "2024.04.00006",
      //     medicalRecordNumber: "2024.04.00006",
      //     phoneNumber: "082228883006",
      //     address: "Keputih Tegal Timur",
      //     sex: "Male",
      //     bloodType: "O",
      //     vitals: {
      //       height: 182,
      //       weight: 64,
      //       allergy: "Gak Ada",
      //       sistole: 122,
      //       diastole: 132,
      //       temperature: 37,
      //       respiration: 128,
      //       pulse: 90,
      //     },
      //   },
      // ]}
      // totalRows={80}
    />
  );
}
