import type { Metadata } from "next";

// The submit form is auth-gated and has no content of its own. It needs a
// layout because the page itself is a client component and cannot export
// metadata.
export const metadata: Metadata = {
  title: "Submit a link – carboncredit.io",
  robots: { index: false, follow: true },
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
