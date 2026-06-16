# FitLoyalty — Project Context for Codex

## What This Is

White-label SaaS **Retention Operating System** for independent boutique
fitness studios and gyms, primarily targeting the DACH region
(Austria, Germany, Switzerland).

## The Core Problem

Independent gym owners lose 20-30% of their revenue annually to **"silent
churn"** — members who stop coming but haven't canceled yet. Currently gym
owners rely on manual work: checking attendance in Excel, sending WhatsApp
messages by hand, hoping trainers remember who hasn't shown up. They use
tools like Eversports or Magicline for operations (booking, billing), but
those tools have **no automated loyalty or retention features**.

Acquiring a new member costs €50-120 in marketing. Retaining an existing one
costs nearly nothing. FitLoyalty closes this gap.

**Second pain (DACH-specific):** many boutique studios are critically
dependent on corporate-fitness aggregators — Urban Sports Club/Wellhub,
EGYM Wellpass, Hansefit — some get up to 99% of bookings via aggregators,
earning only ~€4-8 per visit instead of full membership revenue, juggling
2-3 partner portals with no unified picture. Owners want to maximize
aggregator visit payouts, see their real revenue mix, and convert the few
convertible (self-paying USC) visitors into direct members. No existing
tool addresses any of this.

## The Solution (Elevator Pitch)

> "We tell you exactly who is about to quit before they cancel, and we give
> your members a reason to keep their workout streak alive. Automated care
> for your members, zero manual work for you."

FitLoyalty is **not** a fitness tracker or a replacement for Eversports. It
sits *on top* of existing gym operations, turning attendance into gamified
loyalty for the member and turning silent churn into actionable alerts for
the gym owner.

---

## Two Products in One Platform

### PRODUCT 1 — Gym Owner Dashboard (B2B, web, desktop-first)

The control center for gym owners and trainers.

- **Morning Briefing:** Daily action list — "Maria has her 50th workout today,
  congratulate her" / "Thomas hasn't been here in 14 days, send a nudge"
- **Last Chance Alerts:** Detects the Churn Window (inactive 14+ days AND
  **Kündigungsfrist deadline approaching** — in DACH the cancellation-notice
  deadline, not contract expiry, is the real save window; no US competitor
  understands this). Shows member LTV to emphasize revenue at risk.
- **Saved Revenue counter:** The single hero metric — "nudged in churn window
  → returned within 7 days → +€X MRR saved". Attribution, not vanity
  analytics. This is what justifies the subscription at renewal time.
- **Aggregator Hub (flagship, Growth tier):** Studios are typically plugged
  into 2-3 aggregators at once — the DACH big four (researched 2026-06-10):
  **EGYM Wellpass** (corporate-fitness market leader: ~13,950 partner studios
  end of 2025, 690k+ employees from 21k+ companies, corporate-ONLY),
  **Urban Sports Club/Wellhub** (~10k+ venues DE, the only one with
  self-paying B2C members), **Hansefit** (~8,500 partners, corporate-only).
  **Plus myClubs (added 2026-06-11): the AT/CH aggregator leader — 1,200+
  exclusive partner studios, USC-owned since 2024, payouts ~€10/course-hour
  (under half the normal rate) — must be supported from day one for the
  Austrian beachhead.** Three value loops:
  1. *Share-of-wallet (works on ALL aggregator visitors):* studios earn a
     per-visit payout (~€4-8) from every aggregator. Streaks/gamification
     make aggregator members pick THIS studio more often → more payouts
     without converting anyone. The mass-market loop.
  2. *Revenue-mix visibility:* owners juggle 3 aggregator portals and never
     see the whole picture. One dashboard: direct members vs USC vs Wellpass
     vs Hansefit — visits, payouts, trends per source.
  3. *Conversion (USC self-payers only):* Wellpass/Hansefit visitors are
     employer-paid by definition — zero conversion potential. Frequent
     self-paying USC visitors get personalized direct-membership offers.
     Realistic yield: 1-3 conversions per campaign, each +€80-150 MRR.
- **Review & Referral Engine:** Auto-ask happy members (after a milestone:
  50th visit, badge earned) for a Google review; automated
  "Mitglieder werben Mitglieder" referral program with reward tracking.
  Industry data: referrals convert ~41% vs 1-3% for paid social; referred
  members churn ~60% less; automated review asks add ~1 review/day.
- **Onboarding Autopilot (first 90 days):** Most gym churn happens in the
  first 3 months. Automated new-member journey: welcome → first-week
  check-in → "3rd visit" celebration → 30/60/90-day milestones. The studio
  configures it once; staff shortage (the #1 problem of DACH individual
  studios in 2025) means nobody has time to do this manually. Science
  backing (2026-06-12): gym habits take *months* to form (PNAS 2023 ML
  study) and ~6-7 weeks of streak is the lock-in threshold (Duolingo:
  7-day streak = 3.6× completion) — the autopilot's job is to carry every
  new member past that threshold.
- **Win-back campaigns:** Ex-members with expired contracts are a warm,
  GDPR-reachable list (existing-customer relationship). "Come back" offer
  automation with redemption tracking.
- **Consent Manager (built-in compliance):** Member app onboarding collects
  documented opt-ins (WhatsApp marketing consent per §7 UWG, double opt-in,
  timestamped). Owners fear Abmahnungen — "DSGVO-konform out of the box"
  is itself a selling point in DACH.
