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
            ? "border-black/8 bg-[#f5f2ec]/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        {/* left: logo + tag */}
        <Link href="/" className="flex items-center gap-2.5 pl-1">
          <LogoMark />
          <span className="mono text-[13px] font-semibold tracking-[0.16em] text-[#1a1a1a]">FITLOYALTY</span>
        </Link>
        <span className="hidden items-center gap-1.5 border-l border-black/10 pl-3 lg:flex">
          <span className="size-1.5 animate-breathe rounded-full bg-[#93dafe]" />
          <span className="mono-label text-[#6b6b6b]">Retention OS</span>
        </span>

        {/* center: links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="mono-label text-[#1a1a1a]/60 transition-colors hover:text-[#1a1a1a]">
              {l.label}
            </a>
          ))}
        </div>

        {/* right */}
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/member"
            className="mono-label hidden text-[#6b6b6b] transition-colors hover:text-[#1a1a1a] sm:inline-flex"
          >
            Member app ↗
          </Link>
          <Link
            href="/overview"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-[#1a1a1a] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#f5f2ec] transition-all hover:-translate-y-0.5 hover:bg-[#2d2d2d]"
          >
            Open dashboard
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
