"use client";

import { Edit, Trash } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useDisclose } from "@/hooks/use-disclose";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";

import { PrescriptionForm } from "./form";

interface PrescriptionTable {
  value: PrescriptionEntity[];
  onChange?: (value: PrescriptionEntity[]) => unknown;
  readOnly?: boolean;
}

export function PrescriptionTable({
  value,
  onChange,
  readOnly,
}: PrescriptionTable): JSX.Element {
  const { toast } = useToast();
  const { isOpen, onClose, onOpen } = useDisclose();

  const onChangeRef = useRef<PrescriptionTable["onChange"]>(onChange);

  useEffect(() => {
    if (!onChange) return;

    onChangeRef.current = onChange;
  }, [onChange]);

  const onDeletePrescription = useCallback(
    (medicineId: number) => {
      if (!onChangeRef.current) return;

      onChangeRef.current(
        value.filter((item) => item.medicineId !== medicineId),
      );
    },
    [value],
  );

  const [selectedPrescription, setSelectedPrescription] =
    useState<PrescriptionEntity | null>(null);

  const isEdit = Boolean(selectedPrescription);

  const onFormModalClose = useCallback(
    (open: boolean) => {
      if (open) {
        onOpen();
        return;
      }

      setSelectedPrescription(null);
      onClose();
    },
    [onClose, onOpen],
  );

  const columns = useMemo(() => {
    const baseColumns = [
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
    ];

    if (!readOnly) {
      baseColumns.push({
        key: "actions",
        name: "",
        renderCell: (prescription: PrescriptionEntity) => (
          <Cell className="gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setSelectedPrescription(prescription);
                      onOpen();
                    }}
                    size="sm"
                    type="button"
                    variant="ghost"
                  >
                    <Edit size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Preskripsi</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      if (!prescription.medicineId) return;

                      onDeletePrescription(prescription.medicineId);
                    }}
                    size="sm"
                    type="button"
                    variant="ghost"
                  >
                    <Trash className="text-red-500" size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Hapus Preskripsi</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Cell>
        ),
      });
    }
    return baseColumns;
  }, [onDeletePrescription, onOpen, readOnly]);

  return (
    <div className="flex flex-col gap-3">
      <BaseTable<PrescriptionEntity> columns={columns} rows={value} />
      {!readOnly && (
        <Button
          className="w-min"
          onClick={() => {
            onOpen();
          }}
          size="sm"
          type="button"
          variant="ghost"
        >
          + Add More
        </Button>
      )}
      <PrescriptionForm
        defaultValues={selectedPrescription}
        onOpenChange={onFormModalClose}
        onSubmit={(prescription) => {
          if (!onChangeRef.current) return;

          const findSameMedicine = value.find(
            (item) => item.medicineId === prescription.medicineId,
          );
          if (findSameMedicine) {
            toast({
              title: "Terjadi Kesalahan!",
              description: "Tidak boleh mendaftarkan obat yang sama",
              variant: "warning",
            });
            return;
          }

          onFormModalClose(false);

          const newPrescription: PrescriptionEntity = {
            ...prescription,
            medicineId: prescription.medicine?.id,
            totalQuantity:
              prescription.supplyDuration *
              prescription.frequency *
              prescription.doseQuantity,
          };

          if (isEdit) {
            onChangeRef.current(
              value.map((item) => {
                if (item.medicineId === prescription.medicineId)
                  return newPrescription;
                return item;
              }),
            );
            return;
          }

          onChangeRef.current([...value, newPrescription]);
        }}
        open={isOpen}
        title={!isEdit ? "Add Prescription" : "Edit Prescription"}
      />
    </div>
  );
}
