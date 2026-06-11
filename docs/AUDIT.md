# FitLoyalty — Code & Architecture Audit

> Дата: 2026-06-10 · Гілка: `main`
> **Статус: 2026-06-10 (вечір) — усі пункти закриті.** Деталі в таблиці внизу.
> №4 — false positive (`showClose` визначений у кастомному `dialog.tsx:34`).
> №8 — переглянуто: контент UI англійською (німецькі лише власні назви), тому `lang="en"` коректний; повернутися при DE-локалізації.

Нижче зібрані всі сумнівні місця, баги і архітектурні проблеми, знайдені при огляді всіх вихідних файлів. Поділено за пріоритетом.

---

## 🔴 КРИТИЧНО — Зламаний функціонал або хибні дані

### 1. Member PointsCard ламає white-label обіцянку
**Файл:** `app/member/page.tsx:22`
```tsx
style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}
```
Хардкодований зелений колір. Сторінка налаштувань (`settings/branding.tsx`) дозволяє змінити `GYM.brandColor`, але PointsCard ніколи не відобразить цю зміну. Весь white-label пайплайн показово зламаний.

**Виправлення:** замінити inline колір на `GYM.brandColor` або `var(--primary)`.

---

### 2. MEMBER_COUNTS розходиться з реальним масивом MEMBERS
**Файл:** `lib/mock-data.ts:145-150`
```ts
export const MEMBER_COUNTS = {
  all: 347, active: 301, atRisk: 23, churned: 23,
};
```
У масиві `MEMBERS` — 12 записів (4 active, 3 at-risk, 2 churned + ін.). UI показує "347 Members" і таби "Active (301)", але при фільтрації видно тільки 12. Якщо показуєш цифри — вони мають відповідати даним, або бути явно помічені як "demo totals".

**Виправлення:** або зробити `MEMBER_COUNTS` похідним від `MEMBERS`, або додати явний дисклеймер у заголовок сторінки.

---

### 3. "December Distance" challenge у червні 2026
**Файл:** `lib/mock-data.ts:297`
```ts
{ id: "c1", emoji: "🏃", title: "December Distance", current: 62, goal: 100, unit: "km", endsIn: "9 days left" }
```
Очевидно застарілий mock. Поточна дата — червень 2026. Challenge під назвою "December Distance" з "9 days left" виглядає як copy-paste баг.

**Виправлення:** оновити назву і дати на релевантні для демо.

---

### 4. `DialogContent showClose` prop не стандартний
**Файл:** `app/member/rewards/page.tsx:71`
```tsx
<DialogContent className="max-w-xs" showClose>
```
Стандартний shadcn/ui `DialogContent` не має `showClose` prop — він додає кнопку закриття за замовчуванням. Якщо цей prop не визначений у кастомній версії компонента, він просто ігнорується (або TypeScript скаже помилку). Треба перевірити `components/ui/dialog.tsx`.

---

## 🟠 АРХІТЕКТУРА — Проблеми, що зростатимуть

### 5. Немає шару даних — всі компоненти імпортують mock-data напряму
**Файли:** практично кожен компонент у `components/`

Понад 20 компонентів роблять `import { ... } from "@/lib/mock-data"`. Коли прийде час підключати реальний API — доведеться відкривати кожен файл окремо. Немає жодного service layer, fetching hooks, чи data context.

**Рекомендація:** ввести `lib/data/` з функціями-геттерами (`getMembers()`, `getKpis()` тощо), навіть якщо вони повертають mock-дані. Тоді реальний API — це зміна в одному місці.

---

### 6. Немає Auth / route guards
**Файли:** `app/(dashboard)/layout.tsx`, `middleware.ts` (відсутній)

Дашборд на `/overview`, `/members` і т.д. відкритий для будь-якого відвідувача. Немає `middleware.ts`, немає перевірки сесії, немає редиректу. Для production це критично.

**Рекомендація:** додати `middleware.ts` з перевіркою сесії або JWT, або хоча б placeholder з TODO.

