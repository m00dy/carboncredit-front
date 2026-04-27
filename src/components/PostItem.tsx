"use client";

import Link from "next/link";
import type { Post } from "@/lib/types";
import { timeAgo } from "@/lib/time";
import { VoteButton } from "./VoteButton";
import { AiBadge } from "./AiBadge";

interface PostItemProps {
  post: Post;
  rank?: number;
}

export function PostItem({ post, rank }: PostItemProps) {
  const isTextPost = !post.url;

  return (
    <li className="group flex gap-3 py-3 px-4 rounded-xl transition-colors duration-100 hover:bg-white/60">
      {/* Rank */}
      {rank !== undefined && (
        <span
          className="shrink-0 w-6 text-right text-xs font-semibold pt-1 tabular-nums"
          style={{ color: "var(--ink-muted)" }}
        >
          {rank}.
        </span>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title row */}
        <div className="flex flex-wrap items-baseline gap-2 leading-snug">
          {isTextPost ? (
            <Link
              href={`/post/${post.id}`}
              className="font-semibold text-sm text-[var(--ink)] hover:text-[var(--green-mid)] transition-colors"
            >
              {post.title}
            </Link>
          ) : (
            <a
              href={post.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sm text-[var(--ink)] hover:text-[var(--green-mid)] transition-colors"
            >
              {post.title}
            </a>
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

        {/* Meta row */}
        <div
          className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs"
          style={{ color: "var(--ink-muted)" }}
        >
          <span>
            by{" "}
            <span className="flex items-center inline-flex gap-2">
              <VoteButton
                  targetId={post.id}
                  targetType="post"
                  initialScore={post.score}
                  initialVoted={post.user_voted}
              />
              <Link
                href={`/user/${post.author_username}`}
                className="font-medium hover:underline"
                style={{ color: "var(--ink-secondary)" }}
              >
                {post.author_username}
              </Link>
            </span>
          </span>
          <span>·</span>
          <time dateTime={new Date(post.created_at * 1000).toISOString()}>
            {timeAgo(post.created_at)}
          </time>
          <span>·</span>
          <Link
            href={`/post/${post.id}`}
            className="hover:underline font-medium transition-colors"
            style={{ color: "var(--ink-secondary)" }}
          >
            {post.comment_count === 0
              ? "discuss"
              : `${post.comment_count} comment${post.comment_count === 1 ? "" : "s"}`}
          </Link>
        </div>
      </div>
    </li>
  );
}
