import type {
  AggregatorChannel,
  BriefingAction,
  PayoutAuditRow,
  ChartPoint,
  Cohort,
  ConsentStats,
  ConversionCandidate,
  GymOccupancy,
  Integration,
  Member,
  MemberSource,
  NotificationItem,
  Reward,
  RewardActivity,
  ReviewEntry,
  Referrer,
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

/** The demo dataset is pinned to this year (dates, cohorts, tooltips). */
export const DEMO_YEAR = 2026;

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
  source: MemberSource;
  /** days until cancellation-notice deadline (direct members only) */
  noticeDeadlineDays: number | null;
  /** explainable-alert chips (at-risk/churned only) */
  churnReasons?: string[];
  /** still booking classes but not showing up — earliest churn signal */
  bookingGhost?: boolean;
  wearableConnected: boolean;
  /** average intensity level 1.0–4.0 over last 4 weeks; null if no wearable */
  avgIntensity: number | null;
}

const MEMBER_SEEDS: MemberSeed[] = [
  { name: "Anna Müller",    grad: 1, since: "Mar 2021", lastVisitDays: 0,  workoutsThisMonth: 18, points: 2840, status: "active",  city: "Wien",      source: "direct",   noticeDeadlineDays: 92,   wearableConnected: true,  avgIntensity: 3.4 },
  { name: "Lukas Fischer",  grad: 2, since: "Jan 2022", lastVisitDays: 1,  workoutsThisMonth: 14, points: 1920, status: "active",  city: "Wien",      source: "usc",      noticeDeadlineDays: null, wearableConnected: true,  avgIntensity: 2.8 },
  { name: "Sarah Klein",    grad: 5, since: "Sep 2020", lastVisitDays: 2,  workoutsThisMonth: 11, points: 3410, status: "active",  city: "Graz",      source: "direct",   noticeDeadlineDays: 47,   wearableConnected: false, avgIntensity: null },
  { name: "Michael Bauer",  grad: 3, since: "Apr 2024", lastVisitDays: 3,  workoutsThisMonth: 9,  points: 720,  status: "active",  city: "Wien",      source: "wellpass", noticeDeadlineDays: null, wearableConnected: true,  avgIntensity: 2.3 },
  { name: "Julia Hofmann",  grad: 4, since: "Nov 2023", lastVisitDays: 16, workoutsThisMonth: 3,  points: 640,  status: "at-risk", city: "Wien",      source: "direct",   noticeDeadlineDays: 5,    wearableConnected: true,  avgIntensity: 1.2,
    churnReasons: ["Frequency −58% vs her 6-mo baseline", "16d inactive"] },
  { name: "David Lang",     grad: 2, since: "May 2023", lastVisitDays: 1,  workoutsThisMonth: 12, points: 1340, status: "active",  city: "Linz",      source: "direct",   noticeDeadlineDays: 120,  wearableConnected: false, avgIntensity: null },
  { name: "Nina Wagner",    grad: 4, since: "Feb 2022", lastVisitDays: 21, workoutsThisMonth: 2,  points: 910,  status: "at-risk", city: "Linz",      source: "direct",   noticeDeadlineDays: 11,   wearableConnected: true,  avgIntensity: 0.8,
    churnReasons: ["3 booked · 0 attended", "Motivation fading, intent intact"], bookingGhost: true },
  { name: "Thomas Gruber",  grad: 1, since: "Dec 2022", lastVisitDays: 0,  workoutsThisMonth: 20, points: 3980, status: "active",  city: "Wien",      source: "direct",   noticeDeadlineDays: 154,  wearableConnected: true,  avgIntensity: 3.8 },
  { name: "Lisa Berger",    grad: 5, since: "Jun 2023", lastVisitDays: 0,  workoutsThisMonth: 16, points: 2110, status: "active",  city: "Wien",      source: "usc",      noticeDeadlineDays: null, wearableConnected: true,  avgIntensity: 3.2 },
  { name: "Felix Schmid",   grad: 3, since: "Oct 2021", lastVisitDays: 19, workoutsThisMonth: 4,  points: 1560, status: "at-risk", city: "Innsbruck", source: "direct",   noticeDeadlineDays: 3,    wearableConnected: true,  avgIntensity: 1.5,
    churnReasons: ["Frequency −45% vs baseline", "Dropped evening classes"] },
  { name: "Maria Steiner",  grad: 5, since: "Jul 2022", lastVisitDays: 44, workoutsThisMonth: 0,  points: 880,  status: "churned", city: "Wien",      source: "direct",   noticeDeadlineDays: null, wearableConnected: false, avgIntensity: null,
    churnReasons: ["No visits in 44d", "Ignored 2 nudges"] },
  { name: "Robert Huber",   grad: 2, since: "Aug 2019", lastVisitDays: 38, workoutsThisMonth: 0,  points: 1180, status: "churned", city: "Salzburg",  source: "hansefit", noticeDeadlineDays: null, wearableConnected: false, avgIntensity: null,
    churnReasons: ["Aggregator visits stopped"] },
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
    source: m.source,
    noticeDeadlineDays: m.noticeDeadlineDays,
    churnReasons: m.churnReasons,
    bookingGhost: m.bookingGhost,
    wearableConnected: m.wearableConnected,
    avgIntensity: m.avgIntensity,
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
  /** € of MRR kept this month: nudged in churn window → returned within 7 days */
  savedRevenue: 2340,
  savedMembers: 9,
} as const;

