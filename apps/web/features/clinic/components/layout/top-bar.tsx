"use client";

import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { NotificationPanel } from "../../../../components/layout/notification-panel";
import { useClinicLayoutStore } from "../../stores/use-clinic-layout-store";
import { LeftBar } from "./left-bar";

export function TopBar(): JSX.Element {
  const { isLeftBarOpen, onToggleLeftBar } = useClinicLayoutStore();

  return (
    <div className="flex-shrink-0 flex flex-row items-center justify-between w-full h-16 px-6 py-5 border-b">
      <Button
        className="p-1 h-fit hidden sm:block md:block lg:block xl:block 2xl:block"
        onClick={onToggleLeftBar}
        variant="ghost"
      >
        {isLeftBarOpen ? (
          <PanelLeftClose className="text-foreground" size={20} />
        ) : null}

        {!isLeftBarOpen && (
          <PanelLeftOpen className="text-foreground" size={20} />
        )}
      </Button>

      <Drawer direction="left">
        <DrawerTrigger className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
          <Menu className="text-foreground" size={20} />
        </DrawerTrigger>
        <DrawerContent className="w-screen left-0 max-w-64 h-full bg-white rounded-none block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
          <LeftBar />
        </DrawerContent>
      </Drawer>

      <NotificationPanel />
    </div>
  );
}
