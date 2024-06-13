"use client";

import { Edit, Trash } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDisclose } from "@/hooks/use-disclose";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";

import { PrescriptionForm } from "./form";

interface PrescriptionTable {
  value: PrescriptionEntity[];
  onChange?: (value: PrescriptionEntity[]) => unknown;
}

export function PrescriptionTable({
  value,
  onChange,
}: PrescriptionTable): JSX.Element {
  const { isOpen, onClose } = useDisclose();

  const onChangeRef = useRef<PrescriptionTable["onChange"]>(onChange);

  useEffect(() => {
    if (!onChange) return;

    onChangeRef.current = onChange;
  }, [onChange]);

  const onDeletePrescription = useCallback(
    (id: string) => {
      //   const currentIndex = prescriptions.findIndex((item) => item.id === id);
      //   onDelete(currentIndex);

      if (onChangeRef.current) {
        onChangeRef.current(value.filter((item) => item.id !== id));
      }
    },
    [value],
  );

  const [selectedPrescription, setSelectedPrescription] =
    useState<PrescriptionEntity | null>(null);

  const onFormModalClose = useCallback(
    (open: boolean) => {
      if (open) return;

      setSelectedPrescription(null);
      onClose;
    },
    [onClose],
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
                    setSelectedPrescription(prescription);
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
  }, [onDeletePrescription]);

  return (
    <>
      <BaseTable<PrescriptionEntity> columns={columns} rows={value} />
      {/* <PrescriptionForm
        defaultValues={selectedPrescription}
        onOpenChange={onFormModalClose}
        onSubmit={(prescription) => {
          const newPrescription = {
            ...prescription,
            medicineId: prescription.medicine?.id,
            totalQuantity:
              prescription.supplyDuration *
              prescription.frequency *
              prescription.doseQuantity,
          };

          if (onAddPrescription) {
            insert(prescriptions.length, newPrescription);
            setOnAddPrescription(false);
          }

          if (onEditPrescription) {
            const currentIndex = prescriptions.findIndex(
              (item) => item.medicine?.id === newPrescription.medicine?.id
            );
            update(currentIndex, newPrescription);
            setOnEditPrescription(null);
          }
        }}
        open={Boolean(onAddPrescription) || Boolean(onEditPrescription)}
        title={onAddPrescription ? "Add Prescription" : "Edit Prescription"}
      /> */}
    </>
  );
}
