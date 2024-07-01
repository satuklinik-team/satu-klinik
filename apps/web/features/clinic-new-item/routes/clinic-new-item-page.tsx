"use client";

import { ClinicCard } from "@/features/clinic/components/ui/card";

import { ClinicNewItemForm } from "../components/form";

export function ClinicNewItemPage(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <ClinicCard title="Add New Item">
        <ClinicNewItemForm />
      </ClinicCard>
    </div>
  );
}
