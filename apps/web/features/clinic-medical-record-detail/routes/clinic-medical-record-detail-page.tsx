"use client";

import { useParams } from "next/navigation";

import { ClinicCard } from "@/features/clinic/components/ui/card";
import { PatientProfileContent } from "@/features/clinic-diagnose-patient/components/patient-profile-content";
import { useGetPatientMedicalRecord } from "@/services/patient-medical-record/hooks/use-get-patient-medical-record";
import type { PatientMedicalRecordEntity } from "@/services/patient-medical-record/types/entity";
import type { RouteParams } from "@/types";

export function ClinicMedicalRecordDetailPage(): React.JSX.Element {
  const { mrId } = useParams<RouteParams>();
  const { data: patientMedicalRecord, isLoading } =
    useGetPatientMedicalRecord(mrId);

  if (isLoading || !patientMedicalRecord) return <>Loading...</>;

  const medicalRecord =
    patientMedicalRecord as Required<PatientMedicalRecordEntity>;
  const vitalSign = medicalRecord.vitalSign[medicalRecord.vitalSign.length - 1];

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Medical Record
        </h1>
        <p className="text-muted-foreground">Summary of patient</p>
      </div>
      <ClinicCard>
        <PatientProfileContent
          patient={medicalRecord.Patient}
          vitalSign={vitalSign}
        />
      </ClinicCard>
      {/* <ClinicDiagnosePatientProfile />
      <ClinicCard className="mt-6">
        <Tabs defaultValue="soap">
          <TabsList className="flex flex-row justify-start gap-1 mb-4">
            <TabsTrigger value="soap">SOAP</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="soap">
            <ClinicDiagnosePatientForm />
          </TabsContent>
          <TabsContent value="history">
            <ClinicDiagnoseHistory />
          </TabsContent>
        </Tabs>
      </ClinicCard> */}
    </div>
  );
}
