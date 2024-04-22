import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";

export function ResetPasswordPage(): JSX.Element {
  return (
    <AuthFormWrapper
      description="Enter your email address and new password."
      title="Reset Password"
    />
  );
}
