"use client";

import { useMemo } from "react";

import { MedicalRecordTable } from "@/features/clinic-medical-record/components/tables/medical-record-table";
import type { PatientEntity } from "@/services/patient/types/entity";
import type { PatientMedicalRecordEntity } from "@/services/patient-medical-record/types/entity";

interface PatientDetailMedicalRecordTableProps {
  patient: PatientEntity;
}

export function PatientDetailMedicalRecordTable({
  patient,
}: PatientDetailMedicalRecordTableProps): React.JSX.Element {
  const rows = useMemo<PatientMedicalRecordEntity[]>(() => {
    return patient.mr.map((item) => ({
      ...item,
      Patient: patient,
    }));
  }, [patient]);

  return <MedicalRecordTable rows={rows} />;
}
