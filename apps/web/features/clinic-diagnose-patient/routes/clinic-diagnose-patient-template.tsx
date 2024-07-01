"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import type { RouteParams } from "@/types";

export function ClinicDiagnosePatientTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { clinicId } = useParams<RouteParams>();
  const pathname = usePathname();

  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[
          { name: "Doctor Dashboard", path: `/clinic/${clinicId}/doctor` },
          { name: "Diagnose Patient", path: pathname },
        ]}
        description="Diagnose the current patient"
        title="Diagnose Patient"
      />

      {children}
    </div>
  );
}
