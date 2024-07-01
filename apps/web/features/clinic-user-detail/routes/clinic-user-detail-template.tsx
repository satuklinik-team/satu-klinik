"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";

import { HeaderTemplate } from "@/components/layout/header-template";
import type { RouteParams } from "@/types";

export function ClinicUserDetailTemplate({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  const { clinicId } = useParams<RouteParams>();
  const pathname = usePathname();

  return (
    <div className="h-full">
      <HeaderTemplate
        breadcrumbs={[
          { name: "Users", path: `/clinic/${clinicId}/users` },
          {
            name: "User Profile",
            path: pathname,
          },
        ]}
        description="Manage current user profile"
        title="User Profile"
      />

      {children}
    </div>
  );
}
