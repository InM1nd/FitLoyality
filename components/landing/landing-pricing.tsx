import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

const TIERS: {
  name: string;
  price: number;
  blurb: string;
  features: string[];
  highlighted?: boolean;
  tag?: string;
}[] = [
  {
    name: "Starter",
    price: 49,
    blurb: "The retention basics for studios that run on Excel and instinct.",
    features: [
      "White-label member app (PWA)",
      "Weekly streaks, badges & rewards",
      "Live occupancy for members",
      "QR check-in + CSV import",
      "Churn-window alerts",
      "Saved Revenue counter",
    ],
  },
  {
    name: "Growth",
    price: 149,
    blurb: "For studios living with USC, Wellpass & Hansefit — turn the aggregator flood into revenue.",
    tag: "Most popular",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Aggregator Hub — full revenue mix",
      "Convertible USC regulars + offers",
      "WhatsApp nudges (opt-in built in)",
      "Review & referral engine",
      "Eversports attendance import",
    ],
  },
  {
    name: "Pro",
    price: 249,
    blurb: "For multi-location operators who want the full white-label experience.",
    features: [
      "Everything in Growth",
      "Multiple locations, one dashboard",
      "Custom app domain & branding",
      "Onboarding autopilot (first 90 days)",
      "Win-back campaigns",
      "API access",
    ],
  },
];

export function LandingPricing() {
  return (
    <section id="pricing" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mono-label t-faint">07 — Pricing</span>
              <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
                Two saved members and it&apos;s paid for.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">
              No setup fee, no contract longer than your members&apos;. Start with the free
              Churn-Check — no card needed.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.08}
              className={cn(
                "relative flex flex-col rounded-2xl border p-7",
                tier.highlighted
                  ? "border-[#ff7403] bg-[#1a1a1a] text-[#f5f2ec] shadow-[0_12px_40px_rgba(255,116,3,0.15)]"
                  : "border-[var(--line)] bg-paper2",
              )}
            >
              {tier.tag && (
                <span className="absolute -top-3 left-7 rounded-full bg-[#ff7403] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                  {tier.tag}
                </span>
              )}

              <div className="flex items-baseline justify-between">
                <h3 className={cn("font-display text-xl font-semibold", tier.highlighted ? "text-[#f5f2ec]" : "t-ink")}>
                  {tier.name}
                </h3>
                <div className={cn("font-display num text-3xl font-bold", tier.highlighted ? "text-[#ff7403]" : "t-ink")}>
                  €{tier.price}
                  <span className={cn("text-sm font-medium", tier.highlighted ? "text-[#f5f2ec]/50" : "t-faint")}>
                    /mo
                  </span>
                </div>
              </div>

              <p className={cn("mt-3 text-sm leading-relaxed", tier.highlighted ? "text-[#f5f2ec]/70" : "t-mut")}>
                {tier.blurb}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn("mt-0.5 size-4 shrink-0", tier.highlighted ? "text-[#ff7403]" : "text-[#ff7403]")}
                    />
                    <span className={tier.highlighted ? "text-[#f5f2ec]/85" : "t-ink"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/overview"
                className={cn(
                  "group mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] transition-all hover:-translate-y-0.5",
                  tier.highlighted
                    ? "bg-[#ff7403] text-white"
                    : "bg-[#1a1a1a] text-[#f5f2ec] hover:bg-[#2d2d2d]",
                )}
              >
                Try the demo
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="mono text-center text-[12px] t-faint">
            All plans: unlimited members · EU hosting · AVV/DSGVO included · cancel monthly
          </p>
        </Reveal>
      </div>
    </section>
  );
}
