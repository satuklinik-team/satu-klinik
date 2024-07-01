"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import type { RouteParams } from "@/types";

export function ClinicPharmacyFinishTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { clinicId } = useParams<RouteParams>();
  const pathname = usePathname();

  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[
          { name: "Pharmacy Dashboard", path: `/clinic/${clinicId}/pharmacy` },
          {
            name: "Prescription",
            path: pathname,
          },
        ]}
        description="Manage prescription"
        title="Prescription"
      />

      {children}
    </div>
  );
}
