"use client";

import { extend } from "dayjs";
import duration from "dayjs/plugin/duration";
import { useSearchParams } from "next/navigation";

import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";

import { PatientProfileContent } from "./patient-profile-content";

extend(duration);

export function ClinicDiagnosePatientProfile(): JSX.Element | undefined {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");

  const { data: patientData } = useGetPatient(String(patientId));

  if (!patientData) return;

  const medicalRecord = patientData.mr[patientData.mr.length - 1];
  const vitalSign = medicalRecord.vitalSign[medicalRecord.vitalSign.length - 1];

  return (
    <ClinicCard>
      <PatientProfileContent patient={patientData} vitalSign={vitalSign} />
    </ClinicCard>
  );
}
