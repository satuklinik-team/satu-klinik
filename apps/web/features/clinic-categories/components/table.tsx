"use client";

import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { BaseTable as CategoryTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFindMedicineCategory } from "@/services/medicine-category/hooks/use-find-medicine-category";
import type { MedicineCategoryEntity } from "@/services/medicine-category/types/entity";
import type { Pagination } from "@/types";

export function ClinicCategoryTable(): JSX.Element {
  const { clinicId } = useParams();

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindMedicineCategory(pagination);

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
        renderCell: (row: MedicineCategoryEntity) => (
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
              <Tooltip>
                <TooltipTrigger className="h-min p-2">
                  <Trash className="text-red-500" size={20} />
                </TooltipTrigger>
                <TooltipContent>Hapus Kategori</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Cell>
        ),
      },
    ];
  }, [clinicId]);

  return (
    <CategoryTable<MedicineCategoryEntity>
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
