const PRIMARY = "zambianadventures.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // zambianoutdoors.com (and www) → primary domain. DNS must point both at this deployment.
    return ["zambianoutdoors.com", "www.zambianoutdoors.com", `www.${PRIMARY}`].map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `https://${PRIMARY}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
