"use client";

import { Providers as AppProviders } from "@shared/providers";
import { AuthProvider } from "./auth-provider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <AuthProvider>{children}</AuthProvider>
    </AppProviders>
  );
}