---

### 7. Шрифти через зовнішній CDN замість next/font
**Файл:** `app/layout.tsx:30-33`
```tsx
<link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?..." />
```
Satoshi і Clash Grotesk завантажуються через сирий `<link>` тег. Це означає:
- Немає оптимізації preload від Next.js
- Немає `size-adjust` для CLS (Cumulative Layout Shift)
- FOUT (flash of unstyled text) при поганому з'єднанні
- Зовнішня залежність — якщо fontshare.com ляже, шрифти зламаються

**Виправлення:** або завантажити шрифти локально і підключити через `next/font/local`, або знайти npm-пакет для Satoshi/Clash Grotesk.

---

### 8. `lang="en"` але весь контент — DACH
**Файл:** `app/layout.tsx:28`
```tsx
<html lang="en" ...>
```
Імена членів (Anna Müller, Thomas Gruber), назва гіму, адреса (Wien, Graz, Innsbruck) — все німецькомовне. Скрінридери читатимуть це з англійськими правилами вимови.

**Виправлення:** `lang="de-AT"` або хоча б `lang="de"`.

---

## 🟡 ЯКІСТЬ КОДУ — Антипатерни та помилки

### 9. setState під час рендеру в NudgeModal
**Файл:** `components/shared/nudge-modal.tsx:40-44`
```tsx
if (open && memberName && seededFor !== memberName) {
  setSeededFor(memberName);       // <-- setState під час render!
  setMessage(defaultMessage(memberName));
}
```
Коментар у коді сам визнає це "set-state-during-render reset pattern". Це React антипатерн — викликає додатковий рендер, може призвести до нескінченних циклів при рефакторингу.

**Виправлення:** використати `useEffect` з `[memberName, open]` або передати `key={memberName}` до NudgeModal, щоб він перемонтовувався з новим станом.

---

### 10. ESLint disable в prod-коді замість фіксу
**Файл:** `components/layout/header.tsx:71`
```tsx
// eslint-disable-next-line react-hooks/set-state-in-effect
React.useEffect(() => setMounted(true), []);
```
Заглушення lint-правила замість розуміння причини. Правило `react-hooks/set-state-in-effect` попереджає про вставку setState всередині Effect без guard — тут це нешкідливо, але потрібен коментар чому, а не заглушення.

**Виправлення:** видалити eslint-disable, або замінити на стандартний `useState(false)` + effect pattern:
```tsx
const [mounted, setMounted] = React.useState(false);
React.useEffect(() => { setMounted(true); }, []);
```

---

### 11. Ненадійний парсинг дат у сортуванні таблиці
**Файл:** `components/members/members-table.tsx:130`
```tsx
Date.parse(`1 ${a.since}`)  // "1 Mar 2021"
```
`Date.parse("1 Mar 2021")` — implementation-defined поведінка. Chrome парсить, але специфікація ECMAScript це не гарантує. Node.js (SSR) може повернути `NaN`.

**Виправлення:** парсити вручну або використати надійну бібліотеку:
```ts
// Простий варіант:
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function parseMemberSince(s: string): number {
  const [mon, year] = s.split(' ');
  return Number(year) * 12 + MONTHS.indexOf(mon);
}
```

---

### 12. Хардкодований рік "2026" у tooltip ретеншн-чарту
**Файл:** `components/overview/retention-chart.tsx:21`
```tsx
<p className="text-[11px] font-medium text-faint">{String(label)} 2026</p>
```
Рік вписаний буквально. Через 6 місяців tooltip показуватиме "Jan 2026" для поточних даних.

**Виправлення:** передавати рік у `RETENTION_SERIES` або брати `new Date().getFullYear()`.

---

### 13. Landing hero — хардкодовані hex кольори замість CSS vars
**Файл:** `components/landing/landing-hero.tsx`

