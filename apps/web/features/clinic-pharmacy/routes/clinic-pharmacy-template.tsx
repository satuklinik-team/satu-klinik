"use client";

import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";

export function ClinicPharmacyTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[]}
        description="Manage prescription tasks"
        title="Pharmacy Dashboard"
      />

      {children}
    </div>
  );
}
