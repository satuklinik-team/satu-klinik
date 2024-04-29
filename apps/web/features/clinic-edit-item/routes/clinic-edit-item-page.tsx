"use client";

import { useParams, usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ClinicCard } from "@/features/clinic/components/ui/card";

export function ClinicEditItemPage(): JSX.Element {
  const pathname = usePathname();
  const { itemId } = useParams();

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={pathname.replace(`/${itemId as string}/edit`, "")}
            >
              Data Inventori
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname.replace("/edit", "")}>
              Nama Item
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Edit Item</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Edit Item
        </h1>
        <p className="text-muted-foreground">
          Fill the form below to edit this item
        </p>
      </div>

      <ClinicCard title="Edit Item" />
    </div>
  );
}
