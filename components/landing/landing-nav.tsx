"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#product", label: "Product" },
  { href: "#how", label: "How it works" },
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
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center gap-4 rounded-full border px-3 py-2 transition-all duration-300",
          scrolled
            ? "border-border bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="pl-1.5">
          <Logo />
        </Link>

        <div className="ml-2 hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            href="/member"
            className="hidden rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Member app
          </Link>
          <Link
            href="/overview"
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-shadow hover:shadow-[var(--shadow-glow)]"
          >
            Open dashboard
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