- **Reward & Challenge Builder:** Create automated campaigns (e.g., "July
  Bootcamp: 15 workouts") with zero manual tracking.
- **Retention Analytics:** Retention rate, churn trends, cohort heatmaps, ROI
  calculator.
- **Member Management:** Searchable table with activity heatmaps, points
  history, at-risk detection, one-click nudge.
- **White-label Settings:** Gym logo, colors, member app domain.
- **Integration Management:** Eversports (priority), CSV import, QR config;
  later Magicline, Apple Health, Google Fit.

### PRODUCT 2 — Member App (B2C, PWA, mobile-first)

A white-labeled app accessed via gym-specific URL
(`crossfitvienna.fitloyalty.io`). No App Store download required.

- **Weekly Streaks over Points:** Core currency is consistency (loss
  aversion), but **week-based, not day-based** — gym-goers train 2-3x/week,
  so daily streaks break naturally and demotivate. "🔥 6 weeks in a row at
  3+ workouts. Don't break the chain this week!" Include a Duolingo-style
  streak freeze (earned or one per month) to soften unavoidable breaks.
  **Science-based design rules (added 2026-06-12, see MARKET_RESEARCH §16):**
  (1) give new members 1-2 streak freezes upfront at onboarding, not earned
  (Duolingo's biggest experiment win; freeze = +10% long-term retention);
  (2) **Comeback-Bonus** — auto micro-reward for the first visit after a
  missed week — the single best intervention in the Milkman/Duckworth
  megastudy (Nature 2021, 61k gym members, beat all 53 alternatives);
  (3) concentrate rewards on new + returning members — once the habit is
  formed (takes months, PNAS 2023), rewards barely move behavior.
- **Live Occupancy ("Wie voll ist es?"):** Shows current/typical gym
  busyness derived from check-in data. Big chains (FitX, RSG Group) have
  this; budget chains (Fitinn) and ALL boutique software do not. This is the
  #1 reason members open the app daily → drives app adoption → drives
  check-in data quality → makes churn detection accurate. MVP: "typical
  hours" histogram from historical check-ins; live count once check-out or
  visit-duration estimation exists. **Class-based studios (core client,
  insight 2026-06-11): occupancy = class fullness** ("tonight 18:00
  Vinyasa — 12/14 booked") derived from schedules + bookings — and
  schedules are exactly what the official Eversports Provider API DOES
  expose (€50/mo). So the flagship B2C feature does NOT depend on QR
  discipline for the core segment; QR-based floor occupancy only matters
  for open-gym studios.
- **QR Check-in:** Fallback data source for studios without management
  software. Members scan gym QR at entrance to log visit and maintain streak.
- **Social & Contextual Badges:** Earned through specific behaviors —
  "Early Bird" (6 AM workouts), "Heavyweight" (100 visits).
- **Reward Redemption:** Show generated QR/barcode to staff to claim physical
  reward (protein shake, merch discount).
- **Points Balance, Challenges, Leaderboards.**

---

## Business Model

- SaaS subscription for gym owners (**pricing model v2, approved
  2026-06-12** — price points unchanged, structure member-gated):
  - **Starter (€49/mo, up to 150 members):** Member app (streaks, badges,
    occupancy), QR check-in, churn alerts, Saved Revenue counter. Payout
    discrepancies are *visible* but claim-list export is locked (the
    honest upsell: found money pays for the upgrade in month one).
  - **Growth (€149/mo, up to 500 members):** + Aggregator Hub incl. payout
    audit export, USC Converter, WhatsApp nudges (200 conversations/mo
    included, then ~€0.15 pass-through), Review & Referral Engine,
    Eversports integration
  - **Pro (€249/mo, first location, +€99/additional location, unlimited
    members):** + multi-location, API access, full white-label domain
  - Member gating is the core economics lever: Starter-only customers have
    ~9-10-month CAC payback (broken); gating lands both primary personas
    (180 / 240 members) on Growth by size. Full math: MARKET_RESEARCH §11.
- White-label: each gym gets a branded subdomain (crossfitvienna.fitloyalty.io)
- Member app is free for gym members — gyms pay for the platform
- **Lead magnet / sales wedge:** free "Churn-Check" — owner uploads an
  attendance export (Eversports/Magicline CSV), gets an instant report:
  "€X MRR currently at risk, these 12 members are in the churn window."
  Five minutes to wow, no commitment, German-language. Converts to trial.
  **Strongest form (idea 2026-06-11): client-side CSV parsing — "your
  data never leaves your browser, DSGVO-safe by design"** — removes the
  German owner's main objection (handing member data to an unknown SaaS).
- **Pricing mechanics (added 2026-06-11, finalized 2026-06-12):** annual
  billing (~2 months free) — critical churn reducer for SMB SaaS; public
  **"Founding 10 Studios"** offer on the pricing page (50% forever +
  roadmap influence, hard-capped at 10); **WhatsApp fair-use settled:**
  200 marketing conversations/mo in Growth, then ~€0.15/conversation
  pass-through (DE cost ~€0.11-0.14; 300 nudges/mo would eat 25-30% of
  the Growth price unmetered). Do NOT raise the €149 price before public
  case studies exist and the Eversports Branded App price is known
  (MARKET_RESEARCH §15) — current value-to-price is 4-5×, headroom to
  €179 later.

---

## Target Customer

Independent fitness studios: CrossFit boxes, yoga studios, boxing gyms,
bouldering halls, EMS and boutique fitness studios. **NOT large chains**
(they have enterprise software).

Typical customer: owner-operated studio, **100-500 members**, sitting on
**Eversports, fitogram — or nothing at all (Excel + WhatsApp)**.
Often partially or heavily dependent on Urban Sports Club.
(**bsport customers deprioritized 2026-06-11:** bsport ships its own
branded app + marketing automation + AI churn-risk — treat like Magicline
customers; serve them only inbound, wedge = Aggregator Hub + streaks +
DACH mechanics.)

**Explicitly NOT targeting Magicline customers:** Magicline is building
retention natively (loyalty program in Advanced tier, MagicAI Engage in
pilot) — its customers will get this for free within a year. Don't burn
sales effort there, and don't build the business on a Magicline integration.

**Beachhead market: Austria** — home turf of Eversports, lower Magicline
penetration, founder is in Vienna.

---

## Competitive Landscape (researched 2026-06-10)

| Player | Segment | Retention features | Gap we exploit |
|--------|---------|-------------------|----------------|
| **Magicline / Sport Alliance** (~10k customers) | Chains + mid/large studios (McFIT, clever fit) | Loyalty program (Advanced tier); **MagicAI Engage** in pilot: ML churn prediction, lifecycle triggers, WhatsApp/SMS/push | No member-facing gamification, no streaks, no white-label member app; built for chains; requires Magicline |
| **Eversports Manager** (~4k customers) | Boutique: yoga, pilates, dance — our exact audience | Email automation, segments, discount codes; **Branded App since Q1 2025** (paid extension, booking-only: schedule/passes, hosted in studio's own Apple/Google dev accounts) | **No churn prediction, no gamification/streaks, no retention layer — pitch "booking-app ≠ retention-app"** (corrected 2026-06-11: "no branded app" is no longer true) |
| **bsport** (~2k studios, FR/UK → EU; added 2026-06-11) | Boutique studios — our exact segment | Branded app, marketing automation (email/SMS/push on attendance behavior), **built-in AI churn-risk** | Partially served natively — **deprioritize like Magicline customers**; no gamification, no aggregator economics, no DACH mechanics |
| **Keepme** | Enterprise / multisite, 16 countries | AI churn score (Keepme Score), AI sales agents | English-first, enterprise pricing & sales cycle; a 150-member studio is never their customer |
| **Wodify** | CrossFit niche | Built-in gamification | US-centric, expensive, no DACH localization |
| **Aggregators: USC/Wellhub, EGYM Wellpass, Hansefit** | Not competitors — market infrastructure | — | Create the dependency pain our Aggregator Hub solves |

**Positioning:** Don't pitch "AI churn prediction" head-on — MagicAI Engage
wins that framing. Pitch: **white-label loyalty app for members + measurable
revenue recovery (saved members + converted USC visitors + referrals) for
studios too small for Magicline and too poor for Keepme.**

> "Eversports runs your bookings. We bring your revenue back."

Secondary sales angle: **staff shortage** is the #1 reported problem of
owner-operated DACH studios (2025) — pitch retention automation as "the
team member you can't hire": automated care for members with zero added
headcount.

---

## Risks & Open Questions (researched 2026-06-10)

**Legal / compliance:**
- **USC Converter — verify the USC partner contract before building.**
  Non-solicitation (Abwerbeverbot) clauses are likely but not publicly
  documented. Safe design: the USC visitor *voluntarily* joins the studio's
  member app (direct GDPR consent to the studio), offers shown in-app —
  never unsolicited outreach to USC-sourced contact data.
- **WhatsApp nudges require explicit documented opt-in** (§7 Abs. 2 UWG +
  DSGVO): double opt-in, timestamped, via a certified WhatsApp BSP, with an
  AVV. The existing-customer exception covers email, not messengers. Collect
  consent in member-app onboarding (see Consent Manager feature).
- **Roles:** studio = data controller, FitLoyalty = processor → we need an
  AVV template with every studio, EU hosting, and a clean subprocessor list.
- Attendance data is not Art. 9 special-category data, but keep the
  zero-knowledge stance (no biometrics/health values) to stay clearly out.

**Platform / dependency:**
- Eversports Provider API has no attendance data (see Data Strategy) —
  and Eversports could build loyalty itself someday. Mitigation: own QR
  check-in layer + member-app relationship is the part they can't take away;
  multi-source ingestion (CSV works with any software).
- Magicline MagicAI Engage (known, see Competitive Landscape).

**Data quality:**
- Eversports attendance ticking is optional → no-show noise in CSV imports.
  Fallback signal: "booked + not cancelled ≈ attended". Studios that adopt
  FitLoyalty have a new incentive to tick consistently — accuracy of their
  own churn alerts.
- **No-shows are a signal, not just noise (insight 2026-06-11):**
  "booked + didn't come" repeated 2-3× is the *earliest* churn predictor —
  motivation fading while intent still exists. Deserves its own
  "Booking-Ghost" alert type in the Churn Window panel, firing weeks
  before the 14-day inactivity trigger.

**GTM / business:**
- SMB SaaS churn: studios themselves churn fast if value isn't visible —
  the Saved Revenue counter must be honest (control-group or
  conservative attribution), or trust dies at first renewal.
- Support load: hundreds of small accounts at €49-149 need self-serve
  onboarding, not white-glove. The Churn-Check funnel must run unattended.
- Seasonality: January cohorts inflate, summer deflates — dashboards should
  compare year-over-year, not month-over-month, or owners misread trends.

---

## Data Strategy & Integration Roadmap

### How check-in actually works today (researched 2026-06-10)
- **Class-based studios (our core client): no cards, no turnstiles.** Member
  books a class in Eversports → trainer/front desk ticks attendance in the
  participant list. Attendance ticking is optional → booking data has
  no-show noise; "booked + not cancelled ≈ attended" is the fallback signal.
- **USC visitors already scan a QR code** (mandatory since 2023, GPS-verified
  since Dec 2025). The "arrive → scan QR at reception" gesture is already
  trained into the DACH market — our QR flow feels familiar, not new.
- **Consequence:** for class-based studios the member doesn't need to scan
  anything — streaks update from booking/attendance data automatically. The
  member app is pure consumption (streak, badges, occupancy). QR check-in
  covers only open-gym visits and software-less studios.
- **Sales line:** "Your trainers already tick attendance — we turn those
  ticks into retention and revenue. Zero process change."

### Phase 1 — MVP (Current Focus): Attendance Import + QR Check-in
**Primary data source: the attendance data the studio already has.**
- **Reality check (2026-06-10): the Eversports Provider API does NOT expose
  customer, booking, or attendance data** — only activity schedules
  (€50/mo/location, read-only). Automatic attendance sync via official API
  is not possible today. Three paths instead:
  1. **Recurring CSV import** of participant-list exports (export exists in
     Eversports Manager). Weekly granularity is fully sufficient for churn
     detection — the churn window is measured in weeks, not hours.
  2. **BD route:** become an official Eversports "Market" extension partner
     (USC, Wellhub, ClassPass, Workit already have deeper integrations) —
     pursue once we have paying studios as leverage.
  3. **Own check-in layer (QR)** — the only source we fully control; also
     the only source for live occupancy, which CSV can never provide.
- QR check-in as the source for "Excel studios" and as a supplement
  (open-gym visits that don't go through class booking).
- Rationale: churn detection accuracy is the product. If it depends solely
  on members voluntarily double-scanning a QR (they already passed a
  turnstile or booked via Eversports), partial adoption → false alerts →
  owner loses trust after the first wrong "Thomas quit" warning.
- QR mechanism: Member scans gym QR → PWA opens → visit logged → streak
  updated. Occupancy feature gives members a daily reason to open the app,
  which sustains scan discipline.

### Phase 2 — Deeper Operational Integrations
Magicline/Wodify APIs only if customer pull demands it (see Competitive
Landscape — Magicline customers are not the target). USC visit data via
studio-side check-in records.

### Phase 3 — "Life Outside the Box"
Bonus source: Health cloud APIs (Garmin, Oura) + Companion App (Apple HealthKit).
Rewards members for staying active outside the gym.

**Zero-Knowledge Privacy:** We do NOT track raw biometrics, location, or
heart rate. Only `Workout` summaries (e.g., "Run, 45 min, 400 kcal"). All
processing on-device or via secure webhook.

---

## Tech Stack

- **Framework:** Next.js 16 App Router, TypeScript (strict mode, `"@/*": ["./*"]` path alias)
- **Styling:** Tailwind CSS v4, CSS custom properties for design tokens
- **UI:** shadcn/ui component library (heavily customized — see `components/ui/`)
- **Animation:** `motion` package v12 (Framer Motion standalone)
- **Charts:** Recharts v3
- **Forms:** react-hook-form + zod + @hookform/resolvers
- **Toast:** sonner
- **Fonts:** Satoshi (body), Clash Grotesk (display), IBM Plex Mono — all loaded via fontshare CDN `<link>` tag in layout.tsx (NOT next/font)
- **Theme:** next-themes, default dark, class-based

---

## Actual Implemented Design System

### Color Tokens — `app/globals.css`

The tokens exist in two layers: **raw CSS vars** in `:root` / `.dark` and
**Tailwind semantic aliases** in `@theme inline { }`.

#### Landing page (`.landing` class scope, always light)
| CSS var | Value | Usage |
|---------|-------|-------|
| `--paper` | `#f5f2ec` | Page background — warm cream |
| `--paper-2` | `#ede9e1` | Hover, subtle cards |
| `--paper-3` | `#e5e0d4` | Selected states |
| `--ink` | `#1a1a1a` | Primary text |
| `--ink-2` | `#6b6b6b` | Muted text |
| `--ink-3` | `#9a9a9a` | Faint text |
| `--line` | `rgba(26,26,26,0.10)` | Borders |
| `--line-soft` | `rgba(26,26,26,0.05)` | Subtle rules |
| `--acid` | `#1a1a1a` | CTA button background |
| `--lime` | `#ff7403` | **Papaya orange accent** — energy, streaks |
| `--sky` | `#93dafe` | Sky blue — data, notifications, sync |
| `--glow` | `rgba(255,116,3,0.10)` | Soft radial glow |

#### Heat grid ramp (landing + member activity, sky-blue direction)
| CSS var | Value | Description |
|---------|-------|-------------|
| `--h0` | `#0c1a27` | No activity (darkest) |
| `--h1` | `#0e3350` | Low |
| `--h2` | `#1a6090` | Medium |
| `--h3` | `#3d9dbf` | High |
| `--h4` | `#93dafe` | Peak — sky blue glow |

#### Dashboard (`:root` = light, `.dark` = dark mode default)

**Dark mode (default):**
| CSS var | Value |
|---------|-------|
| `--bg` | `#0a0a0a` |
| `--surface-1` | `#111111` |
| `--surface-2` | `#1a1a1a` |
| `--surface-3` | `#222222` |
| `--accent-brand` | `#ff7403` |
| `--accent-hover` | `#e86800` |
| `--accent-press` | `#cc5c00` |
| `--accent-ink` | `#ffffff` |
| `--text-1` | `#ffffff` |
| `--text-2` | `#a1a1aa` |
| `--text-3` | `#52525b` |
| `--info` | `#93dafe` |
| `--success` | `#22c55e` |
| `--warning` | `#f59e0b` |
| `--error` | `#ef4444` |
| `--shadow-glow` | `0 0 20px rgba(255,116,3,0.2)` |

**Light mode:**
| CSS var | Value |
|---------|-------|
| `--bg` | `#f5f2ec` |
| `--surface-1` | `#ffffff` |
| `--surface-2` | `#ede9e1` |
| `--surface-3` | `#e5e0d4` |
| `--accent-brand` | `#ff7403` (same) |
| `--text-1` | `#0a0a0a` |
| `--text-2` | `#57534e` |
| `--text-3` | `#a8a29e` |
| `--info` | `#0d5c82` |
| `--success` | `#16a34a` |

#### Tailwind semantic tokens (via `@theme inline`)
Used in JSX as Tailwind utilities:

| Tailwind class | Maps to |
|----------------|---------|
| `bg-background` / `text-foreground` | `--bg` / `--text-1` |
| `bg-surface-1/2/3` | `--surface-1/2/3` |
| `bg-card` | `--surface-1` |
| `bg-primary` | `--accent-brand` (#ff7403) |
| `text-brand` | `--accent-brand` |
| `text-muted-foreground` | `--text-2` |
| `text-faint` | `--text-3` |
| `border-border` | `--border-subtle` |
| `border-border-strong` | `--border-strong` |
| `text-success` / `text-warning` / `text-error` | semantic colors |
| `ring-ring` | `--accent-brand` |

### Typography

| Font | Usage | Loaded via |
|------|-------|-----------|
| **Satoshi** 400/500/600/700 | Body, UI text — `--font-sans` | fontshare CDN |
| **Clash Grotesk** 500/600/700 | Display headings — `--font-display` | fontshare CDN |
| **IBM Plex Mono** 400/500/600 | Mono, labels — `--font-plex-mono` | `next/font/google` → CSS var |

Base body: **14px**, line-height **1.5**, `-webkit-font-smoothing: antialiased`

#### Typography utility classes
```css
.font-display   /* Clash Grotesk, letter-spacing: -0.025em */
.mono           /* IBM Plex Mono */
.mono-label     /* mono + font-size: 11px + letter-spacing: 0.2em + uppercase */
.num            /* font-variant-numeric: tabular-nums; feature: "tnum" 1 */
.num-ghost      /* outline text: transparent + -webkit-text-stroke: 1.5px rgba(26,26,26,0.14) */
```

### Border Radius

| Tailwind | CSS var | Value |
|----------|---------|-------|
| `rounded-sm` | `--radius-sm` | 6px |
| `rounded-md` | `--radius-md` | 8px |
| `rounded-lg` | `--radius-lg` | 12px |
| `rounded-xl` | `--radius-xl` | 16px |
| `rounded-2xl` | — | 16px (nav pill) |
| Phone frame | — | 34px outer / 26px inner |

### Shadows

```css
--shadow-subtle:   0 1px 2px rgba(10,10,10,0.06)        /* light */
--shadow-card:     0 4px 16px rgba(10,10,10,0.08)        /* light cards */
--shadow-elevated: 0 12px 40px rgba(10,10,10,0.12)       /* light modals */
--shadow-glow:     0 0 20px rgba(255,116,3,0.18)         /* accent orange glow */
/* Dark mode versions use rgba(0,0,0, 0.4/0.5/0.6) */
```

### Component Anatomy

**Button (`components/ui/button.tsx`)**
- Base: `h-9 px-4 rounded-md text-sm font-semibold`
- `default`: `bg-primary text-primary-foreground` + hover glow, active press
- `secondary` / `outline`: transparent + border
- `ghost`: transparent, hover surface-2
- `destructive`: `bg-destructive text-white`
- `sm`: `h-8 px-3 text-[13px]` / `lg`: `h-10 px-5` / `icon`: `size-9`

**Card (`components/ui/card.tsx`)**
- `rounded-lg border border-border bg-card shadow-[var(--shadow-card)]`
- CardHeader: `p-5 flex flex-col gap-1`
- CardContent: `p-5 pt-0`

**Badge (`components/ui/badge.tsx`)**
- Base: `rounded-full px-2.5 py-0.5 text-[11px] font-semibold`
- `success`: green-bg / `warning`: amber / `error`: red / `info`: sky / `secondary`: surface-3

**Avatar (`components/ui/avatar.tsx`)** — 5 gradient presets:
```
grad 1: linear-gradient(135deg, #22c55e, #15803d)  text: #052e16 (green)
grad 2: linear-gradient(135deg, #3b82f6, #1d4ed8)  text: white   (blue)
grad 3: linear-gradient(135deg, #f59e0b, #b45309)  text: white   (amber)
grad 4: linear-gradient(135deg, #a78bfa, #7c3aed)  text: white   (purple)
grad 5: linear-gradient(135deg, #f472b6, #be185d)  text: white   (pink)
```
Sizes: `sm` = `size-7 text-[11px]` / `md` = `size-9 text-[13px]` / `lg` = `size-16 text-[22px]`

### Landing Page CSS Utility Classes

```css
/* Color helpers (landing scope only) */
.t-ink   { color: var(--ink); }
.t-mut   { color: var(--ink-2); }
.t-faint { color: var(--ink-3); }
.t-lime  { color: var(--lime); }      /* #ff7403 */
.t-sky   { color: var(--sky); }       /* #93dafe */
.text-heat { color: var(--lime); }    /* alias */

.bg-paper  / .bg-paper2 / .bg-paper3  /* cream surface levels */
.bg-acid   { background: #1a1a1a; color: var(--paper); }

/* Heat grid cells */
.cell    { border-radius: 3px; background: var(--h0); }
.cell-1  { background: var(--h1); }
.cell-2  { background: var(--h2); }
.cell-3  { background: var(--h3); }
.cell-4  { background: var(--h4); }

/* Decorative */
.grain::after   /* SVG fractalNoise, opacity 0.05, mix-blend: screen */
.rule           /* background: var(--line) — 1px horizontal rule */
.num-ghost      /* outline headline numerals */
```

### Animations

**CSS keyframes (globals.css):**
```css
@keyframes marquee    /* ticker: translateX(0 → -50%), 40s linear infinite */
@keyframes heat-breathe  /* opacity 0.85 → 1, 3.2s ease-in-out infinite */
```
Both disabled with `animation: none !important` when `prefers-reduced-motion: reduce`.

**Framer Motion patterns:**
- `Reveal` component: `y: 28 → 0, opacity: 0 → 1`, duration 0.6, easing `[0.21, 0.5, 0.2, 1]`, `whileInView`, `once`, margin `-80px`
- Hero text: `y: "120%" → 0` (line rise), stagger 0.09, delay 0.12
- Fade: `y: 16 → 0, opacity: 0 → 1`, duration 0.6
- Heat cells: `scale: 0.35 → 1, opacity: 0 → 1`, stagger 0.004
- Nav: `y: -24 → 0, opacity: 0 → 1`, duration 0.6

### Landing Page Structure (sections in order)

| # | Component | ID | Description |
|---|-----------|-----|-------------|
| — | `LandingNav` | — | Fixed pill navbar, frosted glass on scroll |
| — | `LandingHero` | — | Headline + BrowserFrame with OverviewScreen |
| — | `LandingTicker` | — | Horizontal marquee with live event feed |
| 01 | `LandingStats` | `#streak` | Heat strip + 4 animated stat counters |
| 02 | `LandingCapabilities` | `#capabilities` | 6-item feature grid |
| 03 | `ProductShowcase` | `#product` | Tab switcher with 4 live dashboard views |
| 04 | `PhoneGallery` | `#member` | 3 phone mockups showing member PWA |
| 05 | `LandingSteps` | `#process` | 3-step onboarding (Connect / Reward / Retain) |
| 06 | `LandingCta` | — | Dark CTA block with heat field background |
| — | `LandingFooter` | — | Links + "A PORTFOLIO DEMO" notice |

**Section heading pattern:**
```tsx
<span className="mono-label t-faint">02 — Capabilities</span>
<h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
  Keep the grid warm.
</h2>
```

**Navbar CTA pattern:**
- Logo: `LogoMark` (orange pill) + `FITLOYALTY` in mono 0.16em tracking
- Primary button: `bg-[#1a1a1a] text-[#f5f2ec]`, rounded-xl, uppercase, hover lift
- Links: `mono-label` style, muted color, hover to dark

### Dashboard Layout

```
Shell (server)
├── DemoBanner         top alert strip
├── Sidebar (client)   fixed left, w-60, hidden on mobile
│   ├── Logo
│   ├── Nav items      rounded-lg, active: accent-subtle bg + brand text + 3px left indicator
│   └── Gym card       bottom, surface-2 bg
└── div.md:pl-60
    ├── Header (client)  sticky, h-[60px], backdrop-blur-xl
    │   ├── Breadcrumb
    │   ├── Search bar  (opens CommandDialog)
    │   ├── Notifications popover
    │   ├── ThemeToggle
    │   └── Avatar dropdown
    └── main (max-w-[1280px] px-5 py-6 md:px-8)
        └── page content
```

### Member App Layout

```
PhoneShell (client — because BottomNav needs usePathname)
├── StatusBar          "9:41" + Signal/Wifi/Battery icons
├── AppHeader          Gym logo + name + Admin link button + Settings
├── main (flex-1 overflow-y-auto)
│   └── page content
└── BottomNav (client)
    └── 4 tabs: Home / Rewards / Activity / Profile
        active: text-brand + drop-shadow glow
```

On desktop: phone is contained in `md:w-[400px] md:h-[820px]` centered card with `md:rounded-[42px] md:border-[10px] md:border-surface-3`.

---

## File Structure

```
app/
  page.tsx                  — Landing page (server component)
  layout.tsx                — Root layout (fonts, ThemeProvider, Toaster)
  globals.css               — ALL design tokens + landing styles + base
  (dashboard)/              — Gym owner dashboard route group
    layout.tsx → Shell
    overview/page.tsx       — KpiCards + RetentionChart + AtRiskPanel + ActivityTable
    members/page.tsx        — Suspense → MembersTable
    rewards/page.tsx
    analytics/page.tsx      — ChurnChart + CohortHeatmap + RoiCalculator
    settings/page.tsx       — GymProfile + Branding + Integrations
  member/                   — Member PWA route group
    layout.tsx → PhoneShell
    page.tsx                — Home (points card, challenges, points feed)
    rewards/page.tsx        — Rewards list + QR redemption dialog
    activity/page.tsx
    profile/page.tsx

components/
  landing/                  — LandingNav, LandingHero, LandingTicker,
    |                         LandingStats, LandingCapabilities, ProductShowcase,
    |                         PhoneGallery, LandingSteps, LandingCta, LandingFooter
    screens/                — OverviewScreen, MembersScreen, RewardsScreen, AnalyticsScreen
    heat-field.tsx          — HeatField (grid) + HeatStrip (single row)
    browser-frame.tsx       — Browser chrome wrapper for screen mockups
    reveal.tsx              — Scroll-triggered fade+rise animation wrapper
    counter.tsx             — Animated number counter (landing stats)

  layout/                   — Shell, Sidebar, Header, Logo, DemoBanner,
    |                         PageHeading, PageSkeleton, PageError
  overview/                 — KpiCards, RetentionChart, AtRiskPanel, ActivityTable
  members/                  — MembersTable (with sort/filter/URL sync), MemberSidePanel
  rewards/                  — RewardsView, RewardCard, CreateRewardModal
  analytics/                — ChurnChart, CohortHeatmap, RoiCalculator
  settings/                 — GymProfile, Branding, Integrations
  member/                   — PhoneShell, BottomNav, QrCode
  shared/                   — NudgeModal
  ui/                       — shadcn/ui primitives: Avatar, Badge, Button, Card,
                              Command, Dialog, DropdownMenu, Input, Label, Popover,
                              Progress, ScrollArea, Select, Sheet, Skeleton, Sonner,
                              Switch, Table, Tabs, Textarea, Tooltip

lib/
  mock-data.ts              — All demo data (MEMBERS, KPIS, REWARDS, COHORTS, GYM, etc.)
  types.ts                  — TypeScript interfaces (Member, Reward, Cohort, etc.)
  utils.ts                  — cn(), formatNumber(), formatEUR()
  member-status.ts          — STATUS_BADGE map: status → { label, variant }
  chart-types.ts            — Recharts custom tooltip prop types

hooks/
  use-count-up.ts           — Animates number 0→target on mount, respects prefers-reduced-motion

design-system/              — REFERENCE ONLY (not imported by the app)
  FitLoyalty.html           — Original HTML/CSS design prototype
  css/tokens.css            — Original token file (used green #22c55e, now updated to orange)
  css/base.css / components.css / dashboard.css / mobile.css

docs/
  AUDIT.md                  — Full code & architecture audit (21 issues, all resolved — see status table)
  MARKET_RESEARCH.md        — DACH market research 2026-06: market size, competitors,
                              aggregators (USC/Wellpass/Hansefit), legal, feature benchmarks,
                              strategic conclusions + open questions to re-verify
  IDEAS.md                  — Feature & strategy ideas backlog (2026-06-11 review):
                              Payout-Checker, Krankenkassen certificates, Pause statt
                              Kündigung, Buddy Streaks, Trainer View, in-browser
                              Churn-Check, demo backlog — candidates, NOT committed roadmap
```

---

## AI Agent Guidelines

When generating code, copy, or features for this project:

1. **Focus on retention, not fitness tracking.** Do not suggest features
   involving reps, sets, or raw calorie counting. Focus on attendance,
   streaks, nudges, and gym revenue.

2. **Keep it simple for the gym owner.** The B2B UI must be immediately
   actionable. A "Send Nudge" button beats a complex data table every time.

3. **Respect the actual implemented design system** (see above — not the
   design-system/ folder, which is outdated). Use CSS vars and Tailwind
   semantic classes. Never hardcode colors in JSX unless it's a gradient
   or a landing component using landing-scope vars.

4. **Always emphasize white-labeling.** The gym member should feel they're
   using their specific gym's app, not "FitLoyalty". Every UI decision should
   support this. `GYM.brandColor` must flow into all member-facing visuals.

5. **Weekly streaks are the core mechanic.** Loss aversion (don't break the
   streak) is more powerful than points accumulation — but streaks are
   week-based ("3 workouts/week, 6 weeks running"), never day-based, and
   include streak freezes. Design member-facing features around this.

6. **Phase 1 = attendance import + QR check-in.** CSV/Eversports data first,
   QR as fallback/supplement. Don't over-engineer ingestion beyond that —
   Health API complexity comes in Phase 3.

9. **Every B2B feature must answer "how much money did this make/save me?"**
   The Saved Revenue counter is the hero metric. Nudge channels for members:
   WhatsApp (DACH standard, validated by Magicline going there) + email
   fallback; iOS PWA push only works after add-to-homescreen, never rely on
   it alone.

7. **`"use client"` only when needed:** hooks, GSAP, browser APIs, event
   listeners, motion components. Server components are preferred for layouts
   and data-display-only components.

8. **No `any` types, no implicit any.** All props need explicit interfaces.

---

## Known Issues (see docs/AUDIT.md for full list)

**Critical (all fixed 2026-06-10):**
- ~~PointsCard hardcoded green gradient~~ → now flows from `GYM.brandColor`/`brandColorDark`
- ~~`MEMBER_COUNTS` mismatch~~ → now derived from the `MEMBERS` array
- ~~stale "December Distance" challenge~~ → replaced with weekly-streak challenges

**Architecture (status 2026-06-10 evening):**
- ~~No data layer~~ → `lib/data.ts` getters + re-exports; components import `@/lib/data`, never `mock-data` directly
- No auth/route guards on dashboard routes (no `middleware.ts`) — deferred until real backend
- ~~Fonts via fontshare CDN~~ → self-hosted woff2 in `app/fonts/`, `next/font/local` (`--font-satoshi`, `--font-clash`); Satoshi has no 600 cut (400/500/700)

**Code quality:** all audit items fixed 2026-06-10 (see docs/AUDIT.md status
table). Remaining by design: landing components use literal hex (scoped
design tokens); `lang="en"` is correct — UI copy is English.

**Missing before production:** auth/middleware, real API behind `lib/data.ts`.
Favicon (`app/icon.svg`), OG image (`app/opengraph-image.tsx`), robots,
sitemap, and full OpenGraph/Twitter metadata are all in place.

---

## Current State (as of 2026-06-10)

- Landing page: fully built (all 8 sections), styled, animated
- Gym owner dashboard: fully functional with mock data (all 5 pages)
- Member PWA: fully functional with mock data (all 4 pages + QR redemption)
- Active work: refining landing page design, then moving to real data layer
- Strategy revised 2026-06-10 after market research: Eversports-first
  integrations, weekly streaks, Aggregator Hub, occupancy feature, Saved
  Revenue as hero metric, free Churn-Check as sales wedge.
- **Demo UI updated to the new strategy (2026-06-10):**
  - Data layer: `Member.source` (direct/usc/wellpass/hansefit),
    `noticeDeadlineDays`, weekly-streak fields on `MemberProfile`,
    `AGGREGATORS` + `CONVERSION_CANDIDATES` + `OCCUPANCY` + saved-revenue
    KPIs in `lib/mock-data.ts`
  - Dashboard: Saved Revenue is the hero KPI; At-Risk panel is now "Churn
    Window" (inactivity + notice deadline, "Last chance" badge ≤7d); new
    `AggregatorHub` card on Overview (revenue mix bar, per-channel payouts,
    convertible USC regulars with Offer button); Integrations reworked
    (Eversports CSV connected, QR check-in, USC/Wellpass tracking)
  - Member app: weekly streak card (visits-this-week progress + streak
    freeze), live occupancy card with typical-hours histogram, PointsCard
    white-labeled, all "X-day streak" copy → weeks
  - Landing: hero/CTA repositioned ("Eversports runs your bookings — we
    bring your revenue back", Churn-Check line), capabilities now =
    churn-window alerts / Saved Revenue / Aggregator Hub / weekly streaks /
    live occupancy / white-label, ticker + stats + steps + showcase updated,
    wearable-sync messaging removed (Phase 3)
  - Rewards: "Calorie Goal" trigger replaced with "Google Review"
- **Second pass (2026-06-10 evening):**
  - Landing grew three sections: ChurnCheck (interactive slider calculator,
    `#churn-check`, "06 — Your numbers"), LandingPricing (3 tiers, Growth
    highlighted, `#pricing`, "07"), LandingProof (stack chips + 3 testimonials
    + native-details FAQ, `#faq`, "08"); CTA renumbered to "09"; Pricing link
    in nav
  - Analytics got SavesLog — per-member Saved Revenue attribution table with
    the conservative-attribution footnote
  - MembersTable: Source column (Direct/USC/Wellpass/Hansefit badges)
  - Full audit hygiene pass: see docs/AUDIT.md status column
  - SEO: app/icon.svg, opengraph-image.tsx, robots.ts, sitemap.ts, OG/Twitter
    metadata, Suspense on landing
  - Fonts self-hosted via next/font/local (app/fonts/*.woff2)
  - Data layer: lib/data.ts — getters + compat re-exports; all 27 component
    imports now go through it
- **Journeys preview page (2026-06-11):** `/journeys` — closes the
  "promised in pricing but absent in demo" gap. Onboarding Autopilot
  timeline (Day 0–90, channel badges, disabled switches) + Win-back
  segments card. Marked "Pro feature · coming soon"; sidebar nav item has
  a "Soon" pill; added to header TITLES + QUICK_NAV (breadcrumb/⌘K).
- **Guided demo tour (2026-06-11):** driver.js v1.4 —
  `components/shared/demo-tour.tsx` (5 steps over `data-tour` anchors:
  saved-revenue KPI → churn-window panel → aggregator-hub → usc-converter →
  member-app banner link). Auto-starts once per browser
  (localStorage `fitloyalty-tour-seen`), restartable via the orange "Tour"
  button in DemoBanner (dispatches `fitloyalty:start-tour`; navigates to
  /overview first if needed). Popover themed to dashboard tokens via
  `.fitloyalty-tour` overrides at the end of globals.css; respects
  prefers-reduced-motion (animate: false). Note: Turbopack dev server may
  need a restart to pick up appended plain-CSS blocks in globals.css.
- **Strategy review (2026-06-11):** full ideas backlog written to
  `docs/IDEAS.md` — top-3 by leverage: in-browser Churn-Check CSV analysis
  (DSGVO-safe wedge), Payout-Checker (aggregator payout reconciliation —
  "we found €138 in unpaid visits"), Krankenkassen attendance certificates
  (DACH moat #2 + member-app adoption driver). Plus: Pause statt Kündigung
  save-flow, Buddy Streaks, Trainer View, explainable alerts, WhatsApp
  Morning Briefing for owners, class-retention analytics, benchmark teaser,
  German localization. Strategy corrections folded into this file:
  occupancy for class studios ≠ QR-dependent (official API gives
  schedules), no-show = earliest churn signal ("Booking-Ghost"), pricing
  mechanics (annual billing, Founding 10, WhatsApp fee cap). Research
  follow-ups appended to MARKET_RESEARCH.md §15; demo gaps tracked in
  IDEAS.md §5 (Review & Referral UI, Consent Manager UI, member-app
  referral, multi-location all promised in pricing but absent from demo).
- **Demo Wave 1 shipped (2026-06-12):** five mock-data-level features from
  IDEAS.md landed in the demo (lint + build green):
  1. **myClubs** added everywhere: `MemberSource` type, `AGGREGATORS`
     (57 visits, €9.8/visit), Integrations card, members-table
     `SOURCE_BADGE`, purple channel dot in AggregatorHub.
  2. **Payout audit block** in AggregatorHub (`data-tour="payout-audit"`):
     per-channel "logged → paid" rows, red "€X unpaid" pill (computed from
     `PAYOUT_AUDIT` in mock-data), "Export claim list" button.
  3. **Explainable churn alerts:** `Member.churnReasons?: string[]` +
     `bookingGhost?: boolean`; Churn Window panel renders reason chips
     under each member; Nina Wagner is the "Booking ghost" badge case
     (3 booked · 0 attended).
  4. **Comeback-Bonus:** `MEMBER_ME.comebackBonusPts`, ComebackBanner on
     member home ("streak freeze covered last week + bonus"), points-feed
     entry, "Comeback Bonus" reward card (r0) on /rewards, "Comeback"
     TriggerType in create-reward-modal (no numeric value needed),
     REWARD_ACTIVITY entry (Julia Hofmann — ties into SavesLog story).
  5. **Tonight's classes** inside member OccupancyCard:
     `OCCUPANCY.tonightClasses` (booked/capacity bars, red when ≥90%) —
     shows occupancy works from schedule/booking data, not QR.
- **Demo Wave 2 (partial, 2026-06-12):** two member-app features shipped
  (lint + build green):
  1. **ReferralCard** on /member/rewards (`MEMBER_REFERRAL` in mock-data):
     "Invite a friend — they get a free trial week, you get +500 pts",
     copy-link button (clipboard + toast), "1 friend joined" proof line.
     Closes the member-facing half of the Review & Referral Engine.
  2. **Krankenkassen-Bonus certificate** on /member/profile
     (`INSURANCE_CERT`): "Attendance certificate 2026 · 47 visits
     confirmed · ≥24 required", Download PDF (toast), "insurers pay up to
     €400/year" caption. The IDEAS §2.2 DACH hook, now visible in demo.
  Still open in the demo backlog: Consent Manager UI (settings), B2B
  Review & Referral page, benchmark teaser (analytics), multi-location
  switcher, Churn-Check CSV upload, pricing annual toggle + Founding 10.
- **Pricing model v2 shipped to demo (2026-06-12):** landing pricing tiers
  now show member gating ("Up to 150 members" / "up to 500" / "unlimited"),
  WhatsApp "200 conversations/mo incl." in Growth, "Multi-location
  (+€99/additional location)" in Pro, "payout audit export" as a Growth
  feature; footer line swapped "unlimited members" → "2 months free on
  annual billing". AggregatorHub payout-audit block got a "Growth+" tier
  pill (demo gym is on Pro, so export stays enabled — the pill communicates
  gating without breaking the narrative).
