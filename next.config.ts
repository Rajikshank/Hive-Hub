import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        port: "",
        protocol: "https",
      },

      { hostname: "lh3.googleusercontent.com", protocol: "https" },
    ],
  },
    serverExternalPackages:["pdf-parse"],
};

export default nextConfig;
