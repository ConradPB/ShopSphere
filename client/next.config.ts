import type { NextConfig } from "next";

const devCSP = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  connect-src *;
`;

const prodCSP = `
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  connect-src 'self';
`;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: process.env.NODE_ENV === "development" ? devCSP : prodCSP,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
