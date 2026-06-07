import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { MockDashboard } from "@/components/landing/mock-dashboard";
import { MockPhone } from "@/components/landing/mock-phone";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-sm text-muted-foreground">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--accent-subtle)] text-brand">
            <Check className="size-3" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

export function LandingShowcase() {
  return (
    <section id="product" className="relative scroll-mt-24 overflow-hidden px-5 py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-[#22c55e]/10 blur-[140px]" />

      {/* Block 1 — dashboard */}
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            The admin dashboard
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            One screen for the whole studio.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built desktop-first around the only question that matters: who&apos;s slipping, and what
            keeps them. Linear-grade clarity, zero clutter.
          </p>
          <Bullets
            items={[
              "Live KPIs with retention, churn risk & redemptions",
              "At-risk members surfaced with one-tap nudges",
              "Cohort retention heatmaps & churn analysis",
              "A built-in ROI calculator that proves the value",
            ]}
          />
          <Link
            href="/overview"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            Open the live dashboard
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="glow-ring rounded-2xl [transform:perspective(1400px)_rotateY(-7deg)_rotateX(3deg)] transition-transform duration-500 hover:[transform:perspective(1400px)_rotateY(-3deg)]">
            <MockDashboard />
          </div>
        </Reveal>
      </div>

      {/* Block 2 — member app */}
      <div className="mx-auto mt-28 grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 flex justify-center lg:order-1">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[48px] bg-[#22c55e]/15 blur-[60px]" />
            <div className="[transform:perspective(1400px)_rotateY(7deg)_rotateX(3deg)] transition-transform duration-500 hover:[transform:perspective(1400px)_rotateY(3deg)]">
              <MockPhone />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            The member app
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            An app they&apos;ll actually open.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Points, streaks and challenges turn every workout into momentum — fully branded as your
            studio, in your members&apos; pocket.
          </p>
          <Bullets
            items={[
              "Points, streaks & live challenges",
              "Redeem rewards instantly with a QR code",
              "Automatic wearable sync (Apple Watch, Garmin…)",
              "100% white-label — your name, colors & logo",
            ]}
          />
          <Link
            href="/member"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            Try the member app
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
