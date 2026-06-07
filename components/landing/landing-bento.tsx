import * as React from "react";
import {
  LineChart,
  BellRing,
  Gift,
  Watch,
  Palette,
  Coins,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/reveal";

function BentoCard({
  icon: Icon,
  title,
  description,
  className,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-1/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent-brand)_35%,transparent)]",
        className,
      )}
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(180px_circle_at_var(--x,50%)_0%,rgba(34,197,94,0.12),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-brand">
        <Icon className="size-5" />
      </div>
      <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

/* ---- mini visuals ---- */

function CohortStrip() {
  const rows = [
    [100, 73, 62, 55, 52, 50],
    [100, 71, 60, 54, 51, 0],
    [100, 75, 63, 56, 0, 0],
  ];
  const color = (v: number) => {
    if (v === 0) return "rgba(255,255,255,0.04)";
    const t = (v - 50) / 50;
    const r = Math.round(239 + (34 - 239) * t);
    const g = Math.round(68 + (197 - 68) * t);
    const b = Math.round(68 + (94 - 68) * t);
    return `rgb(${r},${g},${b})`;
  };
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1.5">
          {row.map((v, j) => (
            <div
              key={j}
              className="h-6 flex-1 rounded-md"
              style={{ backgroundColor: color(v) }}
              title={v ? `${v}%` : "—"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function NudgeRows() {
  const people: [string, string][] = [
    ["JH", "from-[#a78bfa] to-[#7c3aed]"],
    ["NW", "from-[#f472b6] to-[#be185d]"],
    ["FS", "from-[#f59e0b] to-[#b45309]"],
  ];
  return (
    <div className="flex flex-col gap-2.5">
      {people.map(([initials, grad]) => (
        <div key={initials} className="flex items-center gap-2.5">
          <span
            className={cn(
              "grid size-6 place-items-center rounded-full bg-gradient-to-br text-[9px] font-bold text-white",
              grad,
            )}
          >
            {initials}
          </span>
          <div className="h-2 flex-1 rounded-full bg-surface-3" />
          <span className="rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 text-[10px] font-semibold text-brand">
            Nudge
          </span>
        </div>
      ))}
    </div>
  );
}

function RewardChips() {
  const chips: [string, string][] = [
    ["🥤", "Protein Shake"],
    ["🎽", "Merch −10%"],
    ["💪", "PT Session"],
    ["🎁", "Guest Pass"],
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(([emoji, label]) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium"
        >
          <span className="text-sm">{emoji}</span>
          {label}
        </span>
      ))}
    </div>
  );
}

function DeviceChips() {
  return (
    <div className="flex flex-col gap-2">
      {["Apple Watch", "Garmin", "Amazfit"].map((d) => (
        <div
          key={d}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-xs font-medium"
        >
          <span className="size-1.5 rounded-full bg-success" />
          <Watch className="size-3.5 text-muted-foreground" />
          {d}
        </div>
      ))}
    </div>
  );
}

function BrandSwatches() {
  return (
    <div className="flex items-center gap-2">
      {["#22c55e", "#3b82f6", "#f59e0b", "#a78bfa", "#f472b6"].map((c) => (
        <span
          key={c}
          className="size-7 rounded-lg ring-1 ring-inset ring-white/10"
          style={{ backgroundColor: c }}
        />
      ))}
      <span className="ml-1 text-xs text-faint">your brand</span>
    </div>
  );
}

function RoiVisual() {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <div className="font-display num text-4xl font-bold text-gradient-green">€1,847</div>
        <p className="mt-1 text-xs text-muted-foreground">saved / month in prevented churn</p>
      </div>
      <div className="flex h-16 items-end gap-1.5">
        {[40, 55, 48, 70, 64, 92].map((h, i) => (
          <div
            key={i}
            className="w-3 rounded-t bg-gradient-to-t from-[#15803d] to-[#22c55e]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function LandingBento() {
  return (
    <section id="features" className="relative scroll-mt-24 px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Everything in one place
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Retention, engineered.
          </h2>
          <p className="mt-4 text-muted-foreground">
            From spotting a member going quiet to proving the euros you kept — FitLoyalty closes the
            whole loop.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <BentoCard
              icon={LineChart}
              title="Retention analytics"
              description="Cohort heatmaps, churn curves and live retention — see exactly which months you lose people and why."
              className="h-full"
            >
              <CohortStrip />
            </BentoCard>
          </Reveal>

          <Reveal delay={0.05}>
            <BentoCard
              icon={BellRing}
              title="At-risk detection"
              description="Members inactive 14+ days surface automatically. Send a personalized nudge in one tap."
              className="h-full"
            >
              <NudgeRows />
            </BentoCard>
          </Reveal>

          <Reveal delay={0.05}>
            <BentoCard
              icon={Gift}
              title="Rewards engine"
              description="Trigger perks on streaks, workouts or referrals — automatically."
              className="h-full"
            >
              <RewardChips />
            </BentoCard>
          </Reveal>

          <Reveal delay={0.1}>
            <BentoCard
              icon={Watch}
              title="Wearable sync"
              description="Apple Health, Garmin & more — workouts count themselves."
              className="h-full"
            >
              <DeviceChips />
            </BentoCard>
          </Reveal>

          <Reveal delay={0.15}>
            <BentoCard
              icon={Palette}
              title="White-label app"
              description="Your name, your colors, your logo — in the members' pocket."
              className="h-full"
            >
              <BrandSwatches />
            </BentoCard>
          </Reveal>

          <Reveal className="md:col-span-3">
            <BentoCard
              icon={Coins}
              title="Prove the ROI"
              description="A built-in calculator turns retention gains into the revenue you actually kept — the number you show your accountant."
            >
              <RoiVisual />
            </BentoCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
