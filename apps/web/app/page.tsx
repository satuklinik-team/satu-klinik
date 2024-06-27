"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);

  return <>Redirecting...</>;
}
