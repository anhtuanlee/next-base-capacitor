import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNavWithMenu } from "@shared/ui";
import { ClientProviders } from "./client-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web App",
  description: "Web version mirroring mobile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TopNavWithMenu
          title="Web App"
          items={[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            { href: "/settings", label: "Settings" },
          ]}
        />
        <div className="min-h-[100svh] pt-12">
          <ClientProviders>{children}</ClientProviders>
        </div>
      </body>
    </html>
  );
}
