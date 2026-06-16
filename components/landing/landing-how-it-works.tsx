"use client";

import { QrCode, HeartPulse, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { useT } from "@/lib/i18n/context";

const STEPS: { no: string; icon: LucideIcon; n: "1" | "2" | "3" }[] = [
  { no: "01", icon: QrCode, n: "1" },
  { no: "02", icon: HeartPulse, n: "2" },
  { no: "03", icon: Zap, n: "3" },
];

const LEVELS: {
  key: "levelLight" | "levelNormal" | "levelStrong" | "levelIntense";
  pts: number;
  w: string;
}[] = [
  { key: "levelLight",   pts: 100, w: "25%" },
  { key: "levelNormal",  pts: 150, w: "50%" },
  { key: "levelStrong",  pts: 200, w: "75%" },
  { key: "levelIntense", pts: 250, w: "100%" },
];

export function LandingHowItWorks() {
  const t = useT("howItWorks");

  return (
    <section className="bg-[#f5f2ec] px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mono-label t-faint">{t("eyebrow")}</span>
            <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">{t("sub")}</p>
        </Reveal>

        <div className="mt-12 border-l border-t border-[var(--line)]">
          {/* 3 equal step cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.no} delay={i * 0.08} className="border-b border-r border-[var(--line)] p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="mono text-[11px] t-faint">{step.no}</span>
                    <div className="grid size-9 place-items-center border border-[var(--line)]">
                      <Icon className="size-4 t-mut" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-semibold t-ink">{t(`t${step.n}`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed t-mut">{t(`b${step.n}`)}</p>
                </Reveal>
              );
            })}
          </div>

          {/* Intensity scale label */}
          <div className="flex items-center border-b border-r border-[var(--line)] px-7 py-3.5">
            <span className="mono-label t-faint">{t("intensityLabel")}</span>
          </div>

          {/* 4 level cells */}
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {LEVELS.map((lvl) => (
              <div key={lvl.key} className="border-b border-r border-[var(--line)] px-6 py-5">
                <div className="mb-3 h-[3px] overflow-hidden bg-[#1a1a1a]/10">
                  <div className="h-full bg-[#ff7403]" style={{ width: lvl.w }} />
                </div>
                <p className="mono-label t-mut">{t(lvl.key)}</p>
                <p className="mono mt-2 text-[18px] font-bold t-lime">
                  +{lvl.pts}
                  <span className="ml-1 text-[10px] font-medium t-faint">pts</span>
                </p>
              </div>
            ))}
          </div>

          {/* Base note */}
          <div className="border-b border-r border-[var(--line)] px-7 py-3">
            <p className="text-[10.5px] t-faint">{t("baseNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
