"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { type HTMLAttributes, useMemo } from "react";

import { useGetUserData } from "@/hooks/use-get-user-data";
import { cn } from "@/lib/utils";
import { useGetNotification } from "@/services/tasks-status/services/use-get-notification";
import type { RouteParams } from "@/types";

import { UserButton } from "../../../../components/layout/user-button";
import { useClinicLayoutStore } from "../../stores/use-clinic-layout-store";
import { leftBarGroups } from "../../utils";
import { getIsValidMenuAccess, isValidMenuAccess } from "../../utils/helpers";
import { LeftBarGroup } from "../ui/left-bar-group";
import { LeftBarItem } from "../ui/left-bar-item";
import { LeftBarTitle } from "../ui/left-bar-title";

type LeftBarProps = HTMLAttributes<HTMLDivElement>;

export function LeftBar({ className, ...rest }: LeftBarProps): JSX.Element {
  const { isLeftBarOpen } = useClinicLayoutStore();
  const pathname = usePathname();
  const { clinicId } = useParams<RouteParams>();

  const { data: notificationData } = useGetNotification();
  const { roles } = useGetUserData();

  const currentClinicPathname = pathname.replace(`clinic/${clinicId}`, "");

  const authorizedleftBarGroups = useMemo(() => {
    // if (roles === "PHARMACY")
    //   return leftBarGroups.filter((item) => item.id === "3");

    // if (roles === "DOCTOR")
    //   return leftBarGroups.filter((item) => {
    //     // return ["1", "2", "4", "5"].includes(item.id);
    //     const isValidGroup = getIsValidMenuAccess("DOCTOR")
    //   });

    return leftBarGroups
      .filter((item) => {
        const isValid = item.items
          .map((menu) =>
            getIsValidMenuAccess(roles, { groupId: item.id, menuId: menu.id })
          )
          .includes(true);

        return isValid;
      })
      .map((item) => {
        const newItems = item.items.filter((menu) => {
          const access = isValidMenuAccess(roles);
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- necessary
          if (access.menu["*"]) return true;

          return access.menu[item.id].includes(menu.id);
        });

        return { ...item, items: newItems };
      });
  }, [roles]);

  return (
    <div
      className={cn(
        "flex flex-col justify-between h-screen border-r",
        className
      )}
      {...rest}
    >
      <div className="flex flex-row items-center w-full h-16 px-5 py-5 border-b">
        <Link href="/members">
          <Image
            alt="Brand Logo"
            className={cn(
              "w-8 h-8 hidden",
              !isLeftBarOpen && "hidden sm:block"
            )}
            height={44}
            src="/brand-logo-2.png"
            width={253}
          />
        </Link>

        <Link href="/members">
          <Image
            alt="Brand Logo"
            className={cn(!isLeftBarOpen && "block sm:hidden")}
            height={32}
            src="/brand-logo.png"
            width={172}
          />
        </Link>
      </div>

      <div className="flex-1 overflow-x-auto">
        {authorizedleftBarGroups.map((group, index) => (
          <LeftBarGroup
            className={cn(index === 0 && "border-t-0")}
            isOpen={isLeftBarOpen}
            key={group.id}
          >
            <LeftBarTitle isOpen={isLeftBarOpen}>{group.category}</LeftBarTitle>
            {group.items.map((item) => {
              let isActive;
              let notifCount = 0;

              if (item.path !== "/") {
                isActive = currentClinicPathname.includes(item.path);
              }

              if (item.path === "/") {
                isActive = item.path === currentClinicPathname;
              }

              if (
                item.path.includes("/doctor") &&
                Boolean(notificationData?.doctorTask)
              ) {
                notifCount = notificationData?.doctorTask ?? 0;
              }

              if (
                item.path.includes("/pharmacy") &&
                Boolean(notificationData?.pharmacyTask)
              ) {
                notifCount = notificationData?.pharmacyTask ?? 0;
              }

              return (
                <LeftBarItem
                  isActive={isActive}
                  isOpen={isLeftBarOpen}
                  key={item.text}
                  notifCount={notifCount}
                  {...item}
                  path={`/clinic/${clinicId}${item.path}`}
                />
              );
            })}
          </LeftBarGroup>
        ))}
      </div>

      <UserButton />
    </div>
  );
}
