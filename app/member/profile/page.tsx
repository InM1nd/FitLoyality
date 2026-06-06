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
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { MEMBER_ME } from "@/lib/mock-data";

const SETTINGS: { icon: LucideIcon; label: string }[] = [
  { icon: Bell, label: "Notifications" },
  { icon: ShieldCheck, label: "Privacy & data" },
  { icon: CircleHelp, label: "Help & support" },
];

export default function MemberProfile() {
  const stats = [
    { label: "Balance", value: `${formatNumber(MEMBER_ME.balance)} pts` },
    { label: "Streak", value: `${MEMBER_ME.streak} days` },
    { label: "Workouts", value: formatNumber(MEMBER_ME.lifetimeWorkouts) },
    { label: "Gym rank", value: `Top ${MEMBER_ME.topPercent}%` },
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
          Connected device
        </h2>
        <Card className="flex items-center gap-3 p-4">
          <div className="grid size-10 place-items-center rounded-lg bg-surface-3">
            <Watch className="size-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-medium">{MEMBER_ME.device}</p>
            <p className="text-[11px] text-faint">Synced {MEMBER_ME.syncedAgo}</p>
          </div>
          <span className="size-2 rounded-full bg-success" />
        </Card>
      </section>

      {/* Settings */}
      <section>
        <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
          Settings
        </h2>
        <Card className="divide-y divide-border">
          {SETTINGS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => toast(`${s.label} — coming soon in the live app`)}
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
            <LayoutDashboard /> Switch to gym admin view
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full text-error hover:text-error"
          onClick={() => toast("Signed out (demo)")}
        >
          <LogOut /> Sign out
        </Button>
      </div>
    </div>
  );
}
