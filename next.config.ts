import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.polygon.io",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