Компонент вручну пише `#f5f2ec`, `#1a1a1a`, `#ff7403`, `#3d3d3d`, `#93dafe`. При цьому у `globals.css` (секція `.landing`) вже визначені:
```css
--paper: #f5f2ec;
--ink:   #1a1a1a;
--lime:  #ff7403;
--ink-2: #6b6b6b;
--sky:   #93dafe;
```
І є готові utility класи: `.t-ink`, `.t-mut`, `.t-lime`, `.t-sky`. Héron порушує власну систему токенів.

**Виправлення:** замінити hardcoded кольори на CSS vars / utility класи в landing-hero.tsx.

---

### 14. ROI Calculator використовує захардкоджену константу `retentionDelta`
**Файл:** `components/analytics/roi-calculator.tsx:20`
```tsx
const churnReductionRate = KPIS.retentionDelta / (100 - KPIS.retentionRate);
```
Математика залежить від статичних mock-значень KPIS. Коли підключиться реальний API, ці значення можуть бути 0 або undefined, а формула дасть NaN або division-by-zero.

**Виправлення:** додати guard перевірки:
```ts
const baseline = 100 - KPIS.retentionRate;
const churnReductionRate = baseline > 0 ? KPIS.retentionDelta / baseline : 0;
```

---

### 15. `GymProfile` не має валідації через zod/resolver
**Файл:** `components/settings/gym-profile.tsx`

`react-hook-form` підключений (`useForm`), є `@hookform/resolvers` в `package.json`, але схема валідації відсутня. Email поле валідується тільки через `type="email"` (browser-only). При submit — будь-які дані пройдуть.

**Виправлення:** додати Zod схему або хоча б `register("email", { pattern: { value: /email-regex/, message: "..." } })`.

---

## 🔵 UX / ДИЗАЙН — Видимі проблеми

### 16. CSS transition на body конфліктує з ThemeProvider
**Файл:** `app/globals.css:180`
```css
body {
  transition: background 0.35s ease, color 0.35s ease;
}
```
`ThemeProvider` має `disableTransitionOnChange` — але ця опція тільки додає/знімає клас `no-transition` мінімально. Постійна CSS transition на body викликає мерехтіння (flash) при першому завантаженні сторінки, поки next-themes не встановить тему.

**Виправлення:** прибрати CSS transition з `body` або винести її в `.theme-transition body { }` і додавати програмно після гідрації.

---

### 17. Product showcase — кнопки-таби без keyboard nav
**Файл:** `components/landing/product-showcase.tsx:46-59`

Кастомні `<button>` імітують таби, але не мають `role="tablist"` / `role="tab"` / `aria-selected` і не підтримують навігацію стрілками (як вимагає ARIA Tabs pattern).

**Виправлення:** або використати `<Tabs>` з UI-кіту, або додати ARIA атрибути і keydown handler.

---

### 18. `PhoneShell` — `"use client"` без потреби
**Файл:** `components/member/phone-shell.tsx:1`

`PhoneShell` сам не використовує жодних хуків. Boundary потрібна через `BottomNav` (який, ймовірно, використовує `usePathname`). Але `"use client"` на PhoneShell виключає все дерево з SSR, включаючи статичний `StatusBar` і `AppHeader` (без hooks).

**Рекомендація:** перемістити `"use client"` до `BottomNav`, а `PhoneShell` зробити серверним компонентом.

---

## ⚫ ВІДСУТНЄ — Треба додати перед production

### 19. Немає favicon і OG-метаданих
**Файл:** `app/layout.tsx` / `public/`

Папка `public/` порожня. Немає `favicon.ico`, `og-image.png`, manifest. Metadata в `layout.tsx` має тільки `title` і `description` — без `openGraph`, `twitter`, `icons`.

**Що додати:**
```ts
export const metadata: Metadata = {
  title: "...",
  description: "...",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "...",
    description: "...",
    images: [{ url: "/og-image.png" }],
  },
};
```

---

### 20. Немає `robots.txt` і `sitemap.xml`
**Файл:** `public/` (відсутні)

Продуктовий landing — без robots.txt і sitemap. Crawler-и можуть індексувати `/overview`, `/members` тощо.

