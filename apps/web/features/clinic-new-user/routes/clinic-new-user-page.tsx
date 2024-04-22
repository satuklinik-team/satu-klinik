"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ClinicCard } from "@/features/clinic/components/ui/card";

export function ClinicNewUserPage(): JSX.Element {
  const pathname = usePathname();

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
      />
    </div>
  );
}
