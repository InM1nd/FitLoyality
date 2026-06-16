"use client";

import * as React from "react";
import {
  AlertTriangle,
  PartyPopper,
  UserPlus,
  Star,
  Check,
  Send,
  MessageCircle,
  Mail,
  Smartphone,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NudgeModal } from "@/components/shared/nudge-modal";
import { cn, formatEUR } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";
import { BRIEFING_ACTIONS } from "@/lib/data";
import type { BriefingAction, BriefingType } from "@/lib/types";

const TYPE_META: Record<
  BriefingType,
  { icon: LucideIcon; labelKey: string; accent: string; iconBox: string }
> = {
  save: {
    icon: AlertTriangle,
    labelKey: "typeSave",
    accent: "bg-warning",
    iconBox: "bg-[var(--warning-bg)] text-warning",
  },
  celebrate: {
    icon: PartyPopper,
    labelKey: "typeCelebrate",
    accent: "bg-brand",
    iconBox: "bg-[var(--accent-subtle)] text-brand",
  },
  convert: {
    icon: UserPlus,
    labelKey: "typeConvert",
    accent: "bg-[var(--info)]",
    iconBox: "bg-[var(--info-bg)] text-[var(--info)]",
  },
  review: {
    icon: Star,
    labelKey: "typeReview",
    accent: "bg-[#a78bfa]",
    iconBox: "bg-[#a78bfa]/15 text-[#a78bfa]",
  },
};

const CHANNEL_ICON: Record<BriefingAction["channel"], LucideIcon> = {
  WhatsApp: MessageCircle,
  Email: Mail,
  Push: Smartphone,
  "In person": Users,
};

/** Sum of MRR explicitly at risk across the save-type actions (for the header). */
function mrrAtStake(actions: BriefingAction[]): number {
  return actions
    .filter((a) => a.type === "save")
    .reduce((sum, a) => {
      const m = a.meta?.match(/€\s?(\d+)/);
      return sum + (m ? Number(m[1]) : 0);
    }, 0);
}

export function BriefingList() {
  const t = useT("briefing");
  const actions = BRIEFING_ACTIONS;
  const [done, setDone] = React.useState<Set<string>>(new Set());
  const [nudgeTarget, setNudgeTarget] = React.useState<string | null>(null);
  const [nudgeOpen, setNudgeOpen] = React.useState(false);

  const markDone = (id: string) => setDone((prev) => new Set(prev).add(id));

  const handlePrimary = (action: BriefingAction) => {
    if (action.type === "save") {
      setNudgeTarget(action.name);
      setNudgeOpen(true);
      return;
    }
    markDone(action.id);
    const first = action.name.split(" ")[0];
    const toastKey: Record<Exclude<BriefingType, "save">, string> = {
      celebrate: "toastCelebrate",
      convert: "toastConvert",
      review: "toastReview",
    };
    toast.success(t(toastKey[action.type as Exclude<BriefingType, "save">], { name: first }), {
      description: t("toastDeliveredVia", { channel: action.channel }),
    });
  };

  const remaining = actions.filter((a) => !done.has(a.id));
  const stake = mrrAtStake(remaining);
  const clearedCount = done.size;
  const pct = Math.round((clearedCount / actions.length) * 100);

  return (
    <>
      {/* summary header */}
      <Card className="overflow-hidden p-5" data-tour="briefing-summary">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">
              {remaining.length > 0
                ? remaining.length === 1
                  ? t("actionToday", { n: remaining.length })
                  : t("actionsToday", { n: remaining.length })
                : t("allClear")}
            </p>
            <p className="mt-0.5 text-[12.5px] text-muted-foreground">
              {remaining.length > 0 ? t("subActive") : t("subDone")}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {stake > 0 && (
              <div className="text-right">
                <p className="num text-xl font-bold leading-none text-warning">
                  {formatEUR(stake)}
                </p>
                <p className="mt-1 text-[10.5px] uppercase tracking-wide text-faint">
                  {t("mrrAtStake")}
                </p>
              </div>
            )}
            <div className="text-right">
              <p className="num text-xl font-bold leading-none">
                {clearedCount}
                <span className="text-faint">/{actions.length}</span>
              </p>
              <p className="mt-1 text-[10.5px] uppercase tracking-wide text-faint">{t("cleared")}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </Card>

      {/* action list */}
      {remaining.length > 0 ? (
        <div className="flex flex-col gap-3">
          {remaining.map((action) => {
            const meta = TYPE_META[action.type];
            const Icon = meta.icon;
            const ChannelIcon = CHANNEL_ICON[action.channel];
            return (
              <Card key={action.id} className="relative overflow-hidden p-0">
                <span className={cn("absolute inset-y-0 left-0 w-[3px]", meta.accent)} />
                <div className="flex flex-col gap-3 p-5 pl-6 sm:flex-row sm:items-start sm:gap-4">
                  <Avatar initials={action.initials} grad={action.grad} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[14px] font-semibold">{action.name}</p>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
                          meta.iconBox,
                        )}
                      >
                        <Icon className="size-3" />
                        {t(meta.labelKey)}
                      </span>
                      {action.meta && (
                        <span className="rounded-full bg-surface-3 px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">
                          {action.meta}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[12.5px] font-medium text-muted-foreground">
                      {action.headline}
                    </p>
                    {/* the ready-to-send message */}
                    <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2.5">
                      <ChannelIcon className="mt-0.5 size-3.5 shrink-0 text-faint" />
                      <p className="text-[12.5px] leading-relaxed text-foreground/90">
                        {action.suggestion}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
                    <Button size="sm" onClick={() => handlePrimary(action)}>
                      <Send className="size-3.5" /> {action.cta}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markDone(action.id)}
                      aria-label={`Dismiss action for ${action.name}`}
                    >
                      <Check className="size-3.5" /> {t("done")}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="flex flex-col items-center gap-3 p-12 text-center">
          <div className="grid size-12 place-items-center rounded-full bg-[var(--accent-subtle)]">
            <Sparkles className="size-6 text-brand" />
          </div>
          <p className="text-base font-semibold">{t("emptyTitle")}</p>
          <p className="max-w-sm text-[13px] text-muted-foreground">
            {t("emptyBody", { n: actions.length })}
          </p>
        </Card>
      )}

      <NudgeModal
        memberName={nudgeTarget}
        open={nudgeOpen}
        onOpenChange={(o) => {
          setNudgeOpen(o);
          // closing after a send-or-cancel clears the corresponding action
          if (!o && nudgeTarget) {
            const target = actions.find((a) => a.name === nudgeTarget && a.type === "save");
            if (target) markDone(target.id);
          }
        }}
      />
    </>
  );
}
