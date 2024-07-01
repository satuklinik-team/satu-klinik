"use client";

import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";

export function ClinicItemsTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[]}
        description="Manage inventories"
        title="Inventories"
      />

      {children}
    </div>
  );
}
