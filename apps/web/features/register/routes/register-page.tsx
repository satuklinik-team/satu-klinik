"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useToast } from "@/components/ui/use-toast";
import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";
import { Form as RegisterForm } from "@/lezzform/_generated/subscribeform";
import { useAuthRegister } from "@/services/auth/hooks/use-auth-register";
import type { AuthRegisterDto } from "@/services/auth/types";

export function RegisterPage(): JSX.Element {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync } = useAuthRegister();

  const onSubmit = useCallback(
    async (_form: object, dto: Record<string, unknown>) => {
      const formattedData: AuthRegisterDto = {
        fullname: dto.fullname as string,
        email: dto.email as string,
        password: dto.password as string,
        clinicName: dto.clinicName as string,
        clinicEmail: dto.clinicEmail as string,
        clinicPhone: dto.clinicPhone as string,
        clinicAddress: dto.clinicAddress as string,
      };

      await mutateAsync(formattedData);
      toast({ title: "Akun berhasil dibuat!", variant: "success" });
      router.replace("/members");
    },
    [mutateAsync, router, toast]
  );

  return (
    <AuthFormWrapper
      description="Enter your details to create your account."
      title="Register"
    >
      <RegisterForm onSubmit={onSubmit} />
    </AuthFormWrapper>
  );
}
