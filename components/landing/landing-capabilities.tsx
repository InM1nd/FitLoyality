import {
  BellRing,
  Flame,
  Layers,
  Activity,
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
  { no: "01", icon: BellRing, title: "Churn-window alerts", body: "Inactive 14+ days and the cancellation deadline is near — the member surfaces before it's too late, with one-tap nudge.", tag: "Kündigungsfrist" },
  { no: "02", icon: Coins, title: "Saved Revenue", body: "Every save is attributed: nudged, returned, euros kept. The one number that proves FitLoyalty pays for itself.", tag: "Attribution" },
  { no: "03", icon: Layers, title: "Aggregator Hub", body: "USC, Wellpass and Hansefit in one view — visit payouts, your true revenue mix, and the regulars worth converting.", tag: "USC · Wellpass" },
  { no: "04", icon: Flame, title: "Weekly streaks", body: "Built for how people actually train — 3 workouts a week, freeze included. Loss aversion that motivates, never punishes.", tag: "Gamification" },
  { no: "05", icon: Activity, title: "Live occupancy", body: "\"How full is it right now?\" — the reason members open your app daily, powered by their own check-ins.", tag: "Member app" },
  { no: "06", icon: Palette, title: "White-label app", body: "Your name, your colors, your logo — the member experience, branded as your studio. No App Store needed.", tag: "Branding" },
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
