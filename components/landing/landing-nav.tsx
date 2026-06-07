"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/layout/logo";

const LINKS = [
  { href: "#streak", label: "Why streaks" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#product", label: "Product" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:pt-4"
    >
      <nav
        className={cn(
          "relative mx-auto flex h-13 max-w-5xl items-center gap-4 rounded-2xl border px-3 py-2 transition-all duration-300",
          scrolled
            ? "border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_72%,transparent)] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-white/8 bg-[color-mix(in_srgb,var(--paper)_45%,transparent)] backdrop-blur-md",
        )}
      >
        {/* glass top sheen */}
        <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* left: logo + tag */}
        <Link href="/" className="flex items-center gap-2.5 pl-1">
          <LogoMark />
          <span className="mono text-[13px] font-semibold tracking-[0.16em] t-ink">FITLOYALTY</span>
        </Link>
        <span className="hidden items-center gap-1.5 border-l border-[var(--line)] pl-3 lg:flex">
          <span className="size-1.5 animate-breathe rounded-full bg-[var(--lime)]" />
          <span className="mono-label t-faint">Retention OS</span>
        </span>

        {/* center: links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="mono-label t-mut transition-colors hover:t-ink">
              {l.label}
            </a>
          ))}
        </div>

        {/* right */}
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/member"
            className="mono-label hidden t-mut transition-colors hover:t-ink sm:inline-flex"
          >
            Member app ↗
          </Link>
          <Link
            href="/overview"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-acid px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-transform hover:-translate-y-0.5"
          >
            Open dashboard
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
