export type MemberStatus = "active" | "at-risk" | "churned";

export type DeviceType = "Apple Watch" | "Garmin" | "Amazfit";

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
  totalWorkouts: number;
  rewardsRedeemed: number;
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
  | "Calorie Goal"
  | "Check-ins"
  | "Referral"
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
  streak: number;
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
