"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export type TabItem = {
  href: string;
  label: string;
};

export function TabBar({ items }: { items: TabItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ul className="grid grid-cols-3">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="text-center">
              <Link
                href={item.href}
                className={cn(
                  "block py-3 text-sm",
                  active ? "font-semibold" : "text-gray-500 dark:text-gray-400"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
