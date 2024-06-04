"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Edit, Eye, MessageCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { BaseTable as PatientTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useDeletePatient } from "@/services/patient/hooks/use-delete-patient";
import { useFindPatient } from "@/services/patient/hooks/use-find-patient";
import type { PatientEntity } from "@/services/patient/types/entity";
import { PatientQueryKeyFactory } from "@/services/patient/utils/query-key.factory";
import type { Pagination } from "@/types";
import { getWhatsappUrl } from "@/utils";

import { ClinicPatientNameCell } from "./cell/name-cell";

export function ClinicPatientTable(): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { clinicId } = useParams();

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindPatient({
    ...pagination,
    count: true,
  });

  const columns = useMemo(() => {
    return [
      {
        key: "name",
        name: "Nama",
        renderCell: ClinicPatientNameCell,
      },
      {
        key: "action",
        name: "Action",
        renderCell: (row: PatientEntity) => {
          return (
            <Cell className="gap-2">
              <TooltipProvider>
                <Tooltip>
                  <Link href={getWhatsappUrl(row.phone)}>
                    <TooltipTrigger className="h-min p-2">
                      <MessageCircle className="text-green-500" size={20} />
                    </TooltipTrigger>
                  </Link>
                  <TooltipContent>Kontak WA</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <Link
                    href={`/clinic/${clinicId as string}/patient/${row.id}`}
                  >
                    <TooltipTrigger className="h-min p-2">
                      <Eye size={20} />
                    </TooltipTrigger>
                  </Link>
                  <TooltipContent>Lihat Detail</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <Link
                    href={`/clinic/${clinicId as string}/patient/${row.id}/edit`}
                  >
                    <TooltipTrigger className="h-min p-2">
                      <Edit size={20} />
                    </TooltipTrigger>
                  </Link>
                  <TooltipContent>Edit Pasien</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger
                    className="h-min p-2"
                    onClick={() => {
                      setToBeDeletedId(String(row.id));
                    }}
                  >
                    <Trash className="text-red-500" size={20} />
                  </TooltipTrigger>
                  <TooltipContent>Hapus Pasien</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Cell>
          );
        },
      },
    ];
  }, [clinicId]);

  const [toBeDeletedId, setToBeDeletedId] = useState<string>("");
  const { mutateAsync: deleteMedicineCategory } =
    useDeletePatient(toBeDeletedId);

  return (
    <>
      <PatientTable<PatientEntity>
        columns={columns}
        isLoading={isLoading}
        onPaginationChange={(currentPagination) => {
          setPagination(currentPagination);
        }}
        pagination={pagination}
        rows={data?.data ?? []}
        totalRows={data?.count}
      />
      <AlertDialog
        onOpenChange={(value) => {
          if (!value) setToBeDeletedId("");
        }}
        open={Boolean(toBeDeletedId)}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              patient.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
              onClick={async () => {
                await deleteMedicineCategory();

                await queryClient.invalidateQueries({
                  queryKey: new PatientQueryKeyFactory().lists(),
                });

                setToBeDeletedId("");

                toast({
                  title: "Berhasil Menghapus Pasien!",
                  variant: "success",
                });
              }}
              variant="ghost"
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
