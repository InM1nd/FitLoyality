"use client";

import * as React from "react";
import {
  Star,
  Users2,
  TrendingUp,
  PiggyBank,
  Gift,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { cn, formatEUR } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";
import {
  REVIEW_STATS,
  REVIEWS,
  REVIEW_RULES,
  REFERRAL_STATS,
  TOP_REFERRERS,
} from "@/lib/data";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating ? "fill-warning text-warning" : "text-surface-3",
          )}
        />
      ))}
    </span>
  );
}

interface StatDef {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  tone: "warning" | "info" | "brand";
}

const TONE_BOX: Record<StatDef["tone"], string> = {
  warning: "bg-[var(--warning-bg)] text-warning",
  info: "bg-[var(--info-bg)] text-[var(--info)]",
  brand: "bg-[var(--accent-subtle)] text-brand",
};

function StatCards() {
  const t = useT("engage");
  const stats: StatDef[] = [
    {
      label: t("statRating"),
      value: `${REVIEW_STATS.avgRating.toFixed(1)}★`,
      sub: t("statRatingSub", { n: REVIEW_STATS.ratingDelta }),
      icon: Star,
      tone: "warning",
    },
    {
      label: t("statTotal"),
      value: String(REVIEW_STATS.totalReviews),
      sub: t("statTotalSub", { n: REVIEW_STATS.reviewsThisMonth }),
      icon: TrendingUp,
      tone: "brand",
    },
    {
      label: t("statConversion"),
      value: `${REFERRAL_STATS.conversionPct}%`,
      sub: t("statConversionSub", { joined: REFERRAL_STATS.joined, invited: REFERRAL_STATS.invitesSent }),
      icon: Users2,
      tone: "info",
    },
    {
      label: t("statMrr"),
      value: formatEUR(REFERRAL_STATS.mrrFromReferrals),
      sub: t("statMrrSub", { n: REFERRAL_STATS.churnReductionPct }),
      icon: PiggyBank,
      tone: "brand",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.label} className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
              <span className={cn("grid size-8 place-items-center rounded-lg", TONE_BOX[s.tone])}>
                <Icon className="size-[16px]" />
              </span>
            </div>
            <div className="num text-[2rem] font-bold leading-none tracking-tight">{s.value}</div>
            <span className="text-[11px] font-medium text-faint">{s.sub}</span>
          </Card>
        );
      })}
    </div>
  );
}

function ReviewsCard() {
  const t = useT("engage");
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Star className="size-4 text-warning" />
          <CardTitle>{t("reviewsTitle")}</CardTitle>
        </div>
        <span className="rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-[11px] font-semibold text-brand">
          {t("fromAsks", { n: REVIEW_STATS.fromAsks })}
        </span>
      </CardHeader>
      <div className="flex flex-col p-5 pt-2">
        {REVIEWS.map((r) => (
          <div key={r.id} className="border-b border-border py-3.5 last:border-0">
            <div className="flex items-center gap-3">
              <Avatar initials={r.initials} grad={r.grad} size="sm" />
              <p className="flex-1 truncate text-[13px] font-medium">{r.name}</p>
              <Stars rating={r.rating} />
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="mt-1.5 flex items-center gap-2 text-[11px] text-faint">
              <span className="rounded-full bg-surface-3 px-2 py-0.5 font-medium">{r.trigger}</span>
              <span>· {r.when}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReviewRulesCard() {
  const t = useT("engage");
  const [rules, setRules] = React.useState(REVIEW_RULES);

  const toggle = (id: string) =>
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next = !r.enabled;
        toast.success(next ? t("ruleEnabled") : t("rulePaused"), {
          description: r.trigger,
        });
        return { ...r, enabled: next };
      }),
    );

  return (
    <Card className="h-fit">
      <CardHeader className="border-b border-border">
        <CardTitle>{t("rulesTitle")}</CardTitle>
      </CardHeader>
      <div className="flex flex-col p-5 pt-3">
        <p className="mb-3 text-[12px] leading-relaxed text-muted-foreground">
          {t("rulesIntro")}
        </p>
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-0"
          >
            <p className="text-[12.5px] font-medium">{rule.trigger}</p>
            <Switch
              checked={rule.enabled}
              onCheckedChange={() => toggle(rule.id)}
              aria-label={rule.trigger}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReferralLeaderboard() {
  const t = useT("engage");
  const maxJoined = Math.max(...TOP_REFERRERS.map((r) => r.joined));
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-row items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Users2 className="size-4 text-[var(--info)]" />
          <CardTitle>{t("leaderboardTitle")}</CardTitle>
        </div>
        <span className="rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--info)]">
          {t("joinedQuarter", { n: REFERRAL_STATS.joined })}
        </span>
      </CardHeader>
      <div className="flex flex-col p-5 pt-2">
        {TOP_REFERRERS.map((r, i) => (
          <div
            key={r.id}
            className="flex items-center gap-3 border-b border-border py-3 last:border-0"
          >
            <span className="num w-4 shrink-0 text-center text-[12px] font-bold text-faint">
              {i + 1}
            </span>
            <Avatar initials={r.initials} grad={r.grad} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium">{r.name}</p>
              <div className="mt-1 h-1.5 w-full max-w-32 overflow-hidden rounded-full bg-surface-3">
                <div
                  className="h-full rounded-full bg-[var(--info)]"
                  style={{ width: `${(r.joined / maxJoined) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <p className="num text-[13px] font-semibold">
                {r.joined}
                <span className="text-faint">/{r.invited}</span>
              </p>
              <p className="num text-[10.5px] text-faint">+{r.pointsEarned} pts</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReferralProgramCard() {
  const t = useT("engage");
  return (
    <Card className="h-fit">
      <CardHeader className="flex-row items-center gap-2 border-b border-border">
        <Gift className="size-4 text-brand" />
        <CardTitle>{t("programTitle")}</CardTitle>
      </CardHeader>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 p-3.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--accent-subtle)] text-lg">
            🎁
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold">{t("perk1Title")}</p>
            <p className="mt-0.5 text-[11.5px] text-faint">{t("perk1Sub")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 p-3.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--accent-subtle)] text-lg">
            🔥
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold">{t("perk2Title")}</p>
            <p className="mt-0.5 text-[11.5px] text-faint">{t("perk2Sub")}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-[var(--accent-subtle)]/60 p-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
          <p className="text-[11.5px] leading-relaxed text-muted-foreground">{t("programNote")}</p>
        </div>
      </div>
    </Card>
  );
}

export function EngageView() {
  return (
    <div className="flex flex-col gap-6">
      <StatCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ReviewsCard />
        </div>
        <div className="lg:col-span-5">
          <ReviewRulesCard />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ReferralLeaderboard />
        </div>
        <div className="lg:col-span-5">
          <ReferralProgramCard />
        </div>
      </div>
    </div>
  );
}
