"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import { useGetPatientMedicalRecord } from "@/services/patient-medical-record/hooks/use-get-patient-medical-record";
import type { PatientMedicalRecordEntity } from "@/services/patient-medical-record/types/entity";
import type { RouteParams } from "@/types";

export function ClinicMedicalRecordDetailTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element | null {
  const { clinicId, mrId } = useParams<RouteParams>();
  const pathname = usePathname();

  const { data: patientMedicalRecord, isLoading } =
    useGetPatientMedicalRecord(mrId);

  const medicalRecord =
    patientMedicalRecord as Required<PatientMedicalRecordEntity>;

  if (isLoading) return null;

  const formattedVisitAt = medicalRecord.visitAt;

  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[
          { name: "Medical Records", path: `/clinic/${clinicId}/mr/report` },
          {
            name: `Medical Record at ${formattedVisitAt}`,
            path: pathname,
          },
        ]}
        description="Patient summary"
        title={`Medical Record at ${formattedVisitAt}`}
      />

      {children}
    </div>
  );
}
