# FitLoyalty — Ideas Backlog

> Обновлён: 2026-07-01. Стратегический контекст — `.claude/CLAUDE.md`.
> Wearable-стратегия — `docs/WEARABLE_STRATEGY.md`.
> Исследование рынка — `docs/MARKET_RESEARCH.md`.
>
> **Пивот (2026-06-16):** product direction = activity-verified loyalty.
> Gym churn SaaS + wearable verification = единственная система, которая
> награждает за реальное усилие, а не за присутствие.

---

## 1. Приоритизация

| # | Идея | Эффект | Усилие | Статус |
|---|------|--------|--------|--------|
| **NEW** | Setup Wizard — форма перед дашбордом | 🔥🔥🔥 | Средн. | **Done** (см. §4) |
| W.4 | Wearable: колонка в таблице членов + side panel | 🔥🔥🔥 | Средн. | **Done** (см. §4) |
| W.5 | Wearable: "intensity declining" сигнал в Briefing | 🔥🔥 | Средн. | **Done** (см. §4) |
| W.6 | Wearable: онбординг member app "Connect health app" | 🔥🔥 | Низк. | **Done** (см. §4) |
| 2.1 | Payout-Checker (сверка выплат агрегаторов) | 🔥🔥🔥 | Средн. | **Done** (см. §4) |
| 3.1 | Churn-Check: реальный CSV-анализ в браузере | 🔥🔥🔥 | Средн. | **Done** (см. §4) |
| 2.3 | Pause statt Kündigung (save-флоу) | 🔥🔥 | Средн. | **Done** (см. §4) |
| 3.3 | Morning Briefing в WhatsApp | 🔥🔥 | Средн. | Backlog |
| 3.5 | Benchmark-тизер в Analytics | 🔥 | Минимальн. | Backlog |
| 2.6 | Buddy Streaks (парные стрики) | 🔥🔥 | Средн. | Backlog |
| 2.7 | Trainer View (третья персона) | 🔥🔥 | Высок. | Backlog |
| 3.4 | Class-retention analytics | 🔥 | Средн. | Backlog |
| — | Consent Manager (Settings, DSGVO) | 🔥🔥 | Низк. | **Done** (см. §4) |
| — | Multi-location switcher (sidebar "Soon") | 🔥 | Низк. | Backlog |
| — | Review & Referral campaign (B2B side) | 🔥 | Средн. | Backlog |

**Следующие по приоритету** (Setup Wizard, W.4/W.5, Payout-Checker, Pause statt Kündigung,
Consent Manager — уже реализованы в коде, см. §4):
1. **Benchmark-тизер** — один час работы, продаёт data-moat в питче
2. **Multi-location switcher** — "Soon" пилюля в sidebar, минимальный объём работы
3. **Review & Referral campaign (B2B)** — управление кампанией на стороне gym owner

---

## 2. Оставшийся продуктовый беклог

> Setup Wizard, W.4–W.6, Payout-Checker, Churn-Check CSV, Pause statt Kündigung и Consent
> Manager описаны в предыдущих версиях этого документа как беклог — все они уже реализованы,
> см. §4 "Выполнено".

### 3.3 Morning Briefing → WhatsApp

Ежедневный дайджест владельцу в WhatsApp: «3 дела на сегодня + Saved Revenue недели».
Без логина в дашборд. Оружие против churn самих студий. (B2B коммуникация,
не маркетинг — §7 UWG opt-in применимо иначе.)

### 2.6 Buddy Streaks

Парный стрик с другом (Duolingo friend streak): ломаешь стрик не себе, а вам обоим.
Классовые студии = ходят с подругами → механика нативна.
Мост к рефералке: «пригласи друга → общий стрик».

### 2.7 Trainer View

Мобильный экран «мой сегодняшний класс»: кто at-risk, у кого 50-й визит, кто новичок.
Делать после product-market fit ядра (требует роль/права).

### 3.4 Class-retention analytics

«Какие классы/слоты удерживают лучше» — вторник 19:00 retention 2× против субботнего утра.
Данные уже в системе. Tier: Pro.

### 3.5 Benchmark-тизер в Analytics

Карточка «Your retention vs ~200 similar studios — coming soon».
Один час работы, продаёт data-moat в питче.

---

## 3. Демо-беклог (обещано в pricing, отсутствует)

- [ ] **Multi-location** — location-switcher в sidebar как "Soon"
- [ ] **Review & Referral (B2B)** — управление кампанией на стороне gym owner
- [ ] **Benchmark-тизер** в Analytics
- [ ] **Morning Briefing → WhatsApp** дайджест
- [ ] **Buddy Streaks**
- [ ] **Trainer View**
- [ ] **Class-retention analytics**

---

## 4. Выполнено (справка)

| | Фича | Дата |
|---|------|------|
| — | Consent Manager — новая карточка в Settings (`components/settings/consent-manager.tsx`): zero-knowledge biometrics badge, double opt-in audit, AVV, auto-delete retention toggle, export | 2026-07-01 |
| 2.3 | Pause statt Kündigung — второй CTA "Offer pause" в `NudgeModal` (Churn Window, save-briefing-actions, at-risk/churned в Members) | 2026-07-01 |
| NEW | Setup Wizard — `components/shared/setup-wizard.tsx` + `useStudioProfile()` | 2026-06-17 |
| W.4 | Wearable-колонка + side panel intensity в Members table (`members-table.tsx`, `member-side-panel.tsx`) | 2026-06-17 |
| W.5 | "Intensity declining" сигнал (`intensity` type) в Morning Briefing (`briefing-list.tsx`) | 2026-06-17 |
| W.6 | `WearableOnboardingModal` в member home — i18n-нарушение исправлено (EN/DE keys) | 2026-07-01 |
| 2.1 | Payout-Checker: audit-карточка в AggregatorHub — export-кнопка теперь даёт feedback (Growth+ upsell toast) вместо dead click | 2026-07-01 |
| 3.1 | Churn-Check: настоящий client-side CSV-парсер (`lib/churn-check.ts`), не слайдер | 2026-06-17 |
| W.1 | Wearable "Today's workout" card в member home | 2026-06-16 |
| W.2 | Effort breakdown в activity screen | 2026-06-16 |
| W.3 | Wearable hero trust strip + cap #6 "Effort-verified points" | 2026-06-16 |
| W.3a | "How it works" секция (3 шага + шкала интенсивности) | 2026-06-16 |
| W.3b | Phone gallery HomeScreen: wearable workout chip | 2026-06-16 |
| 2.2 | Krankenkassen-справка в member profile | 2026-06-12 |
| 2.4 | Booking-Ghost бейдж в Churn Window | 2026-06-12 |
| 2.5 | "Tonight's classes" в occupancy-карточке member app | 2026-06-12 |
| 2.8 | Comeback-Bonus в member app + Rewards Builder | 2026-06-12 |
| 3.2 | Explainable alerts (чипы-причины) в Churn Window | 2026-06-12 |
| 3.6 | Referral в member app (ReferralCard на /rewards) | 2026-06-12 |
| — | Payout audit block в AggregatorHub | 2026-06-12 |
| — | myClubs везде (Integrations, Members, AggregatorHub) | 2026-06-12 |
| — | Pricing model v2 (member gating, annual billing) | 2026-06-12 |
| — | Guided demo tour (driver.js, 5 шагов) | 2026-06-11 |
| — | Journeys preview page (/journeys) | 2026-06-11 |
