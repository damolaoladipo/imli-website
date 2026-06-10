# feat-0020: Mobile experience — navbar, footer, homepage

## Summary

Bring the **mobile experience** of the global **navbar** (`HeroHeader`), **footer** (`ImiliFooter`), and **homepage** (`app/page.tsx` + mounted IMILI sections) to **industry-standard** quality: readable type, adequate touch targets, usable navigation drawer, stacked layouts without horizontal overflow, and consistent section rhythm.

**Scope:** Responsive behavior only — **no** new routes, copy, or desktop layout changes unless required to fix mobile breakage.

**App:** root Next.js site (`imil-institute` package).

**Normative decisions:** [Scope](#d1--in-scope), [Out of scope](#d2--out-of-scope), [Breakpoints](#d3--breakpoints--qa-viewports), [Standards](#d4--industry-standards-applied), [Navbar mobile](#d5--navbar-mobile), [Footer mobile](#d6--footer-mobile), [Homepage mobile](#d7--homepage-mobile), [Acceptance](#acceptance-criteria).

**Related specs (do not redesign desktop):**

| Spec | Relation |
| ---- | -------- |
| [feat-0002](../feat-0002/PRODUCT.md) | Mega-menu desktop + mobile nested links |
| [feat-0017](../feat-0017/PRODUCT.md) | Footer pixel layout @ desktop |
| feat-0003–0007 | Individual section desktop references |

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Navbar → footer → homepage sections |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | Next.js, Tailwind breakpoints, a11y APIs |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. **Mobile** = viewports **&lt; 1024px** (`lg` breakpoint) unless a rule names a smaller tier.
2. Desktop (`lg+`) mega-menu and footer **two-column** layouts from feat-0002 / feat-0017 stay **unchanged** except shared tokens (e.g. logo scale) that apply at all sizes.
3. Homepage sections on `/` today: `BentoHeroSection`, `AboutUs`, `ServicesCarousel`, `ArticleCardGrid`, `TestimonialsCarousel` (per `app/page.tsx`).
4. `ImiliFooter` is the active global footer via `components/custom/footer.tsx`.
5. No new npm dependencies for drawer/accordion — use existing Radix patterns already in repo or lightweight React state + CSS.

---

## Problem

### Current gaps (code audit 2026-06-10)

| Area | Issue |
| ---- | ----- |
| **Logo** | `w-56` (~224px) in `logo.tsx` and `ImiliFooter` — dominates narrow viewports |
| **Navbar** | Mobile menu expands **in document flow** (pushes page); not overlay/drawer |
| **Navbar** | All dropdown child links **always visible** when menu open — no accordion per [feat-0002 §Mobile](../feat-0002/PRODUCT.md#mobile) |
| **Navbar** | Duplicate `Contact us` buttons; scrolled state hides mobile CTA (`isScrolled && hidden` + `lg:inline-flex`) |
| **Navbar** | Menu toggle lacks `aria-expanded` / `aria-controls`; no `body` scroll lock |
| **Navbar** | `py-6` bar + oversized logo → excessive header height on 375px |
| **Footer** | `pt-[68px]` and `text-[21px]` links — workable but heavy; newsletter button not full-width on xs |
| **Footer** | Link columns always expanded — long scroll on small screens (acceptable; optional accordions **out of scope** unless QA fails) |
| **BentoHeroSection** | `h-[619px]` bento grid at **all** breakpoints — cells too small / cramped &lt; `lg` |
| **TestimonialsCarousel** | `px-14` + `text-[51px]` heading + header/nav on one row — overflow / tiny tap targets on 375px |
| **ServicesCarousel** | `text-[45px]` heading; carousel nav **commented out** on all sizes |
| **ArticleCardGrid** | `py-32` + `text-[48px]` heading — excessive mobile padding/type |
| **AboutUs** | `py-32` always; centered text on mobile (ok) but no `sm:` padding scale (`sm:px-50` nonstandard) |
| **layout** | `overflow-x-hidden` on `main` masks symptoms — fix root causes in sections |

**Goal:** At **375px** and **390px** widths, no horizontal scroll, usable nav and footer, readable headings, tappable controls, and homepage sections that stack cleanly.

---

## D1 — In scope

| # | Deliverable |
| - | ----------- |
| 1 | Mobile navbar drawer pattern in `components/custom/header.tsx` |
| 2 | Mobile footer layout/tap/spacing in `components/custom/imili/ImiliFooter.tsx` |
| 3 | Responsive pass on homepage sections wired in `app/page.tsx` |
| 4 | Shared mobile tokens: logo scale, horizontal padding, section vertical rhythm, heading scale |
| 5 | Accessibility: focus trap, escape, `aria-expanded`, 44px touch targets |

---

## D2 — Out of scope

| Item | Reason |
| ---- | ------ |
| New pages or nav items | Not a content change |
| Desktop mega-menu geometry changes | feat-0002 owns desktop |
| feat-0019 `ForestFooter` | Separate footer variant |
| Native app / Expo | Web only |
| Performance / Core Web Vitals tuning | Separate feat unless blocking |
| Footer column accordions | Optional enhancement — only if product requests after v1 QA |
| IMILI production copy swap | Layout QA strings unchanged |

---

## D3 — Breakpoints & QA viewports

Use **Tailwind v4 defaults**:

| Token | Min width | Primary QA device |
| ----- | --------- | ----------------- |
| default | 0 | iPhone SE 375×667 |
| `sm` | 640px | — |
| `md` | 768px | iPad mini portrait |
| `lg` | 1024px | Desktop split (nav drawer **off**) |

**Mandatory manual QA widths:** **375**, **390**, **768** (portrait).

---

## D4 — Industry standards applied

Normative targets (WCAG 2.2 / common mobile web practice):

| Standard | Requirement |
| -------- | ----------- |
| Touch target | Interactive controls **≥ 44×44 CSS px** (spacing or `min-h/min-w`) |
| Body text | **≥ 16px** on inputs (avoids iOS zoom-on-focus) |
| Horizontal overflow | **None** at 375px on `/`, header, footer |
| Mobile primary nav | **Overlay drawer** or full-width panel; **not** in-flow push layout |
| Scroll lock | `document.body` overflow hidden while mobile nav open |
| Keyboard | `Escape` closes drawer; focus moves to first link on open, toggle on close |
| Motion | Respect `prefers-reduced-motion: reduce` (no slide animation or `behavior: auto`) |
| Safe area | Pad drawer/header with `env(safe-area-inset-*)` on supporting devices |
| Carousel | Horizontal scroll + **optional** `scroll-snap`; show **peek** of next card (~16px) |

---

## D5 — Navbar mobile

Applies to `components/custom/header.tsx` and `components/custom/logo.tsx` @ `lg:hidden` / max `lg`.

### D5.1 — Logo scale

| Breakpoint | Logo width |
| ---------- | ---------- |
| default | `w-36` (144px) |
| `sm` | `w-40` (160px) |
| `lg+` | `w-56` (224px) — unchanged |

Implement via responsive classes on `Logo` (prop or default classes).

### D5.2 — Header bar height

| Token | @ mobile | @ lg |
| ----- | -------- | ---- |
| Vertical padding | `py-3` | `py-6` (scrolled: `py-3`) |
| Sticky | keep `sticky top-0 z-50` | same |

### D5.3 — Mobile drawer (replaces in-flow panel)

When menu open @ `lg:hidden`:

| Behavior | Spec |
| -------- | ---- |
| Backdrop | `fixed inset-0 z-40 bg-black/40` — tap closes |
| Panel | `fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl` — slide from right |
| Scroll | Panel content `overflow-y-auto`; **body** scroll locked |
| Toggle | `aria-expanded={menuState}` `aria-controls="mobile-nav-drawer"` |
| Close | X button, backdrop tap, `Escape`, link navigation (`onNavigate`) |
| Focus | On open: focus first focusable in drawer; on close: return focus to menu button |

### D5.4 — Nested nav accordion

Per [feat-0002 §Mobile](../feat-0002/PRODUCT.md#mobile):

| Behavior | Spec |
| -------- | ---- |
| Items **with** `dropdown` | Parent row = button with chevron; **collapsed by default** |
| Tap parent | Expands **only** that section’s child links (no mega-menu images on mobile) |
| Items **without** `dropdown` | Single `Link` row |
| Child links | Reuse `HeaderMegaMenuLink` `variant="mobile"` |
| External links | `target="_blank"` `rel="noopener noreferrer"` |

### D5.5 — Contact CTA in drawer

| Rule | Spec |
| ---- | ---- |
| Count | **One** `Contact us` button in mobile drawer footer |
| Remove | Duplicate scroll-gated desktop-only pair inside mobile drawer |
| Placement | Bottom of drawer panel, full width @ xs |
| Touch | `min-h-11` |

### D5.6 — Desktop unchanged

`lg:block` `NavigationMenu` + `HeaderMegaMenuPanel` — **no** changes to panel width, images, or trigger styles.

---

## D6 — Footer mobile

Applies to `components/custom/imili/ImiliFooter.tsx` @ `&lt; lg`.

### D6.1 — Spacing & type

| Token | Mobile (`default`) | `lg+` (keep current) |
| ----- | ------------------ | -------------------- |
| Section top padding | `pt-12` | `pt-[68px]` |
| Section bottom padding | `pb-8` | `pb-7` |
| Column gap | `gap-8` | `gap-10` / `gap-16` |
| Link text | `text-base` (16px) | `text-[21px]` |
| Column headings | `text-lg font-semibold` | `text-[22px]` |
| Newsletter heading | `text-xl` | `text-[28px]` |
| Newsletter body | `text-base` | `text-[20px]` |

### D6.2 — Logo

Same scale as [D5.1](#d51--logo-scale): `w-36 sm:w-40 lg:w-56`.

### D6.3 — Newsletter row

| Breakpoint | Layout |
| ---------- | ------ |
| `&lt; sm` | Input **full width**; Subscribe button **full width** below (`flex-col gap-3`) |
| `sm+` | Existing row (`flex-row`) |

Input: `text-base` (16px) minimum.

### D6.4 — Social icons

Keep `size-[50px]` (meets touch target). Row `flex-wrap gap-3`.

### D6.5 — Bottom bar

| Breakpoint | Layout |
| ---------- | ------ |
| `&lt; sm` | Copyright stack → bottom links wrap → scroll-to-top **right-aligned** |
| `sm+` | Keep current `flex-row justify-between` |

Scroll-to-top: keep `size-14` (56px).

---

## D7 — Homepage mobile

Applies to sections in `app/page.tsx`. Use shared tokens:

```text
Section horizontal padding:  px-4 sm:px-6 lg:px-14 (or container mx-auto px-4)
Section vertical padding:    py-12 md:py-20 lg:py-32
Section heading scale:       text-2xl sm:text-3xl md:text-4xl lg:[desktop spec px]
```

Per-section rules:

### D7.1 — `BentoHeroSection`

| @ `&lt; lg` | Spec |
| ----------- | ---- |
| Layout | Single column: copy stack **then** bento grid below |
| Bento grid height | `h-auto min-h-[320px]` — **remove** fixed `h-[619px]` |
| Grid columns | `grid-cols-1` @ `&lt; md`; `grid-cols-2` @ `md` |
| Headline | `text-3xl sm:text-4xl` (not `lg:text-7xl` only at lg) |
| Section padding | `py-12 md:py-20 lg:py-20` |

### D7.2 — `AboutUs`

| @ mobile | Spec |
| -------- | ---- |
| Padding | `py-12 md:py-20 lg:py-32`; `px-4 sm:px-6` (drop `sm:px-50`) |
| Text | Keep center @ mobile, left @ `lg` |
| Image | `w-full max-h-80 rounded-md object-cover` |

### D7.3 — `ServicesCarousel`

| @ `&lt; lg` | Spec |
| ----------- | ---- |
| Heading | `text-2xl sm:text-3xl lg:text-[45px]` |
| Section padding | `py-12 lg:py-[68px]` |
| Cards | Horizontal scroll row with `snap-x snap-mandatory`; card `w-[min(100%,340px)] shrink-0 snap-start` |
| Nav buttons | Uncomment @ `lg` only; @ mobile rely on swipe scroll (no tiny header buttons) |
| Track padding | `px-4 sm:px-6` |

### D7.4 — `ArticleCardGrid`

| @ `&lt; lg` | Spec |
| ----------- | ---- |
| Heading | `text-2xl sm:text-3xl lg:text-[48px]` |
| Description | `text-base lg:text-[20px]`; left align (drop `lg:text-right` below lg) |
| Section padding | `py-12 lg:py-32` |
| Cards | `grid-cols-1` @ default; `md:grid-cols-2`; `lg:grid-cols-3` |

### D7.5 — `TestimonialsCarousel`

| @ `&lt; lg` | Spec |
| ----------- | ---- |
| Header | **Stack**: badge + heading block **above** nav buttons (`flex-col gap-4`) |
| Horizontal padding | `px-4 sm:px-6 lg:px-14` (replace fixed `px-14`) |
| Heading | `text-2xl sm:text-3xl lg:text-[51px]` |
| Nav buttons | Row below heading @ mobile; `size-11` minimum |
| Cards | Keep horizontal scroll; `pl-4` peek; card widths unchanged @ lg |
| Section padding | `py-12 lg:py-32` |

### D7.6 — `app/page.tsx`

| Rule | Spec |
| ---- | ---- |
| Structure | Keep fragment; optional wrapper **not required** if sections self-pad |
| Order | No change unless product requests |
| `main` | Keep `overflow-x-hidden` as safety net |

---

## Acceptance criteria

### Global

- [ ] No horizontal scrollbar at **375px** on `/`, header, or footer
- [ ] All tap targets ≥ **44px** on mobile nav, footer social, carousel controls
- [ ] `npm run build` passes

### Navbar

- [ ] @ `&lt; lg`: menu opens **drawer** with backdrop; body does not scroll behind
- [ ] `aria-expanded` toggles on menu button
- [ ] `Escape` closes drawer
- [ ] Dropdown sections **accordion** — collapsed until tapped
- [ ] Exactly **one** Contact CTA visible in mobile drawer
- [ ] Logo `w-36` @ 375px

### Footer

- [ ] Columns stack single column @ `&lt; lg`
- [ ] Newsletter input + button full width @ `&lt; sm`
- [ ] Link text **16px** @ mobile

### Homepage

- [ ] Bento grid not fixed 619px height @ mobile
- [ ] Testimonials header stacks @ mobile; padding `px-4`
- [ ] Section headings scale down @ mobile (no 45–51px @ 375px)
- [ ] Services cards swipeable row @ `&lt; lg`

---

## Open questions

1. **Drawer side** — right (specified) vs left — confirm with product.
2. **Footer accordions** — collapse Pages / Information / Contact on mobile?
3. **Services carousel arrows** — show on `md` tablet or swipe-only until `lg`?
