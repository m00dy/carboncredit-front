import type { MetadataRoute } from "next";

import type { SitemapEntry } from "./types";

export function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

export function buildSiteSitemap(
  entries: SitemapEntry[],
  siteUrl: string
): MetadataRoute.Sitemap {
  const baseUrl = normalizeSiteUrl(siteUrl);

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/new`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...entries.map((entry) => ({
      url: `${baseUrl}/post/${entry.id}`,
      lastModified: new Date(entry.updated_at * 1000),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ];
}