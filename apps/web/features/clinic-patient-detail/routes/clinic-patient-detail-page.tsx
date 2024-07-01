"use client";

import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { PatientProfileContent } from "@/features/clinic-diagnose-patient/components/patient-profile-content";
import { MedicalRecordTable } from "@/features/clinic-medical-record/components/tables/medical-record-table";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";
import { useFindPatientMedicalRecord } from "@/services/patient-medical-record/hooks/use-find-patient-medical-record";
import type { Pagination } from "@/types";

export function ClinicPatientDetailPage(): JSX.Element | undefined {
  const pathname = usePathname();
  const { patientId } = useParams();

  const { data: patientData } = useGetPatient(String(patientId));
  const { data: patientMedicalRecord } = useFindPatientMedicalRecord({
    patientId,
    count: true,
  });

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  if (!patientMedicalRecord || !patientData) return;

  const medicalRecord = patientData.mr[patientData.mr.length - 1];
  const vitalSign = medicalRecord.vitalSign[medicalRecord.vitalSign.length - 1];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={pathname.replace(`/${patientId as string}`, "")}
            >
              Data Pasien
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Profil Pasien</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Patient&apos;s Profile
        </h1>
        <p className="text-muted-foreground">
          Manage patient&apos;s profile and records{" "}
        </p>
      </div>

      <ClinicCard>
        <PatientProfileContent patient={patientData} vitalSign={vitalSign} />
      </ClinicCard>

      <ClinicCard>
        <MedicalRecordTable
          onPaginationChange={(currentPagination) => {
            setPagination(currentPagination);
          }}
          pagination={pagination}
          rows={patientMedicalRecord.data}
          totalRows={patientMedicalRecord.count}
        />
      </ClinicCard>
    </div>
  );
}
