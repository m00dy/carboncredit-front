"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { register as apiRegister } from "@/lib/api";

export function RegisterForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await apiRegister(username.trim(), password);
      login(token, user);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-8 w-full max-w-sm space-y-5"
      noValidate
    >
      <div>
        <h1
          className="text-2xl font-black"
          style={{ color: "var(--ink)", lineHeight: 0.95 }}
        >
          Join the community
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "var(--ink-muted)" }}>
          Carbon credits, renewables &amp; green energy
        </p>
      </div>

      <div className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold" style={{ color: "var(--ink-secondary)" }}>
            Username
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            pattern="[a-zA-Z0-9_\-]{2,30}"
            title="2–30 characters: letters, numbers, _ or -"
            required
            className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--border)", color: "var(--ink)", background: "white" }}
          />
          <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
            Letters, numbers, _ and - only
          </span>
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-semibold" style={{ color: "var(--ink-secondary)" }}>
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
            className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--border)", color: "var(--ink)", background: "white" }}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-semibold" style={{ color: "var(--ink-secondary)" }}>
            Confirm password
          </span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
            className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--border)", color: "var(--ink)", background: "white" }}
          />
        </label>
      </div>

      {error && (
        <p className="text-sm rounded-xl px-3 py-2" style={{ background: "#fef2f2", color: "var(--danger)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-green w-full justify-center !py-3"
      >
        {loading ? "Creating account…" : "Create account"}
      </button>

      <p className="text-sm text-center" style={{ color: "var(--ink-muted)" }}>
        Already have an account?{" "}
        <a href="/login" className="font-semibold hover:underline" style={{ color: "var(--green-mid)" }}>
          Log in
        </a>
      </p>
    </form>
  );
}
