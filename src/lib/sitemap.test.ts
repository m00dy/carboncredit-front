import { describe, expect, it } from "vitest";

import { buildSiteSitemap, normalizeSiteUrl } from "./sitemap";

describe("normalizeSiteUrl", () => {
  it("removes a trailing slash", () => {
    expect(normalizeSiteUrl("https://carboncredit.io/")).toBe(
      "https://carboncredit.io"
    );
  });
});

describe("buildSiteSitemap", () => {
  const sitemap = buildSiteSitemap("https://carboncredit.io");
  const urls = sitemap.map((entry) => entry.url);

  it("lists the indexable pages", () => {
    expect(urls).toContain("https://carboncredit.io/");
    expect(urls).toContain("https://carboncredit.io/new");
    expect(urls).toContain("https://carboncredit.io/submit");
    expect(urls).toContain(
      "https://carboncredit.io/what-are-carbon-credits"
    );
    expect(urls).toContain(
      "https://carboncredit.io/what-are-carbon-markets"
    );
    expect(urls).toContain(
      "https://carboncredit.io/what-is-the-voluntary-carbon-market"
    );
  });

  it("excludes post pages from the sitemap", () => {
    expect(urls.some((url) => url.includes("/post/"))).toBe(false);
  });

  it("dates editorial pages from their content, not the request time", () => {
    const credits = sitemap.find(
      (entry) => entry.url === "https://carboncredit.io/what-are-carbon-credits"
    );

    expect(credits?.lastModified).toEqual(new Date("2026-07-01"));
  });
});
