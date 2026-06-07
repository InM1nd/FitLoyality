"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Marker } from "@/components/landing/marker";
import { GridLines } from "@/components/landing/grid-lines";
import { MockDashboard } from "@/components/landing/mock-dashboard";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const rise: Variants = {
  hidden: { y: "118%" },
  show: { y: 0, transition: { duration: 0.85, ease: [0.16, 0.8, 0.24, 1] } },
};
const fade: Variants = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span variants={rise} className="block">
        {children}
      </motion.span>
    </span>
  );
}

export function LandingHero() {
  return (
    <section className="relative px-5 pt-24 md:pt-28">
      <GridLines count={4} className="opacity-70" />

      <div className="relative mx-auto max-w-6xl">
        {/* meta row */}
        <div className="flex items-center justify-between border-y border-[var(--line)] py-2.5">
          <span className="mono-label t-mut">FitLoyalty ⌁ Retention OS</span>
          <span className="mono-label t-faint">EST. WIEN · DACH 2026</span>
        </div>

        {/* headline */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display mt-8 text-[15vw] font-bold uppercase leading-[0.86] tracking-[-0.02em] t-ink sm:text-[12vw] md:mt-10 md:text-[8.6rem]"
        >
          <Line>Keep the</Line>
          <Line>members you</Line>
          <Line>
            <Marker>fight</Marker> to win.
          </Line>
        </motion.h1>

        {/* lower row: copy + exhibit */}
        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-[var(--line)] pt-8 lg:grid-cols-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-5"
          >
            <motion.p variants={fade} className="max-w-md text-base leading-relaxed t-mut">
              FitLoyalty spots the members slipping away, rewards the habits that keep them, and
              proves the revenue you saved — one white-label platform built for independent studios.
            </motion.p>

            <motion.div variants={fade} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/overview"
                className="group inline-flex items-center gap-2 bg-acid px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-transform hover:-translate-y-0.5"
              >
                Explore the dashboard
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/member"
                className="mono-label group inline-flex items-center gap-1.5 t-ink"
              >
                <span className="underline decoration-[var(--line)] decoration-1 underline-offset-4 transition-colors group-hover:decoration-[var(--acid)]">
                  or see the member app
                </span>
                ↗
              </Link>
            </motion.div>

            <motion.div
              variants={fade}
              className="mono mt-8 flex items-center gap-4 text-[11px] t-faint"
            >
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[var(--acid)]" /> LIVE DEMO
              </span>
              <span className="rule h-3 w-px" />
              <span>NO SIGNUP</span>
              <span className="rule h-3 w-px" />
              <span>DATA SIMULATED</span>
            </motion.div>
          </motion.div>

          {/* exhibit */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 0.8, 0.24, 1], delay: 0.5 }}
            className="lg:col-span-7"
          >
            <figure className="relative">
              <div className="absolute -left-3 -top-3 hidden font-display text-7xl num-ghost md:block">
                01
              </div>
              <div
                data-exhibit
                className="overflow-hidden border border-[var(--ink)] bg-[#0a0a0a] shadow-[12px_12px_0_0_rgba(21,20,14,0.1)]"
              >
                <MockDashboard className="rounded-none border-0 shadow-none" />
              </div>
              <figcaption className="mt-3 flex items-center justify-between border-t border-[var(--line)] pt-2">
                <span className="mono-label t-mut">Fig. 01 — Admin dashboard</span>
                <span className="mono-label t-faint">app.fitloyalty.io ↗</span>
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
