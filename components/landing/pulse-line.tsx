"use client";

import { motion, useReducedMotion } from "motion/react";

/** ECG-meets-retention-chart line — the landing's signature motif. */
const D =
  "M0 140 L360 140 L388 140 L404 120 L420 140 L452 140 L470 152 L488 150 " +
  "L506 44 L524 178 L542 140 L580 140 L606 116 L634 140 L720 138 L780 126 " +
  "L860 130 L940 106 L1020 114 L1100 84 L1200 92";

export function PulseLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1200 220"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
          <stop offset="30%" stopColor="#22c55e" stopOpacity="0.7" />
          <stop offset="70%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#bbf7d0" />
        </linearGradient>
        <filter id="pulseGlow" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* faint base trace */}
      <path d={D} stroke="rgba(34,197,94,0.16)" strokeWidth="2" />

      {/* bright drawn-in trace */}
      <motion.path
        d={D}
        stroke="url(#pulseGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#pulseGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 2.6, ease: "easeInOut", delay: 0.3 }}
      />

      {/* glowing dot riding the trace */}
      {!reduce && (
        <circle r="5" fill="#dcfce7" filter="url(#pulseGlow)">
          <animateMotion dur="6s" repeatCount="indefinite" path={D} keyPoints="0;1" keyTimes="0;1" />
        </circle>
      )}
    </svg>
  );
}
