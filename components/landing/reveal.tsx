"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";

const variants: Variants = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

/** Fade-and-rise as the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.5, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
