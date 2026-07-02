/**
 * Internal-only founder dashboard: unit-economics simulator, real-client
 * tracker, and gates/backlog status. Not part of the client-facing demo —
 * see `app/(internal)/dev/`. All state lives in a single localStorage blob,
 * there is no backend (see `docs/ENGINEERING_READINESS.md`).
 */

export type Tier = "starter" | "growth" | "pro";
export type RealClientStatus = "active" | "at-risk" | "churned";

export const TIER_PRICES: Record<Tier, number> = { starter: 49, growth: 149, pro: 249 };
export const PRO_EXTRA_LOCATION_PRICE = 99;

export const TIER_LABELS: Record<Tier, string> = {
  starter: "Starter (€49)",
  growth: "Growth (€149)",
  pro: "Pro (€249+)",
};

/* ---------- Module 1: unit-economics simulator ---------- */

export interface SimulatorInputs {
  starterCount: number;
  growthCount: number;
  proCount: number;
  /** average extra locations per Pro client, billed at PRO_EXTRA_LOCATION_PRICE each */
  proAvgExtraLocations: number;
  cacPerClient: number;
  monthlyChurnPct: number;
  /** WhatsApp conversations/mo over the 200 fair-use limit, per client */
  whatsappOveragePerClient: number;
  whatsappCostPerConvo: number;
  founderOnboardingHours: number;
  founderHourlyRate: number;
  /** new clients/mo assumption for the 3-year projection */
  newClientsPerMonth: number;
}

export const SIMULATOR_DEFAULTS: SimulatorInputs = {
  starterCount: 0,
  growthCount: 5,
  proCount: 0,
  proAvgExtraLocations: 1,
  cacPerClient: 450,
  monthlyChurnPct: 3,
  whatsappOveragePerClient: 0,
  whatsappCostPerConvo: 0.13,
  founderOnboardingHours: 5,
  founderHourlyRate: 0,
  newClientsPerMonth: 1,
};

export interface SliderRange {
  min: number;
  max: number;
  step: number;
}

export const SIMULATOR_RANGES: Record<keyof SimulatorInputs, SliderRange> = {
  starterCount: { min: 0, max: 500, step: 1 },
  growthCount: { min: 0, max: 500, step: 1 },
  proCount: { min: 0, max: 200, step: 1 },
  proAvgExtraLocations: { min: 0, max: 5, step: 0.5 },
  cacPerClient: { min: 100, max: 1500, step: 10 },
  monthlyChurnPct: { min: 0.5, max: 15, step: 0.5 },
  whatsappOveragePerClient: { min: 0, max: 500, step: 5 },
  whatsappCostPerConvo: { min: 0.1, max: 0.2, step: 0.01 },
  founderOnboardingHours: { min: 0, max: 40, step: 1 },
  founderHourlyRate: { min: 0, max: 100, step: 5 },
  newClientsPerMonth: { min: 0, max: 20, step: 1 },
};

export type PresetKey = "conservative" | "base" | "optimistic";

/** Tier-mix presets from `docs/BOTTLENECKS.md` §"TAM/SAM/SOM" sensitivity table. */
export const SIMULATOR_PRESETS: Record<
  PresetKey,
  { label: string; sub: string; values: Partial<SimulatorInputs> }
> = {
  conservative: {
    label: "Консервативный",
    sub: "30% на Growth, blended ARPU ~€70",
    values: { starterCount: 14, growthCount: 6, proCount: 0, proAvgExtraLocations: 0 },
  },
  base: {
    label: "Базовый",
    sub: "50% на Growth, blended ARPU ~€100",
    values: { starterCount: 10, growthCount: 10, proCount: 0, proAvgExtraLocations: 0 },
  },
  optimistic: {
    label: "Оптимистичный",
    sub: "70% на Growth, blended ARPU ~€135",
    values: { starterCount: 5, growthCount: 14, proCount: 1, proAvgExtraLocations: 1 },
  },
};

