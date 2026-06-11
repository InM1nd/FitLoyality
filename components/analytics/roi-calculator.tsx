"use client";

import * as React from "react";
import { Calculator } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { formatEUR } from "@/lib/utils";
import { KPIS, ROI_DEFAULTS } from "@/lib/data";

export function RoiCalculator() {
  const [subscription, setSubscription] = React.useState<number>(ROI_DEFAULTS.subscription);
  const [memberFee, setMemberFee] = React.useState<number>(ROI_DEFAULTS.memberFee);
  const [monthlyChurn, setMonthlyChurn] = React.useState<number>(ROI_DEFAULTS.monthlyChurn);

  const result = React.useMemo(() => {
    // 3.2pp retention gain against a baseline churn of (100 - retentionRate)%.
    const baselineChurn = 100 - KPIS.retentionRate;
    const churnReductionRate = baselineChurn > 0 ? KPIS.retentionDelta / baselineChurn : 0;
    const membersSaved = Math.max(1, Math.round(monthlyChurn * churnReductionRate));
    const grossMonthly = membersSaved * memberFee;
    const netMonthly = grossMonthly - subscription;
    const annual = netMonthly * 12;
    const breakEven = Math.max(1, Math.ceil(subscription / Math.max(memberFee, 1)));
    const multiplier = grossMonthly / Math.max(subscription, 1);
    return { membersSaved, netMonthly, annual, breakEven, multiplier };
  }, [subscription, memberFee, monthlyChurn]);

  return (
    <Card className="flex h-full flex-col bg-surface-2">
      <CardHeader className="flex-row items-center gap-2.5 border-b border-border">
        <span className="grid size-8 place-items-center rounded-md bg-[var(--accent-subtle)] text-brand">
          <Calculator className="size-4" />
        </span>
        <CardTitle className="text-sm">Your FitLoyalty ROI</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="roi-sub">Monthly subscription</Label>
            <Input
              id="roi-sub"
              type="number"
              min={0}
              value={subscription}
              onChange={(e) => setSubscription(Number(e.target.value) || 0)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="roi-fee">Avg. member fee</Label>
            <Input
              id="roi-fee"
              type="number"
              min={0}
              value={memberFee}
              onChange={(e) => setMemberFee(Number(e.target.value) || 0)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="roi-churn">Monthly churn (members)</Label>
            <Input
              id="roi-churn"
              type="number"
              min={0}
              value={monthlyChurn}
              onChange={(e) => setMonthlyChurn(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface-1 p-4">
          <p className="text-sm text-muted-foreground">
            Break-even: retain just{" "}
            <span className="font-semibold text-foreground">{result.breakEven} members/month</span>.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-faint">
            Monthly saving
          </p>
          <p className="num text-3xl font-bold leading-none text-brand">
            {formatEUR(result.netMonthly)}
          </p>
          <p className="num mt-2 text-sm text-muted-foreground">
            Annual ROI: <span className="font-semibold text-foreground">{formatEUR(result.annual)}</span>
          </p>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-faint">
              <span>Return multiplier</span>
              <span className="num font-semibold text-brand">{result.multiplier.toFixed(1)}×</span>
            </div>
            <Progress value={Math.min(100, (result.multiplier / 8) * 100)} />
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-faint">
          At your current retention improvement of {KPIS.retentionDelta}%, FitLoyalty prevents about{" "}
          {result.membersSaved} member{result.membersSaved === 1 ? "" : "s"} from churning each month
          — worth {formatEUR(result.membersSaved * memberFee)} in recurring revenue.
        </p>
      </CardContent>
    </Card>
  );
}
