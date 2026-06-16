"use client";

import { PageHeading } from "@/components/layout/page-heading";
import { DemoTour } from "@/components/shared/demo-tour";
import { KpiCards } from "@/components/overview/kpi-cards";
import { RetentionChart } from "@/components/overview/retention-chart";
import { AtRiskPanel } from "@/components/overview/at-risk-panel";
import { AggregatorHub } from "@/components/overview/aggregator-hub";
import { ActivityTable } from "@/components/overview/activity-table";
import { useT } from "@/lib/i18n/context";

export default function OverviewPage() {
  const t = useT("overview");
  return (
    <div className="flex flex-col gap-6">
      <DemoTour />
      <PageHeading eyebrow={t("eyebrow")} title={t("title")} description={t("desc")} />

      <KpiCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <RetentionChart />
        </div>
        <div className="lg:col-span-5">
          <AtRiskPanel />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <AggregatorHub />
        </div>
        <div className="lg:col-span-7">
          <ActivityTable />
        </div>
      </div>
    </div>
  );
}
