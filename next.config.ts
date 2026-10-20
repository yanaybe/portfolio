import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This directory is the project root. Without this, a stray lockfile in the
  // home directory makes Next infer the wrong workspace root.
  outputFileTracingRoot: import.meta.dirname,
  turbopack: { root: import.meta.dirname },
  poweredByHeader: false,
};

export default nextConfig;
