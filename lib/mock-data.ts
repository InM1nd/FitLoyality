import type {
  ChartPoint,
  Cohort,
  Integration,
  Member,
  NotificationItem,
  Reward,
  RewardActivity,
  AvatarGrad,
  DeviceType,
  MemberStatus,
  Challenge,
  MemberReward,
  MemberBadge,
  MemberProfile,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Deterministic helpers (seeded so SSR === client, no hydration drift) */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 30-day activity heatmap, levels 0-4. Denser for higher monthly workout counts. */
function buildActivity(seed: number, intensity: number): number[] {
  const rand = mulberry32(seed);
  return Array.from({ length: 30 }, () => {
    const r = rand();
    if (r > intensity) return 0;
    return Math.min(4, 1 + Math.floor(rand() * 4));
  });
}

/** 6-month points history that lands on `current`. */
function buildPointsHistory(seed: number, current: number): number[] {
  const rand = mulberry32(seed);
  const start = Math.round(current * 0.55);
  const step = (current - start) / 5;
  return Array.from({ length: 6 }, (_, i) =>
    Math.round(start + step * i + (rand() - 0.5) * step * 0.7),
  );
}

const DEVICES: DeviceType[] = ["Apple Watch", "Garmin", "Amazfit"];

interface MemberSeed {
  name: string;
  grad: AvatarGrad;
  since: string;
  lastVisitDays: number;
  workoutsThisMonth: number;
  points: number;
  status: MemberStatus;
  city: string;
}

const MEMBER_SEEDS: MemberSeed[] = [
  { name: "Anna Müller",    grad: 1, since: "Mar 2021", lastVisitDays: 0,  workoutsThisMonth: 18, points: 2840, status: "active",  city: "Wien" },
  { name: "Lukas Fischer",  grad: 2, since: "Jan 2022", lastVisitDays: 1,  workoutsThisMonth: 14, points: 1920, status: "active",  city: "Wien" },
  { name: "Sarah Klein",    grad: 5, since: "Sep 2020", lastVisitDays: 2,  workoutsThisMonth: 11, points: 3410, status: "active",  city: "Graz" },
  { name: "Michael Bauer",  grad: 3, since: "Apr 2024", lastVisitDays: 3,  workoutsThisMonth: 9,  points: 720,  status: "active",  city: "Wien" },
  { name: "Julia Hofmann",  grad: 4, since: "Nov 2023", lastVisitDays: 16, workoutsThisMonth: 3,  points: 640,  status: "at-risk", city: "Wien" },
  { name: "David Lang",     grad: 2, since: "May 2023", lastVisitDays: 1,  workoutsThisMonth: 12, points: 1340, status: "active",  city: "Linz" },
  { name: "Nina Wagner",    grad: 4, since: "Feb 2022", lastVisitDays: 21, workoutsThisMonth: 2,  points: 910,  status: "at-risk", city: "Linz" },
  { name: "Thomas Gruber",  grad: 1, since: "Dec 2022", lastVisitDays: 0,  workoutsThisMonth: 20, points: 3980, status: "active",  city: "Wien" },
  { name: "Lisa Berger",    grad: 5, since: "Jun 2023", lastVisitDays: 0,  workoutsThisMonth: 16, points: 2110, status: "active",  city: "Wien" },
  { name: "Felix Schmid",   grad: 3, since: "Oct 2021", lastVisitDays: 19, workoutsThisMonth: 4,  points: 1560, status: "at-risk", city: "Innsbruck" },
  { name: "Maria Steiner",  grad: 5, since: "Jul 2022", lastVisitDays: 44, workoutsThisMonth: 0,  points: 880,  status: "churned", city: "Wien" },
  { name: "Robert Huber",   grad: 2, since: "Aug 2019", lastVisitDays: 38, workoutsThisMonth: 0,  points: 1180, status: "churned", city: "Salzburg" },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function lastVisitLabel(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

const REWARD_POOL = [
  { emoji: "🥤", name: "Free Protein Shake" },
  { emoji: "🎽", name: "10% Merch Discount" },
  { emoji: "💪", name: "Free PT Session" },
  { emoji: "🎁", name: "Guest Pass" },
  { emoji: "🎂", name: "Birthday Free Month" },
];

export const MEMBERS: Member[] = MEMBER_SEEDS.map((m, i) => {
  const intensity = Math.min(0.85, 0.15 + m.workoutsThisMonth / 22);
  const totalWorkouts = 180 + m.workoutsThisMonth * 11 + i * 17;
  return {
    id: `m${i + 1}`,
    name: m.name,
    initials: initials(m.name),
    grad: m.grad,
    since: m.since,
    lastVisit: lastVisitLabel(m.lastVisitDays),
    lastVisitDays: m.lastVisitDays,
    workoutsThisMonth: m.workoutsThisMonth,
    points: m.points,
    status: m.status,
    city: m.city,
    device: DEVICES[i % DEVICES.length],
    totalWorkouts,
    rewardsRedeemed: 2 + (i % 7),
    streakRecord: m.status === "churned" ? 6 + (i % 5) : 9 + (i % 12),
    activity: buildActivity(i * 97 + 13, intensity),
    pointsHistory: buildPointsHistory(i * 31 + 7, m.points),
    recentRewards: [
      { ...REWARD_POOL[i % REWARD_POOL.length], when: "2 days ago" },
      { ...REWARD_POOL[(i + 1) % REWARD_POOL.length], when: "1 week ago" },
      { ...REWARD_POOL[(i + 2) % REWARD_POOL.length], when: "3 weeks ago" },
    ],
  };
});

/* ------------------------------------------------------------------ */
/* KPIs                                                                */
/* ------------------------------------------------------------------ */

export const KPIS = {
  activeMembers: 347,
  activeMembersDelta: 12,
  retentionRate: 81.4,
  retentionDelta: 3.2,
  atRiskMembers: 23,
  rewardsRedeemed: 89,
} as const;

export const MEMBER_COUNTS = {
  all: 347,
  active: 301,
  atRisk: 23,
  churned: 23,
} as const;

/* ------------------------------------------------------------------ */
/* Overview — at-risk list & retention chart                           */
/* ------------------------------------------------------------------ */

export const AT_RISK_MEMBERS: Member[] = MEMBERS.filter(
  (m) => m.status === "at-risk" || m.status === "churned",
).slice(0, 5);

export const RETENTION_SERIES: ChartPoint[] = [
  { month: "Jan", value: 74 },
  { month: "Feb", value: 76 },
  { month: "Mar", value: 78 },
  { month: "Apr", value: 79 },
  { month: "May", value: 81 },
  { month: "Jun", value: 81.4 },
];

/* ------------------------------------------------------------------ */
/* Reward activity table                                               */
/* ------------------------------------------------------------------ */

export const REWARD_ACTIVITY: RewardActivity[] = [
  { id: "a1", name: "Anna Müller",   initials: "AM", grad: 1, reward: "Free Protein Shake",  emoji: "🥤", triggeredBy: "10 workouts streak",   points: 200, date: "Jun 4, 2026" },
  { id: "a2", name: "Thomas Gruber", initials: "TG", grad: 1, reward: "10% Merch Discount",  emoji: "🎽", triggeredBy: "5,000 kcal in a week",  points: 500, date: "Jun 4, 2026" },
  { id: "a3", name: "Lisa Berger",   initials: "LB", grad: 5, reward: "Guest Pass",          emoji: "🎁", triggeredBy: "Referred a friend",      points: 350, date: "Jun 3, 2026" },
  { id: "a4", name: "David Lang",    initials: "DL", grad: 2, reward: "Free Protein Shake",  emoji: "🥤", triggeredBy: "10 workouts streak",    points: 200, date: "Jun 3, 2026" },
  { id: "a5", name: "Sarah Klein",   initials: "SK", grad: 5, reward: "Free PT Session",     emoji: "💪", triggeredBy: "3-month streak",        points: 900, date: "Jun 2, 2026" },
  { id: "a6", name: "Lukas Fischer", initials: "LF", grad: 2, reward: "Birthday Free Month", emoji: "🎂", triggeredBy: "Birthday",              points: 0,   date: "Jun 2, 2026" },
  { id: "a7", name: "Michael Bauer", initials: "MB", grad: 3, reward: "10% Merch Discount",  emoji: "🎽", triggeredBy: "5,000 kcal in a week",  points: 500, date: "Jun 1, 2026" },
  { id: "a8", name: "Anna Müller",   initials: "AM", grad: 1, reward: "Guest Pass",          emoji: "🎁", triggeredBy: "Referred a friend",      points: 350, date: "Jun 1, 2026" },
];

/* ------------------------------------------------------------------ */
/* Rewards page                                                        */
/* ------------------------------------------------------------------ */

export const REWARDS: Reward[] = [
  { id: "r1", emoji: "🥤", name: "Free Protein Shake", description: "Redeem at the bar after hitting your monthly target.", trigger: "10 workouts in a month",      redemptions: 34, enabled: true },
  { id: "r2", emoji: "🎽", name: "10% Merch Discount", description: "Discount voucher for the studio pro shop.",            trigger: "Burn 5,000 kcal in a week",   redemptions: 12, enabled: true },
  { id: "r3", emoji: "💪", name: "Free PT Session",    description: "One complimentary personal-training session.",         trigger: "3-month streak, no missed weeks", redemptions: 3,  enabled: true },
  { id: "r4", emoji: "🎁", name: "Guest Pass",         description: "Bring a friend for free on their first visit.",        trigger: "Refer a friend who joins",    redemptions: 18, enabled: false },
];

/* ------------------------------------------------------------------ */
/* Analytics — cohorts, churn, ROI defaults                            */
/* ------------------------------------------------------------------ */

export const COHORTS: Cohort[] = [
  { label: "Jan 2026", values: [100, 73, 62, 55, 52, 50] },
  { label: "Feb 2026", values: [100, 71, 60, 54, 51, null] },
  { label: "Mar 2026", values: [100, 75, 63, 56, null, null] },
  { label: "Apr 2026", values: [100, 70, 59, null, null, null] },
  { label: "May 2026", values: [100, 74, null, null, null, null] },
  { label: "Jun 2026", values: [100, null, null, null, null, null] },
];

/** New signups per cohort (for tooltip member counts). */
export const COHORT_SIZES: Record<string, number> = {
  "Jan 2026": 150,
  "Feb 2026": 132,
  "Mar 2026": 168,
  "Apr 2026": 121,
  "May 2026": 144,
  "Jun 2026": 96,
};

export const CHURN_SERIES: { month: string; churn: number }[] = [
  { month: "Jan", churn: 8 },
  { month: "Feb", churn: 7 },
  { month: "Mar", churn: 15 },
  { month: "Apr", churn: 9 },
  { month: "May", churn: 6 },
  { month: "Jun", churn: 7 },
];

export const ROI_DEFAULTS = {
  subscription: 99,
  memberFee: 79,
  monthlyChurn: 15,
} as const;

/* ------------------------------------------------------------------ */
/* Settings — integrations                                             */
/* ------------------------------------------------------------------ */

export const INTEGRATIONS: Integration[] = [
  { id: "google",  name: "Google Health Connect", description: "Sync workouts & activity from Android devices.", connected: true,  detail: "Connected · 347 members synced" },
  { id: "apple",   name: "Apple HealthKit",        description: "Sync workouts & activity from Apple devices.",   connected: true,  detail: "Connected · 198 members synced" },
  { id: "evers",   name: "Eversports",             description: "Import class bookings and schedules.",           connected: false, detail: "Not connected" },
  { id: "magic",   name: "Magicline",              description: "Two-way sync with your membership CRM.",         connected: false, detail: "Not connected" },
];

/* ------------------------------------------------------------------ */
/* Header — notifications, search                                      */
/* ------------------------------------------------------------------ */

export const NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", title: "Retention up 3.2%", body: "Your monthly retention beat last month.", when: "2h ago",  icon: "trending" },
  { id: "n2", title: "5 members at risk",  body: "Inactive 14+ days — consider a nudge.",   when: "5h ago",  icon: "alert" },
  { id: "n3", title: "89 rewards redeemed", body: "A new record for the month.",            when: "1d ago",  icon: "gift" },
];

export const RECENT_SEARCHES = ["Anna Müller", "Free Protein Shake", "At-risk members"];

export const GYM = {
  name: "CrossFit Vienna Nord",
  plan: "Pro Plan",
  initials: "CV",
  admin: "Thomas M.",
  adminInitials: "TM",
  address: "Brünner Straße 42, 1210 Wien",
  email: "hallo@crossfit-vienna-nord.at",
  phone: "+43 1 234 5678",
  brandColor: "#22c55e",
  appName: "CrossFit Vienna Nord Rewards",
} as const;

/* ================================================================== */
/* MEMBER (CLIENT) APP                                                 */
/* ================================================================== */

export const MEMBER_ME: MemberProfile = {
  name: "Markus Köhler",
  initials: "MK",
  grad: 1,
  gymName: GYM.name,
  since: "Mar 2021",
  balance: 2840,
  pointsThisMonth: 2840,
  monthlyGoal: 3000,
  streak: 14,
  topPercent: 8,
  device: "Apple Watch",
  syncedAgo: "2 min ago",
  nextRewardName: "Free PT Session",
  lifetimeWorkouts: 642,
  pointsHistory: [1640, 1980, 2240, 2110, 2560, 2840],
  // 8 weeks × 7 days, levels 0-4 (mirrors the design-system member heatmap)
  activity: [
    0, 2, 0, 3, 1, 4, 0, 1, 3, 0, 2, 4, 2, 0, 0, 1, 3, 2, 0, 3, 1, 2, 0, 4, 1, 3, 0, 2,
    3, 1, 0, 2, 4, 1, 0, 0, 3, 2, 0, 1, 4, 2, 1, 0, 3, 2, 4, 0, 1, 2, 4, 1, 3, 0, 2, 4,
  ],
};

export const MEMBER_CHALLENGES: Challenge[] = [
  { id: "c1", emoji: "🏃", title: "December Distance", current: 62, goal: 100, unit: "km", endsIn: "9 days left" },
  { id: "c2", emoji: "🔥", title: "Workout Streak", current: 14, goal: 30, unit: "days", endsIn: "16 days left" },
  { id: "c3", emoji: "🏋️", title: "Heavy Lifter", current: 8, goal: 12, unit: "sessions", endsIn: "this month" },
];

export const MEMBER_REWARDS: MemberReward[] = [
  { id: "mr1", emoji: "🥤", name: "Free Protein Shake", description: "Redeem at the bar after your workout.", cost: 200 },
  { id: "mr2", emoji: "🎽", name: "10% Merch Discount", description: "Voucher for the studio pro shop.", cost: 500 },
  { id: "mr3", emoji: "🎟️", name: "Guest Day Pass", description: "Bring a friend for a free session.", cost: 350 },
  { id: "mr4", emoji: "📊", name: "InBody Scan", description: "Full body-composition analysis.", cost: 600 },
  { id: "mr5", emoji: "💪", name: "Free PT Session", description: "One personal-training session.", cost: 900 },
  { id: "mr6", emoji: "🏆", name: "1 Month Free", description: "A full free membership month.", cost: 4000 },
];

export const MEMBER_BADGES: MemberBadge[] = [
  { emoji: "🔥", name: "14-Day Streak", earned: true },
  { emoji: "🏋️", name: "100 Workouts", earned: true },
  { emoji: "🌅", name: "Early Bird", earned: true },
  { emoji: "⚡", name: "PR Crusher", earned: true },
  { emoji: "🎯", name: "Goal Hitter", earned: true },
  { emoji: "🏆", name: "Top 10%", earned: false },
  { emoji: "💯", name: "Perfect Month", earned: false },
  { emoji: "🦾", name: "Iron Will", earned: false },
];

export const MEMBER_POINTS_FEED: { id: string; label: string; when: string; points: number }[] = [
  { id: "f1", label: "Morning WOD completed", when: "Today · 7:12", points: 120 },
  { id: "f2", label: "14-day streak bonus", when: "Today · 7:12", points: 200 },
  { id: "f3", label: "Apple Watch sync", when: "Yesterday", points: 80 },
  { id: "f4", label: "Brought a guest", when: "2 days ago", points: 150 },
  { id: "f5", label: "Personal record · Deadlift", when: "3 days ago", points: 250 },
];
