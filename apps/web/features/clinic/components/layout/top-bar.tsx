"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useClinicLayoutStore } from "../../stores/use-clinic-layout-store";

export function TopBar(): JSX.Element {
  const { isLeftBarOpen, onToggleLeftBar } = useClinicLayoutStore();

  return (
    <div className="flex flex-row items-center justify-between w-full h-16 px-6 py-5 border-b">
      <Button className="p-1 h-fit" onClick={onToggleLeftBar} variant="ghost">
        {isLeftBarOpen ? (
          <PanelLeftClose className="text-muted-foreground" size={20} />
        ) : (
          <PanelLeftOpen className="text-muted-foreground" size={20} />
        )}
      </Button>
    </div>
  );
}
