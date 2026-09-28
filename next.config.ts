import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images are now local. dangerouslyAllowSVG and the skillicons.dev
    // remotePattern are gone with the third-party icon fetches they existed for.
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
