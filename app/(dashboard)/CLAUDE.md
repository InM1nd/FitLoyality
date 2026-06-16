# Dashboard — Agent Rules

> Parent rules: @../../CLAUDE.md

## What this is

The gym owner / admin B2B web dashboard. Desktop-first. Access: `/overview`, `/briefing`,
`/members`, `/rewards`, `/analytics`, `/settings`, `/engage`, `/journeys`.

Route group: `app/(dashboard)/` — shares `layout.tsx` → `Shell` component.

## Layout

```
Shell (server)
├── DemoBanner      — top strip ("Demo mode — all data is simulated")
├── Sidebar         — fixed left w-60, hidden mobile
│   ├── Logo
│   ├── Nav         — active: accent-subtle bg + brand text + 3px left border
│   └── Gym card    — bottom, GYM.name + plan badge
└── div.md:pl-60
    ├── Header      — sticky h-[60px], breadcrumb, search (CommandDialog), notifications,
    │                 ThemeToggle, LocaleToggle (EN/DE), Avatar dropdown
    └── main        — max-w-[1280px] px-5 py-6 md:px-8
        └── <PageHeading title="..." description="..." />
            content
```

## Page heading pattern

```tsx
// Every dashboard page starts with:
<PageHeading
  title={t("pageTitle")}
  description={t("pageDesc")}
/>
```

## B2B design principles

- **Saved Revenue is the hero metric** — `KPIS.savedRevenue` → format with `formatEUR()`
- **Morning Briefing** is the daily action list — max 5 items, ranked by urgency
- **Churn Window** = inactive 14+ days AND Kündigungsfrist deadline approaching
  - "Last Chance" badge fires at ≤7 days to notice deadline
  - Show `noticeDeadlineDays` prominently
- Every action (nudge, celebrate, convert, review) triggers a toast confirmation

## Data in this area

All page data comes from `@/lib/data`:
```ts
import { MEMBERS, KPIS, REWARDS, COHORTS, AGGREGATORS,
         PAYOUT_AUDIT, CONVERSION_CANDIDATES, BRIEFING_ACTIONS } from "@/lib/data";
```

## i18n

Dashboard chrome uses `useT("nav")`. Page content uses page-specific namespaces
defined in `lib/i18n/dictionaries.ts`. Demo banner: `useT("demo")`.

## Guided tour

`components/shared/demo-tour.tsx` — driver.js v1.4. 5 steps anchored to `data-tour="..."` attributes.
Auto-starts once (localStorage `fitloyalty-tour-seen`), restart via DemoBanner "Tour" button.
When adding new important UI elements, consider adding a `data-tour` anchor.

## Key components

| Component | Location | Notes |
|-----------|----------|-------|
| `KpiCards` | `components/overview/` | 4 KPI tiles, hero = Saved Revenue |
| `AtRiskPanel` | `components/overview/` | Churn Window list with nudge buttons |
| `AggregatorHub` | `components/overview/` | Revenue mix + payout audit + USC converter |
| `BriefingList` | `components/briefing/` | Daily action list with NudgeModal |
| `MembersTable` | `components/members/` | Sortable, filterable, URL-synced |
| `MemberSidePanel` | `components/members/` | Slide-in detail for a selected member |
| `EngageView` | `components/engage/` | Google review engine + referral leaderboard |

## NudgeModal

`components/shared/nudge-modal.tsx` — used from BriefingList (save-type actions).
Uses `useT("briefing")`. Seeded with a default message per member (key-remount pattern).
Toast on send: `t("nudgeToastTitle", { name: first })`.
