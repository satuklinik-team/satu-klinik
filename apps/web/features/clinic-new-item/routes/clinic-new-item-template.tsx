"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import type { RouteParams } from "@/types";

export function ClinicNewItemTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { clinicId } = useParams<RouteParams>();
  const pathname = usePathname();

  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[
          { name: "Inventories", path: `/clinic/${clinicId}/items` },
          {
            name: "Add New Item",
            path: pathname,
          },
        ]}
        description="Fill the form below to create new item"
        title="Add New Item"
      />

      {children}
    </div>
  );
}
