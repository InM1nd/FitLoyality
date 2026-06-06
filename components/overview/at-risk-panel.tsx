"use client";

import * as React from "react";
import { Send } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NudgeModal } from "@/components/shared/nudge-modal";
import { AT_RISK_MEMBERS } from "@/lib/mock-data";

export function AtRiskPanel() {
  const [target, setTarget] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const openNudge = (name: string) => {
    setTarget(name);
    setOpen(true);
  };

  return (
    <>
      <Card className="flex h-full flex-col">
        <CardHeader className="flex-row items-center justify-between border-b border-border">
          <CardTitle>At-Risk Members</CardTitle>
          <span className="text-xs text-faint">inactive 14+ days</span>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="px-5">
            {AT_RISK_MEMBERS.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 border-b border-border py-3 last:border-0"
              >
                <Avatar initials={m.initials} grad={m.grad} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium">{m.name}</p>
                  <p className="truncate text-[11.5px] text-faint">
                    Last visit · {m.lastVisit} · {m.workoutsThisMonth} workouts/mo
                  </p>
                </div>
                <Badge variant={m.status === "churned" ? "error" : "warning"} className="hidden sm:inline-flex">
                  {m.status === "churned" ? "Churned" : "At-Risk"}
                </Badge>
                <Button size="sm" variant="secondary" onClick={() => openNudge(m.name)}>
                  <Send /> Nudge
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
