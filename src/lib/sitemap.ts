import type { MetadataRoute } from "next";

export function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

// Live feeds. The list genuinely changes, so the sitemap date is the fetch
// time. Google ignores a lastmod value that never moves.
const LIVE_FEED_PATHS = ["/", "/new"];

// Fixed pages. `lastModified` is the real content date, kept in sync with the
// `lastUpdated` constant in each editorial page. It is omitted where the page
// has no content of its own.
const FIXED_PAGES: { path: string; lastModified?: string }[] = [
  { path: "/submit" },
  { path: "/what-are-carbon-credits", lastModified: "2026-07-01" },
  { path: "/what-are-carbon-markets", lastModified: "2026-07-01" },
  { path: "/what-is-the-voluntary-carbon-market", lastModified: "2026-07-01" },
];

/**
 * The only pages listed in sitemap.xml.
 *
 * `/post/*` is deliberately absent. There are ~19k of them, they mostly
 * restate headlines published elsewhere, and listing them all tells Google the
 * site is a content farm. Add a hand-picked subset once Search Console shows
 * which ones earn impressions.
 */
export function buildSiteSitemap(siteUrl: string): MetadataRoute.Sitemap {
  const baseUrl = normalizeSiteUrl(siteUrl);
  const now = new Date();

  return [
    ...LIVE_FEED_PATHS.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
    })),
    ...FIXED_PAGES.map(({ path, lastModified }) => ({
      url: `${baseUrl}${path}`,
      ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
    })),
  ];
}