export interface UnitEconomicsResult {
  mrrStarter: number;
  mrrGrowth: number;
  mrrPro: number;
  mrr: number;
  arr: number;
  totalClients: number;
  blendedArpu: number;
  proPricePerClient: number;
  lifetimeMonths: number;
  ltvStarter: number;
  ltvGrowth: number;
  ltvPro: number;
  blendedLtv: number;
  blendedLtvCac: number;
  paybackMonths: number;
  effectiveCac: number;
  whatsappOverageCost: number;
  netMarginMonthly: number;
}

export function computeUnitEconomics(inputs: SimulatorInputs): UnitEconomicsResult {
  const mrrStarter = inputs.starterCount * TIER_PRICES.starter;
  const mrrGrowth = inputs.growthCount * TIER_PRICES.growth;
  const proPricePerClient = TIER_PRICES.pro + inputs.proAvgExtraLocations * PRO_EXTRA_LOCATION_PRICE;
  const mrrPro = inputs.proCount * proPricePerClient;
  const mrr = mrrStarter + mrrGrowth + mrrPro;
  const arr = mrr * 12;

  const totalClients = inputs.starterCount + inputs.growthCount + inputs.proCount;
  const blendedArpu = totalClients > 0 ? mrr / totalClients : 0;

  const churnFraction = inputs.monthlyChurnPct / 100;
  const lifetimeMonths = churnFraction > 0 ? 1 / churnFraction : Infinity;

  const ltvStarter = TIER_PRICES.starter * lifetimeMonths;
  const ltvGrowth = TIER_PRICES.growth * lifetimeMonths;
  const ltvPro = proPricePerClient * lifetimeMonths;
  const blendedLtv = blendedArpu * lifetimeMonths;

  const effectiveCac = inputs.cacPerClient + inputs.founderOnboardingHours * inputs.founderHourlyRate;
  const blendedLtvCac = effectiveCac > 0 ? blendedLtv / effectiveCac : 0;
  const paybackMonths = blendedArpu > 0 ? effectiveCac / blendedArpu : 0;

  const whatsappOverageCost = totalClients * inputs.whatsappOveragePerClient * inputs.whatsappCostPerConvo;
  const netMarginMonthly = mrr - whatsappOverageCost;

  return {
    mrrStarter,
    mrrGrowth,
    mrrPro,
    mrr,
    arr,
    totalClients,
    blendedArpu,
    proPricePerClient,
    lifetimeMonths,
    ltvStarter,
    ltvGrowth,
    ltvPro,
    blendedLtv,
    blendedLtvCac,
    paybackMonths,
    effectiveCac,
    whatsappOverageCost,
    netMarginMonthly,
  };
}

export interface ProjectionPoint {
  month: number;
  mrr: number;
  arr: number;
  clients: number;
}

/** Simple linear cohort projection: new clients/mo + surviving base × (1 − churn). */
export function computeProjection(inputs: SimulatorInputs, months = 36): ProjectionPoint[] {
  const { totalClients, blendedArpu } = computeUnitEconomics(inputs);
  const churnFraction = inputs.monthlyChurnPct / 100;

  const points: ProjectionPoint[] = [{ month: 0, mrr: totalClients * blendedArpu, arr: totalClients * blendedArpu * 12, clients: totalClients }];
  let clients = totalClients;
  for (let m = 1; m <= months; m++) {
    clients = clients * (1 - churnFraction) + inputs.newClientsPerMonth;
    const mrr = clients * blendedArpu;
    points.push({ month: m, mrr, arr: mrr * 12, clients });
  }
  return points;
}

export interface YearEndSummary {
  year: number;
  mrr: number;
  arr: number;
}

export function projectionYearEndSummary(points: ProjectionPoint[]): YearEndSummary[] {
  return [12, 24, 36]
    .map((month) => points.find((p) => p.month === month))
    .filter((p): p is ProjectionPoint => Boolean(p))
    .map((p) => ({ year: p.month / 12, mrr: p.mrr, arr: p.arr }));
}

/* ---------- Module 2: real-client tracker ---------- */

export interface RealClient {
  id: string;
  name: string;
  tier: Tier;
  signedDate: string;
  lastActiveDate: string;
  status: RealClientStatus;
  onboardingHours: number;
  note: string;
}