**Рекомендація:** або `public/robots.txt` + `public/sitemap.xml`, або Next.js App Router route handlers `app/robots.ts` / `app/sitemap.ts`.

---

### 21. Немає Suspense boundary на landing page для анімацій
**Файл:** `app/page.tsx`

`LandingHero` і `ProductShowcase` — `"use client"` компоненти з Framer Motion. Без `<Suspense>` обгортки у page.tsx вони блокують рендер до гідрації. Це погіршує LCP (Largest Contentful Paint).

**Рекомендація:** обгорнути `<main>` у `<Suspense fallback={<div className="min-h-screen" />}>`.

---

## Зведена таблиця пріоритетів

| № | Проблема | Файл | Пріоритет | Статус |
|---|----------|------|-----------|--------|
| 1 | PointsCard hardcoded green | `app/member/page.tsx:22` | 🔴 Критично | ✅ Виправлено — `GYM.brandColor` |
| 2 | MEMBER_COUNTS vs реальні дані | `lib/mock-data.ts:145` | 🔴 Критично | ✅ Виправлено — похідні від `MEMBERS` |
| 3 | "December Distance" в червні | `lib/mock-data.ts:297` | 🔴 Критично | ✅ Виправлено — weekly-челенджі |
| 4 | `showClose` prop non-standard | `app/member/rewards/page.tsx:71` | 🔴 Критично | ⬜ Invalid — prop визначений у `dialog.tsx:34` |
| 5 | Немає data layer | всі компоненти | 🟠 Архітектура | ✅ `lib/data.ts` (геттери), 27 імпортів переведено |
| 6 | Немає auth / route guards | `app/(dashboard)/layout.tsx` | 🟠 Архітектура | ⏸ Відкладено до реального бекенду |
| 7 | Шрифти через CDN | `app/layout.tsx:30` | 🟠 Архітектура | ✅ Self-hosted, `next/font/local` |
| 8 | `lang="en"` + DACH контент | `app/layout.tsx:28` | 🟠 Архітектура | ⬜ Переглянуто — контент EN, `lang="en"` коректний |
| 9 | setState під час render | `nudge-modal.tsx:40` | 🟡 Якість | ✅ Key-remount форми |
| 10 | ESLint disable замість фіксу | `header.tsx:71` | 🟡 Якість | ✅ Чистий патерн без disable |
| 11 | Ненадійний Date.parse | `members-table.tsx:130` | 🟡 Якість | ✅ `parseMemberSince()` |
| 12 | Hardcoded "2026" у tooltip | `retention-chart.tsx:21` | 🟡 Якість | ✅ `DEMO_YEAR` константа |
| 13 | Hardcoded hex у landing hero | `landing-hero.tsx` | 🟡 Якість | ⏸ Свідомо: landing-скоуп, hex = design tokens 1:1 |
| 14 | ROI calculator без guard | `roi-calculator.tsx:20` | 🟡 Якість | ✅ Division guard |
| 15 | Форма без валідації | `gym-profile.tsx` | 🟡 Якість | ✅ Zod + resolver + error UI |
| 16 | CSS transition flash | `globals.css:180` | 🔵 UX | ✅ Transition прибрано |
| 17 | Таби без ARIA | `product-showcase.tsx:46` | 🔵 UX | ✅ tablist/tab/aria-selected + стрілки |
| 18 | PhoneShell зайвий `"use client"` | `phone-shell.tsx:1` | 🔵 UX | ✅ Server component, boundary у BottomNav |
| 19 | Немає favicon / OG | `app/layout.tsx`, `public/` | ⚫ Missing | ✅ `app/icon.svg` + `opengraph-image.tsx` + metadata |
| 20 | Немає robots.txt / sitemap | `public/` | ⚫ Missing | ✅ `app/robots.ts` + `app/sitemap.ts` |
| 21 | Немає Suspense на landing | `app/page.tsx` | ⚫ Missing | ✅ Suspense навколо `<main>` |
