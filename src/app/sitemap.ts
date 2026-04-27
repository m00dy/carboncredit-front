import type { MetadataRoute } from "next";

import { fetchSitemapEntries } from "@/lib/api";
import { buildSiteSitemap } from "@/lib/sitemap";

export const revalidate = 300;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carboncredit.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const entries = await fetchSitemapEntries();
    return buildSiteSitemap(entries, SITE_URL);
  } catch {
    return buildSiteSitemap([], SITE_URL);
  }
}