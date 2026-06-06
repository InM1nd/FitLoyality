import { PageHeading } from "@/components/layout/page-heading";
import { CohortHeatmap } from "@/components/analytics/cohort-heatmap";
import { ChurnChart } from "@/components/analytics/churn-chart";
import { RoiCalculator } from "@/components/analytics/roi-calculator";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Analytics"
        title="Retention Analytics"
        description="CrossFit Vienna Nord · cohort retention, churn patterns and the ROI of staying."
      />

      <CohortHeatmap />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChurnChart />
        <RoiCalculator />
      </div>
    </div>
  );
}
