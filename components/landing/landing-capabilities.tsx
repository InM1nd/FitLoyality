import {
  LineChart,
  BellRing,
  Gift,
  Watch,
  Palette,
  Coins,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";

const ITEMS: {
  no: string;
  icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
}[] = [
  { no: "01", icon: LineChart, title: "Retention analytics", body: "Cohort heatmaps, churn curves and live retention — see exactly which months you lose people.", tag: "Heatmaps" },
  { no: "02", icon: BellRing, title: "At-risk detection", body: "When a streak cools, the member surfaces automatically. Send a personalized nudge in one tap.", tag: "Nudges" },
  { no: "03", icon: Gift, title: "Rewards engine", body: "Perks that trigger on streaks, workouts and referrals — fully automated, zero admin.", tag: "Automation" },
  { no: "04", icon: Watch, title: "Wearable sync", body: "Apple Health, Garmin and more. Workouts count themselves — no manual check-ins.", tag: "Integrations" },
  { no: "05", icon: Palette, title: "White-label app", body: "Your name, your colors, your logo — the member experience, branded as your studio.", tag: "Branding" },
  { no: "06", icon: Coins, title: "Proof of ROI", body: "A built-in calculator turns retention gains into the euros you actually kept.", tag: "Calculator" },
];

export function LandingCapabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label t-faint">02 — Capabilities</span>
            <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
              Keep the grid warm.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">
            From spotting a cooling streak to proving the revenue you kept — the whole loop, in one
            place.
          </p>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal
                key={it.no}
                delay={(i % 3) * 0.06}
                className="group relative flex flex-col border-b border-r border-[var(--line)] p-7 transition-colors hover:bg-paper2"
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[13px] t-faint transition-colors group-hover:t-lime">
                    {it.no}
                  </span>
                  <span className="grid size-9 place-items-center border border-[var(--line)] t-ink transition-colors group-hover:border-[var(--lime)] group-hover:text-[#ff7403]">
                    <Icon className="size-4" />
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-semibold t-ink">{it.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed t-mut">{it.body}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="mono-label t-faint">{it.tag}</span>
                  <div className="flex gap-1 opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="cell cell-1 size-2.5" />
                    <span className="cell cell-2 size-2.5" />
                    <span className="cell cell-3 size-2.5" />
                    <span className="cell cell-4 size-2.5" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
