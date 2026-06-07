"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/reveal";
import { BrowserFrame } from "@/components/landing/browser-frame";
import { OverviewScreen } from "@/components/landing/screens/overview-screen";
import { MembersScreen } from "@/components/landing/screens/members-screen";
import { RewardsScreen } from "@/components/landing/screens/rewards-screen";
import { AnalyticsScreen } from "@/components/landing/screens/analytics-screen";

const TABS = [
  { key: "overview", label: "Overview", url: "app.fitloyalty.io/overview", route: "/overview", blurb: "Live KPIs, retention trend, at-risk members and recent reward activity — your studio at a glance.", Screen: OverviewScreen },
  { key: "members", label: "Members", url: "app.fitloyalty.io/members", route: "/members", blurb: "Every member, searchable and sortable, with status, streak health and loyalty points.", Screen: MembersScreen },
  { key: "rewards", label: "Rewards", url: "app.fitloyalty.io/rewards", route: "/rewards", blurb: "Automated perks that trigger on streaks, workouts and referrals — toggle them on in a tap.", Screen: RewardsScreen },
  { key: "analytics", label: "Analytics", url: "app.fitloyalty.io/analytics", route: "/analytics", blurb: "Cohort retention heatmaps, seasonal churn and a built-in ROI calculator.", Screen: AnalyticsScreen },
] as const;

export function ProductShowcase() {
  const [active, setActive] = React.useState<(typeof TABS)[number]["key"]>("overview");
  const current = TABS.find((t) => t.key === active)!;
  const Screen = current.Screen;

  return (
    <section id="product" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label t-faint">03 — Product</span>
            <h2 className="font-display mt-2 text-4xl font-semibold uppercase tracking-tight t-ink md:text-5xl">
              See it in action.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">
            Click through the real admin views — this is exactly what your team works in every day.
          </p>
        </Reveal>

        {/* tabs */}
        <Reveal className="mt-8 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={cn(
                "mono rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.06em] transition-colors",
                active === t.key
                  ? "border-[var(--acid)] bg-[var(--acid)]/10 t-lime"
                  : "border-[var(--line)] t-mut hover:t-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </Reveal>

        {/* frame */}
        <Reveal delay={0.05} className="relative mt-6">
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(closest-side,rgba(34,197,94,0.12),transparent)]" />
          <BrowserFrame url={current.url}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Screen />
              </motion.div>
            </AnimatePresence>
          </BrowserFrame>
        </Reveal>

        {/* caption */}
        <Reveal className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed t-mut">{current.blurb}</p>
          <Link
            href={current.route}
            className="mono-label group inline-flex items-center gap-2 t-lime"
          >
            Open {current.label} live
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
