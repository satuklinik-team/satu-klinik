"use client";

import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";

// import { SignUp } from "@/lezzauth/_generated/components/sign-up";

export function RegisterPage(): JSX.Element {
  return (
    <AuthFormWrapper
      description="Enter your details to create your account."
      title="Register"
    />
  );
}
