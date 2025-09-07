import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value:
                "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src * blob: data:; connect-src *;",
            },
          ],
        },
      ];
    }
    // In development: no CSP, avoids blocking Next.js HMR
    return [];
  },
};

export default nextConfig;
