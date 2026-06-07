"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";

interface CounterProps {
  to: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** Counts up from 0 → `to` the first time it scrolls into view. */
export function Counter({
  to,
  decimals = 0,
  duration = 1600,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let raf = 0;
    if (reduce) {
      raf = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const factor = Math.pow(10, decimals);
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased * factor) / factor);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration, decimals]);

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
