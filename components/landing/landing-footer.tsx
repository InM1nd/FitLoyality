import Link from "next/link";

import { LogoMark } from "@/components/layout/logo";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/overview" },
      { label: "Members", href: "/members" },
      { label: "Rewards", href: "/rewards" },
      { label: "Analytics", href: "/analytics" },
    ],
  },
  {
    title: "Member app",
    links: [
      { label: "Home", href: "/member" },
      { label: "Rewards", href: "/member/rewards" },
      { label: "Activity", href: "/member/activity" },
      { label: "Profile", href: "/member/profile" },
    ],
  },
  {
    title: "Index",
    links: [
      { label: "Capabilities", href: "#capabilities" },
      { label: "Product", href: "#product" },
      { label: "Process", href: "#process" },
      { label: "Settings", href: "/settings" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="mono text-[13px] font-semibold tracking-[0.16em] t-ink">
                FITLOYALTY
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed t-mut">
              The white-label retention platform for independent fitness studios in the DACH region.
            </p>
            <p className="mono-label mt-5 inline-flex items-center gap-2 t-faint">
              <span className="size-1.5 rounded-full bg-[var(--acid)]" />
              Demo · all data simulated
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mono-label t-faint">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm t-mut transition-colors hover:t-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mono mt-12 flex flex-col items-center justify-between gap-2 border-t border-[var(--line)] pt-6 text-[11px] t-faint sm:flex-row">
          <span>© 2026 FITLOYALTY — A PORTFOLIO DEMO</span>
          <span>WIEN · 48°12′N 16°22′E</span>
          <span>NEXT.JS 16 · TAILWIND V4 · MOTION</span>
        </div>
      </div>
    </footer>
  );
}
