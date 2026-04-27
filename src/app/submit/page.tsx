"use client";

import { useAuth } from "@/components/AuthProvider";
import { SubmitForm } from "@/components/SubmitForm";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?next=/submit");
    }
  }, [isLoading, user, router]);

  if (isLoading) return null;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center">
      <nav className="self-start mb-6">
        <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "var(--ink-muted)" }}>
          ← back
        </Link>
      </nav>
      <SubmitForm />
    </div>
  );
}
