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
  hideScore?: boolean;
  largeIcon?: boolean;
}

export function VoteButton({
  targetId,
  targetType,
  initialScore,
  initialVoted,
  hideScore = false,
  largeIcon = false,
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
  }, [{!hideScore && (
        <span
          className="text-xs font-semibold tabular-nums leading-none"
          style={{ color: voted ? "var(--green-mid)" : "var(--ink-secondary)" }}
        >
          {score}
        </span>
      )}
      <button
        onClick={handleVote}
        disabled={pending}
        aria-label={voted ? "Unvote" : "Upvote"}
        aria-pressed={voted}
        className={`vote-btn flex items-center justify-center rounded-full transition hover:bg-[var(--green-light)] ${
          voted ? "bg-[var(--green)] text-[var(--green-dark)]" : "bg-transparent text-[var(--ink-muted)]"
        }`}
        style={{
          opacity: pending ? 0.6 : 1,
          width: largeIcon ? "1.5rem" : "1.25rem",
          height: largeIcon ? "1.5rem" : "1.25rem",
        }}
      >
        <svg
          width={largeIcon ? "12" : "8"}
          height={largeIcon ? "9" : "6"}city: pending ? 0.6 : 1, width: "1.25rem", height: "1.25rem" }}
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