/** Tab counts derived from the actual MEMBERS sample so the UI never lies. */
export const MEMBER_COUNTS = {
  all: MEMBERS.length,
  active: MEMBERS.filter((m) => m.status === "active").length,
  atRisk: MEMBERS.filter((m) => m.status === "at-risk").length,
  churned: MEMBERS.filter((m) => m.status === "churned").length,
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
  { id: "a0", name: "Julia Hofmann", initials: "JH", grad: 4, reward: "Comeback Bonus",      emoji: "👋", triggeredBy: "First visit after missed week", points: 50, date: "Jun 5, 2026" },
  { id: "a1", name: "Anna Müller",   initials: "AM", grad: 1, reward: "Free Protein Shake",  emoji: "🥤", triggeredBy: "10 visits this month",  points: 200, date: "Jun 4, 2026" },
  { id: "a2", name: "Thomas Gruber", initials: "TG", grad: 1, reward: "10% Merch Discount",  emoji: "🎽", triggeredBy: "12-week streak",        points: 500, date: "Jun 4, 2026" },
  { id: "a3", name: "Lisa Berger",   initials: "LB", grad: 5, reward: "Guest Pass",          emoji: "🎁", triggeredBy: "Referred a friend",     points: 350, date: "Jun 3, 2026" },
  { id: "a4", name: "David Lang",    initials: "DL", grad: 2, reward: "Free Protein Shake",  emoji: "🥤", triggeredBy: "10 visits this month",  points: 200, date: "Jun 3, 2026" },
  { id: "a5", name: "Sarah Klein",   initials: "SK", grad: 5, reward: "Free PT Session",     emoji: "💪", triggeredBy: "12-week streak",        points: 900, date: "Jun 2, 2026" },
  { id: "a6", name: "Lukas Fischer", initials: "LF", grad: 2, reward: "Birthday Free Month", emoji: "🎂", triggeredBy: "Birthday",              points: 0,   date: "Jun 2, 2026" },
  { id: "a7", name: "Michael Bauer", initials: "MB", grad: 3, reward: "10% Merch Discount",  emoji: "🎽", triggeredBy: "Google review left",    points: 500, date: "Jun 1, 2026" },
  { id: "a8", name: "Anna Müller",   initials: "AM", grad: 1, reward: "Guest Pass",          emoji: "🎁", triggeredBy: "Referred a friend",     points: 350, date: "Jun 1, 2026" },
];

/* ------------------------------------------------------------------ */
/* Rewards page                                                        */
/* ------------------------------------------------------------------ */

