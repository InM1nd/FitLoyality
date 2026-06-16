"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/layout/logo";
import { useT } from "@/lib/i18n/context";
import { LocaleToggle } from "@/components/shared/locale-toggle";

const LINKS = [
  { href: "#streak", key: "whyStreaks" },
  { href: "#capabilities", key: "capabilities" },
  { href: "#product", key: "product" },
  { href: "#pricing", key: "pricing" },
];

export function LandingNav() {
  const t = useT("landingNav");
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:pt-4"
    >
      <nav
        className={cn(
          "relative mx-auto flex h-13 w-full max-w-5xl items-center gap-5 rounded-2xl border px-3 py-2 transition-all duration-300 md:w-fit md:gap-7 md:px-4",
          solid
            ? "border-black/8 bg-[#f5f2ec]/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        {/* left: logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 pl-1"
          onClick={() => setMenuOpen(false)}
        >
          <LogoMark />
          <span className="mono text-[13px] font-semibold tracking-[0.16em] text-[#1a1a1a]">
            FITLOYALTY
          </span>
        </Link>

        {/* center: links (desktop) — grouped, not stretched */}
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono-label whitespace-nowrap text-[#1a1a1a]/60 transition-colors hover:text-[#1a1a1a]"
            >
              {t(l.key)}
            </a>
          ))}
        </div>

        {/* right: divider + utilities + single CTA */}
        <div className="ml-auto flex shrink-0 items-center gap-2.5 sm:gap-3 md:ml-0">
          <span className="hidden h-5 w-px bg-black/10 md:block" aria-hidden />
          <LocaleToggle variant="landing" />
          <Link
            href="/overview"
            className="group hidden items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#1a1a1a] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#f5f2ec] transition-all hover:-translate-y-0.5 hover:bg-[#2d2d2d] md:inline-flex"
          >
            {t("openDashboard")}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* hamburger (mobile) */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-xl border border-black/10 text-[#1a1a1a] transition-colors hover:bg-black/5 md:hidden"
          >
            {menuOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>

        {/* mobile menu panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-[calc(100%+8px)] rounded-2xl border border-black/8 bg-[#f5f2ec] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] md:hidden"
            >
              <div className="flex flex-col">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#1a1a1a] transition-colors hover:bg-black/5"
                  >
                    {t(l.key)}
                  </a>
                ))}
              </div>
              <Link
                href="/overview"
                onClick={() => setMenuOpen(false)}
                className="group mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#1a1a1a] px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#f5f2ec] transition-colors hover:bg-[#2d2d2d]"
              >
                {t("openDashboard")}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
