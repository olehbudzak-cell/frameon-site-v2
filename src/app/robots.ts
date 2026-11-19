import type { MetadataRoute } from "next";
import { CONTACT } from "@/content/services";
import { SITE_LIVE } from "@/lib/live";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_LIVE) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${CONTACT.site}/sitemap.xml`, host: CONTACT.site };
}
