"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import type { RouteParams } from "@/types";

export function ClinicNewCategoryTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { clinicId } = useParams<RouteParams>();
  const pathname = usePathname();

  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[
          { name: "Categories", path: `/clinic/${clinicId}/categories` },
          {
            name: "Add New Category",
            path: pathname,
          },
        ]}
        description="Fill the form below to create new category"
        title="Add New Category"
      />

      {children}
    </div>
  );
}
