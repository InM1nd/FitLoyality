/* ============================================================
   FitLoyalty — Dummy data (DACH region, EUR, realistic metrics)
   ============================================================ */
window.FL = window.FL || {};

FL.members = [
  { name: "Markus Köhler",    init: "MK", grad: 1, since: "Mar 2021", last: "Today",      wpm: 18, pts: 2840, status: "active",  city: "Wien" },
  { name: "Lena Hofbauer",    init: "LH", grad: 5, since: "Jan 2022", last: "Yesterday",  wpm: 14, pts: 1920, status: "active",  city: "Wien" },
  { name: "Stefan Brunner",   init: "SB", grad: 2, since: "Sep 2020", last: "2 days ago", wpm: 11, pts: 3410, status: "active",  city: "Graz" },
  { name: "Julia Wagner",     init: "JW", grad: 4, since: "Nov 2023", last: "16 days ago",wpm: 3,  pts: 640,  status: "at-risk", city: "Wien" },
  { name: "Florian Mayr",     init: "FM", grad: 3, since: "Feb 2022", last: "21 days ago",wpm: 2,  pts: 910,  status: "at-risk", city: "Linz" },
  { name: "Sophie Gruber",    init: "SG", grad: 5, since: "Jun 2023", last: "Today",      wpm: 16, pts: 2110, status: "active",  city: "Wien" },
  { name: "Daniel Steiner",   init: "DS", grad: 2, since: "Aug 2019", last: "38 days ago",wpm: 0,  pts: 1180, status: "churned", city: "Salzburg" },
  { name: "Anna Pichler",     init: "AP", grad: 4, since: "Apr 2024", last: "3 days ago", wpm: 9,  pts: 720,  status: "active",  city: "Wien" },
  { name: "Tobias Huber",     init: "TH", grad: 3, since: "Oct 2021", last: "19 days ago",wpm: 4,  pts: 1560, status: "at-risk", city: "Innsbruck" },
  { name: "Carina Berger",    init: "CB", grad: 1, since: "Dec 2022", last: "Today",      wpm: 20, pts: 3980, status: "active",  city: "Wien" },
  { name: "Philipp Reiter",   init: "PR", grad: 2, since: "May 2023", last: "Yesterday",  wpm: 12, pts: 1340, status: "active",  city: "Wien" },
  { name: "Nina Eder",        init: "NE", grad: 5, since: "Jul 2022", last: "44 days ago",wpm: 0,  pts: 880,  status: "churned", city: "Wien" },
];

FL.atRisk = FL.members.filter(m => m.status === "at-risk").concat(
  FL.members.filter(m => m.status === "churned")
).slice(0,5);

FL.rewardActivity = [
  { name: "Carina Berger",  init: "CB", grad: 1, reward: "Free Protein Shake",  emoji: "🥤", pts: 200, when: "12 min ago",  status: "redeemed" },
  { name: "Markus Köhler",  init: "MK", grad: 2, reward: "Merch 10% Off",       emoji: "🎽", pts: 500, when: "1 h ago",     status: "redeemed" },
  { name: "Sophie Gruber",  init: "SG", grad: 5, reward: "Guest Day Pass",      emoji: "🎟️", pts: 350, when: "3 h ago",     status: "redeemed" },
  { name: "Philipp Reiter", init: "PR", grad: 3, reward: "Free Protein Shake",  emoji: "🥤", pts: 200, when: "5 h ago",     status: "redeemed" },
  { name: "Lena Hofbauer",  init: "LH", grad: 5, reward: "Birthday Free Month", emoji: "🎂", pts: 0,   when: "Yesterday",   status: "granted"  },
  { name: "Anna Pichler",   init: "AP", grad: 4, reward: "InBody Scan",         emoji: "📊", pts: 600, when: "Yesterday",   status: "redeemed" },
  { name: "Stefan Brunner", init: "SB", grad: 2, reward: "Merch 10% Off",       emoji: "🎽", pts: 500, when: "2 days ago",  status: "redeemed" },
  { name: "Carina Berger",  init: "CB", grad: 1, reward: "PT Session 50% Off",  emoji: "💪", pts: 900, when: "2 days ago",  status: "redeemed" },
];

FL.rewards = [
  { emoji: "🥤", name: "Free Protein Shake", desc: "Redeem at the bar after hitting 20 workouts this month.", trigger: "20 workouts", cost: "200 pts", on: true,  claimed: 142 },
  { emoji: "🎽", name: "Merch 10% Off",      desc: "Discount voucher for the FitLoyalty pro shop.",            trigger: "500 points",  cost: "500 pts", on: true,  claimed: 67 },
  { emoji: "🎂", name: "Birthday Free Month", desc: "One free membership month on the member's birthday.",     trigger: "Birthday",    cost: "Auto",    on: true,  claimed: 23 },
  { emoji: "🎟️", name: "Guest Day Pass",      desc: "Bring a friend for free after a 14-day streak.",          trigger: "14-day streak",cost: "350 pts", on: false, claimed: 31 },
];

// Retention: last 6 months
FL.retentionMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
FL.retentionData = [74.1, 76.8, 75.2, 78.9, 80.3, 81.4];

// Churn by month (seasonal pattern)
FL.churnMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
FL.churnData = [11, 8, 6, 5, 7, 9, 14, 16, 6, 4, 5, 12];

// Cohort retention heatmap: rows = signup cohort, cols = months since
FL.cohorts = [
  { label: "Jan 2026", v: [100, 92, 88, 84, 81, 79] },
  { label: "Feb 2026", v: [100, 90, 85, 82, 78, null] },
  { label: "Mar 2026", v: [100, 94, 89, 86, null, null] },
  { label: "Apr 2026", v: [100, 88, 83, null, null, null] },
  { label: "May 2026", v: [100, 91, null, null, null, null] },
  { label: "Jun 2026", v: [100, null, null, null, null, null] },
];

// Member app — points last 6 months (sparkline)
FL.memberPts = [1640, 1980, 2240, 2110, 2560, 2840];

// Member activity heatmap (8 weeks x 7 days) levels 0-4
FL.memberHeat = (function () {
  const seed = [
    0,2,0,3,1,4,0, 1,3,0,2,4,2,0, 0,1,3,2,0,3,1, 2,0,4,1,3,0,2,
    3,1,0,2,4,1,0, 0,3,2,0,1,4,2, 1,0,3,2,4,0,1, 2,4,1,3,0,2,4
  ];
  return seed;
})();

// Dashboard member detail heatmap (30 days, levels)
FL.detailHeat = [2,0,3,1,4,2,0,1,3,2,0,4,1,3,0,2,4,1,0,3,2,1,4,0,2,3,1,0,2,4];

FL.badges = [
  { emoji: "🔥", name: "14-Day Streak", earned: true },
  { emoji: "🏋️", name: "100 Workouts", earned: true },
  { emoji: "🌅", name: "Early Bird", earned: true },
  { emoji: "⚡", name: "PR Crusher", earned: true },
  { emoji: "🎯", name: "Goal Hitter", earned: true },
  { emoji: "🏆", name: "Top 10%", earned: false },
  { emoji: "💯", name: "Perfect Month", earned: false },
  { emoji: "🦾", name: "Iron Will", earned: false },
];
