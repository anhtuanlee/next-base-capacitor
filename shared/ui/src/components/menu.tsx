"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { useAuthStore } from "@shared/state";
import { AuthModal } from "./auth-modal";
import { Button } from "./button";

export type MenuItem = {
  href: string;
  label: string;
};

export function TopNavWithMenu({
  title = "App",
  items,
}: {
  title?: string;
  items: MenuItem[];
}) {
  const { user, setUser } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleSignOut = () => {
    setUser(null);
    setOpen(false);
  };
  React.useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-full mx-auto flex items-center gap-3 px-4">
          <button
            aria-label="Open menu"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border"
            onClick={() => setOpen(true)}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="text-sm font-semibold">{title}</div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[80%] border-r bg-background p-4 transition-transform",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-base font-semibold">Menu</div>
          <button
            aria-label="Close menu"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="space-y-1">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-6 border-t">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 text-sm text-gray-600">
                  Welcome, {user.name || user.email}
                </div>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full justify-start"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    setShowAuthModal(true);
                    setOpen(false);
                  }}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAuthModal(true);
                    setOpen(false);
                  }}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </nav>
      </aside>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
}
