# FitLoyalty — Gym Retention Dashboard

A fully interactive demo of **FitLoyalty**, a white-label gym-retention SaaS for independent
fitness studios in the DACH region. This is the **gym owner / admin** dashboard.

> 🎯 All data is simulated — there is no backend, database, or API. Everything is typed,
> hardcoded mock data in `lib/mock-data.ts`.

Built on the existing **FitLoyalty design system** (`design-system/css/tokens.css`,
`design-system/css/components.css`, `design-system/css/dashboard.css`), with the token palette
ported into Tailwind v4 and shadcn/ui primitives adapted to match those tokens — see
**Design system** below.

---

## Tech stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | **Next.js 16** (App Router)                        |
| Language       | TypeScript (strict, no `any`)                     |
| Styling        | Tailwind CSS v4 (`@theme inline` token mapping)   |
| Components     | shadcn/ui-style kit on Radix, adapted to FitLoyalty tokens |
| Charts         | Recharts                                          |
| Icons          | lucide-react                                      |
| Theming        | next-themes (dark default + light toggle)        |
| Forms          | react-hook-form + zod                            |
| Toasts         | sonner                                            |
| Command palette| cmdk                                             |
| Font           | Satoshi (Fontshare CDN) — the design-system typeface |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — `/` redirects to `/overview`.

```bash
npm run build   # production build / type-check
npm run start   # serve the production build
npm run lint    # eslint
```

Requires **Node 18.18+** (developed on Node 22).

---

The app ships **two demo experiences** that share one design system:

### Gym admin dashboard — `app/(dashboard)/` (sidebar + header shell)

| Route        | Highlights                                                                        |
| ------------ | --------------------------------------------------------------------------------- |
| `/overview`  | 4 count-up KPI cards, retention area chart, at-risk list with nudge dialog, recent reward activity table |
| `/members`   | Live search, status tabs, sortable columns, slide-in member panel (activity heatmap, points sparkline, connected device), `?filter=at-risk` URL sync |
| `/rewards`   | Reward cards with on/off switches, "Create Reward" modal with a **live member-app preview** (react-hook-form + zod) |
| `/analytics` | Cohort retention heatmap (red→green interpolation + tooltips), churn bar chart, live ROI calculator |
| `/settings`  | Gym profile form, white-label branding with a reactive phone preview, integrations with connect dialogs |

The **At-Risk Members** KPI card on `/overview` deep-links to `/members?filter=at-risk`.

### Member (client) app — `app/member/` (mobile phone-frame shell)

The branded consumer experience members see on their phone. Rendered inside a phone frame on
desktop and full-screen on mobile, with a bottom tab bar.

| Route               | Highlights                                                                 |
| ------------------- | -------------------------------------------------------------------------- |
| `/member`           | Greeting, streak, animated points card with next-reward progress, synced device, active challenges, recent points feed |
| `/member/rewards`   | Points balance, redeemable rewards (locked vs. affordable), redeem dialog with a QR code |
| `/member/activity`  | 8-week activity heatmap, 6-month points chart, earned/locked badges       |
| `/member/profile`   | Identity, stat cards, connected device, settings list                     |

The admin demo banner has a **"View member app"** link; the member app links back to the admin
view from its header and profile.

---

## Design system

The design tokens live in `app/globals.css`, ported 1:1 from the design handoff
(`design-system/css/tokens.css`). Dark is the default theme; light mode (via next-themes) overrides.

Core palette:

| Token            | Dark        | Light       |
| ---------------- | ----------- | ----------- |
| `--bg`           | `#0a0a0a`   | `#fafaf9`   |
| `--surface-1/2/3`| `#111 / #1a1a1a / #222` | `#fff / #f5f5f4 / #ececeb` |
| `--accent-brand` | `#22c55e`   | `#16a34a`   |
| `--text-1/2/3`   | white / zinc / faint | charcoal / stone / faint |

Tokens are mapped to shadcn-style semantic roles (`--color-card`, `--color-primary`,
`--color-border`, `--color-ring`, …) inside an `@theme inline` block, so the adapted UI kit
consumes them through normal Tailwind utilities (`bg-card`, `text-muted-foreground`,
`border-border`, `bg-primary`, …).

### UI kit (`components/ui/`)

shadcn/ui primitives re-skinned to the FitLoyalty tokens:

`button` · `card` · `input` · `textarea` · `label` · `select` · `badge` · `switch` ·
`dialog` · `sheet` · `table` · `tabs` · `popover` · `dropdown-menu` · `command` · `tooltip` ·
`progress` · `scroll-area` · `avatar` (with the 5-gradient palette) · `skeleton` · `sonner`

---

## Project structure

```
app/
  layout.tsx              # providers only (theme + tooltip + toaster)
  page.tsx                # redirect → /overview
  globals.css             # design tokens + Tailwind v4 theme mapping
  (dashboard)/            # gym-admin route group (sidebar + header shell)
    layout.tsx
    {overview,members,rewards,analytics,settings}/
      page.tsx · loading.tsx · error.tsx
  member/                 # member (client) app route group (phone-frame shell)
    layout.tsx
    page.tsx              # home
    {rewards,activity,profile}/page.tsx
components/
  layout/                 # sidebar, header, shell, demo-banner, logo, page-heading
  member/                 # phone-shell, bottom-nav, qr-code
  shared/                 # cross-feature components (nudge-modal)
  ui/                     # the adapted shadcn UI kit
  overview/  members/  rewards/  analytics/  settings/
hooks/
  use-count-up.ts         # mount count-up animation (respects reduced-motion)
lib/
  mock-data.ts            # all typed mock constants (admin + member)
  types.ts                # domain types
  member-status.ts        # member status → badge variant mapping
  chart-types.ts          # version-agnostic recharts tooltip types
  utils.ts                # cn(), number/currency formatters

# Design-system handoff kept for reference (ignored by the app & eslint):
design-system/            # css/  js/  screenshots/  FitLoyalty.html
```

---

## Notes

- Fully typed — no `any`.
- Animations respect `prefers-reduced-motion`.
- Mock data is seeded deterministically so SSR and client render identically (no hydration drift).
- This is a front-end demo: forms, toggles, dialogs and the ROI calculator are interactive but
  persist nothing.
