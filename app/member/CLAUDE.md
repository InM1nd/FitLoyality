# Member App — Agent Rules

> Parent rules: @../../CLAUDE.md

## What this is

A white-labeled PWA, mobile-first. Accessed via `{gymSlug}.fitloyalty.io`.
The member (not the gym owner) uses this. Design decisions should feel like
the gym's own app, not a generic SaaS product.

## Layout structure

```
PhoneShell (client)
├── StatusBar      — "9:41" decorative
├── AppHeader      — gym logo + name (from GYM.*), Admin link, Settings
├── main (flex-1 overflow-y-auto)
│   └── page content (px-5 pb-6 pt-1)
└── BottomNav (client)   — Home / Rewards / Activity / Profile
    active: text-brand + drop-shadow glow
```

On desktop: contained in `md:w-[400px] md:h-[820px]` centered card with phone bezel.

## Pages

| Route | Component | i18n namespace |
|-------|-----------|---------------|
| `/member` | MemberHome | `memberHome` |
| `/member/rewards` | MemberRewards | `memberHome` |
| `/member/activity` | MemberActivity | `memberHome` |
| `/member/profile` | MemberProfile | `memberHome` |

All 4 pages use `useT("memberHome")` — one shared namespace.

## Card pattern

```tsx
// Standard member card
<Card className="p-4">
  {/* content */}
</Card>

// Card with divider list
<Card className="divide-y divide-border">
  {items.map((item) => (
    <div key={item.id} className="flex items-center gap-3 p-3.5">
```

## Section heading pattern

```tsx
<h2 className="mb-3 text-sm font-semibold">{t("sectionTitle")}</h2>
```

## White-labeling rules

- `GYM.brandColor` → primary accent (flows into PointsCard gradient)
- `GYM.brandColorDark` → gradient end color
- `GYM.name` → displayed in AppHeader and member greeting
- Never hardcode gym name or brand colors in member app components

## The wearable card (WorkoutTodayCard)

Shown on the Home screen. Data source: `MEMBER_ME.todayWorkout`.
Shows: intensity level badge + active minutes + pts breakdown (check-in + intensity + total).
Wearable sync chip: `MEMBER_ME.device` + `MEMBER_ME.syncedAgo` — always visible.

Points breakdown display format:
```
Check-in              +50 pts
Intensity (Level 3)  +100 pts
─────────────────────────────
Total earned today   +150 pts
```

## Activity page specifics

- Sync source line under title: `<Watch /> Synced from {device} · {ago}`
- Effort breakdown card appears before the heatmap
- Heatmap: 8 weeks × 7 days grid, levels 0-4, `activity` array from `MEMBER_ME`
- Points chart: recharts AreaChart, last 6 months from `MEMBER_ME.pointsHistory`

## Profile page specifics

- Connected device section: `MEMBER_ME.device` + `MEMBER_ME.syncedAgo` + green dot
- Note under device card: "Workout intensity powers your bonus points"
- Krankenkassen-Bonus: `INSURANCE_CERT` data, PDF download toast
- Settings items: toast with `t("profComingSoon", { label: s.label })` — not real nav

## Comeback-Bonus

`ComebackBanner` renders only when `MEMBER_ME.comebackBonusPts > 0`.
Shows above the PointsCard. First-visit-back micro-reward.