export const REWARDS: Reward[] = [
  { id: "r0", emoji: "👋", name: "Comeback Bonus",     description: "Auto points for the first visit back after a missed week — the #1 mechanic from the largest gym field study (61k members).", trigger: "First visit after a missed week", redemptions: 41, enabled: true },
  { id: "r1", emoji: "🥤", name: "Free Protein Shake", description: "Redeem at the bar after hitting your monthly target.", trigger: "10 visits in a month",            redemptions: 34, enabled: true },
  { id: "r2", emoji: "🎽", name: "10% Merch Discount", description: "Discount voucher for the studio pro shop.",            trigger: "Leave a Google review",           redemptions: 12, enabled: true },
  { id: "r3", emoji: "💪", name: "Free PT Session",    description: "One complimentary personal-training session.",         trigger: "12-week streak, no missed weeks", redemptions: 3,  enabled: true },
  { id: "r4", emoji: "🎁", name: "Guest Pass",         description: "Bring a friend for free on their first visit.",        trigger: "Refer a friend who joins",        redemptions: 18, enabled: false },
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
/* Aggregator Hub — USC / Wellpass / Hansefit channel mix              */
/* ------------------------------------------------------------------ */

export const AGGREGATORS: AggregatorChannel[] = [
  { id: "usc",      name: "Urban Sports Club", visitsThisMonth: 312, payoutPerVisit: 7.6, revenueThisMonth: 2371, trendPct: 8 },
  { id: "wellpass", name: "EGYM Wellpass",     visitsThisMonth: 198, payoutPerVisit: 6.1, revenueThisMonth: 1208, trendPct: 14 },
  { id: "myclubs",  name: "myClubs",           visitsThisMonth: 57,  payoutPerVisit: 9.8, revenueThisMonth: 559,  trendPct: 6 },
  { id: "hansefit", name: "Hansefit",          visitsThisMonth: 64,  payoutPerVisit: 5.2, revenueThisMonth: 333,  trendPct: -3 },
];

/**
 * Payout audit — visits in our attendance data vs visits the aggregator's
 * statement actually paid for. Payout logic (e.g. USC "Expected Attendance")
 * is non-trivial and changes; owners can't reconcile this by hand.
 */
export const PAYOUT_AUDIT: PayoutAuditRow[] = [
  { channelId: "usc",      channelName: "Urban Sports Club", loggedVisits: 326, paidVisits: 312, payoutPerVisit: 7.6 },
  { channelId: "wellpass", channelName: "EGYM Wellpass",     loggedVisits: 203, paidVisits: 198, payoutPerVisit: 6.1 },
  { channelId: "myclubs",  channelName: "myClubs",           loggedVisits: 61,  paidVisits: 57,  payoutPerVisit: 9.8 },
  { channelId: "hansefit", channelName: "Hansefit",          loggedVisits: 64,  paidVisits: 64,  payoutPerVisit: 5.2 },
];

/** Direct-membership MRR for the revenue-mix view. */
export const DIRECT_REVENUE = { revenueThisMonth: 18430, trendPct: 4 } as const;

/** Self-paying USC regulars — candidates for a direct-membership offer. */
export const CONVERSION_CANDIDATES: ConversionCandidate[] = [
  { id: "cc1", name: "Lukas Fischer", initials: "LF", grad: 2, visitsPerWeek: 3, monthsLoyal: 5, estMrr: 89 },
  { id: "cc2", name: "Lisa Berger",   initials: "LB", grad: 5, visitsPerWeek: 4, monthsLoyal: 8, estMrr: 89 },
  { id: "cc3", name: "Paul Brandt",   initials: "PB", grad: 3, visitsPerWeek: 2, monthsLoyal: 4, estMrr: 69 },
];

/* ------------------------------------------------------------------ */
/* Saved Revenue — attribution log                                     */
/* ------------------------------------------------------------------ */

export interface SavedMemberEntry {
  id: string;
  name: string;
  initials: string;
  grad: AvatarGrad;
  /** what put them in the churn window */
  trigger: string;
  nudgedOn: string;
  channel: "WhatsApp" | "Email" | "Push";
  returnedAfterDays: number;
  /** monthly fee kept */
  mrr: number;
}

export const SAVED_LOG: SavedMemberEntry[] = [
  { id: "s1", name: "Julia Hofmann",  initials: "JH", grad: 4, trigger: "16d inactive · deadline 5d",  nudgedOn: "Jun 2",  channel: "WhatsApp", returnedAfterDays: 3, mrr: 89 },
  { id: "s2", name: "Peter Maier",    initials: "PM", grad: 2, trigger: "15d inactive · deadline 6d",  nudgedOn: "May 28", channel: "WhatsApp", returnedAfterDays: 2, mrr: 79 },
  { id: "s3", name: "Sophie Brunner", initials: "SB", grad: 5, trigger: "21d inactive",                nudgedOn: "May 26", channel: "Email",    returnedAfterDays: 6, mrr: 99 },
  { id: "s4", name: "Jonas Weber",    initials: "JW", grad: 3, trigger: "14d inactive · deadline 7d",  nudgedOn: "May 24", channel: "WhatsApp", returnedAfterDays: 1, mrr: 89 },
  { id: "s5", name: "Laura Eder",     initials: "LE", grad: 1, trigger: "18d inactive",                nudgedOn: "May 21", channel: "Push",     returnedAfterDays: 5, mrr: 69 },
  { id: "s6", name: "Martin Holzer",  initials: "MH", grad: 2, trigger: "15d inactive · deadline 4d",  nudgedOn: "May 18", channel: "WhatsApp", returnedAfterDays: 2, mrr: 119 },
  { id: "s7", name: "Eva Pichler",    initials: "EP", grad: 4, trigger: "23d inactive",                nudgedOn: "May 15", channel: "Email",    returnedAfterDays: 7, mrr: 79 },
  { id: "s8", name: "Daniel Auer",    initials: "DA", grad: 3, trigger: "14d inactive · deadline 2d",  nudgedOn: "May 12", channel: "WhatsApp", returnedAfterDays: 1, mrr: 89 },
  { id: "s9", name: "Hannah Wolf",    initials: "HW", grad: 5, trigger: "17d inactive",                nudgedOn: "May 9",  channel: "Push",     returnedAfterDays: 4, mrr: 89 },
];

/* ------------------------------------------------------------------ */
/* Occupancy — "Wie voll ist es?"                                      */
/* ------------------------------------------------------------------ */

/** Typical busyness per opening hour (06:00–22:00), derived from check-ins. */
export const OCCUPANCY: GymOccupancy = {
  now: 21,
  capacity: 80,
  typicalByHour: [
    { hour: 6,  pct: 35 },
    { hour: 7,  pct: 55 },
    { hour: 8,  pct: 42 },
    { hour: 9,  pct: 28 },
    { hour: 10, pct: 18 },
    { hour: 11, pct: 14 },
    { hour: 12, pct: 30 },
    { hour: 13, pct: 24 },
    { hour: 14, pct: 16 },
    { hour: 15, pct: 20 },
    { hour: 16, pct: 34 },
    { hour: 17, pct: 62 },
    { hour: 18, pct: 88 },
    { hour: 19, pct: 74 },
    { hour: 20, pct: 48 },
    { hour: 21, pct: 26 },
  ],
  currentHourIndex: 4, // 10:00 — quiet
  // booking fullness straight from the class schedule — no QR needed
  tonightClasses: [
    { time: "17:30", name: "HIIT 45",         booked: 9,  capacity: 14 },
    { time: "18:30", name: "CrossFit WOD",    booked: 13, capacity: 14 },
    { time: "19:30", name: "Mobility & Core", booked: 6,  capacity: 12 },
  ],
};

/* ------------------------------------------------------------------ */
/* Settings — integrations                                             */
/* ------------------------------------------------------------------ */

export const INTEGRATIONS: Integration[] = [
  { id: "evers",    name: "Eversports Manager",  description: "Weekly attendance import from your participant lists.", connected: true,  detail: "Connected · CSV import · last sync 2h ago" },
  { id: "qr",       name: "Studio QR Check-in",   description: "Open-gym visits logged via the member app.",            connected: true,  detail: "Active · 1,214 check-ins this month" },
  { id: "usc",      name: "Urban Sports Club",    description: "Track aggregator visits & per-visit payouts.",          connected: true,  detail: "Connected · 312 visits this month" },
  { id: "wellpass", name: "EGYM Wellpass",        description: "Track aggregator visits & per-visit payouts.",          connected: true,  detail: "Connected · 198 visits this month" },
  { id: "myclubs",  name: "myClubs",               description: "Austria's leading aggregator — visits & payouts.",      connected: true,  detail: "Connected · 57 visits this month" },
  { id: "magic",    name: "Magicline",            description: "Two-way sync with your membership CRM.",                connected: false, detail: "Not connected" },
  { id: "apple",    name: "Apple HealthKit",      description: "Life outside the box — workouts beyond the gym (Phase 3).", connected: false, detail: "Coming soon" },
];

/* ------------------------------------------------------------------ */
/* Consent Manager — DSGVO / member consent posture                    */
/* ------------------------------------------------------------------ */

export const CONSENT_STATS: ConsentStats = {
  membersTotal: KPIS.activeMembers,
  nudgeConsentCount: 327,
  avvSignedDate: "12 Jan 2026",
  dataRegion: "EU (Frankfurt)",
  autoDeleteEnabled: false,
  autoDeleteMonths: 12,
};

/* ------------------------------------------------------------------ */
/* Header — notifications, search                                      */
/* ------------------------------------------------------------------ */

export const NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", title: "€2,340 saved this month", body: "9 members returned after a churn-window nudge.", when: "2h ago", icon: "trending" },
  { id: "n2", title: "2 members in churn window", body: "Inactive 14+ days AND notice deadline within 7 days.", when: "5h ago", icon: "alert" },
  { id: "n3", title: "3 USC regulars convertible", body: "Self-paying, 2+ visits/week for 3+ months.", when: "1d ago", icon: "gift" },
];

