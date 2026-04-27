"use client";

import Link from "next/link";
import { useState } from "react";
import type { Comment } from "@/lib/types";
import { timeAgo } from "@/lib/time";
import { VoteButton } from "./VoteButton";
import { createComment } from "@/lib/api";
import { useAuth } from "./AuthProvider";
import { AiBadge } from "./AiBadge";

interface CommentNodeProps {
  comment: Comment;
  postId: string;
  depth?: number;
  onNewComment?: (c: Comment) => void;
}

export function CommentNode({
  comment,
  postId,
  depth = 0,
  onNewComment,
}: CommentNodeProps) {
  const { token, user } = useAuth();
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const indent = Math.min(depth * 20, 80);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !replyText.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      const newComment = await createComment(
        postId,
        replyText.trim(),
        comment.id,
        token
      );
      setReplyText("");
      setShowReply(false);
      onNewComment?.(newComment);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post reply");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ marginLeft: `${indent}px` }}>
      <div
        className="py-3 border-l-2"
        style={{
          borderColor:
            depth === 0
              ? "transparent"
              : `hsl(${130 - depth * 15}, 40%, 75%)`,
          paddingLeft: depth > 0 ? "12px" : 0,
        }}
      >
        {/* Author + time */}
        <div
          className="flex items-center gap-2 text-xs mb-1"
          style={{ color: "var(--ink-muted)" }}
        >
          <span className="flex items-center gap-1.5">
            <Link
              href={`/user/${comment.author_username}`}
              className="font-semibold hover:underline"
              style={{ color: "var(--ink-secondary)" }}
            >
              {comment.author_username}
            </Link>
          </span>
          <span>·</span>
          <time dateTime={new Date(comment.created_at * 1000).toISOString()}>
            {timeAgo(comment.created_at)}
          </time>
          <span>·</span>
          <span>{comment.score} pts</span>
        </div>

        {/* Body */}
        <p
          className="text-sm leading-relaxed whitespace-pre-wrap break-words"
          style={{ color: "var(--ink)" }}
        >
          {comment.content}
        </p>

        {/* Actions row */}
        <div className="flex items-center gap-3 mt-1.5">
          <VoteButton
            targetId={comment.id}
            targetType="comment"
            initialScore={comment.score}
            initialVoted={comment.user_voted}
          />

          {user && (
            <button
              onClick={() => setShowReply((v) => !v)}
              className="text-xs font-medium transition-colors"
              style={{ color: showReply ? "var(--green-mid)" : "var(--ink-muted)" }}
            >
              {showReply ? "cancel" : "reply"}
            </button>
          )}
        </div>

        {/* Reply form */}
        {showReply && (
          <form onSubmit={handleReply} className="mt-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply…"
              rows={3}
              required
              className="w-full max-w-xl resize-y rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--border)",
                background: "white",
                color: "var(--ink)",
              } as React.CSSProperties}
            />
            {error && (
              <p className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || !replyText.trim()}
              className="btn-green mt-2 !text-xs !px-3 !py-1.5"
            >
              {submitting ? "Posting…" : "Post reply"}
            </button>
          </form>
        )}
      </div>

      {/* Children */}
      {comment.children.length > 0 && (
        <div>
          {comment.children.map((child) => (
            <CommentNode
              key={child.id}
              comment={child}
              postId={postId}
              depth={depth + 1}
              onNewComment={onNewComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
