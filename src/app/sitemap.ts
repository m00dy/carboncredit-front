import type { MetadataRoute } from "next";

import { buildSiteSitemap } from "@/lib/sitemap";

export const revalidate = 300;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://carboncredit.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSiteSitemap(SITE_URL);
}
