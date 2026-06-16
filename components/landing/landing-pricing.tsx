"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";

const TIERS: {
  name: string;
  price: number;
  blurbKey: string;
  featureKeys: string[];
  highlighted?: boolean;
  tagKey?: string;
}[] = [
  {
    name: "Starter",
    price: 49,
    blurbKey: "starterBlurb",
    featureKeys: ["sf1", "sf2", "sf3", "sf4", "sf5", "sf6"],
  },
  {
    name: "Growth",
    price: 149,
    blurbKey: "growthBlurb",
    tagKey: "mostPopular",
    highlighted: true,
    featureKeys: ["gf1", "gf2", "gf3", "gf4", "gf5", "gf6"],
  },
  {
    name: "Pro",
    price: 249,
    blurbKey: "proBlurb",
    featureKeys: ["pf1", "pf2", "pf3", "pf4", "pf5", "pf6"],
  },
];

export function LandingPricing() {
  const t = useT("pricing");
  const tc = useT("common");
  return (
    <section id="pricing" className="scroll-mt-20 px-5 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mono-label t-faint">{t("eyebrow")}</span>
              <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
                {t("title")}
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">{t("sub")}</p>
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
              {tier.tagKey && (
                <span className="absolute -top-3 left-7 rounded-full bg-[#ff7403] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                  {t(tier.tagKey)}
                </span>
              )}

              <div className="flex items-baseline justify-between">
                <h3 className={cn("font-display text-xl font-semibold", tier.highlighted ? "text-[#f5f2ec]" : "t-ink")}>
                  {tier.name}
                </h3>
                <div className={cn("font-display num text-3xl font-bold", tier.highlighted ? "text-[#ff7403]" : "t-ink")}>
                  €{tier.price}
                  <span className={cn("text-sm font-medium", tier.highlighted ? "text-[#f5f2ec]/50" : "t-faint")}>
                    {t("perMo")}
                  </span>
                </div>
              </div>

              <p className={cn("mt-3 text-sm leading-relaxed", tier.highlighted ? "text-[#f5f2ec]/70" : "t-mut")}>
                {t(tier.blurbKey)}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {tier.featureKeys.map((fk) => (
                  <li key={fk} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn("mt-0.5 size-4 shrink-0", tier.highlighted ? "text-[#ff7403]" : "text-[#ff7403]")}
                    />
                    <span className={tier.highlighted ? "text-[#f5f2ec]/85" : "t-ink"}>{t(fk)}</span>
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
                {tc("tryDemo")}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="mono text-center text-[12px] t-faint">{t("footnote")}</p>
        </Reveal>
      </div>
    </section>
  );
}
