"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";
import { getInitial, getWhatsappUrl } from "@/utils";

export function ClinicPharmacyFinishPatientProfile(): JSX.Element | undefined {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");

  const { data: patientData } = useGetPatient(String(patientId));

  if (!patientData) return;

  return (
    <ClinicCard>
      <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-12 px-5 py-3">
        <div className="flex flex-col items-center gap-2 text-sm">
          <div className="flex items-center justify-center w-12 h-12 shrink-0 text-sm bg-border rounded-full border-2">
            <p>{getInitial(patientData.fullname)}</p>
          </div>
          <p>{patientData.fullname}</p>
          <p>{patientData.norm}</p>
          <Link href={getWhatsappUrl(patientData.phone)}>
            <Button className="bg-white" variant="outline">
              Kirim Pesan
            </Button>
          </Link>
        </div>
      </div>
    </ClinicCard>
  );
}
