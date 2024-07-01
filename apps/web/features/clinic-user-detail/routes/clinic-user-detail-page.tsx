"use client";

import { useParams } from "next/navigation";

import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useGetUser } from "@/services/user/hooks/use-get-user";
import { formalizeWord, getInitial } from "@/utils";

export function ClinicUserDetailPage(): JSX.Element | undefined {
  const { userId } = useParams();

  const { data: userData } = useGetUser(String(userId));

  if (!userData) return;

  return (
    <div className="flex flex-col gap-4">
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
