import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { Marker } from "@/components/landing/marker";
import { MockDashboard } from "@/components/landing/mock-dashboard";
import { MockPhone } from "@/components/landing/mock-phone";

function SpecList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 border-t border-[var(--line)]">
      {items.map((it, i) => (
        <li
          key={it}
          className="flex items-baseline gap-4 border-b border-[var(--line)] py-3 text-sm t-ink"
        >
          <span className="mono text-[11px] t-acid">{String(i + 1).padStart(2, "0")}</span>
          {it}
        </li>
      ))}
    </ul>
  );
}

function Exhibit({
  caption,
  source,
  children,
}: {
  caption: string;
  source: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="relative">
      <div
        data-exhibit
        className="flex items-center justify-center overflow-hidden border border-[var(--ink)] bg-[#0a0a0a] p-5 shadow-[12px_12px_0_0_rgba(21,20,14,0.1)]"
      >
        {children}
      </div>
      <figcaption className="mt-3 flex items-center justify-between border-t border-[var(--line)] pt-2">
        <span className="mono-label t-mut">{caption}</span>
        <span className="mono-label t-faint">{source}</span>
      </figcaption>
    </figure>
  );
}

export function LandingShowcase() {
  return (
    <section id="product" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-[var(--line)] pb-5">
          <span className="mono-label t-faint">04 — Product</span>
          <h2 className="font-display mt-2 text-4xl font-semibold uppercase tracking-tight t-ink md:text-5xl">
            See it working.
          </h2>
        </div>

        {/* dashboard */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h3 className="font-display text-3xl font-semibold leading-tight t-ink md:text-4xl">
              One screen for the
              <br />
              <Marker>whole studio.</Marker>
            </h3>
            <p className="mt-5 text-sm leading-relaxed t-mut">
              Desktop-first, built around the only question that matters: who&apos;s slipping, and
              what keeps them. Linear-grade clarity, zero clutter.
            </p>
            <SpecList
              items={[
                "Live KPIs — retention, churn risk, redemptions",
                "At-risk members with one-tap nudges",
                "Cohort retention heatmaps & churn analysis",
                "Built-in ROI calculator",
              ]}
            />
            <Link
              href="/overview"
              className="mono-label group mt-7 inline-flex items-center gap-2 t-acid"
            >
              Open the live dashboard
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <Exhibit caption="Fig. 02 — Admin dashboard" source="Desktop · 1280px">
              <MockDashboard className="rounded-none border-0 shadow-none" />
            </Exhibit>
          </Reveal>
        </div>

        {/* member app */}
        <div className="mt-24 grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <Exhibit caption="Fig. 03 — Member app" source="iOS · branded">
              <MockPhone />
            </Exhibit>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-5">
            <h3 className="font-display text-3xl font-semibold leading-tight t-ink md:text-4xl">
              An app they&apos;ll
              <br />
              <Marker>actually open.</Marker>
            </h3>
            <p className="mt-5 text-sm leading-relaxed t-mut">
              Points, streaks and challenges turn every workout into momentum — fully branded as your
              studio, in your members&apos; pocket.
            </p>
            <SpecList
              items={[
                "Points, streaks & live challenges",
                "Redeem rewards instantly with a QR code",
                "Automatic wearable sync",
                "100% white-label",
              ]}
            />
            <Link
              href="/member"
              className="mono-label group mt-7 inline-flex items-center gap-2 t-acid"
            >
              Try the member app
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
