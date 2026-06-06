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
import type { Member } from "@/lib/types";

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

function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-1.5 text-faint">
        <Icon className="size-3.5" />
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <p className="num mt-1.5 text-lg font-bold leading-none">{value}</p>
    </div>
  );
}

interface MemberSidePanelProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNudge: (name: string) => void;
}

export function MemberSidePanel({ member, open, onOpenChange, onNudge }: MemberSidePanelProps) {
  if (!member) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent />
      </Sheet>
    );
  }

  const spark = member.pointsHistory.map((value, i) => ({ i, value }));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0">
        <SheetHeader className="border-b border-border">
          <div className="flex items-center gap-3 pr-8">
            <Avatar initials={member.initials} grad={member.grad} size="lg" className="size-12 text-base" />
            <div className="min-w-0">
              <SheetTitle>{member.name}</SheetTitle>
              <SheetDescription className="flex items-center gap-2">
                <span>Member since {member.since}</span>
              </SheetDescription>
            </div>
          </div>
          <div className="mt-1">
            <Badge variant={STATUS_BADGE[member.status].variant}>
              {STATUS_BADGE[member.status].label}
            </Badge>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100%-104px)]">
          <div className="flex flex-col gap-6 p-5">
            {/* Stat chips */}
            <div className="grid grid-cols-2 gap-3">
              <StatChip icon={Dumbbell} label="Total Workouts" value={formatNumber(member.totalWorkouts)} />
              <StatChip icon={Star} label="Loyalty Points" value={formatNumber(member.points)} />
              <StatChip icon={Gift} label="Rewards" value={String(member.rewardsRedeemed)} />
              <StatChip icon={Flame} label="Streak Record" value={`${member.streakRecord} days`} />
            </div>

            {/* Connected device */}
            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                Connected Device
              </p>
              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-success" />
                <Watch className="size-4 text-muted-foreground" />
                {member.device}
                <span className="text-faint">· synced 2 min ago</span>
              </div>
            </div>

            {/* Activity heatmap */}
            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                Activity — Last 30 Days
              </p>
              <div className="grid grid-cols-6 gap-1.5">
                {member.activity.map((level, i) => (
                  <HeatCell key={i} level={level} />
                ))}
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-faint">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((l) => (
                  <div key={l} className="size-2.5">
                    <HeatCell level={l} />
                  </div>
                ))}
                <span>More</span>
              </div>
            </div>

            {/* Points history sparkline */}
            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                Points History — 6 Months
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

            {/* Recent rewards */}
            <div>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
                Recent Rewards
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
            <Send /> Send Nudge
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
