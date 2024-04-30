"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";
import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";
import { Form as LoginForm } from "@/lezzform/_generated/loginform";
import { useAuthLogin } from "@/services/auth/hooks/use-auth-login";
import type { AuthLoginDto } from "@/services/auth/types";

export function LoginPage(): JSX.Element {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync } = useAuthLogin();

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      const formattedData: AuthLoginDto = {
        email: dto.email as string,
        password: dto.password as string,
      };

      await mutateAsync(formattedData);
      toast({ title: "Berhasil Masuk!", variant: "success" });
      router.replace("/members");
    },
    [mutateAsync, router, toast]
  );

  return (
    <AuthFormWrapper
      description="Enter your username and password to login."
      title="Login"
    >
      <LoginForm onSubmit={onSubmit} />
    </AuthFormWrapper>
  );
}
