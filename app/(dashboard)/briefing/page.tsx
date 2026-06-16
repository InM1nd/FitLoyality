"use client";

import { PageHeading } from "@/components/layout/page-heading";
import { BriefingList } from "@/components/briefing/briefing-list";
import { useT, useLocale } from "@/lib/i18n/context";

export default function BriefingPage() {
  const t = useT("briefing");
  const { locale } = useLocale();
  const today = new Date(2026, 5, 14).toLocaleDateString(locale === "de" ? "de-AT" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow={`${t("eyebrowPre")} · ${today}`}
        title={t("title")}
        description={t("desc")}
      />
      <BriefingList />
    </div>
  );
}
