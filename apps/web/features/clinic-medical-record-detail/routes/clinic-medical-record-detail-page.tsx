"use client";

import { useParams } from "next/navigation";

import { ClinicCard } from "@/features/clinic/components/ui/card";
import { PatientProfileContent } from "@/features/clinic-diagnose-patient/components/patient-profile-content";
import { useGetPatientMedicalRecord } from "@/services/patient-medical-record/hooks/use-get-patient-medical-record";
import type { PatientMedicalRecordEntity } from "@/services/patient-medical-record/types/entity";
import type { RouteParams } from "@/types";

import { MedicalRecordDetailDiagnoseForm } from "../components/medical-record-detail-diagnose-form";

export function ClinicMedicalRecordDetailPage(): React.JSX.Element {
  const { mrId } = useParams<RouteParams>();
  const { data: patientMedicalRecord, isLoading } =
    useGetPatientMedicalRecord(mrId);

  const medicalRecord =
    patientMedicalRecord as Required<PatientMedicalRecordEntity>;

  if (isLoading) return <>Loading...</>;

  const vitalSign = medicalRecord.vitalSign[medicalRecord.vitalSign.length - 1];

  return (
    <div className="h-full">
      <ClinicCard>
        <PatientProfileContent
          patient={medicalRecord.Patient}
          vitalSign={vitalSign}
        />
      </ClinicCard>
      <ClinicCard className="mt-4">
        <MedicalRecordDetailDiagnoseForm medicalRecord={medicalRecord} />
      </ClinicCard>
    </div>
  );
}
