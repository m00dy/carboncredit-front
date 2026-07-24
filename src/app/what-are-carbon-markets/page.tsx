import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What are carbon markets? A community introduction – carboncredit.io",
  description:
    "Learn how carbon markets work — compliance vs voluntary markets, carbon pricing, cap-and-trade, and the key trends shaping the global carbon market in 2026.",
  openGraph: {
    title: "What are carbon markets? A community introduction",
    description:
      "Understand carbon markets: compliance vs voluntary, cap-and-trade, carbon pricing, and market trends.",
    type: "article",
  },
};

export default function WhatAreCarbonMarketsPage() {
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
          What are carbon markets?
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--ink-muted)" }}>
          A community-maintained introduction. Last updated July 2026.
        </p>

        <div
          className="prose prose-sm max-w-none space-y-5"
          style={{ color: "var(--ink)" }}
        >
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--ink-secondary)" }}
          >
            Carbon markets are trading systems where carbon credits and
            allowances are bought and sold. They turn carbon emissions into a
            priced commodity — creating a financial incentive to reduce
            pollution. One credit or allowance equals one metric ton of CO₂e.
          </p>

          <Section title="Two types of carbon markets">
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm border-collapse"
                style={{ borderColor: "var(--border)" }}
              >
                <thead>
                  <tr style={{ background: "var(--green-light)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--green-dark)" }}>
                      Compliance (mandatory)
                    </th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--green-dark)" }}>
                      Voluntary (VCM)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2 align-top">
                      Government-regulated cap-and-trade systems
                    </td>
                    <td className="px-3 py-2 align-top">
                      Companies and individuals buy credits voluntarily
                    </td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2 align-top">
                      Companies must hold allowances equal to their emissions
                    </td>
                    <td className="px-3 py-2 align-top">
                      Used to meet net-zero pledges and ESG goals
                    </td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2 align-top">
                      Examples: EU ETS, California Cap-and-Trade, China ETS
                    </td>
                    <td className="px-3 py-2 align-top">
                      Standards: Verra (VCS), Gold Standard, CAR, ACR
                    </td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2 align-top">
                      Prices set by regulation and auction
                    </td>
                    <td className="px-3 py-2 align-top">
                      Prices vary by project type, location, and co-benefits
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="How compliance markets work: cap-and-trade">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>A government sets a cap</strong> — a limit on total
                emissions for covered sectors (power, industry, aviation).
              </li>
              <li>
                <strong>Allowances are distributed</strong> — either freely
                allocated to emitters or sold at auction.
              </li>
              <li>
                <strong>Companies trade</strong> — those that reduce emissions
                below their cap can sell surplus allowances. Those that exceed
                must buy.
              </li>
              <li>
                <strong>The cap tightens over time</strong> — reducing the total
                supply of allowances and driving up the carbon price.
              </li>
            </ol>
          </Section>

          <Section title="Major carbon markets in 2026">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>EU Emissions Trading System (EU ETS)</strong> — The
                world&apos;s largest carbon market. Covers ~40% of EU emissions.
                Prices reached &euro;100/ton in 2023.
              </li>
              <li>
                <strong>California Cap-and-Trade</strong> — Linked with
                Qu&eacute;bec. Covers power, industry, and transport fuels.
              </li>
              <li>
                <strong>China National ETS</strong> — Largest by covered
                emissions (power sector only, expanding to industry).
              </li>
              <li>
                <strong>UK ETS</strong> — Replaced the EU ETS post-Brexit with
                its own system.
              </li>
              <li>
                <strong>CORSIA</strong> — UN aviation offsetting scheme. Airlines
                must offset emissions above 2019 levels.
              </li>
            </ul>
          </Section>

          <Section title="The voluntary carbon market (VCM)">
            <p>
              The VCM enables companies outside regulated sectors to buy carbon
              credits from projects that reduce or remove emissions. It was
              valued at ~$2 billion in 2023 with significant growth projected.
            </p>
            <p>
              <strong>Key principle: additionality.</strong> A carbon credit is
              only legitimate if the emission reduction would not have happened
              without the project. This is the central challenge — and
              controversy — of the VCM.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Nature-based credits</strong> — Reforestation, avoided
                deforestation (REDD+), soil carbon. Largest volume, lower prices.
              </li>
              <li>
                <strong>Tech-based removals</strong> — Direct air capture (DAC),
                biochar, enhanced weathering, mineralization. Higher prices,
                smaller scale.
              </li>
              <li>
                <strong>Renewable energy credits</strong> — Wind, solar, hydro
                projects that displace fossil fuel generation.
              </li>
            </ul>
          </Section>

          <Section title="Key challenges & trends">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Quality and integrity</strong> — Investigations have
                revealed projects that overstated their impact. ICVCM&apos;s Core
                Carbon Principles aim to establish a quality benchmark.
              </li>
              <li>
                <strong>Article 6 of the Paris Agreement</strong> — Rules for
                international carbon trading between countries are still being
                finalized, with major implications for market structure.
              </li>
              <li>
                <strong>Price divergence</strong> — Compliance allowances trade
                at much higher prices than voluntary credits, reflecting
                different levels of regulatory certainty.
              </li>
              <li>
                <strong>Border carbon adjustments</strong> — The EU&apos;s CBAM
                imposes a carbon price on imports, pushing carbon pricing global.
              </li>
            </ul>
          </Section>

          <Section title="Further reading">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <a
                  href="https://icvcm.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: "var(--green-mid)" }}
                >
                  ICVCM — Core Carbon Principles
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
                  href="https://offsetguide.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: "var(--green-mid)" }}
                >
                  Offset Guide — GHG Institute
                </a>
              </li>
              <li>
                <a
                  href="https://www.worldbank.org/en/programs/partnership-for-market-implementation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: "var(--green-mid)" }}
                >
                  World Bank — Partnership for Market Implementation
                </a>
              </li>
            </ul>
          </Section>
        </div>

        <hr className="my-8" style={{ borderColor: "var(--border)" }} />

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