export function computeRealMrr(clients: RealClient[]): number {
  return clients
    .filter((c) => c.status !== "churned")
    .reduce((sum, c) => sum + TIER_PRICES[c.tier], 0);
}

export type MetricsPeriod = "30" | "90" | "365" | "all";

export const METRICS_PERIODS: { value: MetricsPeriod; label: string }[] = [
  { value: "30", label: "30 дней" },
  { value: "90", label: "90 дней" },
  { value: "365", label: "12 месяцев" },
  { value: "all", label: "Всё время" },
];

export function computeRealChurnRate(clients: RealClient[], period: MetricsPeriod): number {
  const cutoffDays = period === "all" ? Infinity : Number(period);
  const now = Date.now();
  const inPeriod = clients.filter((c) => {
    if (!Number.isFinite(cutoffDays)) return true;
    const days = (now - new Date(c.signedDate).getTime()) / (1000 * 60 * 60 * 24);
    return days <= cutoffDays;
  });
  if (inPeriod.length === 0) return 0;
  const churned = inPeriod.filter((c) => c.status === "churned").length;
  return (churned / inPeriod.length) * 100;
}

export function computeAvgOnboardingHours(clients: RealClient[]): number {
  if (clients.length === 0) return 0;
  return clients.reduce((sum, c) => sum + c.onboardingHours, 0) / clients.length;
}

export function daysSinceLastActive(lastActiveDate: string): number {
  return Math.floor((Date.now() - new Date(lastActiveDate).getTime()) / (1000 * 60 * 60 * 24));
}

/** Row highlight tier for the "not active >14 days" churn-risk proxy. */
export function lastActiveRisk(lastActiveDate: string): "none" | "warning" | "error" {
  const days = daysSinceLastActive(lastActiveDate);
  if (days >= 30) return "error";
  if (days >= 14) return "warning";
  return "none";
}

/* ---------- Module 3: gates & backlog (static, updated by hand) ---------- */

export interface GateItemStatus {
  id: string;
  label: string;
  done: boolean;
}

export interface GateLevel {
  id: string;
  title: string;
  trigger: string;
  items: GateItemStatus[];
}

/** Mirrors `docs/ENGINEERING_READINESS.md` — update by hand when that file changes. */
export const ENGINEERING_GATES: GateLevel[] = [
  {
    id: "level-0",
    title: "Уровень 0 — сделать сейчас",
    trigger: "Уже активен: холодный аутрич по email/Instagram идёт",
    items: [
      { id: "l0-ci", label: "Минимальный CI (lint → typecheck → test → build на push/PR)", done: true },
      { id: "l0-tests", label: "1–2 unit-теста на lib/churn-check.ts (Vitest, 17 тестов)", done: true },
      { id: "l0-vercel", label: "Подтвердить стабильность Vercel-деплоя", done: false },
    ],
  },
  {
    id: "level-1",
    title: "Уровень 1 — гейт: первый реальный design-партнёр",
    trigger: "Первая студия даёт реальные CSV/данные вместо mock, или начинается работа над бэкендом",
    items: [
      { id: "l1-e2e", label: "Playwright e2e smoke на 2–3 ключевых демо-флоу", done: false },
      { id: "l1-auth", label: "middleware.ts / auth (см. AUDIT.md №6)", done: false },
      { id: "l1-env", label: "Разделение env: staging vs prod", done: false },
      { id: "l1-monitoring", label: "Error monitoring (Sentry или аналог)", done: false },
    ],
  },
  {
    id: "level-2",
    title: "Уровень 2 — гейт: PMF + рост команды",
    trigger: "Второй разработчик/агент в репо параллельно, или первые платящие клиенты сверх design-партнёров",
    items: [
      { id: "l2-hooks", label: "Pre-commit hooks (husky + lint-staged)", done: false },
      { id: "l2-ci-gates", label: "Полноценные CI-гейты (blocking checks, обязательный review)", done: false },
      { id: "l2-coverage", label: "Тестовое покрытие: биллинг, data layer, white-label theming", done: false },
      { id: "l2-staged-deploy", label: "Staged deployment pipeline (staging → prod)", done: false },
    ],
  },
];

