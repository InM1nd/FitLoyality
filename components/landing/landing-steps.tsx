import { PlugZap, Gift, HeartPulse, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: PlugZap,
    title: "Connect",
    body: "Import your members and sync wearables in minutes. No migration headaches, no IT team required.",
  },
  {
    icon: Gift,
    title: "Reward",
    body: "Set up automated perks for the habits you want — streaks, workouts, referrals. FitLoyalty handles the rest.",
  },
  {
    icon: HeartPulse,
    title: "Retain",
    body: "Spot at-risk members early, nudge them back, and watch retention climb — with the ROI to prove it.",
  },
];

export function LandingSteps() {
  return (
    <section id="how" className="relative scroll-mt-24 px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            How it works
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Live in an afternoon.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three steps from spreadsheet chaos to a retention engine that runs itself.
          </p>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--accent-brand)_45%,transparent)] to-transparent md:block" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 0.12} className="relative text-center">
                <div className="relative z-10 mx-auto grid size-14 place-items-center rounded-2xl border border-border bg-surface-1 text-brand shadow-[var(--shadow-glow)]">
                  <Icon className="size-6" />
                  <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
