"use client";

import { useParams, usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// import { ClinicPatientTable } from "../components/table";

export function ClinicPatientDetailPage(): JSX.Element {
  const pathname = usePathname();
  const { medicalRecordNumber } = useParams();

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={pathname.replace(`/${medicalRecordNumber as string}`, "")}
            >
              Data Pasien
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Profil Pasien</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Patient&apos;s Profile
        </h1>
        <p className="text-muted-foreground">
          Manage patient&apos;s profile and records{" "}
        </p>
      </div>
    </div>
  );
}
