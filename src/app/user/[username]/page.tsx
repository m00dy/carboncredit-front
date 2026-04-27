import { fetchUser, fetchUserPosts } from "@/lib/api";
import { PostItem } from "@/components/PostItem";
import { formatDate } from "@/lib/time";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return { title: `${username} – carboncredit.io` };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  let profile;
  let posts;
  try {
    [profile, posts] = await Promise.all([
      fetchUser(username),
      fetchUserPosts(username),
    ]);
  } catch {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p style={{ color: "var(--ink-muted)" }}>User not found.</p>
        <Link href="/" className="btn-ghost mt-4 inline-flex">
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile card */}
      <div className="card p-6 mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Avatar placeholder */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black select-none shrink-0"
              style={{ background: "var(--green-light)", color: "var(--green-dark)" }}
              aria-hidden="true"
            >
              {profile.username[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-black flex items-center gap-2" style={{ color: "var(--ink)", lineHeight: 0.95 }}>
                {profile.username}
              </h1>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--ink-muted)" }}>
                Joined {formatDate(profile.created_at)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div
                className="text-2xl font-black tabular-nums"
                style={{ color: "var(--green-mid)" }}
              >
                {profile.karma}
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>
                karma
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-black tabular-nums"
                style={{ color: "var(--ink)" }}
              >
                {profile.post_count}
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>
                posts
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-black tabular-nums"
                style={{ color: "var(--ink)" }}
              >
                {profile.comment_count}
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>
                comments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <h2 className="text-lg font-black mb-4" style={{ color: "var(--ink)" }}>
        Submissions
      </h2>

      {posts.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
          No posts yet.
        </p>
      ) : (
        <ul>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}
