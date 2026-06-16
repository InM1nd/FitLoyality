"use client";

import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";

const STEPS = [
  { no: "01", n: "1" },
  { no: "02", n: "2" },
  { no: "03", n: "3" },
];

export function LandingSteps() {
  const t = useT("steps");
  return (
    <section id="process" className="scroll-mt-20 px-5 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label t-faint">{t("eyebrow")}</span>
            <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">{t("sub")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.no}
              delay={i * 0.1}
              className={cn(
                "border-b border-[var(--line)] py-8 md:border-b-0 md:border-l md:px-8",
                i === 0 && "md:border-l-0 md:pl-0",
              )}
            >
              <span className="font-display block text-6xl num-ghost md:text-7xl">{step.no}</span>
              <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight t-ink">
                {t(`t${step.n}`)}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed t-mut">{t(`b${step.n}`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
