"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { formatEUR } from "@/lib/utils";

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

function SliderRow({ label, value, min, max, step, format, onChange }: SliderRowProps) {
  const id = React.useId();
  return (
    <div className="border-b border-[var(--line)] py-5 last:border-0">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="mono-label t-mut">
          {label}
        </label>
        <span className="num font-display text-2xl font-semibold t-ink">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--paper-3)] accent-[var(--lime)]"
      />
    </div>
  );
}

export function ChurnCheck() {
  const [members, setMembers] = React.useState(220);
  const [fee, setFee] = React.useState(79);
  const [churn, setChurn] = React.useState(15);

  // steady-state: every month `members × churn%` walk out, each worth `fee` MRR
  const annualLoss = Math.round(members * (churn / 100) * fee * 12);
  const recovered = Math.round(annualLoss * 0.3);

  return (
    <section id="churn-check" className="scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mono-label t-faint">06 — Your numbers</span>
              <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
                Run the Churn-Check.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">
              Three sliders, your studio, the money that walks out silently every year.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* inputs */}
          <div>
            <SliderRow
              label="Members"
              value={members}
              min={50}
              max={800}
              step={10}
              format={(v) => String(v)}
              onChange={setMembers}
            />
            <SliderRow
              label="Avg. monthly fee"
              value={fee}
              min={39}
              max={159}
              step={5}
              format={(v) => `€${v}`}
              onChange={setFee}
            />
            <SliderRow
              label="Annual churn"
              value={churn}
              min={5}
              max={40}
              step={1}
              format={(v) => `${v}%`}
              onChange={setChurn}
            />
          </div>

          {/* result */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#1a1a1a] p-8 md:p-10">
            <div>
              <span className="mono-label text-[#f5f2ec]/50">Walking out silently</span>
              <div
                className="font-display num mt-3 text-5xl font-bold tracking-tight text-[#ff7403] md:text-6xl"
                aria-live="polite"
              >
                {formatEUR(annualLoss)}
                <span className="text-2xl font-medium text-[#f5f2ec]/40"> /year</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f5f2ec]/70">
                Most of these members never complain — they just stop coming. Win back even a
                third of them and that&apos;s{" "}
                <span className="font-semibold text-[#93dafe]">{formatEUR(recovered)}</span>
                {" "}back on your P&amp;L, against €149/month for FitLoyalty.
              </p>
            </div>
            <Link
              href="/overview"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#ff7403] px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
            >
              See how we stop it
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
