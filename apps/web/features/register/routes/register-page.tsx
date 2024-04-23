"use client";

import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";
import { Form as RegisterForm } from "@/lezzform/_generated/subscribeform";

export function RegisterPage(): JSX.Element {
  return (
    <AuthFormWrapper
      description="Enter your details to create your account."
      title="Register"
    >
      <RegisterForm />
    </AuthFormWrapper>
  );
}
