export type MemberStatus = "active" | "at-risk" | "churned";

export type DeviceType = "Apple Watch" | "Garmin" | "Amazfit";

/** How the member's visits are paid: direct membership or via an aggregator. */
export type MemberSource = "direct" | "usc" | "wellpass" | "hansefit" | "myclubs";

/** Gradient avatar palette index (1-5), mirrors the design-system av-grad classes. */
export type AvatarGrad = 1 | 2 | 3 | 4 | 5;

export interface Member {
  id: string;
  name: string;
  initials: string;
  grad: AvatarGrad;
  since: string;
  lastVisit: string;
  /** days since last visit, used for "X days ago" + at-risk math */
  lastVisitDays: number;
  workoutsThisMonth: number;
  points: number;
  status: MemberStatus;
  city: string;
  device: DeviceType;
  source: MemberSource;
  /** days until the contract's cancellation-notice deadline (Kündigungsfrist); only meaningful for direct members */
  noticeDeadlineDays: number | null;
  /** explainable-alert chips: why this member was flagged (at-risk/churned only) */
  churnReasons?: string[];
  /** booked classes but stopped attending — the earliest churn signal */
  bookingGhost?: boolean;
  totalWorkouts: number;
  rewardsRedeemed: number;
  /** longest run of consecutive weeks hitting the weekly goal */
  streakRecord: number;
  /** 30-day activity heatmap, levels 0-4 */
  activity: number[];
  /** points per month, last 6 months (sparkline) */
  pointsHistory: number[];
  recentRewards: { emoji: string; name: string; when: string }[];
}

export interface RewardActivity {
  id: string;
  name: string;
  initials: string;
  grad: AvatarGrad;
  reward: string;
  emoji: string;
  triggeredBy: string;
  points: number;
  date: string;
}

export type TriggerType =
  | "Workout Count"
  | "Streak"
  | "Google Review"
  | "Check-ins"
  | "Referral"
  | "Comeback"
  | "Birthday";

export type RewardType = "Free Item" | "Discount" | "Service" | "Points Bonus";

export interface Reward {
  id: string;
  emoji: string;
  name: string;
  description: string;
  trigger: string;
  redemptions: number;
  enabled: boolean;
}

export interface Cohort {
  label: string;
  /** retention % per month-since-signup; null = not yet reached */
  values: (number | null)[];
}

export interface ChartPoint {
  month: string;
  value: number;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  detail: string;
}

/* ---------- Aggregator Hub ---------- */

export interface AggregatorChannel {
  id: MemberSource;
  name: string;
  visitsThisMonth: number;
  /** € the gym earns per visit from this channel (avg) */
  payoutPerVisit: number;
  /** € earned from this channel this month */
  revenueThisMonth: number;
  /** % change vs last month */
  trendPct: number;
}

/** Per-channel payout reconciliation: visits we logged vs visits the aggregator paid for. */
export interface PayoutAuditRow {
  channelId: MemberSource;
  channelName: string;
  loggedVisits: number;
  paidVisits: number;
  /** € the gym earns per visit from this channel (avg) */
  payoutPerVisit: number;
}

/** Self-paying USC regular who is a candidate for a direct-membership offer. */
export interface ConversionCandidate {
  id: string;
  name: string;
  initials: string;
  grad: AvatarGrad;
  visitsPerWeek: number;
  monthsLoyal: number;
  /** estimated MRR gain if converted to direct membership */
  estMrr: number;
}

/* ---------- Occupancy ---------- */

export interface GymOccupancy {
  /** people checked in right now */
  now: number;
  capacity: number;
  /** typical busyness per opening hour, 0-100 */
  typicalByHour: { hour: number; pct: number }[];
  /** index into typicalByHour representing the current hour */
  currentHourIndex: number;
  /** today's upcoming classes with booking fullness — sourced from the schedule, no QR needed */
  tonightClasses: { time: string; name: string; booked: number; capacity: number }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  when: string;
  icon: "trending" | "alert" | "gift";
}

/* ---------- Member (client) app ---------- */

export interface Challenge {
  id: string;
  emoji: string;
  title: string;
  current: number;
  goal: number;
  unit: string;
  endsIn: string;
}

export interface MemberReward {
  id: string;
  emoji: string;
  name: string;
  description: string;
  cost: number;
}

export interface MemberBadge {
  emoji: string;
  name: string;
  earned: boolean;
}

export interface MemberProfile {
  name: string;
  initials: string;
  grad: AvatarGrad;
  gymName: string;
  since: string;
  balance: number;
  pointsThisMonth: number;
  monthlyGoal: number;
  /** consecutive weeks hitting the weekly visit goal (loss-aversion core mechanic) */
  weekStreak: number;
  /** visits needed per week to keep the streak alive */
  weeklyGoal: number;
  visitsThisWeek: number;
  /** streak freezes available this month (Duolingo-style insurance) */
  streakFreezes: number;
  /** points granted for the first visit back after a missed week (megastudy mechanic); 0 = no banner */
  comebackBonusPts: number;
  topPercent: number;
  device: DeviceType;
  syncedAgo: string;
  nextRewardName: string;
  lifetimeWorkouts: number;
  /** points earned per month, last 6 months */
  pointsHistory: number[];
  /** 8 weeks × 7 days activity heatmap, levels 0-4 */
  activity: number[];
}
