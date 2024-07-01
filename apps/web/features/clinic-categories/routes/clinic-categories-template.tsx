"use client";

import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";

export function ClinicCategoriesTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[]}
        description="Manage categories"
        title="Categories"
      />

      {children}
    </div>
  );
}
