import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://carboncredit.io"),
  title: "carboncredit.io – Green Energy & Carbon Community",
  description:
    "The community-curated link aggregator for carbon credits, renewables, and green energy. Share, discuss, and discover the latest in clean energy.",
  keywords: [
    "carbon credits",
    "green energy",
    "renewables",
    "climate tech",
    "clean energy",
    "sustainability",
  ],
  openGraph: {
    title: "carboncredit.io",
    description: "Community for carbon credits and green energy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#f5f7f2]">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

