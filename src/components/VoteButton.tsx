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
    <div className="flex flex-col items-center gap-0.5 shrink-0 w-8">
      <button
        onClick={handleVote}
        disabled={pending}
        aria-label={voted ? "Unvote" : "Upvote"}
        aria-pressed={voted}
        className={`vote-btn ${voted ? "voted" : ""}`}
        style={{ opacity: pending ? 0.6 : 1 }}
      >
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 0L10 8H0L5 0Z" />
        </svg>
      </button>
      <span
        className="text-xs font-semibold tabular-nums leading-none"
        style={{ color: voted ? "var(--green-mid)" : "var(--ink-secondary)" }}
      >
        {score}
      </span>
    </div>
  );
}
