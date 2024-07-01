"use client";

import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";

export function ClinicDashboardTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[]}
        description="Selamat datang di dashboard Klinik Demo Husada"
        title="Dashboard"
      />

      {children}
    </div>
  );
}