export interface BacklogAction {
  id: string;
  priority: "critical" | "important";
  label: string;
  why: string;
}

/** Mirrors "Топ-5 действий" from `docs/BOTTLENECKS.md`. Checked state persists in localStorage. */
export const BOTTLENECK_ACTIONS: BacklogAction[] = [
  {
    id: "bn-1",
    priority: "critical",
    label: "Валидировать Payout-Checker через 5–10 разговоров с реальными студиями до полного build",
    why: "Killer-feature может быть нулём или золотом — нужно знать до инвестиции времени",
  },
  {
    id: "bn-2",
    priority: "critical",
    label: "Добавить confidence score к churn-алертам, поднять Explainable Alerts из бэклога в дефолт",
    why: "Защита от потери доверия при первом renewal — критично для unit-экономики",
  },
  {
    id: "bn-3",
    priority: "critical",
    label: "Проверить USC-партнёрский договор у юриста до питча USC Converter",
    why: "Блокирующий риск для целого продуктового контура",
  },
  {
    id: "bn-4",
    priority: "important",
    label: "Сделать upgrade Starter→Growth явным value-событием, не тихим биллингом",
    why: "Особенно критично для первых 10 design-партнёров, на них строятся кейс-стади",
  },
  {
    id: "bn-5",
    priority: "important",
    label: "Определить день-X, когда новая студия видит первый meaningful alert",
    why: "SMB churn происходит в первые 30 дней, если ценность не видна",
  },
];

/** Mirrors `docs/MARKET_RESEARCH.md` §15 — a subset of the open questions, read-only. */
export const OPEN_RESEARCH_QUESTIONS: string[] = [
  "Реальная частота расхождений в выплатах USC/myClubs (→ валидация Payout-Checker)",
  "Формат выплатных отчётов USC/Wellpass/Hansefit/myClubs (CSV? PDF? портал?)",
  "USC Abwerbeverbot — точный текст клаузулы в партнёрском договоре",
  "Юридика Stilllegung/Ruhezeit DE/AT (→ Pause statt Kündigung)",
  "Типичный adoption rate branded fitness PWA в бутик-сегменте",
  "Когда в течение дня владелец-оператор принимает операционные решения?",
];

/* ---------- Storage ---------- */

export interface DevDashboardData {
  simulator: SimulatorInputs;
  clients: RealClient[];
  checklist: Record<string, boolean>;
}

export const DEV_DASHBOARD_STORAGE_KEY = "fitloyalty-dev-dashboard-v1";
export const DEV_DASHBOARD_CHANGED_EVENT = "fitloyalty:dev-dashboard-changed";

export const DEV_DASHBOARD_DEFAULTS: DevDashboardData = {
  simulator: SIMULATOR_DEFAULTS,
  clients: [],
  checklist: {},
};

// useSyncExternalStore requires getSnapshot to return a referentially stable
// result when nothing changed, or React treats every read as a fresh commit
// and errors out ("getSnapshot should be cached"). Cache by raw string so
// re-parsing only happens when localStorage actually changed.
let cachedRaw: string | null = null;
let cachedData: DevDashboardData = DEV_DASHBOARD_DEFAULTS;

export function readDevDashboardData(): DevDashboardData {
  if (typeof window === "undefined") return DEV_DASHBOARD_DEFAULTS;
  const raw = window.localStorage.getItem(DEV_DASHBOARD_STORAGE_KEY);
  if (raw === cachedRaw) return cachedData;
  cachedRaw = raw;
  if (!raw) {
    cachedData = DEV_DASHBOARD_DEFAULTS;
    return cachedData;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<DevDashboardData>;
    cachedData = {
      simulator: { ...SIMULATOR_DEFAULTS, ...parsed.simulator },
      clients: parsed.clients ?? [],
      checklist: parsed.checklist ?? {},
    };
  } catch {
    cachedData = DEV_DASHBOARD_DEFAULTS;
  }
  return cachedData;
}

export function writeDevDashboardData(data: DevDashboardData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEV_DASHBOARD_STORAGE_KEY, JSON.stringify(data));
}
