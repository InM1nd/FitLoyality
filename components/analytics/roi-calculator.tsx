"use client";

import * as React from "react";
import { Calculator } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { formatEUR } from "@/lib/utils";
import { useT } from "@/lib/i18n/context";
import { KPIS, ROI_DEFAULTS } from "@/lib/data";

export function RoiCalculator() {
  const t = useT("analytics");
  const [subscription, setSubscription] = React.useState<number>(ROI_DEFAULTS.subscription);
  const [memberFee, setMemberFee] = React.useState<number>(ROI_DEFAULTS.memberFee);
  const [monthlyChurn, setMonthlyChurn] = React.useState<number>(ROI_DEFAULTS.monthlyChurn);

  const result = React.useMemo(() => {
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
        <CardTitle className="text-sm">{t("roiTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="roi-sub">{t("roiSubscription")}</Label>
            <Input id="roi-sub" type="number" min={0} value={subscription} onChange={(e) => setSubscription(Number(e.target.value) || 0)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="roi-fee">{t("roiFee")}</Label>
            <Input id="roi-fee" type="number" min={0} value={memberFee} onChange={(e) => setMemberFee(Number(e.target.value) || 0)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="roi-churn">{t("roiChurn")}</Label>
            <Input id="roi-churn" type="number" min={0} value={monthlyChurn} onChange={(e) => setMonthlyChurn(Number(e.target.value) || 0)} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface-1 p-4">
          <p className="text-sm text-muted-foreground">
            {t("breakEven", { n: String(result.breakEven) })}
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-faint">
            {t("monthlySaving")}
          </p>
          <p className="num text-3xl font-bold leading-none text-brand">
            {formatEUR(result.netMonthly)}
          </p>
          <p className="num mt-2 text-sm text-muted-foreground">
            {t("annualRoi", { amount: formatEUR(result.annual) })}
          </p>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-faint">
              <span>{t("returnMultiplier")}</span>
              <span className="num font-semibold text-brand">{result.multiplier.toFixed(1)}×</span>
            </div>
            <Progress value={Math.min(100, (result.multiplier / 8) * 100)} />
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-faint">
          {t("roiNote", {
            delta: String(KPIS.retentionDelta),
            n: String(result.membersSaved),
            s: result.membersSaved === 1 ? "" : "s",
            amount: formatEUR(result.membersSaved * memberFee),
          })}
        </p>
      </CardContent>
    </Card>
  );
}
