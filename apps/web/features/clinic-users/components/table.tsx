"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Eye, MessageCircle, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { BaseTable as UsersTable } from "@/components/shared/table/base-table";
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
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useDeleteUser } from "@/services/user/hooks/use-delete-user";
import { useFindUser } from "@/services/user/hooks/use-find-user";
import type { UserEntity } from "@/services/user/types/entity";
import { UserQueryKeyFactory } from "@/services/user/utils/query-key.factory";
import type { Pagination } from "@/types";
import { getWhatsappUrl } from "@/utils";

import { ClinicUsersNameCell } from "./cell/name-cell";
import { ClinicUsersRoleCell } from "./cell/role-cell";
import { ClinicUsersStatusCell } from "./cell/status-cell";

export function ClinicUsersTable(): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { clinicId } = useParams();

  const [pagination, setPagination] = useState<Pagination>({
    skip: 0,
    limit: 20,
  });

  const { data, isLoading } = useFindUser({
    ...pagination,
    count: true,
  });

  const [toBeDeletedId, setToBeDeletedId] = useState<string>("");
  const { mutateAsync: deleteUser } = useDeleteUser(toBeDeletedId);

  const columns = useMemo(() => {
    return [
      {
        key: "name",
        name: "Nama",
        renderCell: ClinicUsersNameCell,
      },
      {
        key: "role",
        name: "Role",
        renderCell: ClinicUsersRoleCell,
      },
      {
        key: "status",
        name: "Status",
        renderCell: ClinicUsersStatusCell,
      },
      {
        key: "action",
        name: "Action",
        renderCell: (row: UserEntity) => (
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
                <Link href={`/clinic/${clinicId as string}/users/${row.id}`}>
                  <TooltipTrigger className="h-min p-2">
                    <Eye size={20} />
                  </TooltipTrigger>
                </Link>
                <TooltipContent>Lihat Detail</TooltipContent>
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
                <TooltipContent>Hapus Pengguna</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Cell>
        ),
      },
    ];
  }, []);

  return (
    <>
      <ClinicCard className="mt-6">
        <UsersTable<UserEntity>
          columns={columns}
          isLoading={isLoading}
          onPaginationChange={(currentPagination) => {
            setPagination(currentPagination);
          }}
          rows={data?.data ?? []}
          totalRows={data?.count}
        />
      </ClinicCard>
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
              user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
              onClick={async () => {
                await deleteUser();
                await queryClient.invalidateQueries({
                  queryKey: new UserQueryKeyFactory().lists(),
                });

                setToBeDeletedId("");

                toast({
                  title: "Berhasil Menghapus User!",
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
