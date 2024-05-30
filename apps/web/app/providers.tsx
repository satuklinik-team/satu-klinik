"use client";

import {
  QueryClient as LezzcodeQueryClient,
  QueryClientProvider as LezzcodeQueryClientProvider,
} from "@lezzcode/query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [lezzcodeQueryClient] = useState(new LezzcodeQueryClient());
  const [queryClient] = useState(new QueryClient());

  return (
    <LezzcodeQueryClientProvider client={lezzcodeQueryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </LezzcodeQueryClientProvider>
  );
}
