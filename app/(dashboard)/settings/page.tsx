"use client";

import { PageHeading } from "@/components/layout/page-heading";
import { GymProfile } from "@/components/settings/gym-profile";
import { Branding } from "@/components/settings/branding";
import { Integrations } from "@/components/settings/integrations";
import { useT } from "@/lib/i18n/context";

export default function SettingsPage() {
  const t = useT("settings");
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("desc")}
      />
      <div className="flex flex-col gap-6">
        <GymProfile />
        <Branding />
        <Integrations />
      </div>
    </div>
  );
}
