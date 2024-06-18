import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";

import { ResetPasswordForm } from "../components/form";

export function ResetPasswordPage(): JSX.Element {
  return (
    <AuthFormWrapper
      description="Enter your email address and new password."
      title="Reset Password"
    >
      <ResetPasswordForm />
    </AuthFormWrapper>
  );
}
