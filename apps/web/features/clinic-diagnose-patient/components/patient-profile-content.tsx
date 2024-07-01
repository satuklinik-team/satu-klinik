"use client";

import dayjs, { extend } from "dayjs";
import duration from "dayjs/plugin/duration";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { PatientEntity } from "@/services/patient/types/entity";
import type { VitalSignEntity } from "@/services/patient-vital-sign/types/entity";
import { getInitial, getWhatsappUrl } from "@/utils";

extend(duration);

interface PatientProfileProps {
  patient: PatientEntity;
  vitalSign: VitalSignEntity;
}

export function PatientProfileContent({
  patient,
  vitalSign,
}: PatientProfileProps): JSX.Element {
  const isValidAllergic = vitalSign.allergic.length > 1;

  return (
    <div className="flex flex-col items-center sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row gap-12 px-5 py-3">
      <div className="flex flex-col items-center gap-2 text-sm">
        <div className="flex items-center justify-center w-12 h-12 shrink-0 text-sm bg-border rounded-full border-2">
          <p>{getInitial(patient.fullname)}</p>
        </div>
        <p>{patient.fullname}</p>
        <p>{patient.norm}</p>
        <Link href={getWhatsappUrl(patient.phone)}>
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
              <p>{patient.sex}</p>
            </div>

            <div>
              <p className="font-semibold">Tanggal Lahir</p>
              <p>{dayjs(patient.birthAt).format("YYYY-MM-DD")}</p>
            </div>

            <div>
              <p className="font-semibold">Umur</p>
              <p>{dayjs().diff(dayjs(patient.birthAt), "year")}</p>
            </div>

            <div>
              <p className="font-semibold">Alamat</p>
              <p>{patient.address}</p>
            </div>

            <div>
              <p className="font-semibold">Nomor Telepon</p>
              <p>{patient.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <p className="font-semibold">Suhu</p>
              <p>{vitalSign.temperature} ℃</p>
            </div>

            <div>
              <p className="font-semibold">Tinggi</p>
              <p>{vitalSign.height} cm</p>
            </div>

            <div>
              <p className="font-semibold">Berat</p>
              <p>{vitalSign.weight} kg</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <p className="font-semibold">Tekanan Darah</p>
            <p>
              {vitalSign.systole} / {vitalSign.diastole} mmHg
            </p>
          </div>

          <div>
            <p className="font-semibold">Denyut Nadi</p>
            <p>{vitalSign.pulse} bpm</p>
          </div>

          <div>
            <p className="font-semibold">Respirasi</p>
            <p>{vitalSign.respiration} bpm</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <p className="font-semibold">Alergi</p>
            {!isValidAllergic && <p>{vitalSign.allergic}</p>}
            {Boolean(isValidAllergic) && (
              <div className="px-2 bg-destructive text-white rounded-md relative">
                <p className="font-semibold text-lg">{vitalSign.allergic}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
