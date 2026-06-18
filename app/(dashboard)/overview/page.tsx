"use client";

import { PageHeading } from "@/components/layout/page-heading";
import { DemoTour } from "@/components/shared/demo-tour";
import { SetupWizard } from "@/components/shared/setup-wizard";
import { KpiCards } from "@/components/overview/kpi-cards";
import { RetentionChart } from "@/components/overview/retention-chart";
import { AtRiskPanel } from "@/components/overview/at-risk-panel";
import { AggregatorHub } from "@/components/overview/aggregator-hub";
import { ActivityTable } from "@/components/overview/activity-table";
import { ClassOccupancyTeaser } from "@/components/overview/class-occupancy-teaser";
import { useStudioProfile } from "@/hooks/use-studio-profile";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const DESC_KEYS = {
  default: "desc",
  yoga: "descYoga",
  opengym: "descOpengym",
  crossfit: "descCrossfit",
  other: "descOther",
} as const;

export default function OverviewPage() {
  const t = useT("overview");
  const { personalization } = useStudioProfile();
  const { showAggregatorHub, aggregatorLayout, showClassOccupancyTeaser, descKey } =
    personalization;

  const desc = t(DESC_KEYS[descKey]);

  const aggSpan =
    aggregatorLayout === "prominent"
      ? "lg:col-span-7"
      : aggregatorLayout === "deemphasized"
        ? "lg:col-span-4"
        : "lg:col-span-5";

  const activitySpan =
    aggregatorLayout === "prominent"
      ? "lg:col-span-5"
      : aggregatorLayout === "deemphasized"
        ? "lg:col-span-8"
        : showClassOccupancyTeaser
          ? "lg:col-span-7"
          : "lg:col-span-7";

  const sidePanelSpan = showClassOccupancyTeaser ? "lg:col-span-5" : aggSpan;

  return (
    <div className="flex flex-col gap-6">
      <SetupWizard />
      <DemoTour />

      <PageHeading eyebrow={t("eyebrow")} title={t("title")} description={desc} />

      <KpiCards />

      {aggregatorLayout === "prominent" && showAggregatorHub && (
        <AggregatorHub className="ring-1 ring-primary/20" />
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <RetentionChart />
        </div>
        <div className="lg:col-span-5">
          <AtRiskPanel />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {showClassOccupancyTeaser && (
          <div className={sidePanelSpan}>
            <ClassOccupancyTeaser />
          </div>
        )}

        {showAggregatorHub && aggregatorLayout !== "prominent" && (
          <div className={cn(aggSpan, aggregatorLayout === "deemphasized" && "opacity-90")}>
            <AggregatorHub />
          </div>
        )}

        <div
          className={cn(
            activitySpan,
            !showAggregatorHub && !showClassOccupancyTeaser && "lg:col-span-12",
          )}
        >
          <ActivityTable />
        </div>
      </div>
    </div>
  );
}
