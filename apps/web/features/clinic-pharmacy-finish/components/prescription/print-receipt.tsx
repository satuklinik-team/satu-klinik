"use client";

import dayjs from "dayjs";
import { Printer } from "lucide-react";
import { useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ClinicEntity } from "@/services/clinic/types/entity";
import type { PatientEntity } from "@/services/patient/types/entity";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";

interface PrescriptionPrintReceiptProps {
  prescriptions: PrescriptionEntity[];
  patient: PatientEntity;
  clinic: ClinicEntity;
}

export function PrescriptionPrintReceipt({
  prescriptions,
  patient,
  clinic,
}: PrescriptionPrintReceiptProps): React.JSX.Element {
  const printRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const today = useMemo(() => {
    return dayjs();
  }, []);

  const medicalRecord = patient.mr[patient.mr.length - 1];

  return (
    <div className="w-full">
      <Button
        className="w-full !bg-blue-500 hover:!bg-blue-400 text-white gap-2"
        onClick={handlePrint}
        type="button"
      >
        <Printer size={18} />
        <p>Print</p>
      </Button>
      <div
        className="hidden print:block w-full p-4 font-serif text-black"
        ref={printRef}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">{clinic.name}</h1>
          <p>{clinic.license ?? "-"}</p>
          <p className="text-sm mt-1">telp: {clinic.phone}</p>
          <p className="text-sm max-w-sm mx-auto">{clinic.address}</p>
        </div>
        <div className="w-full mt-4">
          <Separator className="h-1 bg-black" />
          <div className="grid grid-cols-[min-content_1fr] my-2 gap-1">
            <p>Name</p>
            <p>: {patient.fullname}</p>
            <p>RM</p>
            <p>: {patient.norm}</p>
            <p>Date</p>
            <p>: {medicalRecord.visitAt}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Medicine</p>
            <p className="font-semibold">Qty</p>
          </div>
          <Separator className="h-1 bg-black" />
          <div className="w-full flex flex-col gap-1 my-2">
            {prescriptions.map((prescription) => (
              <div
                className="flex items-start justify-between"
                key={prescription.id}
              >
                <div className="flex flex-col">
                  <p className="font-semibold leading-tight">
                    {prescription.Medicine?.title}
                  </p>
                  <p>
                    Usage {prescription.frequency} x {prescription.doseQuantity}
                  </p>
                </div>
                <p>{prescription.totalQuantity}</p>
              </div>
            ))}
          </div>
          <Separator className="h-[2px] bg-black" />
          <div className="text-center my-1">
            <p className="text-sm font-semibold">
              Habiskan obat. Semoga lekas sembuh.
            </p>
            <p className="text-sm font-semibold">
              {today.format("DD/MM/YYYY | HH:mm:ss")}
            </p>
          </div>
          <Separator className="h-[2px] bg-black" />
        </div>
      </div>
    </div>
  );
}
