"use client";

import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { useClinicLayoutStore } from "../../stores/use-clinic-layout-store";
import { leftBarGroups } from "../../utils";
import { LeftBarGroup } from "../ui/left-bar-group";
import { LeftBarItem } from "../ui/left-bar-item";
import { LeftBarTitle } from "../ui/left-bar-title";
import { UserButton } from "./user-button";

export function LeftBar(): JSX.Element {
  const { isLeftBarOpen } = useClinicLayoutStore();

  const pathname = usePathname();
  const { clinicId } = useParams();

  const reducedPathname = pathname.replace(`clinic/${clinicId as string}`, "");

  return (
    <div className="flex flex-col justify-between h-screen border-r">
      <div className="flex flex-row items-center w-full h-16 px-5 py-5 border-b">
        {!isLeftBarOpen && (
          <Image
            alt="Brand Logo"
            className="w-8 h-8"
            height={44}
            src="/brand-logo-2.png"
            width={253}
          />
        )}

        {isLeftBarOpen && (
          <Image
            alt="Brand Logo"
            height={32}
            src="/brand-logo.png"
            width={172}
          />
        )}
      </div>

      <div className="flex-1 overflow-x-auto">
        {leftBarGroups.map((group, index) => (
          <LeftBarGroup
            className={cn(index === 0 && "border-t-0")}
            isOpen={isLeftBarOpen}
            key={group.id}
          >
            <LeftBarTitle isOpen={isLeftBarOpen}>{group.category}</LeftBarTitle>
            {group.items.map((item) => {
              let isActive;

              if (item.path !== "/")
                isActive = reducedPathname.includes(item.path);

              if (item.path === "/") isActive = item.path === reducedPathname;

              return (
                <LeftBarItem
                  isActive={isActive}
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
