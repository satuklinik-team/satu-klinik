"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { Form as AddUserForm } from "@/lezzform/_generated/adduserform";
import { useCreateUser } from "@/services/user/hooks/use-create-patient";
import type { CreateUserDto } from "@/services/user/types/dto";
import type { UserRole } from "@/services/user/types/entity";
import { UserQueryKeyFactory } from "@/services/user/utils/query-key.factory";

export function ClinicNewUserPage(): JSX.Element {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const { toast } = useToast();

  const { mutateAsync } = useCreateUser();

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      const formattedData: CreateUserDto = {
        fullname: dto.fullname as string,
        email: dto.email as string,
        phone: dto.phone as string,
        password: dto.password as string,
        role: dto.role as UserRole,
        address: dto.address as string,
      };

      await mutateAsync(formattedData);
      await queryClient.invalidateQueries({
        queryKey: new UserQueryKeyFactory().lists(),
      });
      toast({ title: "Berhasil Membuat User Baru!", variant: "success" });
    },
    [mutateAsync, queryClient, toast],
  );

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname.replace("/new", "")}>
              Data User
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Tambah User</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Add New User
        </h1>
        <p className="text-muted-foreground">detail user information</p>
      </div>

      <ClinicCard
        borderPosition="top"
        className="border-sky-500"
        title="Add New User"
      >
        <AddUserForm onSubmit={onSubmit} />
      </ClinicCard>
    </div>
  );
}
