"use client";

import { CheckCircle2, Circle, HelpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDevDashboard } from "@/components/dev-dashboard/store-context";
import { BOTTLENECK_ACTIONS, ENGINEERING_GATES, OPEN_RESEARCH_QUESTIONS } from "@/lib/dev-dashboard";
import { cn } from "@/lib/utils";

export function GatesTab() {
  const { data, toggleChecklistItem } = useDevDashboard();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {ENGINEERING_GATES.map((level) => (
          <Card key={level.id}>
            <CardHeader className="border-b border-border">
              <CardTitle className="text-sm">{level.title}</CardTitle>
              <CardDescription>{level.trigger}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 p-4">
              {level.items.map((item) => (
                <div key={item.id} className="flex items-start gap-2 text-sm">
                  {item.done ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  ) : (
                    <Circle className="mt-0.5 size-4 shrink-0 text-faint" />
                  )}
                  <span className={cn(item.done ? "text-foreground" : "text-muted-foreground")}>{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Топ-5 действий</CardTitle>
          <CardDescription>Из docs/BOTTLENECKS.md — отмечай по мере выполнения, сохраняется локально</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-4">
          {BOTTLENECK_ACTIONS.map((action) => {
            const done = Boolean(data.checklist[action.id]);
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => toggleChecklistItem(action.id)}
                className="flex items-start gap-3 rounded-md p-2 text-left transition-colors hover:bg-surface-2"
              >
                {done ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                ) : (
                  <Circle className="mt-0.5 size-4 shrink-0 text-faint" />
                )}
                <span className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Badge variant={action.priority === "critical" ? "error" : "warning"} className="px-1.5 py-0">
                      {action.priority === "critical" ? "critical" : "important"}
                    </Badge>
                    <span className={cn(done ? "text-muted-foreground line-through" : "text-foreground")}>
                      {action.label}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">{action.why}</span>
                </span>
              </button>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center gap-2.5 border-b border-border">
          <span className="grid size-8 place-items-center rounded-md bg-[var(--info-bg)] text-[var(--info)]">
            <HelpCircle className="size-4" />
          </span>
          <div>
            <CardTitle className="text-sm">Открытые вопросы</CardTitle>
            <CardDescription>Из docs/MARKET_RESEARCH.md §15 — read-only</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {OPEN_RESEARCH_QUESTIONS.map((q) => (
              <li key={q} className="flex gap-2">
                <span className="text-faint">–</span>
                {q}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
