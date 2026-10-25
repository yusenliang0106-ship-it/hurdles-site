import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The track page used to live at /track; keep old links working.
  async redirects() {
    return [{ source: "/track", destination: "/", permanent: true }];
  },
};

export default nextConfig;
