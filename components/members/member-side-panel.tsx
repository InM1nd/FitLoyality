"use client";

import * as React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Watch, Send, Flame, Dumbbell, Star, Gift } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { STATUS_BADGE } from "@/lib/member-status";
import { useT } from "@/lib/i18n/context";
import type { Member, MemberStatus } from "@/lib/types";

function HeatCell({ level }: { level: number }) {
  const bg =
    level === 0
      ? "bg-surface-3"
      : level === 1
        ? "bg-[rgba(34,197,94,0.25)]"
        : level === 2
          ? "bg-[rgba(34,197,94,0.45)]"
          : level === 3
            ? "bg-[rgba(34,197,94,0.7)]"
            : "bg-primary shadow-[0_0_8px_var(--accent-glow)]";
  return <div className={cn("aspect-square rounded-sm", bg)} />;
}

interface MemberSidePanelProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNudge: (name: string) => void;
}

export function MemberSidePanel({ member, open, onOpenChange, onNudge }: MemberSidePanelProps) {
  const t = useT("members");

  const STATUS_LABEL: Record<MemberStatus, string> = {
    active: t("statusActive"),
    "at-risk": t("statusAtRisk"),
    churned: t("statusChurned"),
  };

  if (!member) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent />
      </Sheet>
    );
  }

  const spark = member.pointsHistory.map((value, i) => ({ i, value }));

  const statChips = [
    { icon: Dumbbell, label: t("statWorkouts"), value: formatNumber(member.totalWorkouts) },
    { icon: Star, label: t("statPoints"), value: formatNumber(member.points) },
    { icon: Gift, label: t("statRewards"), value: String(member.rewardsRedeemed) },
    { icon: Flame, label: t("statStreak"), value: t("streakWeeks", { n: String(member.streakRecord) }) },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0">
        <SheetHeader className="border-b border-border">
          <div className="flex items-center gap-3 pr-8">
            <Avatar initials={member.initials} grad={member.grad} size="lg" className="size-12 text-base" />
            <div className="min-w-0">
              <SheetTitle>{member.name}</SheetTitle>
              <SheetDescription className="flex items-center gap-2">
                <span>{t("memberSince", { since: member.since })}</span>
              </SheetDescription>
            </div>
          </div>
          <div className="mt-1">
            <Badge variant={STATUS_BADGE[member.status].variant}>
              {STATUS_LABEL[member.status]}
            </Badge>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100%-104px)]">
          <div className="flex flex-col gap-6 p-5">
            <div className="grid grid-cols-2 gap-3">
              {statChips.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-md border border-border bg-surface-2 p-3">
                  <div className="flex items-center gap-1.5 text-faint">
                    <Icon className="size-3.5" />
                    <span className="text-[11px] font-medium">{label}</span>
                  </div>
                  <p className="num mt-1.5 text-lg font-bold leading-none">{value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                {t("connectedDevice")}
              </p>
              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-success" />
                <Watch className="size-4 text-muted-foreground" />
                {member.device}
                <span className="text-faint">· {t("syncedAgo")}</span>
              </div>
            </div>

            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                {t("activityTitle")}
              </p>
              <div className="grid grid-cols-6 gap-1.5">
                {member.activity.map((level, i) => (
                  <HeatCell key={i} level={level} />
                ))}
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-faint">
                <span>{t("heatLess")}</span>
                {[0, 1, 2, 3, 4].map((l) => (
                  <div key={l} className="size-2.5">
                    <HeatCell level={l} />
                  </div>
                ))}
                <span>{t("heatMore")}</span>
              </div>
            </div>

            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                {t("pointsHistory")}
              </p>
              <div className="h-16 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spark} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--accent-brand)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                {t("recentRewards")}
              </p>
              <div className="flex flex-col gap-1.5">
                {member.recentRewards.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-md border border-border bg-surface-2 px-3 py-2"
                  >
                    <span className="text-base">{r.emoji}</span>
                    <span className="text-[13px] font-medium">{r.name}</span>
                    <span className="ml-auto text-[11px] text-faint">{r.when}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <Button className="w-full" onClick={() => onNudge(member.name)}>
            <Send /> {t("sendNudge")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
