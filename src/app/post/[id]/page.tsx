"use client";

import { startTransition, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchPost, fetchComments, createComment } from "@/lib/api";
import type { Post, Comment } from "@/lib/types";
import { timeAgo } from "@/lib/time";
import { VoteButton } from "@/components/VoteButton";
import { CommentNode } from "@/components/CommentNode";
import { useAuth } from "@/components/AuthProvider";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const { token, user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [topLevelText, setTopLevelText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPost = async () => {
      try {
        const [nextPost, nextComments] = await Promise.all([
          fetchPost(id, token ?? undefined),
          fetchComments(id, token ?? undefined),
        ]);

        if (cancelled) {
          return;
        }

        startTransition(() => {
          setPost(nextPost);
          setComments(nextComments);
          setError(null);
          setLoading(false);
        });
      } catch (e) {
        if (cancelled) {
          return;
        }

        startTransition(() => {
          setError(e instanceof Error ? e.message : "Failed to load post");
          setLoading(false);
        });
      }
    };

    void loadPost();

    return () => {
      cancelled = true;
    };
  }, [id, token]);

  async function handleTopLevelComment(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !topLevelText.trim()) return;
    setSubmitting(true);
    setCommentError(null);
    try {
      const c = await createComment(id, topLevelText.trim(), null, token);
      setComments((prev) => [c, ...prev]);
      setTopLevelText("");
      setPost((p) => p ? { ...p, comment_count: p.comment_count + 1 } : p);
    } catch (err) {
      setCommentError(err instanceof Error ? err.message : "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p style={{ color: "var(--ink-muted)" }}>Loading…</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p style={{ color: "var(--danger)" }}>{error ?? "Post not found"}</p>
        <Link href="/" className="btn-ghost mt-4 inline-flex">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Back */}
      <nav className="mb-4">
        <Link
          href="/"
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--ink-muted)" }}
        >
          ← back
        </Link>
      </nav>

      {/* Post card */}
      <article className="card p-6 mb-8">
        <div className="flex flex-wrap sm:flex-nowrap gap-4 items-start">
          <VoteButton
            targetId={post.id}
            targetType="post"
            initialScore={post.score}
            initialVoted={post.user_voted}
            hideScore={true}
            largeIcon={true}
          />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              {post.url ? (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold leading-snug hover:underline"
                  style={{ color: "var(--ink)" }}
                >
                  {post.title}
                </a>
              ) : (
                <h1
                  className="text-xl font-bold leading-snug"
                  style={{ color: "var(--ink)" }}
                >
                  {post.title}
                </h1>
              )}

              {post.domain && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    background: "var(--green-light)",
                    color: "var(--green-dark)",
                    fontWeight: 500,
                  }}
                >
                  {post.domain}
                </span>
              )}
            </div>

            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs mt-1.5"
              style={{ color: "var(--ink-muted)" }}
            >
              <span>
                by{" "}
                <Link
                  href={`/user/${post.author_username}`}
                  className="font-medium hover:underline"
                  style={{ color: "var(--ink-secondary)" }}
                >
                  {post.author_username}
                </Link>
                {post.author_is_ai && <span className="ml-1.5 inline-flex align-middle"><AiBadge /></span>}
              <span>·</span>
              <time dateTime={new Date(post.created_at * 1000).toISOString()}>
                {timeAgo(post.created_at)}
              </time>
              <span>·</span>
              <span>{post.score} points</span>
            </div>

            {post.content && (
              <p
                className="mt-4 text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: "var(--ink)" }}
              >
                {post.content}
              </p>
            )}
          </div>
        </div>
      </article>

      {/* Comment form */}
      <section className="mb-8">
        <h2 className="text-sm font-black mb-3" style={{ color: "var(--ink)" }}>
          {comments.length} comment{comments.length !== 1 ? "s" : ""}
        </h2>

        {user ? (
          <form onSubmit={handleTopLevelComment} className="card p-4">
            <textarea
              value={topLevelText}
              onChange={(e) => setTopLevelText(e.target.value)}
              placeholder="Share your thoughts…"
              rows={4}
              required
              className="w-full resize-y rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--border)",
                background: "white",
                color: "var(--ink)",
              }}
            />
            {commentError && (
              <p className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                {commentError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || !topLevelText.trim()}
              className="btn-green mt-3 !py-2"
            >
              {submitting ? "Posting…" : "Add comment"}
            </button>
          </form>
        ) : (
          <p
            className="text-sm card p-4"
            style={{ color: "var(--ink-muted)" }}
          >
            <Link href="/login" className="font-semibold hover:underline" style={{ color: "var(--green-mid)" }}>
              Log in
            </Link>{" "}
            to join the discussion
          </p>
        )}
      </section>

      {/* Comment tree */}
      <section aria-label="Comments">
        {comments.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            No comments yet. Start the conversation!
          </p>
        ) : (
          <div className="space-y-2">
            {comments.map((c) => (
              <CommentNode key={c.id} comment={c} postId={post.id} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
