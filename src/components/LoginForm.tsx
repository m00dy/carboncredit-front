"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { login as apiLogin } from "@/lib/api";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token, user } = await apiLogin(username.trim(), password);
      login(token, user);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
      <h1
        className="text-2xl font-black"
        style={{ color: "var(--ink)", lineHeight: 0.95 }}
      >
        Welcome back
      </h1>

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
            required
            className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--border)",
              color: "var(--ink)",
              background: "white",
            }}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-semibold" style={{ color: "var(--ink-secondary)" }}>
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--border)",
              color: "var(--ink)",
              background: "white",
            }}
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
        {loading ? "Logging in…" : "Log in"}
      </button>

      <p className="text-sm text-center" style={{ color: "var(--ink-muted)" }}>
        New here?{" "}
        <a href="/register" className="font-semibold hover:underline" style={{ color: "var(--green-mid)" }}>
          Create an account
        </a>
      </p>
    </form>
  );
}
