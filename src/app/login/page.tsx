import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

// Auth form with no content of its own. Keep it out of the index.
export const metadata: Metadata = {
  title: "Log in – carboncredit.io",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center">
      <LoginForm />
    </div>
  );
}
