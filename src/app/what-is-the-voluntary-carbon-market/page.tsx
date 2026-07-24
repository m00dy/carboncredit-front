import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "What is the voluntary carbon market (VCM)? – carboncredit.io",
  description:
    "How the voluntary carbon market works: VCM credits, major standards like Verra and Gold Standard, pricing, additionality, and market trends in 2026.",
  openGraph: {
    title: "What is the voluntary carbon market (VCM)?",
    description:
      "How the voluntary carbon market works: standards, pricing, additionality, and market trends.",
    type: "article",
  },
};

export default function VoluntaryCarbonMarketPage() {
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
          What is the voluntary carbon market?
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
            The voluntary carbon market (VCM) is where companies, organizations,
            and individuals buy carbon credits voluntarily. They're not legally
            required to. They buy to meet self-imposed climate goals, net-zero
            pledges, or ESG commitments. The VCM was worth ~$2 billion in 2023.
          </p>

          <Section title="How the VCM works">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>A project developer</strong> creates a carbon reduction
                or removal project, a reforestation effort, a renewable energy
                installation, or a direct air capture facility.
              </li>
              <li>
                <strong>An independent standard verifies it</strong>. Verra
                (VCS), Gold Standard, Climate Action Reserve, or ACR confirms the
                emissions reductions are real, measurable, and additional.
              </li>
              <li>
                <strong>Credits are issued</strong>. One credit per ton of CO₂e
                reduced or removed.
              </li>
              <li>
                <strong>A buyer purchases credits</strong> directly from the
                developer, through a broker, or on an exchange.
              </li>
              <li>
                <strong>The buyer retires the credits</strong>, claiming them
                against their own emissions, at which point they are permanently
                removed from circulation.
              </li>
            </ol>
          </Section>

          <Section title="Major standards & registries">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Verra (Verified Carbon Standard)</strong>. The largest
                VCM standard. Has issued over 1 billion credits. Under scrutiny
                in 2023-2024 for over-crediting some forest projects.
              </li>
              <li>
                <strong>Gold Standard</strong>. Founded by WWF. Emphasizes
                sustainable development co-benefits alongside carbon reduction.
                Higher prices, stricter methodology.
              </li>
              <li>
                <strong>Climate Action Reserve (CAR)</strong>. US-focused
                registry. Strong in forestry, livestock, and ozone-depleting
                substance destruction.
              </li>
              <li>
                <strong>American Carbon Registry (ACR)</strong>. The first
                private voluntary registry. Strong in forestry and agricultural
                carbon.
              </li>
              <li>
                <strong>Puro.earth</strong>. Focused exclusively on engineered
                carbon removal (biochar, carbonated building materials, etc.).
              </li>
            </ul>
          </Section>

          <Section title="The central concept: additionality">
            <p>
              A carbon credit only counts if the emission reduction{" "}
              <strong>would not have happened without the carbon revenue</strong>
              . This test, additionality, is the hardest thing to prove in the
              VCM.
            </p>
            <p>A project fails additionality if:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The forest was already protected by law.</li>
              <li>The renewable plant would have been built anyway because it was
                profitable.</li>
              <li>The landowner had no intention of cutting down the trees.</li>
            </ul>
            <p>
              Additionality is the reason some credits trade at $2/ton while
              others trade at $200+/ton. Buyers pay a premium for projects that
              can credibly prove their impact.
            </p>
          </Section>

          <Section title="Types of VCM credits">
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm border-collapse"
                style={{ borderColor: "var(--border)" }}
              >
                <thead>
                  <tr style={{ background: "var(--green-light)" }}>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--green-dark)" }}>
                      Category
                    </th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--green-dark)" }}>
                      Examples
                    </th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: "var(--green-dark)" }}>
                      Typical price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2 font-medium">Nature-based: forestry</td>
                    <td className="px-3 py-2">REDD+, afforestation, improved forest management</td>
                    <td className="px-3 py-2">$2–15/ton</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2 font-medium">Nature-based: agriculture</td>
                    <td className="px-3 py-2">Soil carbon sequestration, rice methane reduction</td>
                    <td className="px-3 py-2">$5–30/ton</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2 font-medium">Renewable energy</td>
                    <td className="px-3 py-2">Wind, solar, hydro displacing fossil fuels</td>
                    <td className="px-3 py-2">$1–5/ton</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2 font-medium">Tech-based removals</td>
                    <td className="px-3 py-2">Direct air capture (DAC), biochar, enhanced weathering</td>
                    <td className="px-3 py-2">$100–1,000+/ton</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2 font-medium">Household & community</td>
                    <td className="px-3 py-2">Clean cookstoves, water filtration</td>
                    <td className="px-3 py-2">$5–15/ton</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Key controversies">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Over-crediting</strong>. Multiple investigations (The
                Guardian, Die Zeit, SourceMaterial) found that some Verra REDD+
                projects issued far more credits than their actual climate impact
                justified.
              </li>
              <li>
                <strong>Permanence</strong>. Forest carbon stored in trees can
                be released by wildfire, disease, or logging. How do you
                guarantee a credit is permanent?
              </li>
              <li>
                <strong>Human rights</strong>. Some projects have been accused
                of land grabs or displacing Indigenous communities.
              </li>
              <li>
                <strong>Greenwashing</strong>. Companies buying cheap,
                low-quality credits to claim carbon neutrality without reducing
                their own emissions.
              </li>
            </ul>
          </Section>

          <Section title="The ICVCM and Core Carbon Principles">
            <p>
              After investigations exposed widespread over-crediting, the Integrity
              Council for the Voluntary Carbon Market (ICVCM) introduced the{" "}
              <strong>Core Carbon Principles (CCPs)</strong>, a global
              benchmark for high-integrity carbon credits. CCP-labeled credits
              must demonstrate:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Real, measurable, and additional emission reductions</li>
              <li>Permanence or a mechanism to address reversals</li>
              <li>No double counting</li>
              <li>Positive sustainable development impacts</li>
              <li>Do-no-harm safeguards</li>
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
                  ICVCM. Core Carbon Principles
                </a>
              </li>
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
                  href="https://puro.earth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                  style={{ color: "var(--green-mid)" }}
                >
                  Puro.earth. Engineered Carbon Removal
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
