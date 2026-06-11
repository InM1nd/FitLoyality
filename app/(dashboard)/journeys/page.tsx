import { Route, Sparkles, MessageCircle, Mail, Smartphone, RotateCcw } from "lucide-react";

import { PageHeading } from "@/components/layout/page-heading";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const CHANNEL_ICON = {
  WhatsApp: MessageCircle,
  Email: Mail,
  Push: Smartphone,
} as const;

const ONBOARDING_STEPS: {
  day: string;
  title: string;
  body: string;
  channel: keyof typeof CHANNEL_ICON;
  enabled: boolean;
}[] = [
  { day: "Day 0",  title: "Welcome aboard",        body: "App link + how streaks work, sent the moment they sign up.",                    channel: "WhatsApp", enabled: true },
  { day: "Day 3",  title: "First-visit check",     body: "No visit yet? A friendly nudge with this week's easiest class slots.",          channel: "WhatsApp", enabled: true },
  { day: "Day 7",  title: "Week-one celebration",  body: "Hit the weekly goal in week one → streak started, badge unlocked.",             channel: "Push",     enabled: true },
  { day: "Day 14", title: "Habit checkpoint",      body: "Below 2 visits/week → creates a task for the trainer to say hi in person.",     channel: "Email",    enabled: true },
  { day: "Day 30", title: "First milestone",       body: "One month in — milestone badge plus a well-timed Google-review ask.",           channel: "Push",     enabled: false },
  { day: "Day 60", title: "Progress recap",        body: "Personal stats so far: visits, streak record, points — proof it's working.",   channel: "Email",    enabled: false },
  { day: "Day 90", title: "Graduation",            body: "90 days — past the highest-churn zone. Reward unlocked, journey complete.",     channel: "WhatsApp", enabled: true },
];

const WINBACK_SEGMENTS: {
  name: string;
  size: number;
  offer: string;
  status: "active" | "draft";
}[] = [
  { name: "Cancelled < 3 months ago",   size: 14, offer: "Comeback month — €29",        status: "active" },
  { name: "Cancelled 3–12 months ago",  size: 41, offer: "Two free weeks, no contract", status: "draft" },
  { name: "Paused for the summer",      size: 8,  offer: "Freeze instead of quitting",  status: "draft" },
];

export default function JourneysPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        eyebrow="Automations"
        title="Journeys"
        description="Set the member journey up once — FitLoyalty runs it every day, for every member."
      />

      {/* preview banner */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[var(--accent-brand)]/30 bg-[var(--accent-subtle)] px-4 py-3">
        <Sparkles className="size-4 shrink-0 text-brand" />
        <p className="text-[13px]">
          <span className="font-semibold text-brand">Pro feature · coming soon.</span>{" "}
          <span className="text-muted-foreground">
            This is a preview of the journey builder — the flows below show the default
            templates your studio starts with.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Onboarding Autopilot */}
        <Card className="lg:col-span-7">
          <CardHeader className="flex-row items-center justify-between border-b border-border">
            <div className="flex items-center gap-2">
              <Route className="size-4 text-brand" />
              <CardTitle>Onboarding Autopilot — first 90 days</CardTitle>
            </div>
            <span className="rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--info)]">
              most churn happens here
            </span>
          </CardHeader>

          <div className="p-5">
            <ol className="relative flex flex-col gap-0 border-l border-border pl-6">
              {ONBOARDING_STEPS.map((s) => {
                const ChannelIcon = CHANNEL_ICON[s.channel];
                return (
                  <li key={s.day} className="relative pb-6 last:pb-0">
                    <span
                      className={cn(
                        "absolute -left-[31px] top-0.5 grid size-2.5 place-items-center rounded-full ring-4 ring-surface-1",
                        s.enabled ? "bg-brand" : "bg-surface-3",
                      )}
                    />
                    <div className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="num rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {s.day}
                          </span>
                          <p className="text-[13.5px] font-semibold">{s.title}</p>
                          <span className="inline-flex items-center gap-1 text-[11px] text-faint">
                            <ChannelIcon className="size-3" />
                            {s.channel}
                          </span>
                        </div>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                          {s.body}
                        </p>
                      </div>
                      <Switch checked={s.enabled} disabled aria-label={`${s.title} (preview)`} />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Card>

        {/* Win-back */}
        <Card className="h-fit lg:col-span-5">
          <CardHeader className="flex-row items-center justify-between border-b border-border">
            <div className="flex items-center gap-2">
              <RotateCcw className="size-4 text-brand" />
              <CardTitle>Win-back Campaigns</CardTitle>
            </div>
            <span className="rounded-full bg-[var(--info-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--info)]">
              63 reachable ex-members
            </span>
          </CardHeader>

          <div className="flex flex-col p-5 pt-2">
            {WINBACK_SEGMENTS.map((seg) => (
              <div
                key={seg.name}
                className="flex items-center gap-3 border-b border-border py-3.5 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium">{seg.name}</p>
                  <p className="mt-0.5 text-[11.5px] text-faint">
                    {seg.size} contacts · {seg.offer}
                  </p>
                </div>
                <Badge variant={seg.status === "active" ? "success" : "secondary"}>
                  {seg.status === "active" ? "Active" : "Draft"}
                </Badge>
              </div>
            ))}

            <p className="pt-4 text-[11px] leading-relaxed text-faint">
              Ex-members are a warm, GDPR-reachable audience — an existing customer
              relationship permits the contact. Offers go out on your branding, replies
              land in your inbox.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
