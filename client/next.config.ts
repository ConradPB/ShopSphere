import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/(.*)",
            headers: [
              {
                key: "Content-Security-Policy",
                value: "",
              },
            ],
          },
        ]
      : [];
  },
};

export default nextConfig;
