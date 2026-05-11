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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.brivityidx.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.idxbroker.com",
      },
      {
        protocol: "https",
        hostname: "*.mlsgrid.com",
      },
      {
        protocol: "https",
        hostname: "cdn.photos.sparkplatform.com",
      },
    ],
  },
};

export default nextConfig;
