"use client";

import { PageHeading } from "@/components/layout/page-heading";
import { CohortHeatmap } from "@/components/analytics/cohort-heatmap";
import { ChurnChart } from "@/components/analytics/churn-chart";
import { RoiCalculator } from "@/components/analytics/roi-calculator";
import { SavesLog } from "@/components/analytics/saves-log";
import { useT } from "@/lib/i18n/context";
import { GYM } from "@/lib/data";

export default function AnalyticsPage() {
  const t = useT("analytics");
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("desc", { gym: GYM.name })}
      />
      <SavesLog />
      <CohortHeatmap />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChurnChart />
        <RoiCalculator />
      </div>
    </div>
  );
}
