# feat-0021: Mobile navbar — drawer & dropdown experience

## Summary

Define and implement **industry-standard mobile navigation** for `HeroHeader`, with normative behavior for **navbar dropdowns** (About, What We Do, News) inside a **fixed overlay drawer** @ viewports **&lt; 1024px** (`lg`).

**Scope:** Mobile drawer shell, accordion dropdowns, nested child links, accessibility, and touch ergonomics. **No** desktop mega-menu changes, **no** new routes or nav data.

**App:** root Next.js site (`imil-institute` package).

**Normative decisions:** [Scope](#d1--in-scope), [Out of scope](#d2--out-of-scope), [Breakpoints](#d3--breakpoints--qa-viewports), [Drawer shell](#d4--drawer-shell), [Dropdown accordion](#d5--dropdown-accordion), [Child links](#d6--child-link-rows), [Nav mapping](#d7--per-item-behavior), [States](#d8--interaction-states), [Accessibility](#d9--accessibility), [Typography](#d10--typography--touch).

**Related specs:**

| Spec | Relation |
| ---- | -------- |
| [feat-0002](../feat-0002/PRODUCT.md) | Desktop mega-menu geometry, `headerNavItems` data model, mobile “no images” rule |
| [feat-0020](../feat-0020/PRODUCT.md) | Broader mobile pass (footer, homepage) — **drawer + accordion rules here supersede feat-0020 §D5.3–D5.5** for navbar dropdowns |
| [feat-0001](../feat-0001/PRODUCT.md) | Source of News external links and What We Do anchor hrefs |

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Drawer shell → accordion → a11y polish |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | Radix patterns, Next.js client components, WCAG touch targets |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. **Mobile** = viewports **&lt; 1024px** (`lg`). At `lg+`, [feat-0002](../feat-0002/PRODUCT.md) desktop `NavigationMenu` is unchanged.
2. Nav data remains in [`_data/imili/header-nav.ts`](../../_data/imili/header-nav.ts) — no new items or hrefs in this feat.
3. Dropdown parents on mobile are **accordion triggers**, not navigation links to parent `href` (tap expands children only).
4. No new npm packages — use existing Radix `Accordion` in `components/ui/accordion.tsx` **or** local `useState` (implementer choice; behavior must match this spec).
5. No pixel design screenshot — QA is **behavioral** @ 375 / 390 / 768 px (see [assets/README](./assets/README.md)).

---

## Problem

### Current gaps (code audit 2026-06-10)

`components/custom/header.tsx` — `MobileNavLinks`:

| # | Issue | Impact |
| - | ----- | ------ |
| 1 | Mobile menu panel is **in document flow** (`hidden` → `block` pushes page content) | Poor UX; content jumps; not industry-standard |
| 2 | All dropdown child links are **always expanded** when menu is open | Long scroll; no progressive disclosure |
| 3 | No **accordion** per [feat-0002 §Mobile](../feat-0002/PRODUCT.md#mobile) | Violates normative mobile mega-menu rule |
| 4 | Menu toggle lacks `aria-expanded`, `aria-controls` | Screen reader users cannot tell open/closed state |
| 5 | No **`body` scroll lock** while menu open | Background scrolls behind panel |
| 6 | No **`Escape`** to close | Keyboard users trapped or confused |
| 7 | No **backdrop** tap-to-close | Only X button closes |
| 8 | Duplicate **Contact us** buttons with scroll-gated visibility | Mobile drawer may show zero or two CTAs incorrectly |
| 9 | Parent nav rows with dropdown are plain `Link` to `item.href` | Tap navigates away instead of expanding children |
| 10 | `HeaderMegaMenuLink` `variant="mobile"` exists but parent UX does not match accordion pattern | Child rows OK; container behavior wrong |

**Goal:** At **375px** and **390px**, opening the hamburger shows a **fixed drawer**; dropdown sections **collapse by default** and expand on tap; child links are tappable (≥ 44px), readable, and close the drawer on navigate.

---

## D1 — In scope

| # | Deliverable |
| - | ----------- |
| 1 | Fixed overlay **drawer** + backdrop @ `lg:hidden` |
| 2 | **Accordion** for each `headerNavItems` entry with `dropdown` |
| 3 | Plain **Link** rows for items without `dropdown` |
| 4 | Reuse `HeaderMegaMenuLink` `variant="mobile"` for child links |
| 5 | Scroll lock, `Escape`, backdrop close, `aria-*` on toggle and accordion |
| 6 | Single **Contact us** CTA in drawer footer |
| 7 | `prefers-reduced-motion` respected for drawer/accordion animation |

---

## D2 — Out of scope

| Item | Reason |
| ---- | ------ |
| Desktop `NavigationMenu` / `HeaderMegaMenuPanel` | [feat-0002](../feat-0002/PRODUCT.md) |
| Footer, homepage sections | [feat-0020](../feat-0020/PRODUCT.md) |
| New nav items, copy, or routes | Content change |
| Mega-menu **images** on mobile | [feat-0002 §Mobile](../feat-0002/PRODUCT.md#mobile) — links only |
| Search field in nav | Not in repo |
| Left-side drawer | Right-side drawer is normative (feat-0020 alignment) |
| Persisting accordion open state across sessions | Reset on drawer close |

---

## D3 — Breakpoints & QA viewports

| Token | Min width | Nav behavior |
| ----- | --------- | ------------ |
| default | 0 | Drawer + accordion |
| `sm` | 640px | Same |
| `md` | 768px | Same (tablet portrait) |
| `lg` | 1024px | Desktop mega-menu only; drawer **off** |

**Mandatory manual QA widths:** **375**, **390**, **768** (portrait).

---

## D4 — Drawer shell

When hamburger is open @ `lg:hidden`:

| Token | Spec |
| ----- | ---- |
| Backdrop | `fixed inset-0 z-40 bg-black/40` — `button` or clickable overlay; tap closes drawer |
| Panel | `fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-xl` |
| Panel id | `id="mobile-nav-drawer"` — referenced by menu toggle `aria-controls` |
| Role | `role="dialog"` `aria-modal="true"` `aria-label="Main navigation"` |
| Scroll | Panel body `flex-1 overflow-y-auto`; **document body** `overflow: hidden` |
| Safe area | `padding-top: env(safe-area-inset-top)`; `padding-bottom: env(safe-area-inset-bottom)` on panel |
| Close paths | X toggle, backdrop tap, `Escape`, any child `Link` / external `a` navigation |
| Motion | Slide-in from right `transform translate-x-0` (optional `transition-transform`); disable when `prefers-reduced-motion: reduce` |
| Z-index | Backdrop `z-40`; drawer `z-50`; header bar toggle `z-20` minimum so X remains tappable |

### D4.1 — Menu toggle (hamburger / X)

| Token | Spec |
| ----- | ---- |
| Visibility | `lg:hidden` only |
| `aria-expanded` | `true` when drawer open, `false` when closed |
| `aria-controls` | `"mobile-nav-drawer"` |
| Touch target | `min-h-11 min-w-11` (44×44 CSS px) via padding hit area |
| Icon | `Menu` closed / `X` open — existing cross-fade pattern OK |

### D4.2 — Drawer layout regions

```text
┌ mobile-nav-drawer ─────────────────────┐
│  [scrollable nav region]               │
│    plain links                         │
│    accordion parents + child lists     │
├────────────────────────────────────────┤
│  [sticky footer region]                │
│    Contact us (single CustomButton)    │
└────────────────────────────────────────┘
```

| Region | Classes (indicative) |
| ------ | -------------------- |
| Scrollable | `flex-1 overflow-y-auto px-6 py-6` |
| Footer | `shrink-0 border-t border-neutral-200 p-6` |

---

## D5 — Dropdown accordion

Normative replacement for current always-expanded `MobileNavLinks` nested `<ul>`.

### D5.1 — Accordion model

| Rule | Spec |
| ---- | ---- |
| Items **with** `item.dropdown` | Parent row = **button** (not `Link`); chevron indicates expand/collapse |
| Items **without** `dropdown` | Single `Link` row — no chevron |
| Default state | **All** dropdown sections **collapsed** when drawer opens |
| Expand behavior | Tap parent toggles **only** that section |
| Multi-open | **Allowed** — multiple sections may be open simultaneously (no `type="single"` requirement) |
| Collapse on close | Reset all sections collapsed when drawer closes |
| Images | **Do not render** `dropdown.images` on mobile |

### D5.2 — Parent row (accordion trigger)

| Token | @ mobile | Tailwind (indicative) |
| ----- | -------- | --------------------- |
| Min height | 44 px | `min-h-11` |
| Width | full | `w-full` |
| Layout | flex, space-between | `flex items-center justify-between` |
| Label font | 20 px medium | `text-xl font-medium` |
| Label color | `#000000` default | `text-black` |
| Label color open | `#0548bd` | `text-[#0548bd]` when `aria-expanded="true"` |
| Chevron | `ChevronDown` 20 px | `size-5`; `rotate-180` when open |
| Chevron color | matches label | `text-black` / open `text-[#0548bd]` |
| Border | divider between top-level rows | `border-b border-neutral-100` per item or accordion item |
| `aria-expanded` | on trigger button | mirrors open state |
| `aria-controls` | id of child panel | e.g. `mobile-nav-panel-about` |

### D5.3 — Child panel (accordion content)

| Token | Spec |
| ----- | ---- |
| Container | `ul` with `role="list"` |
| Spacing | `mt-2 space-y-2 pb-4` below trigger |
| Indent | optional `pl-0` — child rows are full-width cards, not text-only indent |
| Animation | height expand/collapse; respect `prefers-reduced-motion` |
| Visibility | hidden when collapsed; no focusable children tabbable when collapsed |

### D5.4 — Implementation options (equivalent outcomes)

| Option | When to use |
| ------ | ----------- |
| **A** — Radix `Accordion` from `components/ui/accordion.tsx` | Prefer if styling overrides are straightforward |
| **B** — `useState<Record<string, boolean>>` + conditional render | Prefer if accordion default styles fight mobile nav design |

Both must satisfy [D5.1](#d51--accordion-model)–[D9](#d9--accessibility).

---

## D6 — Child link rows

Reuse `HeaderMegaMenuLink` with `variant="mobile"` ([existing component](../../components/custom/header-mega-menu-link.tsx)).

| Token | @ mobile (`variant="mobile"`) | Spec |
| ----- | ----------------------------- | ---- |
| Row min height | ≥ 44 px | entire `Link`/`a` tap target |
| Icon box | 36×36 px | `size-9` |
| Icon | 16 px | `size-4` |
| Label | 14 px semibold `#171717` | `text-sm font-semibold text-neutral-900` |
| Description | 12 px `#525252` | `text-xs text-neutral-600` |
| Hover / active | label + icon → `#0548bd` | existing `group-hover` |
| External (News) | `target="_blank"` `rel="noopener noreferrer"` | per feat-0002 |
| On navigate | `onNavigate()` closes drawer | pass from parent |

**Do not** show `dropdown.images` or `HeaderMegaMenuPanel` on mobile.

---

## D7 — Per-item behavior

Source: [`headerNavItems`](../../_data/imili/header-nav.ts).

| Nav item | Mobile pattern | Child count | Notes |
| -------- | -------------- | ----------- | ----- |
| **About** | Accordion | 2 links | About IMILI, Common questions |
| **What We Do** | Accordion | 4 links | Anchor hrefs `#research`, etc. |
| **Who We Are** | Plain link | — | `/who-we-are` |
| **News** | Accordion | 5 links | All `external: true` |
| **Gallery** | Plain link | — | `/gallery` |
| **Contact** | Plain link | — | `/contact`; also drawer footer CTA |

### D7.1 — Plain link row

| Token | Spec |
| ----- | ---- |
| Element | `Link` (not button) |
| Classes | `flex min-h-11 items-center text-xl font-medium text-black hover:text-[#0548bd]` |
| Action | Navigate + close drawer |

---

## D8 — Interaction states

### Drawer

| State | Behavior |
| ----- | -------- |
| Closed | No backdrop; drawer not in tab order; body scroll normal |
| Opening | Toggle `aria-expanded=true`; body scroll locked; focus moves to first focusable in drawer |
| Open | Backdrop visible; drawer focusable; accordion sections collapsed |
| Closing | Restore body scroll; return focus to menu toggle; collapse all accordions |

### Accordion section

| State | Trigger appearance | Content |
| ----- | ------------------ | ------- |
| Collapsed | `aria-expanded="false"`; chevron down; label black | Children not rendered or `hidden` + inert |
| Expanded | `aria-expanded="true"`; chevron up (`rotate-180`); label `#0548bd` | Child links visible and tabbable |

### Child link

| State | Appearance |
| ----- | ---------- |
| Default | Icon box + label + description |
| Hover / focus | `#0548bd` accent on label; focus ring visible (`focus-visible:ring`) |
| Active (tap) | Navigate; drawer closes |

---

## D9 — Accessibility

| Requirement | Spec |
| ----------- | ---- |
| Toggle | `aria-expanded`, `aria-controls="mobile-nav-drawer"` |
| Drawer | `role="dialog"` `aria-modal="true"` `aria-label="Main navigation"` |
| Accordion trigger | `aria-expanded`, `aria-controls` pointing to panel id |
| Focus trap | **Soft trap** — Tab cycles within drawer while open; no focus escape to page behind |
| Focus on open | First focusable: close control or first nav link/trigger |
| Focus on close | Return to hamburger button |
| Escape | Closes drawer |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — instant open/close, no accordion animation |
| Touch targets | All triggers and links ≥ 44×44 CSS px |
| External links | Visible context (label + description); opens new tab with safe `rel` |

---

## D10 — Typography & touch

| Element | Size | Weight | Color |
| ------- | ---- | ------ | ----- |
| Top-level plain link | 20 px | medium | `#000000` / hover `#0548bd` |
| Accordion parent | 20 px | medium | `#000000` / open `#0548bd` |
| Child label | 14 px | semibold | `neutral-900` |
| Child description | 12 px | regular | `neutral-600` |
| Contact CTA | per `CustomButton` | — | full width in drawer footer |

Section vertical rhythm in scrollable region: `space-y-0` with per-row `border-b` **or** `space-y-1` — choose one; must not compress below 44 px row height.

---

## Acceptance criteria

- [ ] @ 375px and 390px: hamburger opens **fixed** right drawer with backdrop — page does **not** shift in document flow
- [ ] @ 375px: no horizontal overflow in drawer
- [ ] About, What We Do, News: **collapsed by default**; tap expands child links only (no images)
- [ ] Who We Are, Gallery, Contact: single-tap navigation rows (no chevron)
- [ ] News child links open in new tab with `noopener noreferrer`
- [ ] Drawer closes on: X, backdrop, Escape, any successful link navigation
- [ ] `body` scroll locked while drawer open
- [ ] Menu toggle exposes `aria-expanded` and `aria-controls`
- [ ] Accordion triggers expose `aria-expanded`
- [ ] Exactly **one** Contact us button in drawer footer @ mobile
- [ ] @ 1024px (`lg`): desktop mega-menu unchanged; drawer and accordion **not rendered**
- [ ] `npm run build` passes

---

## Open questions (product)

| # | Question |
| - | -------- |
| 1 | Should accordion be **single-open** (opening News closes About) or **multi-open**? **Default in this spec: multi-open.** |
| 2 | Should tapping accordion parent also navigate to `item.href` (e.g. `/about`) on second tap or long-press? **Default: no — expand only.** |
| 3 | Add optional section heading above child list (e.g. “About IMILI” from feat-0002 desktop heading)? **Default: no — child link labels suffice.** |

---

## Success criteria (reframed from request)

| User request | Testable outcome |
| ------------ | ---------------- |
| “Mobile responsive navbar” | Drawer + backdrop @ &lt; lg; no layout push; safe-area padding |
| “Dropdown experience” | Accordion per dropdown parent; collapsed default; chevron + color state |
| “Industry standard” | 44px targets, scroll lock, Escape, aria-expanded, reduced motion |
