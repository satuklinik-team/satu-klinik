"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import type { RouteParams } from "@/types";

export function ClinicEditPatientTemplate({
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
            name: "Edit Patient Profile",
            path: pathname,
          },
        ]}
        description="Fill the form below to edit this patient profile"
        title="Edit Patient Profile"
      />

      {children}
    </div>
  );
}
