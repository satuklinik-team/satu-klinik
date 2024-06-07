"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { BaseTable as PatientTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { useFindPatientAssessment } from "@/services/patient-assessment/hooks/use-find-patient-assessment-history";
import type { PatientAssessmentEntity } from "@/services/patient-assessment/types/entity";
import type { Pagination } from "@/types";

export function ClinicDiagnoseHistory(): JSX.Element {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindPatientAssessment({
    ...pagination,
    patientId,
  });

  const columns = useMemo(() => {
    return [
      {
        key: "lastVisit",
        name: "LAST VISIT",
        renderCell: (row: PatientAssessmentEntity) => {
          return <Cell>{row.Patient_medical_records.visitLabel}</Cell>;
        },
      },
      {
        key: "diagnoses",
        name: "DIAGNOSES",
        renderCell: (row: PatientAssessmentEntity) => {
          return (
            <Cell className="flex flex-col items-start gap-1">
              <p>S : {row.subjective}</p>
              <p>O : {row.objective}</p>
              <p>A : {row.assessment}</p>
              <p>P : {row.plan}</p>
              <p>
                ICD10 : {row.icd10.code} | {row.icd10.strt}
              </p>
              <p>
                ICD9 : {row.icd9CM.code} | {row.icd9CM.str}
              </p>
            </Cell>
          );
        },
      },
      {
        key: "prescription",
        name: "PRESCRIPTION",
        renderCell: (row: PatientAssessmentEntity) => {
          return (
            <Cell className="gap-2">
              {row.Patient_medical_records.prescription.length} kind(s)
            </Cell>
          );
        },
      },
    ];
  }, []);

  return (
    <PatientTable<PatientAssessmentEntity>
      columns={columns}
      isLoading={isLoading}
      onPaginationChange={(currentPagination) => {
        setPagination(currentPagination);
      }}
      pagination={pagination}
      rows={data?.data ?? []}
      totalRows={data?.count}
    />
  );
}
