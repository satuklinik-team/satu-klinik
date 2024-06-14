"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { BaseTable as CategoryTable } from "@/components/shared/table/base-table";
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
import { MedicineQueryKeyFactory } from "@/services/medicine/utils/query-key.factory";
import { useDeleteMedicineCategory } from "@/services/medicine-category/hooks/use-delete-medicine-category";
import { useFindMedicineCategory } from "@/services/medicine-category/hooks/use-find-medicine-category";
import type { MedicineCategoryEntity } from "@/services/medicine-category/types/entity";
import { MedicineCategoryQueryKeyFactory } from "@/services/medicine-category/utils/query-key.factory";
import type { Pagination } from "@/types";

export function ClinicCategoryTable(): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { clinicId } = useParams();

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindMedicineCategory(pagination);

  const [toBeDeletedId, setToBeDeletedId] = useState<string>("");
  const { mutateAsync: deleteMedicineCategory } =
    useDeleteMedicineCategory(toBeDeletedId);

  const columns = useMemo(() => {
    return [
      {
        key: "name",
        name: "Nama",
        renderCell: (row: MedicineCategoryEntity) => <Cell>{row.name}</Cell>,
      },
      {
        key: "action",
        name: "Action",
        renderCell: (row: MedicineCategoryEntity) => {
          const isContainMedicine = Boolean(row._count.Medicine);
          return (
            <Cell className="gap-2">
              <TooltipProvider>
                <Tooltip>
                  <Link
                    href={`/clinic/${clinicId as string}/categories/${row.id}/edit`}
                  >
                    <TooltipTrigger className="h-min p-2">
                      <Edit size={20} />
                    </TooltipTrigger>
                  </Link>
                  <TooltipContent>Edit Kategori</TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        disabled={isContainMedicine}
                        onClick={() => {
                          setToBeDeletedId(String(row.id));
                        }}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash className="text-red-500" size={20} />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {!isContainMedicine
                      ? "Hapus Kategori"
                      : "Tidak bisa hapus karena ada obat"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Cell>
          );
        },
      },
    ];
  }, [clinicId]);

  return (
    <>
      <CategoryTable<MedicineCategoryEntity>
        columns={columns}
        isLoading={isLoading}
        onPaginationChange={(currentPagination) => {
          setPagination(currentPagination);
        }}
        pagination={pagination}
        rows={data.data}
        totalRows={data.count}
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
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
              onClick={async () => {
                await deleteMedicineCategory();
                await Promise.all([
                  queryClient.invalidateQueries({
                    queryKey: new MedicineCategoryQueryKeyFactory().lists(),
                  }),
                  queryClient.invalidateQueries({
                    queryKey: new MedicineQueryKeyFactory().lists(),
                  }),
                ]);

                setToBeDeletedId("");

                toast({
                  title: "Berhasil Menghapus Kategori!",
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
