import { AuthFormWrapper } from "@/features/auth/components/layout/form-wrapper";

export function LoginPage(): JSX.Element {
  return (
    <AuthFormWrapper
      description="Enter your username and password to login."
      title="Login"
    />
  );
}
