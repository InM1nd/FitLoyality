# Landing Components — Agent Rules

> Parent rules: @../../CLAUDE.md

## Scope

These components render inside `<div className="landing grain">` — the landing CSS scope.
Design tokens here are **different** from the dashboard. Use landing-scoped vars.

## Color quick-ref

```
bg-[#f5f2ec]  = --paper    (page bg)
bg-[#ede9e1]  = --paper-2  (hover)
text-[#1a1a1a] or .t-ink   = primary text
text-[#6b6b6b] or .t-mut   = muted
text-[#9a9a9a] or .t-faint = faint
text-[#ff7403] or .t-lime  = orange accent
text-[#93dafe] or .t-sky   = sky blue (sync/data)
bg-[#1a1a1a]               = dark CTA bg
```

Hex literals **are acceptable** in landing components when they map 1:1 to the tokens above.
This is intentional (design decision, see AUDIT.md item 13).

## Section structure pattern

Every landing section follows this layout:

```tsx
<section id="slug" className="scroll-mt-20 px-5 py-16 md:py-28">
  <div className="mx-auto max-w-6xl">
    <Reveal className="flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="mono-label t-faint">02 — Section Name</span>
        <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight t-ink md:text-5xl">
          Heading
        </h2>
      </div>
      <p className="max-w-xs text-sm leading-relaxed t-mut sm:text-right">Sub text</p>
    </Reveal>
    {/* content */}
  </div>
</section>
```

## Dark sections (bg-[#111] or bg-[#1a1a1a])

Use white/opacity scale for text:
- `text-white` — headings
- `text-white/50` or `text-white/55` — body
- `text-white/35` — labels/eyebrows
- `text-white/25` — decorative numbers
- `border-white/10` or `border-white/15` — borders

## Animation

Always wrap scroll-triggered content in `<Reveal>` or `<Reveal delay={n * 0.06}>`.
Hero animations use Framer Motion `variants` directly (not Reveal).
Never use GSAP in landing components.

## Current section order in app/page.tsx

```
LandingNav
LandingHero
LandingTicker
LandingStats          #streak     "01 — The streak effect"
LandingHowItWorks                 "How it works"  ← bg-[#f5f2ec] (same as landing), no number, editorial grid: 3 equal step cards + intensity scale strip
LandingCapabilities   #capabilities "02 — Capabilities"
ProductShowcase       #product    "03 — Product"
PhoneGallery          #member     "04 — Member app"
LandingSteps          #process    "05 — Process"
ChurnCheck            #churn-check "06 — Your numbers"
LandingPricing        #pricing    "07 — Pricing"
LandingProof          #faq        "08 — Proof"
LandingCta
LandingFooter
```

When adding a new section, maintain this order. New eyebrow numbers must not collide.

## i18n in landing

Landing uses `useT("hero")`, `useT("capabilities")`, `useT("howItWorks")`, `useT("phoneGallery")`,
`useT("steps")`, `useT("stats")`, etc. — each section has its own namespace.
Add keys to `lib/i18n/dictionaries.ts` under the matching namespace.
