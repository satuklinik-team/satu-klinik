"use client";

import { LezzAuthProvider } from "lezzauth/nextjs";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <LezzAuthProvider
      publishableKey={process.env.NEXT_PUBLIC_LEZZAUTH_PUBLISHABLE_KEY!}
    >
      {children}
    </LezzAuthProvider>
  );
}
