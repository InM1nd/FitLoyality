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
import { useT } from "@/lib/i18n/context";

const TABS = [
  { key: "overview", labelKey: "overview", url: "app.fitloyalty.io/overview", route: "/overview", blurbKey: "blurbOverview", Screen: OverviewScreen },
  { key: "members", labelKey: "members", url: "app.fitloyalty.io/members", route: "/members", blurbKey: "blurbMembers", Screen: MembersScreen },
  { key: "rewards", labelKey: "rewards", url: "app.fitloyalty.io/rewards", route: "/rewards", blurbKey: "blurbRewards", Screen: RewardsScreen },
  { key: "analytics", labelKey: "analytics", url: "app.fitloyalty.io/analytics", route: "/analytics", blurbKey: "blurbAnalytics", Screen: AnalyticsScreen },
] as const;

export function ProductShowcase() {
  const t = useT("showcase");
  const tn = useT("nav");
  const [active, setActive] = React.useState<(typeof TABS)[number]["key"]>("overview");
  const current = TABS.find((t) => t.key === active)!;
  const Screen = current.Screen;

  return (
    <section id="product" className="scroll-mt-20 px-5 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label t-faint">{t("eyebrow")}</span>
            <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">{t("sub")}</p>
        </Reveal>

        {/* tabs */}
        <Reveal className="mt-8">
          <div
            role="tablist"
            aria-label={t("tablistLabel")}
            className="flex flex-wrap gap-2"
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const idx = TABS.findIndex((t) => t.key === active);
              const next =
                e.key === "ArrowRight"
                  ? TABS[(idx + 1) % TABS.length]
                  : TABS[(idx - 1 + TABS.length) % TABS.length];
              setActive(next.key);
              document.getElementById(`showcase-tab-${next.key}`)?.focus();
            }}
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                id={`showcase-tab-${t.key}`}
                type="button"
                role="tab"
                aria-selected={active === t.key}
                aria-controls="showcase-panel"
                tabIndex={active === t.key ? 0 : -1}
                onClick={() => setActive(t.key)}
                className={cn(
                  "mono rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.06em] transition-colors",
                  active === t.key
                    ? "border-[#1a1a1a] bg-[#1a1a1a] text-[#ff7403]"
                    : "border-[var(--line)] t-mut hover:t-ink",
                )}
              >
                {tn(t.labelKey)}
              </button>
            ))}
          </div>
        </Reveal>

        {/* frame */}
        <Reveal delay={0.05} className="relative mt-6" id="showcase-panel" role="tabpanel">
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(closest-side,rgba(255,116,3,0.05),transparent)]" />
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
          <p className="max-w-xl text-sm leading-relaxed t-mut">{t(current.blurbKey)}</p>
          <Link
            href={current.route}
            className="mono-label group inline-flex items-center gap-2 t-lime"
          >
            {t("openLive", { label: tn(current.labelKey) })}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
