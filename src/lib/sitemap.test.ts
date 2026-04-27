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
  it("includes static routes and imported posts", () => {
    const sitemap = buildSiteSitemap(
      [{ id: "post-123", updated_at: 1_700_000_000 }],
      "https://carboncredit.io"
    );

    expect(sitemap.some((entry) => entry.url === "https://carboncredit.io/")).toBe(
      true
    );
    expect(
      sitemap.some((entry) => entry.url === "https://carboncredit.io/post/post-123")
    ).toBe(true);
  });
});