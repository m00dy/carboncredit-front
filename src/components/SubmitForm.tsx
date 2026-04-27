"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api";
import { useAuth } from "./AuthProvider";

type Mode = "url" | "text";

export function SubmitForm() {
  const { token } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("url");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      router.push("/login");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const post = await createPost(
        {
          title: title.trim(),
          url: mode === "url" ? url.trim() : undefined,
          content: mode === "text" ? content.trim() : undefined,
        },
        token
      );
      router.push(`/post/${post.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-8 w-full max-w-xl">
      <h1
        className="text-2xl font-black mb-6"
        style={{ color: "var(--ink)", lineHeight: 0.95 }}
      >
        Submit a post
      </h1>

      {/* Mode toggle */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6 w-fit"
        style={{ background: "rgba(14,15,12,0.06)" }}
        role="tablist"
      >
        {(["url", "text"] as Mode[]).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150"
            style={{
              background: mode === m ? "white" : "transparent",
              color: mode === m ? "var(--ink)" : "var(--ink-muted)",
              boxShadow:
                mode === m ? "0 1px 3px rgba(14,15,12,0.12)" : "none",
            }}
          >
            {m === "url" ? "Link" : "Text"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold" style={{ color: "var(--ink-secondary)" }}>
            Title
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              mode === "url"
                ? "Solar panel efficiency hits record 29.3%"
                : "Discussion: state of carbon markets in 2026"
            }
            maxLength={300}
            required
            className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--border)", color: "var(--ink)", background: "white" }}
          />
        </label>

        {mode === "url" ? (
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold" style={{ color: "var(--ink-secondary)" }}>
              URL
            </span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article"
              required
              className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--border)", color: "var(--ink)", background: "white" }}
            />
          </label>
        ) : (
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold" style={{ color: "var(--ink-secondary)" }}>
              Text
            </span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, ask a question, start a discussion…"
              rows={6}
              required
              className="w-full resize-y rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: "var(--border)", color: "var(--ink)", background: "white" }}
            />
          </label>
        )}

        {error && (
          <p className="text-sm rounded-xl px-3 py-2" style={{ background: "#fef2f2", color: "var(--danger)" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-green !py-3 w-full justify-center"
        >
          {loading ? "Submitting…" : "Submit post"}
        </button>
      </form>
    </div>
  );
}