export const RECENT_SEARCHES = ["Anna Müller", "Free Protein Shake", "At-risk members"];

/* ------------------------------------------------------------------ */
/* Review & Referral Engine (B2B)                                      */
/* ------------------------------------------------------------------ */

/**
 * Reviews: automated, milestone-triggered Google-review asks. Industry data —
 * a well-timed ask after a happy moment lands ~1 new review/day and lifts the
 * local rating that drives organic discovery.
 */
export const REVIEW_STATS = {
  avgRating: 4.8,
  totalReviews: 213,
  reviewsThisMonth: 11,
  asksSentThisMonth: 34,
  /** new reviews attributed to automated asks this month */
  fromAsks: 11,
  ratingDelta: 0.3,
} as const;

export const REVIEWS: ReviewEntry[] = [
  { id: "rv1", name: "Sarah Klein",   initials: "SK", grad: 5, rating: 5, text: "Best box in Graz. The coaches actually know your name and the app keeps me honest about showing up.", when: "2 days ago",  trigger: "After 12-week streak" },
  { id: "rv2", name: "David Lang",    initials: "DL", grad: 2, rating: 5, text: "Joined on a guest pass, stayed for the community. The streak rewards are weirdly motivating.",          when: "4 days ago",  trigger: "After badge earned" },
  { id: "rv3", name: "Michael Bauer", initials: "MB", grad: 3, rating: 4, text: "Great coaching and clean equipment. Evening classes fill up fast — book early.",                       when: "1 week ago",  trigger: "After 50th workout" },
  { id: "rv4", name: "Lisa Berger",   initials: "LB", grad: 5, rating: 5, text: "Came via Urban Sports, ended up basically living here. Worth every minute.",                            when: "1 week ago",  trigger: "After 100 visits" },
  { id: "rv5", name: "Anna Müller",   initials: "AM", grad: 1, rating: 5, text: "Three years in and still my favourite part of the week. The team genuinely cares.",                    when: "2 weeks ago", trigger: "After 200th workout" },
];

