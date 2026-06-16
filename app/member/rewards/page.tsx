"use client";

import * as React from "react";
import { Lock, Sparkles, UserPlus, Copy } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QrCode } from "@/components/member/qr-code";
import { formatNumber } from "@/lib/utils";
import { MEMBER_ME, MEMBER_REFERRAL, MEMBER_REWARDS } from "@/lib/data";
import { useT } from "@/lib/i18n/context";
import type { MemberReward } from "@/lib/types";

function ReferralCard() {
  const t = useT("memberHome");
  const copyLink = () => {
    navigator.clipboard
      ?.writeText(`https://${MEMBER_REFERRAL.link}`)
      .catch(() => undefined);
    toast.success(t("rwdCopySuccess"));
  };

  return (
    <Card className="border-primary/40 bg-primary/5 p-4">
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/15">
          <UserPlus className="size-5 text-brand" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight">{t("rwdInviteTitle")}</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
            {t("rwdInviteDesc", { perk: MEMBER_REFERRAL.friendPerk, pts: String(MEMBER_REFERRAL.points) })}
          </p>
        </div>
      </div>
      <Button size="sm" variant="secondary" className="mt-3 w-full" onClick={copyLink}>
        <Copy className="size-3.5" /> {t("rwdCopyLink")}
      </Button>
      <p className="num mt-2 text-center text-[10.5px] text-faint">
        {t("rwdFriendsJoined", { n: String(MEMBER_REFERRAL.friendsJoined), pts: String(MEMBER_REFERRAL.pointsEarned) })}
      </p>
    </Card>
  );
}

export default function MemberRewards() {
  const t = useT("memberHome");
  const balance = MEMBER_ME.balance;
  const [redeeming, setRedeeming] = React.useState<MemberReward | null>(null);

  return (
    <div className="flex flex-col gap-4 px-5 pb-6 pt-1">
      {/* Balance */}
      <div className="rounded-2xl border border-border bg-surface-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">{t("rwdBalance")}</p>
        <div className="mt-1 flex items-end gap-1.5">
          <span className="num text-3xl font-bold leading-none text-brand">
            {formatNumber(balance)}
          </span>
          <span className="mb-0.5 text-sm font-medium text-muted-foreground">pts</span>
        </div>
      </div>

      <ReferralCard />

      <h1 className="text-base font-semibold">{t("rwdAvailable")}</h1>

      <div className="flex flex-col gap-3">
        {MEMBER_REWARDS.map((r) => {
          const affordable = balance >= r.cost;
          const toGo = r.cost - balance;
          return (
            <Card key={r.id} className="flex items-center gap-3 p-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-surface-3 text-2xl">
                {r.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">{r.name}</p>
                <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">
                  {r.description}
                </p>
                <p className="num mt-1 text-xs font-semibold text-brand">{r.cost} pts</p>
              </div>
              {affordable ? (
                <Button size="sm" onClick={() => setRedeeming(r)}>
                  {t("rwdRedeem")}
                </Button>
              ) : (
                <div className="flex flex-col items-end gap-1 text-faint">
                  <Lock className="size-4" />
                  <span className="num text-[10px]">{t("rwdToGo", { n: formatNumber(toGo) })}</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Dialog open={redeeming !== null} onOpenChange={(o) => !o && setRedeeming(null)}>
        <DialogContent className="max-w-xs" showClose>
          <DialogHeader className="items-center border-0 text-center">
            <div className="mb-1 grid size-12 place-items-center rounded-full bg-[var(--accent-subtle)] text-2xl">
              {redeeming?.emoji}
            </div>
            <DialogTitle className="flex items-center justify-center gap-1.5">
              <Sparkles className="size-4 text-brand" /> {redeeming?.name}
            </DialogTitle>
            <DialogDescription>{t("rwdDialogDesc")}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3 px-6 pb-6">
            <QrCode value={redeeming?.id ?? "reward"} className="size-48" />
            <p className="text-center text-[11px] text-faint">
              {t("rwdExpiry", { cost: String(redeeming?.cost ?? 0) })}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
