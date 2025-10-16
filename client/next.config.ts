import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "images.unsplash.com",
      "cdn.pixabay.com",
      "res.cloudinary.com",
      "picsum.photos",
    ],
  },

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
