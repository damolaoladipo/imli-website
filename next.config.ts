import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/blocks/imili-icon.svg",
        permanent: true,
      },
      {
        source: "/projects/africa-against-xenophobia-project",
        destination: "/projects/Afax-p/africa-against-xenophobia-project",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withMDX(nextConfig);
