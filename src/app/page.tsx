import { fetchPosts } from "@/lib/api";
import { PostItem } from "@/components/PostItem";
import Link from "next/link";

export const revalidate = 60; // ISR: re-fetch every 60s

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  let data;
  try {
    data = await fetchPosts("top", page);
  } catch {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p style={{ color: "var(--ink-muted)" }}>
          Could not load posts. Make sure the backend is running.
        </p>
      </div>
    );
  }

  const startRank = (page - 1) * 30 + 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Hero banner – only on page 1 */}
      {page === 1 && (
        <div
          className="rounded-2xl px-6 py-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: "#0e0f0c" }}
        >
          <div>
            <h1
              className="text-4xl font-black leading-none"
              style={{ color: "#9fe870" }}
            >
              carboncredit.io
            </h1>
            <p className="mt-2 text-sm font-medium" style={{ color: "#868685" }}>
              Community for carbon markets, renewables &amp; clean energy
            </p>
          </div>
          <Link href="/submit" className="btn-green shrink-0">
            Submit a link
          </Link>
        </div>
      )}

      {data.posts.length === 0 ? (
        <div className="text-center py-20">
          <p
            className="text-lg font-semibold mb-3"
            style={{ color: "var(--ink-secondary)" }}
          >
            No posts yet
          </p>
          <Link href="/submit" className="btn-green">
            Be the first to submit
          </Link>
        </div>
      ) : (
        <ul className="divide-y" style={{ borderColor: "transparent" }}>
          {data.posts.map((post, i) => (
            <PostItem key={post.id} post={post} rank={startRank + i} />
          ))}
        </ul>
      )}

      {/* Pagination */}
      <nav
        className="mt-8 flex items-center gap-3"
        aria-label="Pagination"
      >
        {page > 1 && (
          <Link href={`/?page=${page - 1}`} className="btn-ghost !text-sm">
            ← prev
          </Link>
        )}
        {data.has_more && (
          <Link href={`/?page=${page + 1}`} className="btn-ghost !text-sm">
            more →
          </Link>
        )}
      </nav>
    </div>
  );
}