/** Auto-ask rules: which happy moment triggers a Google-review request. */
export const REVIEW_RULES: { id: string; trigger: string; enabled: boolean }[] = [
  { id: "rr1", trigger: "Member hits a 12-week streak", enabled: true },
  { id: "rr2", trigger: "Member earns a milestone badge (100/200 workouts)", enabled: true },
  { id: "rr3", trigger: "Member redeems their first reward", enabled: false },
];

/**
 * Referrals: "Mitglieder werben Mitglieder". Industry data — referrals convert
 * ~41% (vs 1-3% for paid social) and referred members churn ~60% less.
 */
export const REFERRAL_STATS = {
  invitesSent: 58,
  joined: 24,
  conversionPct: 41,
  /** € of MRR currently attributed to referred members */
  mrrFromReferrals: 1870,
  churnReductionPct: 60,
} as const;

export const TOP_REFERRERS: Referrer[] = [
  { id: "rf1", name: "Thomas Gruber", initials: "TG", grad: 1, invited: 7, joined: 4, pointsEarned: 2000 },
  { id: "rf2", name: "Anna Müller",   initials: "AM", grad: 1, invited: 5, joined: 3, pointsEarned: 1500 },
  { id: "rf3", name: "Lisa Berger",   initials: "LB", grad: 5, invited: 4, joined: 2, pointsEarned: 1000 },
  { id: "rf4", name: "David Lang",    initials: "DL", grad: 2, invited: 3, joined: 2, pointsEarned: 1000 },
  { id: "rf5", name: "Sarah Klein",   initials: "SK", grad: 5, invited: 3, joined: 1, pointsEarned: 500 },
];

