"use client";

import * as React from "react";
import { Send, AlertTriangle } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NudgeModal } from "@/components/shared/nudge-modal";
import { AT_RISK_MEMBERS } from "@/lib/data";

export function AtRiskPanel() {
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
            <CardTitle>Churn Window</CardTitle>
          </div>
          <span className="rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--info)]">
            inactive + notice deadline
          </span>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="px-5">
            {AT_RISK_MEMBERS.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 border-b border-border py-3.5 last:border-0"
              >
                <Avatar initials={m.initials} grad={m.grad} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium">{m.name}</p>
                  <p className="truncate text-[11px] text-faint">
                    Last visit · {m.lastVisit}
                    {m.noticeDeadlineDays !== null &&
                      ` · cancellable in ${m.noticeDeadlineDays}d`}
                  </p>
                </div>
                <Badge
                  variant={
                    m.status === "churned"
                      ? "error"
                      : m.noticeDeadlineDays !== null && m.noticeDeadlineDays <= 7
                        ? "error"
                        : "warning"
                  }
                  className="hidden shrink-0 sm:inline-flex"
                >
                  {m.status === "churned"
                    ? "Churned"
                    : m.noticeDeadlineDays !== null && m.noticeDeadlineDays <= 7
                      ? "Last chance"
                      : "At-Risk"}
                </Badge>
                <Button size="sm" variant="secondary" onClick={() => openNudge(m.name)}>
                  <Send className="size-3.5" /> Nudge
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <NudgeModal memberName={target} open={open} onOpenChange={setOpen} />
    </>
  );
}
