"use client";

import { useEffect } from "react";
import { useAuthStore } from "@shared/state";
import { AuthClient } from "@shared/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const authClient = new AuthClient();
        const user = await authClient.getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
