import { PageHeading } from "@/components/layout/page-heading";
import { GymProfile } from "@/components/settings/gym-profile";
import { Branding } from "@/components/settings/branding";
import { Integrations } from "@/components/settings/integrations";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Workspace"
        title="Settings"
        description="Manage your studio profile, member-app branding and integrations."
      />
      <div className="flex flex-col gap-6">
        <GymProfile />
        <Branding />
        <Integrations />
      </div>
    </div>
  );
}
