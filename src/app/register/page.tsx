import type { Metadata } from "next";
import { RegisterForm } from "@/components/RegisterForm";

// Auth form with no content of its own. Keep it out of the index.
export const metadata: Metadata = {
  title: "Register – carboncredit.io",
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center">
      <RegisterForm />
    </div>
  );
}
