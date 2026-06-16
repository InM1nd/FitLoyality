"use client";

import { PageHeading } from "@/components/layout/page-heading";
import { EngageView } from "@/components/engage/engage-view";
import { useT } from "@/lib/i18n/context";

export default function EngagePage() {
  const t = useT("engage");
  return (
    <div className="flex flex-col gap-6">
      <PageHeading eyebrow={t("eyebrow")} title={t("title")} description={t("desc")} />
      <EngageView />
    </div>
  );
}
