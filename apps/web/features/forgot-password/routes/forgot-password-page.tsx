"use client";

import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";

import { ForgotPasswordForm } from "../components/form";

export function ForgotPasswordPage(): JSX.Element {
  return (
    <AuthFormWrapper
      description="Enter your email address to reset your password."
      title="Forgot Password"
    >
      <ForgotPasswordForm />
    </AuthFormWrapper>
  );
}
