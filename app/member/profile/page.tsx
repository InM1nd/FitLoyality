"use client";

import Link from "next/link";
import {
  Bell,
  Watch,
  ShieldCheck,
  CircleHelp,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  HeartPulse,
  FileDown,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { INSURANCE_CERT, MEMBER_ME } from "@/lib/data";
import { useT } from "@/lib/i18n/context";

export default function MemberProfile() {
  const t = useT("memberHome");

  const stats = [
    { label: t("profStatBalance"), value: `${formatNumber(MEMBER_ME.balance)} pts` },
    { label: t("profStatStreak"), value: t("profWeeks", { n: String(MEMBER_ME.weekStreak) }) },
    { label: t("profStatWorkouts"), value: formatNumber(MEMBER_ME.lifetimeWorkouts) },
    { label: t("profStatRank"), value: t("profTopPct", { n: String(MEMBER_ME.topPercent) }) },
  ];

  const SETTINGS: { icon: LucideIcon; label: string; tKey: string }[] = [
    { icon: Bell, label: t("profNotifications"), tKey: "profNotifications" },
    { icon: ShieldCheck, label: t("profPrivacy"), tKey: "profPrivacy" },
    { icon: CircleHelp, label: t("profHelp"), tKey: "profHelp" },
  ];

  return (
    <div className="flex flex-col gap-5 px-5 pb-6 pt-1">
      {/* Identity */}
      <div className="flex flex-col items-center gap-3 pt-2 text-center">
        <Avatar initials={MEMBER_ME.initials} grad={MEMBER_ME.grad} size="lg" />
        <div>
          <h1 className="text-xl font-bold">{MEMBER_ME.name}</h1>
          <p className="text-[13px] text-muted-foreground">
            {MEMBER_ME.gymName} · since {MEMBER_ME.since}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="num text-lg font-bold leading-none">{s.value}</p>
            <p className="mt-1.5 text-[11px] text-faint">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Connected device */}
      <section>
        <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
          {t("profDevice")}
        </h2>
        <Card className="flex items-center gap-3 p-4">
          <div className="grid size-10 place-items-center rounded-lg bg-surface-3">
            <Watch className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-medium">{MEMBER_ME.device}</p>
            <p className="text-[11px] text-faint">{t("wearableSyncedAgo", { ago: MEMBER_ME.syncedAgo })}</p>
          </div>
          <span className="size-2 rounded-full bg-success" />
        </Card>
        <p className="mt-2 text-center text-[10.5px] text-faint">{t("wearableVerifies")}</p>
      </section>

      {/* Krankenkassen-Bonus attendance certificate */}
      <section>
        <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
          Krankenkassen-Bonus
        </h2>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-3">
              <HeartPulse className="size-5 text-brand" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium">
                {t("profCertTitle", { year: String(INSURANCE_CERT.year) })}
              </p>
              <p className="num text-[11px] text-faint">
                {t("profCertVisits", { n: String(INSURANCE_CERT.visitsConfirmed), req: String(INSURANCE_CERT.visitsRequired) })}
              </p>
            </div>
            <span className="size-2 rounded-full bg-success" />
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="mt-3 w-full"
            onClick={() => toast.success(t("certDownloadToast"))}
          >
            <FileDown className="size-3.5" /> {t("profDownloadPdf")}
          </Button>
          <p className="mt-2 text-center text-[10.5px] leading-snug text-faint">
            {t("profCertNote", { max: String(INSURANCE_CERT.maxBonusEur) })}
          </p>
        </Card>
      </section>

      {/* Settings */}
      <section>
        <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
          {t("profSettings")}
        </h2>
        <Card className="divide-y divide-border">
          {SETTINGS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.tKey}
                type="button"
                onClick={() => toast(t("profComingSoon", { label: s.label }))}
                className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-surface-2"
              >
                <Icon className="size-4 text-muted-foreground" />
                <span className="flex-1 text-[13px] font-medium">{s.label}</span>
                <ChevronRight className="size-4 text-faint" />
              </button>
            );
          })}
        </Card>
      </section>

      <div className="flex flex-col gap-2.5">
        <Button asChild variant="secondary" className="w-full">
          <Link href="/overview">
            <LayoutDashboard /> {t("profSwitchAdmin")}
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full text-error hover:text-error"
          onClick={() => toast(t("profSignOut"))}
        >
          <LogOut /> {t("profSignOut")}
        </Button>
      </div>
    </div>
  );
}
