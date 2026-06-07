"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Flame, Check } from "lucide-react";

import { HeatField } from "@/components/landing/heat-field";
import { BrowserFrame } from "@/components/landing/browser-frame";
import { OverviewScreen } from "@/components/landing/screens/overview-screen";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { y: "120%" },
  show: { y: 0, transition: { duration: 0.85, ease: [0.16, 0.8, 0.24, 1] } },
};
const fade: Variants = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.05em]">
      <motion.span variants={rise} className="block">
        {children}
      </motion.span>
    </span>
  );
}

export function LandingHero() {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-28 md:pb-32 md:pt-32">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[-15%] size-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.16),transparent)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(236,239,234,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 85% 60% at 50% 25%, #000 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
        {/* left */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-5">
          <motion.div
            variants={fade}
            className="flex items-center justify-between border-y border-[var(--line)] py-2.5"
          >
            <span className="mono-label t-mut">FitLoyalty ⌁ Retention OS</span>
            <span className="mono-label inline-flex items-center gap-1.5 t-faint">
              <span className="size-1.5 animate-breathe rounded-full bg-[var(--lime)]" /> Live
            </span>
          </motion.div>

          <h1 className="font-display mt-7 text-[clamp(2.4rem,10.5vw,5.2rem)] font-bold uppercase leading-[0.9] tracking-tight t-ink">
            <Line>Members</Line>
            <Line>don&apos;t quit</Line>
            <Line>
              on a <span className="text-heat">streak.</span>
            </Line>
          </h1>

          <motion.p variants={fade} className="mt-6 max-w-md text-base leading-relaxed t-mut">
            FitLoyalty turns every workout into a streak worth keeping — then shows you exactly
            who&apos;s about to break theirs, so you can win them back before they&apos;re gone.
          </motion.p>

          <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/overview"
              className="group inline-flex items-center gap-2 bg-acid px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-transform hover:-translate-y-0.5"
            >
              Explore the dashboard
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/member" className="mono-label group inline-flex items-center gap-1.5 t-ink">
              <span className="underline decoration-[var(--line)] underline-offset-4 transition-colors group-hover:decoration-[var(--acid)]">
                or open the member app
              </span>
              ↗
            </Link>
          </motion.div>

          <motion.div variants={fade} className="mono mt-8 inline-flex items-center gap-2 text-[12px] t-mut">
            <Flame className="size-4 text-[var(--lime)]" />
            14-DAY STREAK · TOP 8% AT YOUR GYM
          </motion.div>
        </motion.div>

        {/* right — layered product */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 0.8, 0.24, 1], delay: 0.4 }}
          className="lg:col-span-7"
        >
          <div className="relative [perspective:1800px]">
            <div className="lg:[transform:rotateY(-9deg)_rotateX(3deg)] lg:transition-transform lg:duration-500 lg:hover:[transform:rotateY(-4deg)]">
              <BrowserFrame>
                <OverviewScreen />
              </BrowserFrame>
            </div>

            {/* floating streak card */}
            <div className="absolute -bottom-8 -left-4 z-20 hidden w-52 rounded-2xl border border-white/10 bg-[#0d100e] p-3.5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] sm:block">
              <div className="flex items-center justify-between">
                <span className="mono-label t-faint">Consistency</span>
                <Flame className="size-3.5 text-[var(--lime)]" />
              </div>
              <div className="mt-2.5">
                <HeatField cols={11} rows={5} hotBand seed={7} gap={3} className="w-full" />
              </div>
              <div className="mt-3 flex items-end justify-between border-t border-white/8 pt-2.5">
                <div>
                  <div className="font-display text-2xl font-bold leading-none text-heat">14</div>
                  <div className="mono-label mt-1 t-mut">Day streak</div>
                </div>
                <div className="text-right text-[10px] font-semibold t-ink">TOP 8%</div>
              </div>
            </div>

            {/* floating nudge toast */}
            <div className="absolute -right-3 top-10 z-20 hidden items-center gap-2 rounded-full border border-[var(--acid)]/30 bg-[#0d100e] px-3 py-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] md:flex">
              <span className="grid size-5 place-items-center rounded-full bg-[var(--acid)]/15 text-[var(--acid)]">
                <Check className="size-3" />
              </span>
              <span className="mono text-[10px] t-ink">Nudge sent to Julia</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
