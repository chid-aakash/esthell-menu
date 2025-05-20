import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // Solution: https://github.com/ducanh2912/next-pwa/issues/114#issuecomment-1831170998
  extendDefaultRuntimeCaching: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/, // Apply to all external HTTP/HTTPS requests
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200], // Cache opaque and successful responses
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);
