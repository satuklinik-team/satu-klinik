"use client";

import { Edit, Trash } from "lucide-react";
import { useCallback, useMemo } from "react";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";

interface ClinicDiagnosePatientPrescriptionTable {
  prescriptions: PrescriptionEntity[];
  onEdit: (currentPrescription: PrescriptionEntity) => void;
  onDelete: (index: number) => void;
}

export function ClinicDiagnosePatientPrescriptionTable({
  prescriptions,
  onEdit,
  onDelete,
}: ClinicDiagnosePatientPrescriptionTable): JSX.Element {
  const onDeletePrescription = useCallback(
    (id: string) => {
      const currentIndex = prescriptions.findIndex((item) => item.id === id);
      onDelete(currentIndex);
    },
    [onDelete, prescriptions],
  );

  const columns = useMemo(() => {
    return [
      {
        key: "name",
        name: "R/",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell className="flex flex-col items-start gap-0">
            <p className="text-base font-semibold">
              {prescription.medicine?.title}
            </p>
            <p className="text-muted-foreground">{prescription.notes}</p>
          </Cell>
        ),
      },
      {
        key: "dose",
        name: "DOSIS",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell>
            {prescription.frequency} x {prescription.doseQuantity}
          </Cell>
        ),
      },
      {
        key: "duration",
        name: "DURASI",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell>{prescription.supplyDuration} hari</Cell>
        ),
      },
      {
        key: "measurement",
        name: "SATUAN",
        renderCell: () => <Cell>kaplet</Cell>,
      },
      {
        key: "totalQuantity",
        name: "JUMLAH",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell>{prescription.totalQuantity}</Cell>
        ),
      },
      {
        key: "actions",
        name: "",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell className="gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className="h-min p-2"
                  onClick={() => {
                    onEdit(prescription);
                  }}
                >
                  <Edit size={20} />
                </TooltipTrigger>
                <TooltipContent>Edit Preskripsi</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  className="h-min p-2"
                  onClick={() => {
                    onDeletePrescription(String(prescription.id));
                  }}
                >
                  <Trash className="text-red-500" size={20} />
                </TooltipTrigger>
                <TooltipContent>Hapus Preskripsi</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Cell>
        ),
      },
    ];
  }, [onDeletePrescription, onEdit]);

  return (
    <BaseTable<PrescriptionEntity> columns={columns} rows={prescriptions} />
  );
}
