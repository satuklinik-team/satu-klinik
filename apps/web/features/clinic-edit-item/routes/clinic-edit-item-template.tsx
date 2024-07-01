"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import type { RouteParams } from "@/types";

export function ClinicEditItemTemplate({
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
            name: "Edit Item",
            path: pathname,
          },
        ]}
        description="Fill the form below to edit current item"
        title="Edit Item"
      />

      {children}
    </div>
  );
}
