import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.3.103",
    "192.168.1.*",
    "192.168.0.*",
    "192.168.3.*",
    "10.0.0.*",
    "*.local",
  ],
};

export default nextConfig;
