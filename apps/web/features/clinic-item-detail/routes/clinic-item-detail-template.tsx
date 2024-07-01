"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import type { RouteParams } from "@/types";

export function ClinicItemDetailTemplate({
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
            name: "Item Detail",
            path: pathname,
          },
        ]}
        description="Current item detailed information"
        title="Item Detail"
      />

      {children}
    </div>
  );
}
