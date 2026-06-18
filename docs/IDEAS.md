# FitLoyalty — Ideas Backlog

> Обновлён: 2026-06-17. Стратегический контекст — `.claude/CLAUDE.md`.
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
| **NEW** | Setup Wizard — форма перед дашбордом | 🔥🔥🔥 | Средн. | **Backlog** |
| W.4 | Wearable: колонка в таблице членов + side panel | 🔥🔥🔥 | Средн. | **Backlog** |
| W.5 | Wearable: "intensity declining" сигнал в Briefing | 🔥🔥 | Средн. | **Backlog** |
| W.6 | Wearable: онбординг member app "Connect health app" | 🔥🔥 | Низк. | **Backlog** |
| 2.1 | Payout-Checker (сверка выплат агрегаторов) | 🔥🔥🔥 | Средн. | Backlog |
| 3.1 | Churn-Check: реальный CSV-анализ в браузере | 🔥🔥🔥 | Средн. | Backlog |
| 2.3 | Pause statt Kündigung (save-флоу) | 🔥🔥 | Средн. | Backlog |
| 3.3 | Morning Briefing в WhatsApp | 🔥🔥 | Средн. | Backlog |
| 3.5 | Benchmark-тизер в Analytics | 🔥 | Минимальн. | Backlog |
| 2.6 | Buddy Streaks (парные стрики) | 🔥🔥 | Средн. | Backlog |
| 2.7 | Trainer View (третья персона) | 🔥🔥 | Высок. | Backlog |
| 3.4 | Class-retention analytics | 🔥 | Средн. | Backlog |

**Следующие по приоритету:**
1. **Setup Wizard** — персонализирует демо, снимает "это не про мой бизнес" возражение
2. **W.4 + W.5** — дашборд должен показывать wearable-данные; без этого лендинг
   обещает то, что в продукте невидимо для gym owner
3. **Payout-Checker** — самая конкретная денежная фича, не требует wearable

---

## 2. Setup Wizard — "Tell us about your studio"

**Суть:** модальная форма или первый экран при заходе на `/overview` (до того, как
демо-тур запустится). 3–4 вопроса → демо подстраивается.

**Вопросы:**
1. **Тип студии** — Yoga / Pilates · CrossFit / Functional · Open gym · Другое
2. **Размер** — < 150 членов · 150–500 · 500+
3. **Агрегаторы?** — Нет / USC · Wellpass · Hansefit (мультиселект)
4. **Wearable loyalty?** — Да, интересно · Пока нет, сначала базовое

**Что меняется в демо на основе ответов:**
- Yoga → скрыть/приглушить Aggregator Hub, усилить wearable-story и occupancy через классы
- Open gym → вынести AggregatorHub на первый план, показать USC Converter
- ≤150 членов → Starter tier выделен в pricing
- Wearable=нет → убрать "How it works" из тура, не акцентировать cap #6

**Почему важно:**
Сейчас все видят CrossFit Vienna Nord demo независимо от своего бизнеса. Форма делает
демо релевантным за 20 секунд. Это стандартная тактика для B2B SaaS demo flows.

**Реализация в демо (без бекенда):**
- 1 React state объект `StudioProfile` в контексте
- Значения читаются компонентами через хук `useStudioProfile()`
- Данные не персистируются (сброс при обновлении — нормально для демо)
- Форма показывается при первом визите (localStorage флаг, как у demo-tour)

---

## 3. Wearable-дашборд (W.4 / W.5 / W.6)

### W.4 — Wearable колонка в Members table

Новый столбец "Activity source" рядом со Status:
- `🟢 Watch connected` — член подключил Apple Watch / Garmin / Fitbit
- `⚪ QR only` — чекин без wearable
- `—` — нет данных

В side panel члена: блок "Workout quality" — средняя интенсивность за последние 4 недели
(tiny bar chart 1–4), процент занятий с wearable, "Avg. effort: Level 3".

### W.5 — Intensity declining → Morning Briefing сигнал

Новый тип алерта рядом с "inactive 14+ days": "Workout quality dropping".
Триггер: средняя интенсивность упала на ≥1 уровень за последние 4 недели.
Питч для gym owner: "Maria still comes 3×/week but her effort scores dropped from
Level 3 to Level 1 — potential early burnout or injury signal."

Это то, чего не может дать ни одна конкурирующая система без wearable.

### W.6 — Member app онбординг "Connect your health app"

Шаг между регистрацией и главным экраном:
"Connect your Apple Watch, Fitbit or Garmin to earn effort-verified bonus points."
Skip option: "I'll use QR check-in only — I still earn base points."
После connect → объяснение level система (1–4 = 100/150/200/250 pts).

---

## 4. Оставшийся продуктовый беклог

### 2.1 Payout-Checker

Студия подключена к 2–3 агрегаторам и никто не сверяет их отчёты с собственными данными.
USC говорит «412 визитов», чек-ины показывают 437 → недополученные выплаты, которые никто не ловит.
Питч: *«Мы нашли €138 невыплат за прошлый месяц»* — это не атрибуция, а факт.
Демо: карточка в AggregatorHub с "Payout audit" блоком (уже в демо!), но без claim-list
экспорта (locked Growth+).

### 2.3 Pause statt Kündigung

В DACH юридически признана пауза членства (Stilllegung — травма, беременность, командировка).
Автоматический save-оффер: «Не расторгай — заморозь на 2 месяца бесплатно».
Замыкает цепочку: Churn Window → Pause offer → Win-back.
Демо: вторая кнопка «Offer pause» в NudgeModal рядом с nudge.

### 3.1 Churn-Check CSV (настоящий)

Сейчас слайдер-калькулятор. Настоящий upload с client-side парсингом (без бекенда).
DSGVO-позиция: «ваши данные не покидают браузер» — снимает главный барьер для немецкого
владельца. Поддержать Eversports CSV + generic mapper.

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

## 5. Демо-беклог (обещано в pricing, отсутствует)

- [ ] **Setup Wizard** — форма перед дашбордом (новый, высокий приоритет)
- [ ] **W.4** — wearable колонка в Members table + side panel intensity
- [ ] **W.5** — intensity declining сигнал в Morning Briefing
- [ ] **W.6** — "Connect health app" onboarding шаг в member app
- [ ] **Churn-Check upload** — реальный CSV-анализ (слайдер → настоящий)
- [ ] **Consent Manager** — в Settings (продаваемая DSGVO-фича)
- [ ] **Multi-location** — location-switcher в sidebar как "Soon"
- [ ] **Review & Referral (B2B)** — управление кампанией на стороне gym owner
- [ ] **Benchmark-тизер** в Analytics
- [ ] **Pause statt Kündigung** в NudgeModal

---

## 6. Выполнено (справка)

| | Фича | Дата |
|---|------|------|
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
