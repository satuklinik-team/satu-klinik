"use client";

import { Suspense } from "react";

import { LoginPage } from "@/features/login/routes/login-page";

export default function Page(): JSX.Element {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
