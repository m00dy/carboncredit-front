import Image from "next/image";

export function Footer() {
  return (
    <footer
      className="mt-16 py-8 text-center text-xs"
      style={{ color: "#868685", borderTop: "1px solid rgba(14,15,12,0.08)" }}
    >
      <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <span className="flex items-center gap-2" style={{ color: "#9fe870", fontWeight: 700, letterSpacing: "-0.01em" }}>
          <Image src="/carbon.png" alt="logo" width={16} height={16} className="rounded-[4px] object-cover opacity-80" />
          carboncredit.io
        </span>
        <span>·</span>
        <span>Community for carbon, renewables &amp; green energy</span>
        <span>·</span>
        <a href="/submit" className="hover:underline">
          submit link
        </a>
        <span>·</span>
        <a href="mailto:hello@carboncredit.io" className="hover:underline">
          contact
        </a>
        <span>·</span>
        <a href="/sitemap.xml" className="hover:underline">
          sitemap
        </a>
      </div>
    </footer>
  );
}
