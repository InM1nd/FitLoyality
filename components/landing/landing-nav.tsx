"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/layout/logo";

const LINKS = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#product", label: "Product" },
  { href: "#process", label: "Process" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] backdrop-blur-md"
          : "border-transparent",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="mono text-[13px] font-semibold tracking-[0.16em] t-ink">FITLOYALTY</span>
        </Link>

        <div className="ml-4 hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono-label t-mut transition-colors hover:t-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-5">
          <Link
            href="/member"
            className="mono-label hidden t-mut transition-colors hover:t-ink sm:inline-flex"
          >
            Member app ↗
          </Link>
          <Link
            href="/overview"
            className="group inline-flex items-center gap-1.5 bg-acid px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-transform hover:-translate-y-0.5"
          >
            Open dashboard
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
