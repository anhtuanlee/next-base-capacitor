import type { Metadata } from "next";
import "./globals.css";
import { TabBar, TopNavWithMenu } from "@shared/ui";
import { ClientProviders } from "./client-providers";

export const metadata: Metadata = {
  title: "Mobile App",
  description: "Mobile-targeted build for Capacitor",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TopNavWithMenu
          title="Mobile App"
          items={[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            { href: "/settings", label: "Settings" },
          ]}
        />
        <div className="min-h-[100svh] pt-12 pb-16">
          <ClientProviders>{children}</ClientProviders>
        </div>
        <TabBar
          items={[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            { href: "/settings", label: "Settings" },
          ]}
        />
      </body>
    </html>
  );
}
