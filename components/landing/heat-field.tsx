"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

const RAMP = ["var(--h0)", "var(--h1)", "var(--h2)", "var(--h3)", "var(--h4)"];
const GLOW = [undefined, undefined, undefined, "0 0 10px rgba(43,212,95,0.3)", "0 0 14px rgba(163,230,53,0.45)"];

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface HeatFieldProps {
  cols?: number;
  rows?: number;
  /** bias a bright diagonal "streak" through the field */
  hotBand?: boolean;
  seed?: number;
  gap?: number;
  breathe?: boolean;
  className?: string;
}

export function HeatField({
  cols = 18,
  rows = 7,
  hotBand = false,
  seed = 7,
  gap = 4,
  breathe = true,
  className,
}: HeatFieldProps) {
  const reduce = useReducedMotion();

  const levels = React.useMemo(() => {
    const r = mulberry32(seed * 2654435761);
    const arr: number[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v = r();
        let lvl = v < 0.46 ? 0 : v < 0.68 ? 1 : v < 0.84 ? 2 : v < 0.94 ? 3 : 4;
        if (hotBand) {
          // diagonal band running bottom-left → top-right
          const diag = (x / Math.max(cols - 1, 1)) * (rows - 1);
          const d = Math.abs(rows - 1 - y - diag);
          if (d < 1.1) lvl = Math.max(lvl, r() > 0.4 ? 4 : 3);
          else if (d < 2.3) lvl = Math.max(lvl, 2);
        }
        arr.push(lvl);
      }
    }
    return arr;
  }, [cols, rows, hotBand, seed]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.004 } },
  };
  const cell: Variants = {
    hidden: { opacity: 0, scale: 0.35 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      aria-hidden
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={cn("grid", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap }}
    >
      {levels.map((lvl, i) => (
        <motion.div
          key={i}
          variants={cell}
          className={cn("rounded-[3px]", lvl >= 3 && breathe && !reduce && "animate-breathe")}
          style={{
            aspectRatio: "1 / 1",
            background: RAMP[lvl],
            boxShadow: GLOW[lvl],
            animationDelay: `${(i % 19) * 130}ms`,
          }}
        />
      ))}
    </motion.div>
  );
}

/** Single-row igniting heat strip — section divider. */
export function HeatStrip({ cols = 60, seed = 3 }: { cols?: number; seed?: number }) {
  return (
    <div className="overflow-hidden py-px">
      <HeatField cols={cols} rows={1} seed={seed} gap={4} breathe className="w-full" />
    </div>
  );
}
