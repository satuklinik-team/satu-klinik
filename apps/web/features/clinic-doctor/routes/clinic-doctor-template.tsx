"use client";

import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";

export function ClinicDoctorTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[]}
        description="Welcome doctor!"
        title="Doctor Dashboard"
      />

      {children}
    </div>
  );
}
