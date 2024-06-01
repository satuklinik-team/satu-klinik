"use client";

import {
  QueryClient as LezzcodeQueryClient,
  QueryClientProvider as LezzcodeQueryClientProvider,
} from "@lezzcode/query";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { ExceptionHandler } from "@/services/shared/exception";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { toast } = useToast();
  const [lezzcodeQueryClient] = useState(new LezzcodeQueryClient());
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
        mutations: {
          onError(err) {
            const exceptionHandler = new ExceptionHandler();

            toast({
              title: exceptionHandler.error(err).message,
              variant: "destructive",
            });
          },
        },
      },
      queryCache: new QueryCache({
        onError: (err) => {
          const exceptionHandler = new ExceptionHandler();

          toast({
            title: exceptionHandler.error(err).message,
            variant: "destructive",
          });
        },
      }),
    }),
  );

  return (
    <LezzcodeQueryClientProvider client={lezzcodeQueryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </LezzcodeQueryClientProvider>
  );
}
