"use client";

import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";

export function ClinicGeneralSettingsTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[]}
        description="Configure system parameters"
        title="Settings"
      />

      {children}
    </div>
  );
}
