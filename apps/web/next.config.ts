import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Capacitor
  output: "export",
  images: {
    // Required for static export to avoid remote image optimization
    unoptimized: true,
  },
};

export default nextConfig;
