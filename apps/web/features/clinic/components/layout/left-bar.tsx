"use client";

import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { type HTMLAttributes, useMemo } from "react";

import { useGetUserData } from "@/hooks/use-get-user-data";
import { cn } from "@/lib/utils";
import { useGetNotification } from "@/services/tasks-status/services/use-get-notification";

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
  const { clinicId } = useParams();

  const { data: notificationData } = useGetNotification();
  const { roles } = useGetUserData();

  const reducedPathname = pathname.replace(`clinic/${clinicId as string}`, "");

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
            getIsValidMenuAccess(roles, { groupId: item.id, menuId: menu.id }),
          )
          .includes(true);

        return isValid;
      })
      .map((item) => {
        const newItems = item.items.filter((menu) => {
          const access = isValidMenuAccess(roles);
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
        className,
      )}
      {...rest}
    >
      <div className="flex flex-row items-center w-full h-16 px-5 py-5 border-b">
        <Image
          alt="Brand Logo"
          className={cn("w-8 h-8 hidden", !isLeftBarOpen && "hidden sm:block")}
          height={44}
          src="/brand-logo-2.png"
          width={253}
        />

        <Image
          alt="Brand Logo"
          className={cn(!isLeftBarOpen && "block sm:hidden")}
          height={32}
          src="/brand-logo.png"
          width={172}
        />
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
              let isNotified;

              if (item.path !== "/")
                isActive = reducedPathname.includes(item.path);

              if (item.path === "/") isActive = item.path === reducedPathname;

              if (
                item.path === "/doctor" &&
                Boolean(notificationData?.doctorTask)
              )
                isNotified = true;

              if (
                item.path === "/pharmacy" &&
                Boolean(notificationData?.pharmacyTask)
              )
                isNotified = true;

              return (
                <LeftBarItem
                  isActive={isActive}
                  isNotified={isNotified}
                  isOpen={isLeftBarOpen}
                  key={item.text}
                  {...item}
                  path={`/clinic/${clinicId as string}${item.path}`}
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
