"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/** A highlighter-green swipe that draws in behind the text on view. */
export function Marker({
  children,
  className,
  delay = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("relative inline-block", className)}>
      <motion.span
        aria-hidden
        className="absolute inset-x-[-0.08em] bottom-[0.1em] -z-10 h-[0.52em] origin-left -skew-x-12 rounded-[2px]"
        style={{ background: "var(--marker)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduce ? 0 : 0.55, ease: [0.2, 0.6, 0.2, 1], delay }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
