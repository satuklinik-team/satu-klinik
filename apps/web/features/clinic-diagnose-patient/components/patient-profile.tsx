"use client";

import dayjs, { extend } from "dayjs";
import duration from "dayjs/plugin/duration";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useGetPatient } from "@/services/patient/hooks/use-get-patient";
import { getInitial, getWhatsappUrl } from "@/utils";

extend(duration);

export function ClinicDiagnosePatientProfile(): JSX.Element | undefined {
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
  );
}
