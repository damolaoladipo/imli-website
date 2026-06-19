# feat-0023: Homepage motion & micro-interactions

## Summary

Add **consistent scroll reveals** and **hover/focus micro-interactions** to every section and child component rendered on `/` via [`app/page.tsx`](../../app/page.tsx).

**Scope:** `components/custom/imili/*`, `components/custom/about-us.tsx`, shared motion utilities. **No copy or layout changes** — motion only.

**Parent:** [feat-0001](../feat-0001/PRODUCT.md) homepage section order.

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | SPECIFY → implement per [TASKS.md](./TASKS.md) |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | One section per PR slice |
| [performance-optimization](../../.agents/skills/performance-optimization/SKILL.md) | `whileInView` once, GPU-friendly transforms |

---

## Problem

| Today | Gap |
| ----- | --- |
| Homepage sections mount **statically** — no entrance motion | Feels flat vs. peer institute sites |
| `CustomButton` already uses `framer-motion` scale on hover/tap | Motion language not shared across sections |
| Legacy `components/blocks/*` use ad-hoc `motion` variants | No shared tokens; IMILI sections inconsistent |
| Carousels use CSS `transition-opacity` only on nav | Nav buttons lack press feedback; cards don’t reveal on scroll |
| `ArticleCard` has CSS `group-hover` on arrow pill only | Image, title, and card shell lack coordinated motion |

**Goal:** One motion system, applied per section on `/`, respecting `prefers-reduced-motion`.

---

## Homepage inventory (`app/page.tsx`)

Current render tree — **refresh 2026-06-11** (verify against [`app/page.tsx`](../../app/page.tsx) before implement):

| # | Section component | Data export | Child components | Client? |
| - | ----------------- | ----------- | ---------------- | ------- |
| 1 | `BentoHeroSection` | `bentoHeroHomepageContent` | `BentoPhotoTile`, `BentoClassroomTile`, `BentoTestimonialTile`, `BentoStatTile`, `CustomButton` | partial (`CustomButton` only) |
| 2 | `AboutUs` | `imiliHomepageAbout` (props) | `CustomButton`, `next/image` | yes |
| 3 | `ServicesCarousel` | `servicesReferenceContent` today — swap to `servicesHomepageContent` when [feat-0018](../feat-0018/PRODUCT.md) lands | `ServiceCard` | yes |
| 4 | `ArticleCardGrid` | `articleCardGridHomepageContent` | `ArticleCard` | no |
| 5 | `TestimonialsCarousel` | `testimonialsHomepageContent` | `TestimonialCardStandard`, `TestimonialCardFeatured` | yes |

**Not on `/` (no motion in v1):** `MissionSection`, `CurvedHeroSection`, `NewsBlogSection`, and other `imili/*` blocks.

