import type { NextConfig } from "next";
import './envConfig.ts'

const nextConfig: NextConfig = {
  env: {
    // HOST_URL: process.env.HOST_URL,
    HOST_URL: "https://instabram.vercel.app"
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
