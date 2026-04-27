import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // sweph is a native Node binding — exclude it from the bundler so the deployed runtime
  // resolves it as a regular CommonJS module from node_modules.
  serverExternalPackages: ["sweph"],
};

export default nextConfig;
