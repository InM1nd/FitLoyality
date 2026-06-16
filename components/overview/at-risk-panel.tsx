"use client";

import * as React from "react";
import { Send, AlertTriangle } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NudgeModal } from "@/components/shared/nudge-modal";
import { useT } from "@/lib/i18n/context";
import { AT_RISK_MEMBERS } from "@/lib/data";

export function AtRiskPanel() {
  const t = useT("overview");
  const [target, setTarget] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const openNudge = (name: string) => {
    setTarget(name);
    setOpen(true);
  };

  return (
    <>
      <Card className="flex h-full flex-col" data-tour="churn-window">
        <CardHeader className="flex-row items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-warning" />
            <CardTitle>{t("atRiskTitle")}</CardTitle>
          </div>
          <span className="rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--info)]">
            {t("atRiskBadge")}
          </span>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="px-5">
            {AT_RISK_MEMBERS.map((m) => (
              <div key={m.id} className="border-b border-border py-3.5 last:border-0">
                <div className="flex items-center gap-3">
                  <Avatar initials={m.initials} grad={m.grad} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium">{m.name}</p>
                    <p className="truncate text-[11px] text-faint">
                      {t("lastVisit")} · {m.lastVisit}
                      {m.noticeDeadlineDays !== null &&
                        ` · ${t("cancellableIn", { n: m.noticeDeadlineDays })}`}
                    </p>
                  </div>
                  <Badge
                    variant={
                      m.status === "churned"
                        ? "error"
                        : m.noticeDeadlineDays !== null && m.noticeDeadlineDays <= 7
                          ? "error"
                          : m.bookingGhost
                            ? "info"
                            : "warning"
                    }
                    className="hidden shrink-0 sm:inline-flex"
                  >
                    {m.status === "churned"
                      ? t("statusChurned")
                      : m.noticeDeadlineDays !== null && m.noticeDeadlineDays <= 7
                        ? t("statusLastChance")
                        : m.bookingGhost
                          ? t("statusGhost")
                          : t("statusAtRisk")}
                  </Badge>
                  <Button size="sm" variant="secondary" onClick={() => openNudge(m.name)}>
                    <Send className="size-3.5" /> {t("nudge")}
                  </Button>
                </div>
                {/* explainable alert: why this member was flagged */}
                {m.churnReasons && m.churnReasons.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pl-12">
                    {m.churnReasons.map((reason) => (
                      <span
                        key={reason}
                        className="rounded-full bg-surface-3 px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <NudgeModal memberName={target} open={open} onOpenChange={setOpen} />
    </>
  );
}
