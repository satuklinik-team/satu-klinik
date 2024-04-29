import { Ellipsis, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useClinicLayoutStore } from "../../stores/use-clinic-layout-store";

export function UserButton(): JSX.Element {
  const { isLeftBarOpen } = useClinicLayoutStore();

  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <div className="flex flex-row items-center gap-3 w-full px-5 py-2.5 border-t hover:bg-muted-foreground/10 transition">
          <Avatar className="w-8 h-8">
            <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "flex flex-col transition",
              !isLeftBarOpen && "hidden"
            )}
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
      </PopoverTrigger>

      <PopoverContent className="p-0 py-1">
        <div className="flex flex-col px-4 py-2 border-b">
          <p className="text-sm">Nona Perma - Owner</p>
          <p className="text-muted-foreground text-xs">nonaperma@gmail.com</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-muted-foreground/10 transition">
          <LogOut className="text-red-500" size={16} />
          <p className="text-red-500 text-sm">Logout</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
