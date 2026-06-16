# FitLoyalty — Agent Rules

> Full product context: @.claude/CLAUDE.md
> Wearable strategy: @docs/WEARABLE_STRATEGY.md
> Feature backlog: @docs/IDEAS.md

---

## Quick Checks (before every task)

- Does this component render in the **dashboard**, **landing**, or **member app**? Each has a different design system scope.
- Is this a new string visible to the user? → i18n key required (EN + DE).
- Does this component use hooks, browser APIs, or event listeners? → `"use client"`. Otherwise leave it as a server component.
- Is this data mock/demo? → import from `@/lib/data`, never directly from `@/lib/mock-data`.

---

## Design Rules

### Colors — dashboard & member app

Use **semantic Tailwind tokens only**. Never hardcode hex in JSX for dashboard/member components.

| Token | Usage |
|-------|-------|
| `bg-background` | Page background |
| `bg-surface-1/2/3` | Card layers (1=card, 2=hover, 3=input) |
| `bg-primary` / `text-brand` | Accent — #ff7403 (orange) |
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary text |
| `text-faint` | Tertiary / labels |
| `border-border` | Default borders |
| `text-success` / `text-warning` / `text-error` | Semantic states |
| `bg-[var(--info)]` / `text-[var(--info)]` | Sky blue — #93dafe (sync, data badges) |

### Colors — landing components

Landing has its own scope (`.landing` class). Use CSS vars:

```tsx
// ✅ Correct in landing components
className="t-ink"         // #1a1a1a
className="t-mut"         // #6b6b6b
className="t-faint"       // #9a9a9a
className="t-lime"        // #ff7403
className="bg-paper2"     // hover surface
// Hex literals are acceptable ONLY in landing when matching design tokens 1:1
// e.g. bg-[#f5f2ec] = --paper, bg-[#1a1a1a] = --ink
```

### Typography

```tsx
// Display headings
<h2 className="font-display text-4xl font-semibold tracking-tight">

// Mono labels (eyebrows, tags, numbers)
<span className="mono-label">02 — Capabilities</span>

// Tabular numbers
<span className="num text-2xl font-bold">2,840</span>

// Body: no class needed (Satoshi 400 is the base)
```

### Component patterns

**Card:** `<Card className="p-4">` — always use the Card primitive, never custom div with border.

**Section heading in dashboard:**
```tsx
<PageHeading title="..." description="..." />
```

**Section heading on landing:**
```tsx
<span className="mono-label t-faint">02 — Capabilities</span>
<h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
```

**Scroll reveal on landing:** wrap sections in `<Reveal>` or `<Reveal delay={0.05}>`.

**Avatar:** use `<Avatar initials="MK" grad={1} />` — never initials via custom div.

**Toast:** always `toast.success(t("key"))` or `toast(t("key"))` — never hardcoded English strings in toasts.

### What NOT to do

```tsx
// ❌ Hardcoded colors in dashboard/member components
<div style={{ color: "#ff7403" }} />
<p className="text-[#1a1a1a]" />

// ❌ Custom div instead of Card
<div className="rounded-lg border p-4 bg-white" />

// ❌ Raw hex in dashboard when a token exists
<span className="text-[#22c55e]" />   // use text-success
<span className="text-[#93dafe]" />   // use text-[var(--info)]
```

---

## Architecture Rules

### Server vs Client

```tsx
// "use client" REQUIRED when:
// - useState, useEffect, useRef, useCallback, useMemo
// - usePathname, useRouter, useSearchParams
// - motion/react (Framer Motion) components
// - event listeners (onClick on interactive elements is fine in server but
//   complex handlers need client)
// - browser APIs: window, document, localStorage, clipboard

// "use client" NOT needed for:
// - Static/display-only components
// - Components that only receive props and render JSX
// - Layout wrappers without state
```

### Data layer

```tsx
// ✅ Always
import { MEMBER_ME, MEMBERS, KPIS } from "@/lib/data";

// ❌ Never
import { MEMBER_ME } from "@/lib/mock-data";
```

`lib/data.ts` is the single import point. When adding new mock data:
1. Define in `lib/mock-data.ts`
2. Re-export from `lib/data.ts`
3. Import in components from `@/lib/data`

### Types

