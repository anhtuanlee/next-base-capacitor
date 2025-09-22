import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Web runs with server runtime (SSR) to support next-auth and APIs
  experimental: {
    externalDir: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
