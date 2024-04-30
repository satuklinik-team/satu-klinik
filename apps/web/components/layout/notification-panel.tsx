import { Bell } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export function NotificationPanel(): JSX.Element {
  return (
    <Drawer direction="right">
      <DrawerTrigger className="p-1 hover:bg-muted-foreground/10 rounded-md">
        <Bell className="text-foreground" size={20} />
      </DrawerTrigger>
      <DrawerContent className="w-screen max-w-xs h-full bg-white rounded-none">
        <p className="px-4 py-5 lg:py-4 text-lg font-medium border-b">
          Notifications
        </p>
      </DrawerContent>
    </Drawer>
  );
}
