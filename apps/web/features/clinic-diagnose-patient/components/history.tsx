"use client";

import { Copy } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { BaseTable as PatientTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";
import { useFindPatientAssessment } from "@/services/patient-assessment/hooks/use-find-patient-assessment-history";
import type { CreatePatientAssessmentSchema } from "@/services/patient-assessment/types/dto";
import type { PatientAssessmentEntity } from "@/services/patient-assessment/types/entity";
import type { Pagination, RouteParams } from "@/types";

import { useDiagnosePatientStore } from "../stores/use-diagnose-patient-store";

export function ClinicDiagnoseHistory(): JSX.Element {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");
  const { mrId } = useParams<RouteParams>();

  const { toast } = useToast();
  const { data: patientData } = useGetPatient(String(patientId));
  const medicalRecord = patientData?.mr[patientData.mr.length - 1];
  const vitalSign =
    medicalRecord?.vitalSign[medicalRecord.vitalSign.length - 1];

  const { setDiagnose } = useDiagnosePatientStore();

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
                ICD10 :{" "}
                {row.icd10 ? `${row.icd10.code} | ${row.icd10.strt}` : "-"}
              </p>
              <p>
                ICD9 :{" "}
                {row.icd9CM ? `${row.icd9CM.code} | ${row.icd9CM.str}` : "-"}
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
      {
        key: "action",
        name: "ACTION",
        renderCell: (row: PatientAssessmentEntity) => {
          const copyData = {
            assessment: row.assessment,
            icd10Code: row.icd10?.code ?? "",
            objective: row.objective,
            plan: row.plan,
            subjective: `${vitalSign?.pain ?? ""}\n====${
              row.Patient_medical_records.visitLabel
            }====\n${row.subjective}\n`,
            icd9CMCode: row.icd9CM?.code ?? "",
            mrid: mrId,
            prescriptions: row.Patient_medical_records.prescription,
          } as unknown as CreatePatientAssessmentSchema;
          return (
            <Cell className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <Button
                      onClick={async () => {
                        setDiagnose({ mrId, patientId: patientId! }, copyData);
                        toast({
                          title: "Berhasil menyalin data",
                          variant: "success",
                        });
                        await navigator.clipboard.writeText(
                          JSON.stringify(copyData),
                        );
                      }}
                      size="sm"
                      variant="ghost"
                    >
                      <Copy size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Salin data</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Cell>
          );
        },
      },
    ];
  }, [mrId, patientId, setDiagnose, toast, vitalSign?.pain]);

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
