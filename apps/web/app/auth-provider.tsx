"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@shared/state";
import { User } from "@shared/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (status === "authenticated" && session?.user) {
      const sUser = session.user as { id?: string; name?: string | null; email?: string | null; image?: string | null };
      const user: User = {
        id: sUser.id || sUser.email || "",
        email: sUser.email || "",
        name: sUser.name || undefined,
      };
      setUser(user);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session, status, setUser, setLoading]);

  return <>{children}</>;
}
