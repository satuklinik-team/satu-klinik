"use client";

import { Suspense } from "react";

import { ResetPasswordPage } from "@/features/reset-password/routes/reset-password-page";

export default function Page(): JSX.Element {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  );
}
