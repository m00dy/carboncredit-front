import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What are carbon credits? A community introduction – carboncredit.io",
  description:
    "What carbon credits are, how carbon markets work, voluntary vs compliance, and the difference between credits and offsets. A community-maintained introduction.",
  openGraph: {
    title: "What are carbon credits? A community introduction",
    description:
      "What carbon credits are, how carbon markets work, and the difference between credits and offsets.",
    type: "article",
  },
};

export default function WhatAreCarbonCreditsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--ink-muted)" }}
        >
          ← back
        </Link>
      </nav>

      <article className="card p-6 sm:p-8">
        <h1
          className="text-3xl font-black mb-2"
          style={{ color: "var(--ink)", lineHeight: 1.1 }}
        >
          What are carbon credits?
        </h1>
        <p
          className="text-sm mb-8"
          style={{ color: "var(--ink-muted)" }}
        >
          A community-maintained introduction. Last updated July 2026.
        </p>

        <div
          className="prose prose-sm max-w-none space-y-5"
          style={{ color: "var(--ink)" }}
        >
          <p className="text-lg leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
            A carbon credit is a tradeable permit. One credit represents one
            metric ton of CO₂ (or equivalent greenhouse gas) removed from the
            atmosphere or prevented from entering it. Carbon markets, the trading
            systems built on these credits, put a price on carbon pollution.
          </p>

          <Section title="How they work">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>A project reduces or removes emissions.</strong> For
                example: a reforestation project, a wind farm displacing a coal
                plant, or a direct air capture facility.
              </li>
              <li>
                <strong>That reduction is verified</strong> by a third-party
                standard (Verra, Gold Standard, CAR, etc.).
              </li>
              <li>
                <strong>One credit = one ton of CO₂e.</strong> The project issues
                credits for each verified ton.
              </li>
              <li>
                <strong>A buyer purchases and retires the credit</strong> to
                offset their own emissions.
              </li>
            </ol>
          </Section>

          <Section title="Voluntary vs compliance markets">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Compliance markets</strong>. Government-mandated
                cap-and-trade systems (EU ETS, California Cap-and-Trade).
                Companies must hold enough allowances to cover their emissions.
                Prices are set by regulation and auction.
              </li>
              <li>
                <strong>Voluntary carbon market (VCM)</strong>. Companies and
                individuals buy credits voluntarily to meet net-zero pledges.
                Prices vary based on project type, location, co-benefits, and
                vintage.
              </li>
            </ul>
          </Section>

          <Section title="Carbon credits vs carbon offsets">
            <p>People use these interchangeably, but there is a distinction:</p>
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm border-collapse"
                style={{ borderColor: "var(--border)" }}
              >
                <thead>
                  <tr style={{ background: "var(--green-light)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--green-dark)" }}>
                      Carbon credit
                    </th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--green-dark)" }}>
                      Carbon offset
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2">A permit to emit one ton</td>
                    <td className="px-3 py-2">
                      The actual act of reducing or removing one ton
                    </td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2">Tradeable instrument</td>
                    <td className="px-3 py-2">The environmental outcome</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2">
                      &ldquo;I own the right to emit&rdquo;
                    </td>
                    <td className="px-3 py-2">
                      &ldquo;I paid someone else to reduce&rdquo;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="The market today">
            <p>
              The voluntary carbon market was worth ~$2 billion in 2023. More
              companies set net-zero targets every quarter, and demand for credits
              follows:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Quality scrutiny</strong>. Media investigations have
                exposed questionable offset projects. Buyers increasingly demand
                high-integrity credits with verifiable additionality.
              </li>
              <li>
                <strong>CORSIA</strong>. The UN aviation offsetting scheme is
                driving standardization.
              </li>
              <li>
                <strong>Article 6</strong>. Paris Agreement rules for
                international carbon trading are being finalized.
              </li>
              <li>
                <strong>Nature-based vs tech-based</strong>. Reforestation
                credits dominate volume, but engineered removals (DAC, biochar,
                enhanced weathering) command premium prices.
              </li>
            </ul>
          </Section>

          <Section title="Further reading">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a
                  href="https://verra.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: "var(--green-mid)" }}
                >
                  Verra Verified Carbon Standard
                </a>
              </li>
              <li>
                <a
                  href="https://www.goldstandard.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: "var(--green-mid)" }}
                >
                  Gold Standard
                </a>
              </li>
              <li>
                <a
                  href="https://climate.ec.europa.eu/eu-action/eu-emissions-trading-system-eu-ets_en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: "var(--green-mid)" }}
                >
                  EU Emissions Trading System
                </a>
              </li>
              <li>
                <a
                  href="https://carboncreditquality.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: "var(--green-mid)" }}
                >
                  Carbon Credit Quality Initiative
                </a>
              </li>
            </ul>
          </Section>
        </div>

        <hr
          className="my-8"
          style={{ borderColor: "var(--border)" }}
        />

        <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
          This is a community wiki. Have something to add?{" "}
          <Link
            href="/submit"
            className="font-semibold hover:underline"
            style={{ color: "var(--green-mid)" }}
          >
            Submit a post
          </Link>{" "}
          or{" "}
          <Link
            href="/register"
            className="font-semibold hover:underline"
            style={{ color: "var(--green-mid)" }}
          >
            join the discussion
          </Link>
          .
        </p>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="text-xl font-black mt-8 mb-3"
        style={{ color: "var(--ink)", lineHeight: 1.15 }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
