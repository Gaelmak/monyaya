"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export default function ContextProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
