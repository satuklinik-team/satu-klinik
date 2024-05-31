import { Ellipsis, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetUserData } from "@/hooks/use-get-user-data";
import { cn } from "@/lib/utils";
import { useAuthLogout } from "@/services/auth/hooks/use-auth-logout";
import { formalizeWord, getInitial } from "@/utils";

import { useClinicLayoutStore } from "../../features/clinic/stores/use-clinic-layout-store";
import { useToast } from "../ui/use-toast";

interface UserButtonProps {
  classNames?: {
    container?: string;
  };
}

export function UserButton({ classNames }: UserButtonProps): JSX.Element {
  const { isLeftBarOpen } = useClinicLayoutStore();
  const router = useRouter();
  const { mutateAsync } = useAuthLogout();
  const { toast } = useToast();

  const { email, fullname, roles } = useGetUserData();

  const onLogout = useCallback(async () => {
    await mutateAsync();
    toast({ title: "Berhasil logout!", variant: "success" });
    router.replace("/auth/login");
  }, [mutateAsync, router, toast]);

  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <div
          className={cn(
            "flex flex-row items-center gap-3 w-full px-5 py-2.5 border-t hover:bg-muted-foreground/10 transition",
            classNames?.container,
          )}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
            <AvatarFallback>{getInitial(fullname)}</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "flex flex-col transition",
              !isLeftBarOpen && "flex sm:hidden",
            )}
          >
            <p className="text-sm">{fullname}</p>
            <p className="text-muted-foreground text-xs">{email}</p>
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
          <p className="text-sm">
            {fullname} - {formalizeWord(roles)}
          </p>
          <p className="text-muted-foreground text-xs">{email}</p>
        </div>
        <Button
          className="w-full flex justify-start items-center gap-2 px-4 py-2 cursor-pointer hover:bg-muted-foreground/10 transition rounded-none"
          onClick={onLogout}
          variant="ghost"
        >
          <LogOut className="text-red-500" size={16} />
          <p className="text-red-500 text-sm">Logout</p>
        </Button>
      </PopoverContent>
    </Popover>
  );
}
