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
    <section className="relative overflow-hidden bg-[#f5f2ec] px-5 pb-24 pt-28 md:pb-32 md:pt-32">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 800px 600px at 60% 50%, rgba(255,116,3,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
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
            className="inline-flex items-center gap-2.5 rounded-full bg-[#1a1a1a] px-3.5 py-1.5 text-[#f5f2ec]"
          >
            <span className="mono-label">FitLoyalty ⌁ Retention OS</span>
            <span className="mono-label inline-flex items-center gap-1.5 text-[#f5f2ec]/70">
              {/* sky blue — system/live indicator */}
              <span className="size-1.5 animate-breathe rounded-full bg-[#93dafe]" /> Live
            </span>
          </motion.div>

          <h1 className="font-display mt-7 text-[clamp(2.4rem,10.5vw,5.2rem)] font-light leading-[0.9] tracking-[-0.03em] text-[#1a1a1a]">
            <Line>Members</Line>
            <Line>don&apos;t quit</Line>
            <Line>
              on a{" "}
              {/* papaya-orange — energy/streak highlight */}
              <span className="inline rounded-lg bg-[#ff7403] px-3 py-1 font-black uppercase text-white">streak.</span>
            </Line>
          </h1>

          <motion.p variants={fade} className="mt-6 max-w-md text-base leading-relaxed text-[#3d3d3d]">
            FitLoyalty turns every workout into a streak worth keeping — then shows you exactly
            who&apos;s about to break theirs, so you can win them back before they&apos;re gone.
          </motion.p>

          <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/overview"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#1a1a1a] px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#f5f2ec] transition-all hover:-translate-y-0.5 hover:bg-[#2d2d2d]"
            >
              Explore the dashboard
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/member" className="mono-label group inline-flex items-center gap-1.5 text-[#3d3d3d]">
              <span className="underline decoration-[#3d3d3d]/30 underline-offset-4 transition-colors group-hover:text-[#1a1a1a]">
                or open the member app
              </span>
              ↗
            </Link>
          </motion.div>

          <motion.div variants={fade} className="mono mt-8 inline-flex items-center gap-2 text-[12px] text-[#6b6b6b]">
            <Flame className="size-4 text-[#ff7403]" />
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
            <div className="absolute -bottom-8 -left-4 z-20 hidden w-52 rounded-2xl border border-white/10 bg-[#1a1a1a] p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:block">
              <div className="flex items-center justify-between">
                <span className="mono-label text-white/50">Consistency</span>
                <Flame className="size-3.5 text-[#ff7403]" />
              </div>
              <div className="mt-2.5">
                <HeatField cols={11} rows={5} hotBand seed={7} gap={3} className="w-full" />
              </div>
              <div className="mt-3 flex items-end justify-between border-t border-white/8 pt-2.5">
                <div>
                  <div className="font-display text-2xl font-bold leading-none text-[#ff7403]">14</div>
                  <div className="mono-label mt-1 text-white/50">Day streak</div>
                </div>
                {/* sky blue — rank/data badge */}
                <div className="rounded-full bg-[#93dafe] px-2 py-0.5 text-[10px] font-semibold text-[#1a1a1a]">TOP 8%</div>
              </div>
            </div>

            {/* floating nudge toast */}
            <div className="absolute -right-3 top-10 z-20 hidden items-center gap-2 rounded-full border border-black/8 bg-white px-3 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.08)] md:flex">
              {/* sky blue — notification/confirmation */}
              <span className="grid size-5 place-items-center rounded-full bg-[#93dafe] text-[#1a1a1a]">
                <Check className="size-3" />
              </span>
              <span className="mono text-[10px] text-[#1a1a1a]">Nudge sent to Julia</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
