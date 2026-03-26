import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root for Turbopack to avoid picking up other lockfiles above this directory.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
