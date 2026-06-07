import Link from "next/link";

import { Logo } from "@/components/layout/logo";

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
    title: "Company",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how" },
      { label: "Settings", href: "/settings" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The white-label retention platform for independent fitness studios in the DACH region.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#052e16] px-3 py-1 text-xs text-[#4ade80]">
            🎯 Demo · all data simulated
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-faint">
              {col.title}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-faint sm:flex-row">
        <span>© 2026 FitLoyalty. A portfolio demo.</span>
        <span>Built with Next.js 16 · Tailwind v4 · Motion</span>
      </div>
    </footer>
  );
}