/* ------------------------------------------------------------------ */
/* Morning Briefing — the daily prioritized action list                */
/* ------------------------------------------------------------------ */

/**
 * What FitLoyalty surfaces first thing each morning: a short, ranked list of
 * the few member touches that actually move retention today. The studio owner
 * (chronically short-staffed) clears it in two minutes instead of guessing.
 * Ordered save → celebrate → convert → review.
 */
export const BRIEFING_ACTIONS: BriefingAction[] = [
  {
    id: "b1",
    type: "save",
    name: "Felix Schmid",
    initials: "FS",
    grad: 3,
    headline: "19 days inactive — cancellation deadline in 3 days",
    suggestion:
      "Hi Felix, we've missed you at the box! Your spot in Saturday's 10:00 WOD is still open — come grab it and I'll throw in a free shake. 💪",
    channel: "WhatsApp",
    meta: "€89 MRR at risk",
    cta: "Send nudge",
  },
  {
    id: "b2",
    type: "save",
    name: "Nina Wagner",
    initials: "NW",
    grad: 4,
    headline: "Booked 3 classes, attended 0 — deadline in 11 days",
    suggestion:
      "Hi Nina, saw you booked in this week but couldn't make it — life happens! Want me to move you to an easier evening slot? Your streak freeze has you covered.",
    channel: "WhatsApp",
    meta: "€89 MRR at risk",
    cta: "Send nudge",
  },
  {
    id: "b3",
    type: "celebrate",
    name: "Thomas Gruber",
    initials: "TG",
    grad: 1,
    headline: "Hits his 12-week streak today — your most loyal member",
    suggestion:
      "12 weeks straight, Thomas! 🔥 That's the longest active streak in the whole box right now. Free PT session unlocked — see you tomorrow.",
    channel: "WhatsApp",
    meta: "+€0, pure goodwill",
    cta: "Send congrats",
  },
  {
    id: "b4",
    type: "celebrate",
    name: "Anna Müller",
    initials: "AM",
    grad: 1,
    headline: "Reaches her 200th lifetime workout today",
    suggestion:
      "200 workouts, Anna! 🎉 Since March 2021 you've shown up more than almost anyone here. Drop by the desk — there's a little something waiting.",
    channel: "In person",
    meta: "Milestone",
    cta: "Mark to congratulate",
  },
  {
    id: "b5",
    type: "convert",
    name: "Lisa Berger",
    initials: "LB",
    grad: 5,
    headline: "USC self-payer · 4×/week for 8 months — prime to convert",
    suggestion:
      "Hi Lisa, you're basically here every other day! A direct membership would save you money vs. your USC visits and unlock member-only perks. Want the numbers?",
    channel: "WhatsApp",
    meta: "+€89 MRR if converted",
    cta: "Send offer",
  },
  {
    id: "b6",
    type: "review",
    name: "David Lang",
    initials: "DL",
    grad: 2,
    headline: "Just earned a badge & is in a great streak — happy moment to ask",
    suggestion:
      "Loving having you in the box, David! If you've got 20 seconds, a quick Google review helps other locals find us — here's the link. 🙏",
    channel: "Push",
    meta: "Reputation",
    cta: "Ask for review",
  },
  {
    id: "b7",
    type: "intensity",
    name: "Julia Hofmann",
    initials: "JH",
    grad: 4,
    headline: "Effort score dropped Lv 3 → Lv 1 over 4 weeks — possible early burnout",
    suggestion:
      "Hi Julia, love that you're still showing up! Noticed your sessions have been feeling lighter lately — everything okay? Happy to adjust the format or just have a quick chat this week.",
    channel: "WhatsApp",
    meta: "Avg effort ↓ Lv 1",
    cta: "Check in",
  },
];

