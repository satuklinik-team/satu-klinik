"use client";

import dayjs from "dayjs";
import { useParams, usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { MedicalRecordTable } from "@/features/clinic-medical-record/components/tables/medical-record-table";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";
import { useFindPatientMedicalRecord } from "@/services/patient-medical-record/hooks/use-find-patient-medical-record";
import { getInitial } from "@/utils";

export function ClinicPatientDetailPage(): JSX.Element | undefined {
  const pathname = usePathname();
  const { patientId } = useParams();

  const { data: patientData } = useGetPatient(String(patientId));
  const { data: patientMedicalRecord } = useFindPatientMedicalRecord({
    patientId,
    count: true,
  });

  if (!patientMedicalRecord || !patientData) return;

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
        <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-12 px-5 py-3">
          <div className="flex flex-col items-center gap-2 text-sm">
            <div className="flex items-center justify-center w-12 h-12 shrink-0 text-sm bg-border rounded-full border-2">
              <p>{getInitial(patientData.fullname)}</p>
            </div>
            <p>{patientData.fullname}</p>
            <p>{patientData.norm}</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-4 sm:gap-12 md:gap-12 lg:gap-12 xl:gap-12 2xl:gap-12 text-sm font-normal">
            <div className="flex flex-col gap-2 sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
              <div className="flex flex-col gap-2">
                <div>
                  <p className="font-semibold">Jenis Kelamin</p>
                  <p>{patientData.sex}</p>
                </div>

                <div>
                  <p className="font-semibold">Tanggal Lahir</p>
                  <p>{dayjs(patientData.birthAt).format("YYYY-MM-DD")}</p>
                </div>

                <div>
                  <p className="font-semibold">Umur</p>
                  <p>{dayjs().diff(dayjs(patientData.birthAt), "year")}</p>
                </div>

                <div>
                  <p className="font-semibold">Alamat</p>
                  <p>{patientData.address}</p>
                </div>

                <div>
                  <p className="font-semibold">Nomor Telepon</p>
                  <p>{patientData.phone}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <p className="font-semibold">Suhu</p>
                  <p>{patientData.mr[0]?.vitalSign[0].temperature} ℃</p>
                </div>

                <div>
                  <p className="font-semibold">Tinggi</p>
                  <p>{patientData.mr[0]?.vitalSign[0].height} cm</p>
                </div>

                <div>
                  <p className="font-semibold">Berat</p>
                  <p>{patientData.mr[0]?.vitalSign[0].weight} kg</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="font-semibold">Tekanan Darah</p>
                <p>
                  {patientData.mr[0]?.vitalSign[0].systole} /{" "}
                  {patientData.mr[0]?.vitalSign[0].diastole} mmHg
                </p>
              </div>

              <div>
                <p className="font-semibold">Denyut Nadi</p>
                <p>{patientData.mr[0]?.vitalSign[0].pulse} bpm</p>
              </div>

              <div>
                <p className="font-semibold">Respirasi</p>
                <p>{patientData.mr[0]?.vitalSign[0].respiration} bpm</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="font-semibold">Alergi</p>
                <p>{patientData.mr[0]?.vitalSign[0].allergic}</p>
              </div>
            </div>
          </div>
        </div>
      </ClinicCard>
      <ClinicCard>
        <MedicalRecordTable rows={patientMedicalRecord.data} />
      </ClinicCard>
    </div>
  );
}
