import type { MemberStatus } from "@/lib/types";

type BadgeVariant = "success" | "warning" | "secondary";

export const STATUS_BADGE: Record<
  MemberStatus,
  { label: string; variant: BadgeVariant }
> = {
  active: { label: "Active", variant: "success" },
  "at-risk": { label: "At-Risk", variant: "warning" },
  churned: { label: "Churned", variant: "secondary" },
};
