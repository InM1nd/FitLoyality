"use client";

import { QrCode, HeartPulse, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/reveal";
import { useT } from "@/lib/i18n/context";

// ─── Types ────────────────────────────────────────────────────────

type StepN = "1" | "2" | "3";
type LevelKey = "levelLight" | "levelNormal" | "levelStrong" | "levelIntense";

// ─── Data ─────────────────────────────────────────────────────────

// CheckInCard — 7-day attendance dots (Mon–Sun)
const CHECKIN_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;
const CHECKIN_VISITED = [true, true, false, true, true, true, false];

// WearableCard — HR values over a 45-min session
const HR_DATA = [62, 81, 104, 123, 138, 146, 143, 134, 119, 94];
const HR_MIN = 50, HR_MAX = 160;

const STEPS: { no: string; icon: LucideIcon; n: StepN }[] = [
  { no: "01", icon: QrCode, n: "1" },
  { no: "02", icon: HeartPulse, n: "2" },
  { no: "03", icon: Zap, n: "3" },
];

const LEVELS: { key: LevelKey; pts: number; pct: number }[] = [
  { key: "levelLight",   pts: 50,  pct: 0.25 },
  { key: "levelNormal",  pts: 100, pct: 0.50 },
  { key: "levelStrong",  pts: 150, pct: 0.75 },
  { key: "levelIntense", pts: 200, pct: 1.00 },
];

// ─── Shared sub-components ────────────────────────────────────────

// WearableCard — SVG area sparkline (HR trace over the session)
function WearableCard({ dark = false }: { dark?: boolean }) {
  const VW = 100, VH = 36;
  const pts = HR_DATA.map((v, i) => ({
    x: parseFloat(((i / (HR_DATA.length - 1)) * VW).toFixed(2)),
    y: parseFloat((VH - ((v - HR_MIN) / (HR_MAX - HR_MIN)) * VH).toFixed(2)),
  }));
  const linePath = `M ${pts.map((p) => `${p.x},${p.y}`).join(" L ")}`;
  const areaPath = `${linePath} L ${VW},${VH} L 0,${VH} Z`;
  // peak = index 5 (146 BPM)
  const peak = pts[5];
  const gradId = dark ? "wc-fill-d" : "wc-fill-l";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-xl border p-4",
        dark ? "border-white/10 bg-white/[0.05]" : "border-[var(--line)] bg-paper2",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <HeartPulse className="size-3" style={{ color: "var(--lime)" }} />
          <span className={cn("mono-label", dark ? "text-white/35" : "t-faint")}>LIVE SESSION</span>
        </div>
        <span className={cn("mono-label", dark ? "text-white/25" : "t-faint")}>14:22</span>
      </div>

      {/* HR sparkline */}
      <div className="mb-3 h-10 overflow-hidden">
        <motion.svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="none"
          className="h-full w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={dark ? "rgba(255,116,3,0.18)" : "rgba(255,116,3,0.28)"} />
              <stop offset="100%" stopColor="rgba(255,116,3,0)" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradId})`} />
          <path
            d={linePath}
            fill="none"
            stroke="var(--lime)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Peak highlight dot */}
          <circle cx={peak.x} cy={peak.y} r="2.5" fill="var(--lime)" />
        </motion.svg>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-[22px] font-bold leading-none" style={{ color: "var(--lime)" }}>
            142
          </div>
          <div className={cn("mono-label mt-0.5", dark ? "text-white/35" : "t-faint")}>
            BPM · Zone 3
          </div>
        </div>
        <div className="text-right">
          <div className={cn("mono text-[12px] font-semibold", dark ? "text-white/60" : "t-ink")}>
            38 min
          </div>
          <div className={cn("mono-label", dark ? "text-white/35" : "t-faint")}>active</div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared card shell ───────────────────────────────────────────
// All three step cards use this exact DOM structure so they look
// identical in weight, height, and rhythm.
//
//  ┌─────────────────────────────┐
//  │ icon  LABEL          TIME   │  ← header
//  │ ▁  ▃  ▇  ▄  ▂              │  ← 5 bars (h-10)
//  │ BIG NUM  sublabel  right    │  ← footer
//  └─────────────────────────────┘

// CheckInCard — 7-day attendance dot grid (Mon–Sun)
function CheckInCard() {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-paper2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <QrCode className="size-3 t-faint" />
          <span className="mono-label t-faint">CHECK-IN</span>
        </div>
        <span className="mono-label t-faint">09:15</span>
      </div>

      {/* Dot grid: day labels + dot per day */}
      <div className="mb-3 flex h-10 flex-col justify-center gap-[5px]">
        <div className="flex">
          {CHECKIN_DAYS.map((d, i) => (
            <div key={i} className="flex flex-1 justify-center">
              <span className="mono t-faint" style={{ fontSize: "7px", letterSpacing: 0 }}>{d}</span>
            </div>
          ))}
        </div>
        <div className="flex">
          {CHECKIN_VISITED.map((visited, i) => (
            <div key={i} className="flex flex-1 justify-center">
              <motion.div
                className="size-[10px] rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                style={{
                  background: visited ? "var(--lime)" : "rgba(26,26,26,0.10)",
                  boxShadow: visited ? "0 0 6px rgba(255,116,3,0.35)" : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-[22px] font-bold leading-none" style={{ color: "var(--lime)" }}>
            5
          </div>
          <div className="mono-label mt-0.5 t-faint">visits · this week</div>
        </div>
        <div className="text-right">
          <div className="mono text-[12px] font-semibold t-ink">3 sec</div>
          <div className="mono-label t-faint">scan time</div>
        </div>
      </div>
    </div>
  );
}

// IntensityCard — horizontal progress bars (intensity scale)
function IntensityCard() {
  const t = useT("howItWorks");
  return (
    <div className="rounded-xl border border-[var(--line)] bg-paper2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap className="size-3 t-faint" />
          <span className="mono-label t-faint">{t("intensityLabel")}</span>
        </div>
        <span className="mono-label t-faint">per session</span>
      </div>

      {/* 4 horizontal bars growing from left — intensity scale */}
      <div className="mb-3 flex h-10 flex-col justify-between">
        {LEVELS.map((lvl, i) => (
          <div
            key={lvl.key}
            className="h-[7px] overflow-hidden rounded-full"
            style={{ background: "rgba(26,26,26,0.07)" }}
          >
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${lvl.pct * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 0.8, 0.24, 1], delay: i * 0.08 }}
              style={{
                background:
                  i === LEVELS.length - 1
                    ? "var(--lime)"
                    : `rgba(255,116,3,${0.28 + i * 0.16})`,
                boxShadow:
                  i === LEVELS.length - 1 ? "0 0 6px rgba(255,116,3,0.3)" : undefined,
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-[22px] font-bold leading-none" style={{ color: "var(--lime)" }}>
            +200
          </div>
          <div className="mono-label mt-0.5 t-faint">pts · intense</div>
        </div>
        <div className="text-right">
          <div className="mono text-[12px] font-semibold t-ink">+50</div>
          <div className="mono-label t-faint">base always</div>
        </div>
      </div>
    </div>
  );
}


// ─── How It Works: Flow layout ────────────────────────────────────

function HowItWorksFlow() {
  const t = useT("howItWorks");
  return (
    <div className="bg-paper px-5 py-16 md:py-24">
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.no} delay={i * 0.1} className="relative">
                {/* Connector dot between steps */}
                {i < 2 && (
                  <div
                    className="absolute right-0 top-[72px] z-10 hidden -translate-y-1/2 translate-x-1/2 md:block"
                    aria-hidden
                  >
                    <div className="flex items-center gap-0.5">
                      <div className="h-px w-4 bg-[var(--line)]" />
                      <div className="size-2 rounded-full bg-[var(--lime)] shadow-[0_0_6px_rgba(255,116,3,0.45)]" />
                      <div className="h-px w-4 bg-[var(--line)]" />
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "flex h-full flex-col border-[var(--line)] p-7",
                    "border-b md:border-b-0 md:border-t",
                    i > 0 && "md:border-l",
                  )}
                >
                  {/* Ghost outline number */}
                  <div
                    className="num-ghost font-display select-none text-[72px] font-black leading-none"
                    aria-hidden
                  >
                    {step.no}
                  </div>

                  <div className="mt-4 flex items-center gap-2.5">
                    <div className="grid size-8 place-items-center border border-[var(--line)]">
                      <Icon className="size-4 t-mut" />
                    </div>
                    <h3 className="font-display text-xl font-semibold t-ink">{t(`t${step.n}`)}</h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed t-mut">{t(`b${step.n}`)}</p>

                  {/* mt-auto aligns all three cards to the same Y regardless of body text height */}
                  <div className="mt-auto pt-5">
                    {step.n === "1" && <CheckInCard />}
                    {step.n === "2" && <WearableCard />}
                    {step.n === "3" && <IntensityCard />}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="border-t border-[var(--line)] px-1 pt-3">
          <p className="text-[10.5px] t-faint">{t("baseNote")}</p>
        </Reveal>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────

export function LandingHowItWorks() {
  return <HowItWorksFlow />;
}