- No `any`, no implicit any. Every prop has an explicit interface.
- New shared types go in `lib/types.ts`.
- Inline types (one-off, not shared) are fine in the component file.
- Use `type` not `interface` for union types; use `interface` for object shapes.

### Path aliases

```tsx
// ✅ Always use @/ alias
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

// ❌ Never use relative paths for cross-directory imports
import { Card } from "../../components/ui/card";
```

### File placement

| What | Where |
|------|-------|
| Shared utility functions | `lib/utils.ts` |
| Types/interfaces | `lib/types.ts` |
| Mock/demo data | `lib/mock-data.ts` (define) + `lib/data.ts` (export) |
| Reusable hooks | `hooks/use-*.ts` |
| Landing sections | `components/landing/` |
| Dashboard feature components | `components/{feature}/` |
| Member app components | `components/member/` |
| Shared across dashboard+member | `components/shared/` |
| shadcn/ui primitives | `components/ui/` — edit carefully, these are the design system base |

---

## i18n Rules

### Every visible string needs a translation key

```tsx
// ✅
const t = useT("memberHome");
<p>{t("weekStreak")}</p>

// ❌ Hardcoded English in JSX
<p>Week streak</p>
```

### Adding new keys

Always add to **both** `en` and `de` sections in `lib/i18n/dictionaries.ts`. Place the key in the appropriate namespace:

| Namespace | Used in |
|-----------|---------|
| `hero` | LandingHero |
| `capabilities` | LandingCapabilities |
| `howItWorks` | LandingHowItWorks |
| `phoneGallery` | PhoneGallery |
| `briefing` | Briefing page + NudgeModal |
| `memberHome` | All 4 member app pages |
| `demo` | DemoBanner + guided tour |
| `common` | Shared across nav/CTA |

### Interpolation syntax

```tsx
// Dictionary: "welcomeBack": "Welcome back, {name}!"
t("welcomeBack", { name: firstName })

// ✅ All interpolation values must be strings
t("profWeeks", { n: String(MEMBER_ME.weekStreak) })

// ❌ Passing numbers directly
t("profWeeks", { n: MEMBER_ME.weekStreak })
```

### What does NOT need translation

- Proper nouns: Apple Watch, Fitbit, Garmin, USC, Wellpass, Eversports
- Brand names in mock data: "CrossFit Vienna Nord", "Markus Köhler"
- Mock content strings: challenge titles, points feed labels, review quotes
- Numbers and currency values (format via `formatNumber()` / `formatEUR()`)

---

## Product / Domain Rules

### The wearable concept

- **Check-in (QR/GPS) is always required.** Wearable is a *verifier on top*, not a replacement.
- **Base 50 pts** for every check-in, regardless of wearable status. Wearable = bonus multiplier.
- **Intensity levels 0–4** map to intensity bonus: 0/50/100/150/200 pts.
- **Never store raw biometrics.** Only store the verified result (level 0–4). DSGVO zero-knowledge position.
- **Supported sources:** Apple HealthKit (iOS), Google Health Connect (Android), Fitbit Web API, Garmin Connect. MVP = HealthKit + Health Connect only.

### The streak mechanic

- Streaks are **week-based**, never day-based. "3 workouts/week" is the goal.
- Loss aversion > points accumulation. "Don't break the streak" is the copy, not "earn more points."
- Always show **streak freezes** alongside the streak counter.
- **Comeback-Bonus** fires on the first visit after a missed week — auto micro-reward.

### B2B pitch (gym owner)

- Every feature must answer "how much money did this make/save?"
- **Saved Revenue** is the hero metric — never downplay it.
- **Kündigungsfrist** (cancellation notice deadline) is the DACH-specific save window — not contract expiry. Keep this in alert copy.
- **Morning Briefing** = daily action list. Max cognitive load for the owner: 5 actions.

### White-labeling

- `GYM.brandColor` and `GYM.brandColorDark` must flow into all member-facing color gradients.
- Never hardcode the gym name — use `GYM.name` or `MEMBER_ME.gymName`.
- Member app URLs follow `{gymSlug}.fitloyalty.io` pattern.

### What NOT to build

- No fitness tracking (reps, sets, raw calorie counting). FitLoyalty is about *attendance and retention*, not workout programming.
- No day-based streaks. Research shows they demotivate gym-goers (gym-goers train 2-3×/week, not daily).
- No direct outreach to aggregator-sourced contact data (USC Abwerbeverbot risk).
