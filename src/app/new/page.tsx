import { fetchPosts } from "@/lib/api";
import { PostItem } from "@/components/PostItem";
import Link from "next/link";

export const revalidate = 30;

export default async function NewPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  let data;
  try {
    data = await fetchPosts("new", page);
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
      <div className="mb-6 flex items-center justify-between">
        <h1
          className="text-2xl font-black"
          style={{ color: "var(--ink)", lineHeight: 0.95 }}
        >
          New
        </h1>
        <Link href="/submit" className="btn-green !text-sm">
          Submit
        </Link>
      </div>

      {data.posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-semibold mb-3" style={{ color: "var(--ink-secondary)" }}>
            Nothing here yet
          </p>
          <Link href="/submit" className="btn-green">
            Submit the first post
          </Link>
        </div>
      ) : (
        <ul>
          {data.posts.map((post, i) => (
            <PostItem key={post.id} post={post} rank={startRank + i} />
          ))}
        </ul>
      )}

      <nav className="mt-8 flex items-center gap-3" aria-label="Pagination">
        {page > 1 && (
          <Link href={`/new?page=${page - 1}`} className="btn-ghost !text-sm">
            ← prev
          </Link>
        )}
        {data.has_more && (
          <Link href={`/new?page=${page + 1}`} className="btn-ghost !text-sm">
            more →
          </Link>
        )}
      </nav>
    </div>
  );
}
