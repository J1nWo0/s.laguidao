import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Set by the Pages workflow to the repo sub-path; unset locally so dev serves from "/".
  basePath: process.env.PAGES_BASE_PATH,
  // A static export ships without the image optimization server.
  images: { unoptimized: true },
};

export default nextConfig;
