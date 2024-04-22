import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";

export function ForgotPasswordPage(): JSX.Element {
  return (
    <AuthFormWrapper
      description="Enter your email address where you forgot the password."
      title="Forgot Password"
    />
  );
}