export const GYM = {
  name: "CrossFit Vienna Nord",
  plan: "Pro Plan",
  initials: "CV",
  admin: "Thomas M.",
  adminInitials: "TM",
  address: "Brünner Straße 42, 1210 Wien",
  email: "hallo@crossfit-vienna-nord.at",
  phone: "+43 1 234 5678",
  brandColor: "#ff7403",
  brandColorDark: "#cc5c00",
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
  weekStreak: 9,
  weeklyGoal: 3,
  visitsThisWeek: 2,
  streakFreezes: 1,
  comebackBonusPts: 50,
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
  todayWorkout: {
    level: 3,
    label: "Strong Session",
    activeMinutes: 62,
    checkInPts: 50,
    intensityPts: 100,
  },
};

/** Member-facing referral program — the other half of the Review & Referral Engine. */
export const MEMBER_REFERRAL = {
  points: 500,
  friendPerk: "a free trial week",
  link: "crossfitnord.fitloyalty.io/join?ref=MK-2841",
  friendsJoined: 1,
  pointsEarned: 500,
} as const;

/**
 * Krankenkassen-Bonus: insurers pay members up to ~€400/yr for proven regular
 * training; non-certified studios need an attendance proof (typically 24-36
 * visits/yr) — which is exactly the data FitLoyalty already has.
 */
export const INSURANCE_CERT = {
  year: DEMO_YEAR,
  visitsConfirmed: 47,
  visitsRequired: 24,
  maxBonusEur: 400,
} as const;

export const MEMBER_CHALLENGES: Challenge[] = [
  { id: "c1", emoji: "🔥", title: "Summer Consistency", current: 9, goal: 12, unit: "weeks", endsIn: "3 weeks left" },
  { id: "c2", emoji: "🏃", title: "June Bootcamp", current: 11, goal: 15, unit: "workouts", endsIn: "9 days left" },
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
  { emoji: "🔥", name: "8-Week Streak", earned: true },
  { emoji: "🏋️", name: "100 Workouts", earned: true },
  { emoji: "🌅", name: "Early Bird", earned: true },
  { emoji: "⚡", name: "PR Crusher", earned: true },
  { emoji: "🎯", name: "Goal Hitter", earned: true },
  { emoji: "🏆", name: "Top 10%", earned: false },
  { emoji: "💯", name: "Perfect Month", earned: false },
  { emoji: "🦾", name: "Iron Will", earned: false },
];

export const MEMBER_POINTS_FEED: { id: string; label: string; when: string; points: number }[] = [
  { id: "f1", label: "Morning WOD · QR check-in", when: "Today · 7:12", points: 120 },
  { id: "f2", label: "Week 9 streak bonus", when: "Today · 7:12", points: 200 },
  { id: "f3", label: "Class attended · Eversports", when: "Yesterday", points: 80 },
  { id: "f4", label: "Brought a guest", when: "2 days ago", points: 150 },
  { id: "f5", label: "Comeback bonus · first visit after a quiet week", when: "Monday", points: 50 },
  { id: "f6", label: "Personal record · Deadlift", when: "3 days ago", points: 250 },
];
