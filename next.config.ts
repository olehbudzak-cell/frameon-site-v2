import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // Finishing services (tiling, turnkey, taping/plastering/painting, flooring) were removed from the service list: send old links to /services.
  async redirects() {
    const gone = ["tiling", "turnkey-refurbishment", "taping-plastering-painting", "flooring"];
    // The *.vercel.app address of this project sends visitors to the real domain.
    const toDomain = { source: "/:path*", has: [{ type: "host" as const, value: "frameon-site-v2.vercel.app" }], destination: "https://www.frameondrylining.co.uk/:path*", permanent: true };
    return [toDomain, ...gone.flatMap((g) => [
      { source: `/services/${g}`, destination: "/services", permanent: true },
      { source: `/:locale(uk|ru|pl|ro|es|pt|it|ar|bn|gu|pa)/services/${g}`, destination: "/:locale/services", permanent: true },
    ])];
  },
  async headers() {
    return [
      // Keep the *.vercel.app preview out of search engines until SITE_LIVE=1 (see src/lib/live.ts).
      ...(process.env.SITE_LIVE === "1" ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]),
      {
        source: "/portfolio/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/scene/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
