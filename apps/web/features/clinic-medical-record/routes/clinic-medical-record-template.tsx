"use client";

import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";

export function ClinicMedicalRecordTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[]}
        description="Patient visit history"
        title="Medical Records"
      />

      {children}
    </div>
  );
}
