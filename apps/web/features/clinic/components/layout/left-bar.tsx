"use client";

import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useClinicLayoutStore } from "../../stores/use-clinic-layout-store";
import { leftBarGroups } from "../../utils";
import { LeftBarGroup } from "../ui/left-bar-group";
import { LeftBarItem } from "../ui/left-bar-item";
import { LeftBarTitle } from "../ui/left-bar-title";

export function LeftBar(): JSX.Element {
  const { isLeftBarOpen } = useClinicLayoutStore();

  const pathname = usePathname();
  const { clinicId } = useParams();

  const reducedPathname = pathname.replace(`clinic/${clinicId as string}`, "");

  return (
    <div className="flex flex-col justify-between h-screen border-r">
      <div className="flex flex-row items-center w-full h-16 px-5 py-5 border-b">
        <Image
          alt="Brand Logo"
          className="w-8 h-8"
          height={44}
          src="/brand-logo-2.png"
          width={253}
        />
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
                  path={`${pathname}${item.path}`}
                />
              );
            })}
          </LeftBarGroup>
        ))}
      </div>

      <div className="flex flex-row items-center gap-3 w-full px-5 py-2.5 border-t">
        <Avatar className="w-8 h-8">
          <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div
          className={cn("flex flex-col transition", !isLeftBarOpen && "hidden")}
        >
          <p className="text-sm">Nona Perma</p>
          <p className="text-muted-foreground text-xs">nonaperma@gmail.com</p>
        </div>
        <Button
          className={cn("p-1 h-fit transition", !isLeftBarOpen && "hidden")}
          variant="ghost"
        >
          <Ellipsis className="text-muted-foreground" size={16} />
        </Button>
      </div>
    </div>
  );
}