**Layout chrome (wraps every `/` visit — [feat-0024](#layout-chrome-feat-0024)):**

| Component | File | v1 |
| --------- | ---- | -- |
| `HeroHeader` | `components/custom/header.tsx` | Deferred |
| `MobileNavDrawer` | `components/custom/mobile-nav-drawer.tsx` | Deferred |
| `ForestFooter` | `components/custom/forest-footer.tsx` → `ForestFooter` | Deferred |
| `ImiliFooter` | `components/custom/footer.tsx` | Deferred |

`app/layout.tsx` renders **both** footers today — motion for those surfaces is **feat-0024**, not feat-0023.

---

## Motion principles (normative)

| Rule | Detail |
| ---- | ------ |
| **Tone** | Calm, institutional — subtle fades and 8–24px Y shifts. No bounce, spin, or parallax > 12px. |
| **Library** | `framer-motion` ^12 (already in `package.json`) |
| **Trigger** | Hero: mount (`initial` → `animate`). Below fold: `whileInView` once (`viewport: { once: true, amount: 0.2 }`). |
| **Stagger** | Child lists: 0.06–0.1s between siblings; max total stagger ~0.4s. |
| **Duration** | 0.35–0.55s for reveals; 0.15–0.2s for hover/tap. |
| **Easing** | `[0.22, 1, 0.36, 1]` (ease-out) for enters; spring only on buttons (`CustomButton` pattern). |
| **Reduced motion** | `@media (prefers-reduced-motion: reduce)` → opacity-only or no animation; use `useReducedMotion()` from framer-motion. |
| **Performance** | Animate `opacity`, `transform` only. No `width`/`height`/`top` animations. |
| **Accessibility** | Preserve focus rings; motion must not trap focus or delay interaction. Auto-advance must expose a **Pause** control (see [S5 auto-advance](#auto-advance-product-yes)). |

---

## Architecture recommendations (v1 normative)

| Topic | Rule |
| ----- | ---- |
| **Single token file** | All new motion uses `lib/motion.ts`. `CustomButton` keeps its spring — do not refactor in v1; nav uses `navHover` / `navTap` from `lib/motion.ts`. |
| **LazyMotion** | Wrap animated homepage sections in `LazyMotion` + `domAnimation` only if bundle audit shows regression; default: direct `motion` imports (already tree-shaken). |
| **Hydration** | Client sections: use `initial={false}` on first paint when `useReducedMotion()` is true; otherwise `initial="hidden"` + `animate` / `whileInView`. Avoid animating above-fold hero on SSR mismatch — hero runs `animate` after mount only. |
| **`main` overflow** | `app/layout.tsx` uses `overflow-x-hidden` on `<main>`. Card lift uses `translateY` only (max 4px) — do not animate `translateX` on cards. If clip occurs in QA, add `overflow-visible` on section roots, not on `main`. |
| **Hover gating** | Pointer hovers (card lift, image zoom, tile scale) apply only inside `@media (hover: hover) and (pointer: fine)` or Framer `whileHover` guarded by `!reduced` — touch users see static cards. |
| **Focus-visible** | Keyboard users get same affordances as hover where possible (`group-focus-visible:` mirrors `group-hover:` on `ArticleCard` arrow + title). |

---

## Global motion tokens

Centralize in `lib/motion.ts` (create in implement):

| Token | Value |
| ----- | ----- |
| `fadeUp` | `hidden: { opacity: 0, y: 20 }` → `visible: { opacity: 1, y: 0 }` |
| `fadeIn` | `hidden: { opacity: 0 }` → `visible: { opacity: 1 }` |
| `staggerContainer` | `staggerChildren: 0.08`, `delayChildren: 0.05` |
| `viewportDefault` | `{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }` |
| `durationReveal` | `0.45` |
| `durationHover` | `0.18` |
| `cardHover` | `y: -4`, `transition: { duration: 0.18 }` |
| `navPress` | `scale: 0.94` while tap (match `CustomButton` tap `0.98` for primary CTAs, `0.94` for icon circles) |

---

## Product decisions (locked)

| # | Decision | Normative choice |
| - | -------- | ---------------- |
| 1 | Testimonial carousel auto-advance when in view? | **Yes** — see [S5 auto-advance](#s5--testimonialscarousel--cards) |
| 2 | Unify carousel nav button visuals (Services vs Testimonials)? | **Yes** — **Services dashed-ring** style is canonical for both carousels; see [Shared carousel nav](#shared-carousel-nav-buttons) |
| 3 | About image parallax on desktop? | **No** in v1 (unchanged) |

---

## Shared carousel nav buttons

**Canonical visual** (from `ServicesCarousel` today — apply to **Services** and **Testimonials**):

| Property | Value |
| -------- | ----- |
| Size | `size-11` mobile, `lg:size-[62px]` desktop |
| Shape | `rounded-full` |
| Border | `border border-dashed border-[#111111]/25` |
| Background | `bg-transparent` |
| Icon color | `text-[#111111]` |
| Icons | `ArrowLeft` / `ArrowRight` from `lucide-react`, `strokeWidth={1.5}`, `size-5` (not `Chevron*`) |
| Hover (CSS) | `hover:opacity-80` |
| Motion | `whileHover` scale `1.04`, `whileTap` scale `0.94` per [nav spec](#nav-button-motion) |

**Implement via:** shared `CarouselNavButton` in `components/custom/imili/CarouselNavButton.tsx` (see [TECH](./TECH.md#7-carouselnavbutton--shared)).

**Testimonials change:** replace filled `bg-[#EBEBEB]` pills + `ChevronLeft`/`ChevronRight` with canonical dashed-ring + thin arrows.

### Nav button motion

| State | Behavior |
| ----- | -------- |
| Hover | `opacity: 0.8` + `scale: 1.04` |
| Tap | `scale: 0.94` |
| Focus-visible | existing focus ring / outline unchanged |

---

## Section specs

### S1 — `BentoHeroSection` (feat-0007)

**File:** `components/custom/imili/BentoHeroSection.tsx` + bento tiles.

| Element | Motion | Trigger |
| ------- | ------ | ------- |
| Section | — | No full-section fade (hero is above fold) |
| Left: `h1` | `fadeUp`, delay `0` | `animate` on mount |
| Left: subhead | `fadeUp`, delay `0.08` | mount |
| Left: `CustomButton` | existing spring hover/tap | — |
| Left: feature card (`rounded-[23px]`) | `fadeUp`, delay `0.16` | mount |
| Right: bento grid | `staggerContainer` | mount |
| Each bento tile | `fadeUp` per child variant | stagger 0.08s |

**Bento tile micro-interactions** (`BentoPhotoTile`, `BentoClassroomTile`, `BentoTestimonialTile`, `BentoStatTile`):

| Interaction | Behavior |
| ----------- | -------- |
| Hover (pointer) | `scale: 1.02`, image inner `scale: 1.04` (clip overflow), `durationHover` |
| Focus-within | Same as hover for keyboard |
| Reduced motion | Hover scale disabled |

**Do not animate:** grid background lines, radial gradient overlay.

---

### S2 — `AboutUs`

**File:** `components/custom/about-us.tsx` (already `"use client"`).

| Element | Motion | Trigger |
| ------- | ------ | ------- |
| Text column | `fadeUp` | `whileInView` |
| `h2` | child of stagger | stagger `0.06` |
| Description | child of stagger | stagger |
| `CustomButton` | existing | — |
| Image | `fadeUp` + `x: 24 → 0` from right (lg); `y` only on mobile | `whileInView`, delay `0.1` |

**Micro-interaction:** image `hover:scale-[1.02]` inside `overflow-hidden rounded-md` wrapper (CSS or motion).

---

### S3 — `ServicesCarousel` + `ServiceCard`

**Files:** `ServicesCarousel.tsx`, `ServiceCard.tsx`.

#### Section chrome

| Element | Motion |
| ------- | ------ |
| Badge pill | `fadeUp` |
| `h2` | `fadeUp`, delay `0.06` |
| Nav buttons (when `showScroll`) | `fadeIn`, delay `0.12` |

#### Nav buttons

Use [shared carousel nav](#shared-carousel-nav-buttons) (`CarouselNavButton`). Shown when `showScroll` (`items.length > 3`) on desktop (`lg:flex`).

#### Nav button motion

Same as [shared nav motion](#nav-button-motion).

#### `ServiceCard` (each card)

| Element | Motion |
| ------- | ------ |
| Card shell (`article`) | `fadeUp` on scroll into view; stagger by index `index * 0.06` |
| Hover | `y: -4`, shadow `0 12px 40px rgba(0,0,0,0.06)` (add `shadow-sm` → `shadow-md` transition) |
| Icon container | `scale: 1.05` on card hover |
| CTA pill | `gap` arrow optional: translate-x `0 → 2px` on hover |
| Illustration | `opacity: 0.2 → 0.28` on card hover |

**Grid mode (`items.length ≤ 3`):** stagger cards in grid; nav hidden.

**Scroll track mode (`items.length > 3`):** cards `whileInView` individually; horizontal scroll unchanged. Homepage with **4** What We Do items uses scroll track + desktop nav.

#### Responsive carousel nav (Services + Testimonials)

| Breakpoint | Services (`showScroll`) | Testimonials |
| ---------- | ------------------------ | ------------ |
| `< lg` | Nav **hidden** — touch swipe + `snap-x` only | Nav **visible** (`flex gap-2`) — same `CarouselNavButton` at `size-11` |
| `≥ lg` | Nav visible when `showScroll` | Nav visible at `lg:size-[62px]` |

**v1:** Do not hide testimonial nav on mobile (differs from Services). Optional feat-0024: align visibility rules.

**Mobile motion:** Nav buttons still get `whileTap` scale; no auto-advance behavior change on mobile.

---

### S4 — `ArticleCardGrid` + `ArticleCard`

**Files:** `ArticleCardGrid.tsx`, `ArticleCard.tsx`.

`ArticleCardGrid` must become `"use client"` or wrap animated children in a client subcomponent.

#### Section chrome

| Element | Motion |
| ------- | ------ |
| Badge + icon | `fadeUp` |
| Heading + description row | `staggerContainer`, children `fadeUp` |

#### Grid wrapper

| Element | Motion |
| ------- | ------ |
| Each card wrapper (`rounded-[20px] bg-[#FAF7F2]`) | `fadeUp`, stagger `index * 0.07` (continues across rows — card 4 delay 0.21s, card 5 delay 0.28s) |

**5-card layout:** `lg:grid-cols-3` → row 1 (3) + row 2 (2). Stagger is **index-based**, not row-based.

#### `ArticleCard` micro-interactions

| Element | Behavior |
| ------- | -------- |
| Image | `group-hover:scale-105` with `transition-transform duration-500` inside `overflow-hidden rounded-[20px]` |
| Arrow circle | keep existing color transition; add `group-hover:translate-x-0.5` |
| Title | `group-hover:text-[#0548bd]` when contrast passes; mirror with `group-focus-visible:text-[#0548bd]` |
| Card wrapper hover | `y: -3` on outer cream shell — **only** `@media (hover: hover)` |

External links: no change to `target` / `rel`.

---

### S5 — `TestimonialsCarousel` + cards

**Files:** `TestimonialsCarousel.tsx`, `TestimonialCardStandard.tsx`, `TestimonialCardFeatured.tsx`.

#### Section chrome

| Element | Motion |
| ------- | ------ |
| Badge | `fadeUp` |
| `h2` lines | `fadeUp`, stagger `0.06` |
| Nav buttons | [Shared carousel nav](#shared-carousel-nav-buttons) + [nav motion](#nav-button-motion) |

#### Auto-advance (product: **yes**)

When the testimonials **section** is in view, the track auto-scrolls forward on an interval.

| Rule | Value |
| ---- | ----- |
| Trigger | `IntersectionObserver` on section root — `isIntersecting` && `intersectionRatio >= 0.35` |
| Interval | **5000 ms** between advances |
| Step | Same as manual next: `scrollBy({ left: SCROLL_STEP, behavior: "smooth" })` |
| Loop | At `scrollLeft + clientWidth >= scrollWidth - 4`, reset to `0` (or scroll to start smoothly) |
| Pause | While pointer is over section **or** section contains `:focus-within` **or** user clicked nav **or** user clicked **Pause** **or** `document.visibilityState === "hidden"` |
| Resume | **5000 ms** after pause ends (debounced) |
| Reduced motion | **Disabled** — no auto-advance when `useReducedMotion()` is true |
| `prefers-reduced-motion: reduce` | No interval; manual nav only |
| **Pause control (WCAG 2.2.2)** | Visible **Pause / Resume** toggle beside nav on `lg+`; `aria-pressed` on button; labels `"Pause testimonials"` / `"Resume testimonials"` |
| Accessibility | `aria-live="polite"` on track region when auto-advancing; **do not move focus** on auto-advance |
| **Initial offset (lg)** | On mount, apply `INITIAL_SCROLL_OFFSET` once, then start auto-advance timer. On loop-to-start, scroll to `0` (not offset) — next manual next returns normal step behavior |
| **End detection** | `scrollLeft + clientWidth >= scrollWidth - 8` → `scrollTo({ left: 0, behavior: "smooth" })` |

#### Carousel track

| Element | Motion |
| ------- | ------ |
| Each card | `fadeUp` when entering viewport (`whileInView` on card, `amount: 0.3`) |
| Featured card | same + image subtle `scale` on hover `1.02` inside clip |

#### `TestimonialCardStandard` hover

| State | Behavior |
| ----- | -------- |
| Hover | `bg-[#F2F2F2]` → `bg-[#EAEAEA]`, `y: -2`, `durationHover` |

**Do not change:** initial `scrollLeft` offset logic on lg (`INITIAL_SCROLL_OFFSET`).

---

### S6 — Shared primitives (already implemented)

| Component | Motion today | Action |
| --------- | ------------ | ------ |
| `CustomButton` | `scale` hover `1.02`, tap `0.98`, spring | **Keep** — reference for nav spring values |
| `ArticleCard` arrow pill | CSS `group-hover` | Extend per S4; don’t remove |

---

## `prefers-reduced-motion` (required)

```ts
const shouldReduceMotion = useReducedMotion();

const variants = shouldReduceMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : fadeUpVariants;
```

- Disable: `y` shifts, scale hovers, image zoom, stagger delays > 0.
- Keep: opacity fades ≤ 0.2s or skip entirely if product prefers instant mount.

---

## Acceptance criteria

- [ ] `lib/motion.ts` exports shared variants + viewport config
- [ ] All **5** `app/page.tsx` sections have documented entrance motion (S1–S5)
- [ ] All **child card/tile** components listed in inventory have hover/focus micro-interactions
- [ ] `useReducedMotion` honored — no transform animation when user prefers reduced motion
- [ ] Hover-only effects gated — no sticky hover on touch (`hover: hover` or equivalent)
- [ ] No layout shift (CLS): animations use transform/opacity only; card lift ≤ 4px
- [ ] `npm run build` passes
- [ ] Manual QA @ 1440 and 375 — motion visible but not distracting
- [ ] `CarouselNavButton` **required** — Services + Testimonials use dashed-ring + `ArrowLeft`/`ArrowRight`
- [ ] Testimonials auto-advance when section ≥35% in view; pauses on hover/focus/visibility hidden; off when reduced motion
- [ ] Testimonials **Pause / Resume** control visible on `lg+` with `aria-pressed`
- [ ] Auto-advance loop + `INITIAL_SCROLL_OFFSET` behave per [S5](#auto-advance-product-yes)
- [ ] `ArticleCard` focus-visible mirrors hover on arrow + title
- [ ] No card clip from `main overflow-x-hidden` during lift QA

---

## Layout chrome (feat-0024)

Deferred to a follow-up spec (folder TBD). Minimum scope when written:

| Surface | Recommended motion |
| ------- | -------------------- |
| `HeroHeader` | Sticky height/padding transition (already CSS); mega-menu fade + `y` slide; logo subtle fade |
| `MobileNavDrawer` | Slide-in panel + backdrop fade; accordion chevron rotate |
| `ForestFooter` / `ImiliFooter` | Section `whileInView` fade; social icon hover scale; newsletter input focus ring (no layout animation) |

feat-0023 **must not block** on feat-0024.

---

## Out of scope (v1)

| Item | Notes |
| ---- | ----- |
| `HeroHeader` sticky shrink / mega-menu motion | [feat-0024](#layout-chrome-feat-0024) |
| `ImiliFooter` / `ForestFooterSection` / `MobileNavDrawer` | [feat-0024](#layout-chrome-feat-0024) |
| Page-level scroll snapping or smooth-scroll hijacking | — |
| Auto-advance on **Services** carousel | — (testimonials only) |
| Lottie, Rive, or video backgrounds | — |
| Changing section order or removing sections | — |
| `app/page.tsx` wrapper animations | sections own their motion |
| Refactoring `CustomButton` to `lib/motion.ts` | — |
| Automated E2E motion tests | Manual QA v1; Playwright slice optional in feat-0024 |

---

## Open questions (product)

| # | Question | Status |
| - | -------- | ------ |
| 1 | Enable subtle image parallax on `AboutUs` photo on desktop? | **No** in v1 |
| 2 | Testimonial carousel auto-advance when in view? | **Yes** — locked |
| 3 | Unify nav button style (Services dashed ring → both)? | **Yes** — locked |
| 4 | Hide testimonial nav on mobile to match Services? | **No** in v1 — testimonial nav stays visible |
| 5 | Visible Pause control for auto-advance? | **Yes** — locked (WCAG 2.2.2) |
