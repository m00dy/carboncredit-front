"use client";

import { useCallback, useState } from "react";
import { castVote, removeVote } from "@/lib/api";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

interface VoteButtonProps {
  targetId: string;
  targetType: "post" | "comment";
  initialScore: number;
  initialVoted: boolean;
}

export function VoteButton({
  targetId,
  targetType,
  initialScore,
  initialVoted,
}: VoteButtonProps) {
  const { token } = useAuth();
  const router = useRouter();

  const [score, setScore] = useState(initialScore);
  const [voted, setVoted] = useState(initialVoted);
  const [pending, setPending] = useState(false);

  const handleVote = useCallback(async () => {
    if (!token) {
      router.push("/login");
      return;
    }
    if (pending) return;

    setPending(true);
    // Optimistic update
    if (voted) {
      setScore((s) => s - 1);
      setVoted(false);
    } else {
      setScore((s) => s + 1);
      setVoted(true);
    }

    try {
      if (voted) {
        const res = await removeVote(targetId, token);
        setScore(res.score);
        setVoted(false);
      } else {
        const res = await castVote(targetId, targetType, token);
        setScore(res.score);
        setVoted(true);
      }
    } catch {
      // Revert optimistic update
      if (voted) {
        setScore((s) => s + 1);
        setVoted(true);
      } else {
        setScore((s) => s - 1);
        setVoted(false);
      }
    } finally {
      setPending(false);
    }
  }, [token, router, pending, voted, targetId, targetType]);

  return (
    <div className="flex flex-row items-center gap-1.5 shrink-0">
      <span
        className="text-xs font-semibold tabular-nums leading-none"
        style={{ color: voted ? "var(--green-mid)" : "var(--ink-secondary)" }}
      >
        {score}
      </span>
      <button
        onClick={handleVote}
        disabled={pending}
        aria-label={voted ? "Unvote" : "Upvote"}
        aria-pressed={voted}
        className={`vote-btn ${voted ? "voted" : ""}`}
        style={{ opacity: pending ? 0.6 : 1, width: "1.25rem", height: "1.25rem" }}
      >
        <svg
          width="8"
          height="6"
          viewBox="0 0 10 8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 0L10 8H0L5 0Z" />
        </svg>
      </button>
    </div>
  );
}
