"use client";

import { Edit, Eye, HeartPulse, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type ComponentProps, useEffect, useMemo, useRef } from "react";

import { BloodBagOutlineIcon } from "@/components/icons/blood-bag-outline";
import { HeightFilledIcon } from "@/components/icons/height-filled";
import { LungOutlineIcon } from "@/components/icons/lung-outline";
import { ScaleOutlineIcon } from "@/components/icons/scale-outline";
import { ThermometerOutlineIcon } from "@/components/icons/thermometer-outline";
import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClinicPatientVitals } from "@/features/clinic-patient/components/shared/vitals";
import { cn } from "@/lib/utils";
import type { PatientMedicalRecordEntity } from "@/services/patient-medical-record/types/entity";
import type { RouteParams } from "@/types";
import { getInitial, getWhatsappUrl } from "@/utils";

type BaseTableProps = ComponentProps<
  typeof BaseTable<PatientMedicalRecordEntity>
>;

interface ActionDelete {
  type: "delete";
  row: PatientMedicalRecordEntity;
}

type Action = ActionDelete;

interface MedicalRecordTableProps extends Omit<BaseTableProps, "columns"> {
  columns?:
    | BaseTableProps["columns"]
    | ((columns: BaseTableProps["columns"]) => BaseTableProps["columns"]);
  onAction?: (action: Action) => unknown;
}

export function MedicalRecordTable({
  columns: propsColumns,
  onAction,
  ...props
}: MedicalRecordTableProps): React.JSX.Element {
  const { clinicId } = useParams<RouteParams>();

  const onActionRef = useRef<MedicalRecordTableProps["onAction"]>(onAction);

  useEffect(() => {
    if (!onAction) return;

    onActionRef.current = onAction;
  }, [onAction]);

  const rawColumns = useMemo(() => {
    return [
      {
        key: "visit",
        name: "VISIT",
        renderCell: (row: PatientMedicalRecordEntity) => (
          <Cell className="max-w-8">{row.visitAt}</Cell>
        ),
      },
      {
        key: "name",
        name: "NAME",
        renderCell: (row: PatientMedicalRecordEntity) => {
          const vitalSign = row.vitalSign?.[0];

          return (
            <Cell className="gap-3">
              <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-border rounded-full border-2">
                <p>{getInitial(row.Patient.fullname)}</p>
              </div>
              <div>
                <p className="font-bold">{row.Patient.fullname}</p>
                <p className="font-normal">{row.Patient.norm}</p>
                <p className="font-normal">{row.Patient.address}</p>
                <ClinicPatientVitals
                  vitals={[
                    {
                      icon: <Stethoscope size={16} />,
                      value: vitalSign
                        ? `${vitalSign.systole} / ${vitalSign.diastole}`
                        : "-",
                      label: "Sistole / Diastole",
                    },
                    {
                      icon: <ThermometerOutlineIcon size={16} />,
                      value: vitalSign ? `${vitalSign.temperature} C` : "-",
                      label: "Suhu Badan",
                    },
                    {
                      icon: <HeightFilledIcon size={16} />,
                      value: vitalSign ? `${vitalSign.height} cm` : "-",
                      label: "Tinggi Badan",
                    },
                    {
                      icon: (
                        <ScaleOutlineIcon
                          className="fill-transparent stroke-foreground"
                          size={16}
                        />
                      ),
                      value: vitalSign ? `${vitalSign.weight} kg` : "-",
                      label: "Berat Badan",
                    },
                    {
                      icon: <HeartPulse size={16} />,
                      value: vitalSign?.pulse ?? "-",
                      label: "Detak Jantung",
                    },
                    {
                      icon: <LungOutlineIcon size={18} />,
                      value: vitalSign?.respiration ?? "-",
                      label: "Respirasi",
                    },
                    {
                      icon: <BloodBagOutlineIcon size={18} />,
                      value: row.Patient.blood.toLocaleUpperCase(),
                      label: "Golongan Darah",
                    },
                  ]}
                />
              </div>
            </Cell>
          );
        },
      },
      {
        key: "action",
        name: "ACTION",
        renderCell: (row: PatientMedicalRecordEntity) => (
          <Cell className="gap-2 max-w-8">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <Link href={getWhatsappUrl(row.Patient.phone)}>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Image
                        alt="whatsapp icon"
                        height={20}
                        src="/icons/whatsapp-icon.svg"
                        width={20}
                      />
                    </Button>
                  </TooltipTrigger>
                </Link>
                <TooltipContent>Kontak WA</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={100}>
                <Link href={`/clinic/${clinicId}/mr/report/${row.id}`}>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Eye size={20} />
                    </Button>
                  </TooltipTrigger>
                </Link>
                <TooltipContent>Detail</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div>
                    <Link
                      className={cn(!row.canModify && "pointer-events-none")}
                      href={`/clinic/${clinicId}/mr/report/${row.id}?edit=true`}
                    >
                      <Button
                        disabled={!row.canModify}
                        size="icon"
                        variant="ghost"
                      >
                        <Edit className="text-yellow-500" size={20} />
                      </Button>
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {row.canModify
                    ? "Ubah Medical Record"
                    : "Tidak bisa ubah medical record (max 2x24 jam)"}
                </TooltipContent>
              </Tooltip>
              {/* <Tooltip delayDuration={100}>
                <TooltipTrigger
                  className="h-min p-2"
                  onClick={() => {
                    onActionRef.current?.({
                      type: "delete",
                      row,
                    });
                  }}
                >
                  <Trash className="text-red-500" size={20} />
                </TooltipTrigger>
                <TooltipContent>Hapus Patient Medical Record</TooltipContent>
              </Tooltip> */}
            </TooltipProvider>
          </Cell>
        ),
      },
    ];
  }, [clinicId]);

  const columns = useMemo(() => {
    if (Array.isArray(propsColumns)) {
      return propsColumns;
    }

    if (typeof propsColumns === "function") {
      return propsColumns(rawColumns);
    }

    return rawColumns;
  }, [propsColumns, rawColumns]);

  return <BaseTable<PatientMedicalRecordEntity> columns={columns} {...props} />;
}
