"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import type { RouteParams } from "@/types";

export function ClinicPatientDetailTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { clinicId } = useParams<RouteParams>();
  const pathname = usePathname();

  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[
          { name: "Patient Dashboard", path: `/clinic/${clinicId}/patient` },
          {
            name: "Patient Profile",
            path: pathname,
          },
        ]}
        description="Manage patient profile and records"
        title="Patient Profile"
      />

      {children}
    </div>
  );
}
