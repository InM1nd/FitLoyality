# lib/ — Agent Rules

> Parent rules: @../CLAUDE.md

## Data layer (the one rule that matters most)

**Components import from `lib/data.ts`, never from `lib/mock-data.ts`.**

```ts
// ✅
import { MEMBERS, KPIS, MEMBER_ME } from "@/lib/data";

// ❌
import { MEMBERS } from "@/lib/mock-data";
```

When adding new mock data:
1. Define the constant/type in `lib/mock-data.ts`
2. Add the type to `lib/types.ts` if it's a shared shape
3. Re-export from `lib/data.ts` (either named or via getter function)

## lib/mock-data.ts

All demo data lives here. Key exports:
- `MEMBERS` — 12 mock gym members with status, source, churn reasons
- `KPIS` — saved revenue, retention, aggregator data
- `MEMBER_ME` — the logged-in member (Markus Köhler, Apple Watch, Level 3 workout today)
- `GYM` — gym name, brand colors, logo (white-label source of truth)
- `BRIEFING_ACTIONS` — morning briefing action list (save/celebrate/convert/review)
- `MEMBER_CHALLENGES`, `MEMBER_BADGES`, `MEMBER_REWARDS`, `MEMBER_POINTS_FEED`
- `OCCUPANCY` — live capacity + tonight's classes
- `INSURANCE_CERT` — Krankenkassen attendance data
- `AGGREGATORS`, `PAYOUT_AUDIT`, `CONVERSION_CANDIDATES`

`MEMBER_ME.todayWorkout` shape: `{ level: 0-4, label: string, activeMinutes: number, checkInPts: number, intensityPts: number }`

## lib/types.ts

TypeScript interfaces. Key types:
- `Member` — gym owner dashboard member row
- `MemberProfile` — logged-in member (MEMBER_ME)
- `MemberSource` — `"direct" | "usc" | "wellpass" | "hansefit" | "myclubs"`
- `BriefingAction`, `BriefingType`
- `DeviceType` — `"Apple Watch" | "Fitbit" | "Garmin"`
- `Reward`, `Challenge`, `Badge`, `PointsFeedItem`

When adding new data shape: add the interface here first, then use it in mock-data.

## lib/i18n/dictionaries.ts

Bilingual dictionary. Rules:
- Add every new key to **both** `en` and `de` objects
- Keys use camelCase, grouped by namespace (no dots)
- Interpolation: `"Welcome {name}"` → `t("key", { name: value })`
- Interpolation values must be strings: `{ n: String(count) }`
- Namespaces: `hero`, `capabilities`, `howItWorks`, `phoneGallery`, `steps`,
  `stats`, `showcase`, `briefing`, `memberHome`, `demo`, `common`, `nav`, `landingNav`

## lib/utils.ts

Utility functions:
- `cn(...classes)` — conditional class merging (clsx + tailwind-merge)
- `formatNumber(n)` — `2840` → `"2,840"`
- `formatEUR(n)` — `138` → `"€138"`

Do not add application logic here. Only pure formatting/string utilities.

## lib/churn-check.ts

CSV parser for the landing Churn-Check feature. Handles:
- `;` and `,` delimiters
- German date format `dd.mm.yyyy`
- Comma decimal separators
- Flags churn-window members (14-29d inactive) and lapsed (30+d)

Do not modify the parsing logic without checking the ChurnCheck component behavior.
