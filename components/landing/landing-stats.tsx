"use client";

import { Counter } from "@/components/landing/counter";
import { Reveal } from "@/components/landing/reveal";
import { HeatStrip } from "@/components/landing/heat-field";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";

const STATS: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  labelKey: string;
}[] = [
  { value: 81.4, decimals: 1, suffix: "%", labelKey: "s1" },
  { value: 9, labelKey: "s2" },
  { value: 92, suffix: "%", labelKey: "s3" },
  { value: 2340, prefix: "€", labelKey: "s4" },
];

export function LandingStats() {
  const t = useT("stats");
  return (
    <section id="streak" className="scroll-mt-20 px-5 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <span className="mono-label t-faint">{t("eyebrow")}</span>
          <h2 className="font-display mt-3 text-3xl font-semibold leading-[1.05] tracking-tight t-ink md:text-5xl">
            {t("titlePre")} <span className="text-heat">{t("titleAccent")}</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed t-mut">{t("body")}</p>
        </Reveal>

        <div className="mt-10">
          <HeatStrip cols={64} seed={11} />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.labelKey}
              delay={i * 0.08}
              className={cn(
                "border-b border-[var(--line)] px-1 py-8 md:border-b-0 md:border-l md:px-6",
                i % 2 === 1 && "border-l border-[var(--line)] pl-5 md:pl-6",
                i === 0 && "md:border-l-0 md:pl-0",
              )}
            >
              <div className="font-display num text-5xl font-semibold tracking-tight t-ink md:text-6xl">
                {s.prefix && <span className="t-lime">{s.prefix}</span>}
                <Counter to={s.value} decimals={s.decimals} />
                {s.suffix && <span className="t-lime">{s.suffix}</span>}
              </div>
              <p className="mono-label mt-3 t-mut">{t(s.labelKey)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
