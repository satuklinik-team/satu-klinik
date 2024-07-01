"use client";

import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";

export function ClinicUsersTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[]}
        description="Manage user"
        title="Users"
      />

      {children}
    </div>
  );
}
