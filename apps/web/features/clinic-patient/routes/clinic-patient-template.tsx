"use client";

import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";

export function ClinicPatientTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[]}
        description="Manage patients"
        title="Patient Dashboard"
      />

      {children}
    </div>
  );
}
