"use client";

import {
  BellRing,
  Flame,
  Layers,
  Activity,
  HeartPulse,
  Coins,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { useT } from "@/lib/i18n/context";

const ITEMS: { no: string; icon: LucideIcon; n: string }[] = [
  { no: "01", icon: BellRing, n: "1" },
  { no: "02", icon: Coins, n: "2" },
  { no: "03", icon: Layers, n: "3" },
  { no: "04", icon: Flame, n: "4" },
  { no: "05", icon: Activity, n: "5" },
  { no: "06", icon: HeartPulse, n: "6" },
];

export function LandingCapabilities() {
  const t = useT("capabilities");
  return (
    <section id="capabilities" className="scroll-mt-20 px-5 py-16 md:py-28">
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
                <h3 className="font-display mt-6 text-xl font-semibold t-ink">{t(`t${it.n}`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed t-mut">{t(`b${it.n}`)}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="mono-label t-faint">{t(`tag${it.n}`)}</span>
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
