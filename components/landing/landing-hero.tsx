"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Smartphone, Sparkles } from "lucide-react";

import { PulseLine } from "@/components/landing/pulse-line";
import { MockDashboard } from "@/components/landing/mock-dashboard";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.21, 0.5, 0.2, 1] } },
};

export function LandingHero() {
  const reduce = useReducedMotion();

  return (
    <section className="grain relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
      {/* ---- atmosphere ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* top radial glow */}
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.18),transparent)]" />
        {/* grid with fade mask */}
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_40%,transparent_75%)]" />
        {/* floating orbs */}
        <div className="animate-orb absolute -left-20 top-40 size-72 rounded-full bg-[#22c55e]/20 blur-[100px]" />
        <div className="animate-orb-slow absolute right-0 top-10 size-80 rounded-full bg-[#16a34a]/15 blur-[120px]" />
        {/* signature pulse line */}
        <PulseLine className="absolute inset-x-0 top-[42%] h-72 w-full opacity-70" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            Retention OS for independent fitness studios
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display mt-6 text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl"
        >
          Turn churn into
          <br />
          <span className="text-gradient-green">loyalty.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          FitLoyalty spots the members slipping away, rewards the habits that keep them, and proves
          the revenue you saved — all in one white-label platform built for the DACH region.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/overview"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_0_1px_rgba(34,197,94,0.4)] transition-all hover:shadow-[var(--shadow-glow)]"
          >
            Explore the dashboard
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/member"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            <Smartphone className="size-4" /> See the member app
          </Link>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-5 flex items-center gap-1.5 text-xs text-faint"
        >
          <Sparkles className="size-3.5 text-brand" />
          Live interactive demo · no signup · all data simulated
        </motion.p>
      </motion.div>

      {/* ---- floating product mock ---- */}
      <motion.div
        initial={{ y: 60, opacity: 0, rotateX: reduce ? 0 : 12 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.21, 0.5, 0.2, 1], delay: 0.5 }}
        style={{ perspective: 1200 }}
        className="relative mx-auto mt-16 max-w-5xl px-5"
      >
        <div className="absolute inset-x-10 -top-6 h-40 rounded-full bg-[#22c55e]/20 blur-[80px]" />
        <div className="glow-ring relative rounded-2xl">
          <MockDashboard />
        </div>
        {/* fade into page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </motion.div>
    </section>
  );
}
