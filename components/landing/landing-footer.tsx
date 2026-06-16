"use client";

import Link from "next/link";

import { LogoMark } from "@/components/layout/logo";
import { useLocale } from "@/lib/i18n/context";

export function LandingFooter() {
  const { t } = useLocale();
  const COLS: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: t("footer.colProduct"),
      links: [
        { label: t("nav.overview"), href: "/overview" },
        { label: t("nav.members"), href: "/members" },
        { label: t("nav.rewards"), href: "/rewards" },
        { label: t("nav.analytics"), href: "/analytics" },
      ],
    },
    {
      title: t("footer.colMemberApp"),
      links: [
        { label: t("footer.home"), href: "/member" },
        { label: t("nav.rewards"), href: "/member/rewards" },
        { label: t("footer.activity"), href: "/member/activity" },
        { label: t("footer.profile"), href: "/member/profile" },
      ],
    },
    {
      title: t("footer.colIndex"),
      links: [
        { label: t("footer.capabilities"), href: "#capabilities" },
        { label: t("footer.product"), href: "#product" },
        { label: t("footer.process"), href: "#process" },
        { label: t("nav.settings"), href: "/settings" },
      ],
    },
  ];
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed t-mut">{t("footer.tagline")}</p>
            <p className="mono-label mt-5 inline-flex items-center gap-2 t-faint">
              <span className="size-1.5 rounded-full bg-[var(--lime)]" />
              {t("footer.demoNote")}
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
          <span>{t("footer.copyright")}</span>
          <span>WIEN · 48°12′N 16°22′E</span>
          <span>NEXT.JS 16 · TAILWIND V4 · MOTION</span>
        </div>
      </div>
    </footer>
  );
}
