"use client";

import { Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";
import { Form as LoginForm } from "@/lezzform/_generated/loginform";
import { useAuthLogin } from "@/services/auth/hooks/use-auth-login";
import type { AuthLoginDto } from "@/services/auth/types";

export function LoginPage(): JSX.Element {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync } = useAuthLogin();

  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      const formattedData: AuthLoginDto = {
        email: dto.email as string,
        password: dto.password as string,
      };

      const data = await mutateAsync(formattedData);

      toast({ title: "Berhasil Masuk!", variant: "success" });

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.roles === "OWNER") {
        router.replace("/members");
        return;
      }

      if (data.user.roles === "PHARMACY") {
        router.replace(`/clinic/${data.clinic.id}/pharmacy`);
        return;
      }

      if (data.user.roles === "DOCTOR") {
        router.replace(`/clinic/${data.clinic.id}/doctor`);
        return;
      }

      router.replace(`/clinic/${data.clinic.id}`);
    },
    [mutateAsync, router, toast]
  );

  return (
    <AuthFormWrapper
      description="Enter your username and password to login."
      title="Login"
    >
      {Boolean(message) && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )}
      <LoginForm onSubmit={onSubmit} />
      <a className="text-sm text-muted-foreground -mt-1" href="/auth/register">
        Belum ada akun?{" "}
        <span className="text-primary font-medium">Register disini</span>
      </a>
    </AuthFormWrapper>
  );
}
