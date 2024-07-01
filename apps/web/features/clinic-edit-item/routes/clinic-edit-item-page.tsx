"use client";

import { useParams } from "next/navigation";

import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useGetMedicine } from "@/services/medicine/hooks/use-get-medicine";

import { ClinicEditItemForm } from "../components/form";

export function ClinicEditItemPage(): JSX.Element | undefined {
  const { itemId } = useParams();

  const { data: medicineData } = useGetMedicine(Number(itemId));

  if (!medicineData) return;

  return (
    <div className="flex flex-col gap-4">
      <ClinicCard title="Edit Item">
        <ClinicEditItemForm defaultValues={medicineData} />
      </ClinicCard>
    </div>
  );
}
