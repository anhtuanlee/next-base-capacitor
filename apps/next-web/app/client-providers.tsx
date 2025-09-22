"use client";

import { SessionProvider } from "next-auth/react";
import { Providers as AppProviders } from "@shared/providers";
import { AuthProvider } from "./auth-provider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppProviders>
        <AuthProvider>{children}</AuthProvider>
      </AppProviders>
    </SessionProvider>
  );
}
