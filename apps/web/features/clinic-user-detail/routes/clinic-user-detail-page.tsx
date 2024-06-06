"use client";

import { useParams, usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useGetUserData } from "@/hooks/use-get-user-data";
// import { useGetUser } from "@/services/user/hooks/use-get-user";
import { formalizeWord, getInitial } from "@/utils";

export function ClinicUserDetailPage(): JSX.Element | undefined {
  const pathname = usePathname();
  const { userId } = useParams();

  //   const { data: userData } = useGetUser(String(userId));
  const userData = useGetUserData();

  //   if (!userData) return;

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname.replace(`/${userId as string}`, "")}>
              Data User
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Profil User</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          User&apos;s Profile
        </h1>
        <p className="text-muted-foreground">Manage user&apos;s profile</p>
      </div>

      <ClinicCard className="w-fit">
        <div className="flex flex-col items-center gap-2 text-sm">
          <div className="flex items-center justify-center w-12 h-12 shrink-0 text-sm bg-border rounded-full border-2">
            <p>{getInitial(userData.fullname)}</p>
          </div>
          <p>
            {userData.fullname} - {formalizeWord(userData.roles)}
          </p>
          <p className="text-muted-foreground">{userData.email}</p>
        </div>
      </ClinicCard>
    </div>
  );
}
