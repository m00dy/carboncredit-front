"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

const NAV_LINKS = [
  { href: "/", label: "top" },
  { href: "/new", label: "new" },
  { href: "/submit", label: "submit" },
];

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "#0e0f0c" }}
    >
      <div className="max-w-4xl mx-auto px-4 h-12 flex items-center gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="carboncredit.io home"
        >
          {/* Leaf icon */}
          <span
            className="text-lg leading-none select-none"
            aria-hidden="true"
            style={{ color: "#9fe870" }}
          >
            ◈
          </span>
          <span
            className="font-black text-sm tracking-tight"
            style={{ color: "#9fe870", lineHeight: 1 }}
          >
            carboncredit
            <span style={{ color: "#454745" }}>.io</span>
          </span>
        </Link>

        {/* Nav */}
        <nav
          className="flex items-center gap-1 text-xs font-semibold"
          aria-label="Site navigation"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="px-2 py-1 rounded transition-colors duration-100"
                style={{
                  color: isActive ? "#9fe870" : "#868685",
                  background: isActive
                    ? "rgba(159,232,112,0.10)"
                    : "transparent",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Auth */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          {user ? (
            <>
              <Link
                href={`/user/${user.username}`}
                className="transition-colors"
                style={{ color: "#9fe870" }}
              >
                {user.username}
              </Link>
              <span style={{ color: "#454745" }}>·</span>
              <button
                onClick={logout}
                className="transition-colors cursor-pointer"
                style={{ color: "#868685" }}
              >
                logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="transition-colors"
                style={{ color: "#868685" }}
              >
                login
              </Link>
              <Link href="/register" className="btn-green !text-xs !py-1 !px-3">
                register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
