# feat-0022: Homepage sections — mobile responsiveness (left-aligned)

## Summary

Responsive pass for every section on **`/`** (`app/page.tsx`) @ viewports **&lt; 1024px** (`lg`). All section copy, badges, headings, descriptions, and CTAs must be **left-aligned** on mobile and tablet — no centered text blocks below `lg`.

**Scope:** Layout, spacing, type scale, carousel scroll behavior, and alignment only. **No** copy, route, or desktop (`lg+`) geometry changes unless required to fix mobile breakage.

**App:** root Next.js site (`imil-institute` package).

**Normative decisions:** [Global rules](#d1--global-mobile-rules), [Section order](#d2--homepage-section-order), [Per-section plans](#d3--per-section-plans), [Footer note](#d4--global-footer-note), [Acceptance](#acceptance-criteria).

**Related specs:**

| Spec | Relation |
| ---- | -------- |
| [feat-0020](../feat-0020/PRODUCT.md) | Broader mobile (navbar done; footer partial) — **alignment rules here supersede feat-0020 §D7 where they conflict** |
| [feat-0021](../feat-0021/PRODUCT.md) | Mobile navbar drawer — **done** |
| feat-0003–0007 | Desktop pixel references per section |

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Task order in [TECH.md](./TECH.md) |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | One section per PR step |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Do not implement until product approves plan |

---

## Assumptions

1. **Mobile / tablet** = `&lt; lg` (0–1023px). **Desktop** = `lg+` unchanged.
2. **Left-aligned** means `text-left`, `items-start`, `justify-start` — not `text-center`, `items-center`, `mx-auto` on text blocks (images/cards may still be full-width).
3. Carousels scroll horizontally but **section headers and intro copy** stay left-aligned above the track.
4. `main` keeps `overflow-x-hidden` as a safety net; sections should not rely on it to hide overflow.
5. Mandatory QA widths: **375**, **390**, **768** px portrait.

---

## Problem

### Current gaps (code audit 2026-06-10)

| Section | Mobile issue | Alignment issue |
| ------- | ------------ | --------------- |
| **BentoHeroSection** | Fixed `min-h-[739px]`, bento `h-[619px]` — cramped on narrow screens | Copy already left; grid needs stack |
| **AboutUs** | `py-32`, invalid `sm:px-50` | **`text-center items-center`** @ mobile — must be left |
| **ServicesCarousel** | `text-[45px]` heading, `py-[68px]` always | Header lacks consistent `px-4`; OK left but oversized |
| **ArticleCardGrid** | `py-32`, `text-[48px]` | Description uses `lg:text-right` only @ lg — OK; heading scale too large |
| **TestimonialsCarousel** | `px-14`, `text-[51px]`, header + nav on one row | Header row squeezes; not stacked @ mobile |

**Goal:** Each section readable, tappable, and **left-aligned** @ 375px with no horizontal scroll.

---

## D1 — Global mobile rules

Apply to **every** homepage section @ `&lt; lg`:

| Token | Rule | Tailwind (indicative) |
| ----- | ---- | --------------------- |
| Horizontal padding | Consistent gutter | `px-4 sm:px-6` on section or inner container |
| Vertical padding | Reduced rhythm | `py-12 md:py-20` (not `py-32` @ mobile) |
| Text alignment | **Left only** | `text-left` — never `text-center` below `lg` |
| Flex alignment | Start | `items-start justify-start` |
| Headings | Scaled ladder | `text-2xl sm:text-3xl md:text-4xl` → desktop literal @ `lg:` |
| Body copy | Minimum 16px | `text-base` @ mobile; desktop tokens @ `lg:` |
| Buttons / CTAs | Left-aligned row | `flex justify-start` (not `justify-center`) |
| Badges / pills | Left | `self-start` or default block flow — no `mx-auto` |
| Carousels | Horizontal scroll | `overflow-x-auto snap-x snap-mandatory`; track `pl-4 sm:pl-6`; card `snap-start shrink-0` |
| Carousel nav buttons | Desktop only or stacked below heading | `hidden lg:flex` or `flex lg:hidden` row under title @ mobile |

### D1.1 — Alignment anti-patterns (forbidden @ `&lt; lg`)

```text
text-center
items-center (on text/copy wrappers)
justify-center (on CTA rows)
mx-auto (on headings, badges, descriptions)
lg:text-right without text-left base
```

### D1.2 — Allowed exceptions

| Element | Why |
| ------- | --- |
| Full-width images / cards | `w-full` is fine; content inside card follows card layout |
| Carousel track | Horizontal scroll is not “centered copy” |
| Desktop @ `lg+` | Center or right align only where existing desktop spec requires |

---

## D2 — Homepage section order

From [`app/page.tsx`](../../app/page.tsx):

| # | Component | File |
| - | --------- | ---- |
| 1 | `BentoHeroSection` | `components/custom/imili/BentoHeroSection.tsx` |
| 2 | `AboutUs` | `components/custom/about-us.tsx` |
| 3 | `ServicesCarousel` | `components/custom/imili/ServicesCarousel.tsx` |
| 4 | `ArticleCardGrid` | `components/custom/imili/ArticleCardGrid.tsx` |
| 5 | `TestimonialsCarousel` | `components/custom/imili/TestimonialsCarousel.tsx` |

Implement in this order (top-of-page first).

---

## D3 — Per-section plans

### D3.1 — BentoHeroSection

**File:** `components/custom/imili/BentoHeroSection.tsx`

| Area | Today | Mobile target (`&lt; lg`) |
| ---- | ----- | ------------------------- |
| Section shell | `min-h-[739px] px-4 py-20` | `py-12 md:py-20 lg:py-20`; drop fixed min-height @ mobile |
| Layout | `flex-col` then `lg:flex-row` | Keep — copy **above** bento grid |
| Headline | `text-4xl lg:text-7xl` | `text-3xl sm:text-4xl md:text-5xl lg:text-7xl`; **`text-left`** |
| Subhead | `text-lg md:text-[21px]` | `text-base sm:text-lg`; **`text-left`** |
| CTA | `CustomButton` | Left-aligned; `justify-start` |
| Feature card | badge + body | **`text-left`**; badge `self-start` |
| Bento grid | `h-[619px] grid-cols-2` always | `h-auto min-h-0`; `grid-cols-1` @ default; `md:grid-cols-2` @ tablet; simplify row spans @ mobile |

**Bento grid mobile layout (proposed):**

```text
@ < md (375–767):
  ┌ photo woman ─────────────┐
  ├ classroom tile ──────────┤
  ├ testimonial ─────────────┤
  ├ stat ────────────────────┤
  └ man photo (full width) ──┘

@ md–lg:
  2-column bento (reduced height, no fixed 619px)
```

**Desktop (`lg+`):** Keep current 5-cell grid geometry.

---

### D3.2 — AboutUs

**File:** `components/custom/about-us.tsx`

| Area | Today | Mobile target (`&lt; lg`) |
| ---- | ----- | ------------------------- |
| Section padding | `py-32 px-4 sm:px-50` | `py-12 md:py-20 lg:py-32 px-4 sm:px-6` — **remove `sm:px-50`** |
| Copy column | `items-center text-center lg:items-start lg:text-left` | **`items-start text-left`** at all breakpoints |
| Title | `text-4xl lg:text-5xl` | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` |
| Description | `text-muted-foreground` | `text-base lg:text-lg`; **`text-left`** |
| CTA row | `justify-center lg:justify-start` | **`justify-start`** always |
| Image | below copy in grid | `w-full max-h-80 rounded-md object-cover`; order after copy @ mobile |

**Priority fix:** Alignment — user explicitly requires left, not centered mobile block.

---

### D3.3 — ServicesCarousel

**File:** `components/custom/imili/ServicesCarousel.tsx`  
**Child:** `ServiceCard.tsx` (card width @ scroll)

| Area | Today | Mobile target (`&lt; lg`) |
| ---- | ----- | ------------------------- |
| Section padding | `py-[68px]` | `py-12 md:py-20 lg:py-[68px]` |
| Container | `container` without mobile px | Wrap header in `px-4 sm:px-6 lg:px-0` |
| Badge | inline-flex | **`self-start`**; left |
| Heading | `text-[45px]` always | `text-2xl sm:text-3xl md:text-4xl lg:text-[45px]`; **`text-left`** |
| Header row | heading + commented nav | Heading only @ mobile; nav `hidden lg:flex` when restored |
| Card track | `overflow-x-auto px-4` when scroll | `snap-x snap-mandatory`; cards `w-[min(100%,340px)] shrink-0 snap-start` |
| Card track padding | `px-4` | `pl-4 pr-4 sm:pl-6 sm:pr-6` — left edge aligns with section gutter |
| Grid fallback (≤3 items) | `grid-cols-1 md:grid-cols-3` | `grid-cols-1` @ mobile; `md:grid-cols-2`; `lg:grid-cols-3` |

**ServiceCard @ mobile:** Keep internal left-aligned copy; ensure `min-h` does not force overflow.

---

### D3.4 — ArticleCardGrid

**File:** `components/custom/imili/ArticleCardGrid.tsx`

| Area | Today | Mobile target (`&lt; lg`) |
| ---- | ----- | ------------------------- |
| Section padding | `py-32` | `py-12 md:py-20 lg:py-32` |
| Container padding | `container` only | `px-4 sm:px-6 lg:px-0` on inner wrapper |
| Badge | green pill | Left; `self-start` |
| Heading | `text-[48px]` | `text-2xl sm:text-3xl md:text-4xl lg:text-[48px]`; **`text-left`** |
| Description | `text-[20px] lg:text-right` | `text-base lg:text-[20px] **text-left** lg:text-right` |
| Header grid | `grid-cols-1 lg:grid-cols-[1.8fr_1fr]` | Stack: heading then description, both **left** |
| Card grid | `grid-cols-1 md:2 lg:3` | Keep; gap `gap-6 lg:gap-7` |

---

### D3.5 — TestimonialsCarousel

**File:** `components/custom/imili/TestimonialsCarousel.tsx`  
**Children:** `TestimonialCardFeatured.tsx`, `TestimonialCardStandard.tsx`

| Area | Today | Mobile target (`&lt; lg`) |
| ---- | ----- | ------------------------- |
| Section padding | `pt-32 pb-32` | `py-12 md:py-20 lg:py-32` |
| Horizontal padding | `px-14` everywhere | `px-4 sm:px-6 lg:px-14` |
| Header layout | `flex justify-between` — badge/heading vs buttons | **`flex-col items-start gap-4`** @ mobile; `lg:flex-row lg:justify-between` |
| Badge + heading | left block | **`text-left items-start`** |
| Nav buttons | beside heading | **Below** heading @ mobile (`flex gap-2`); `size-11` min touch; `lg:` beside heading |
| Heading | `text-[51px]` | `text-2xl sm:text-3xl md:text-4xl lg:text-[51px]`; **`text-left`** |
| Carousel track | `px-14` | `pl-4 pr-4 sm:pl-6 lg:px-14`; `snap-x`; peek next card ~16px |
| Initial scroll offset | `INITIAL_SCROLL_OFFSET` | **Disable or reduce @ mobile** — avoid hidden first card on narrow screens |

---

## D4 — Global footer note

Active footer: **`ForestFooter`** via `app/layout.tsx` (not `ImiliFooter`).

Mobile footer pass is **out of scope** for this feat unless product adds it. See [feat-0019](../feat-0019/PRODUCT.md) + [feat-0020 §D6](../feat-0020/PRODUCT.md#d6--footer-mobile) for a follow-up.

---

## Acceptance criteria

### Global (@ 375px & 390px)

- [ ] No horizontal scroll on `/`
- [ ] Every section: headings, badges, body, CTAs are **left-aligned** (`text-left`, no centered copy wrappers)
- [ ] Section vertical padding ≤ `py-12` @ mobile (except hero may use `py-12 md:py-20`)
- [ ] Body text ≥ 16px on interactive inputs; headings use scaled ladder

### Per section

- [ ] **BentoHero:** copy stacks above grid; grid not fixed 619px; left-aligned headline/CTA/feature
- [ ] **AboutUs:** `text-left items-start` @ mobile (not centered)
- [ ] **Services:** scaled heading; horizontal card scroll with snap; header left-aligned
- [ ] **ArticleCardGrid:** heading + description stacked left; card grid 1 col @ mobile
- [ ] **Testimonials:** header stacked; nav below title @ mobile; padding `px-4` not `px-14`

### Desktop regression

- [ ] @ 1024px (`lg`): each section matches pre-change desktop layout within ±2px on existing feat tokens

### Build

- [ ] `npm run build` passes

---

## Implementation order (summary)

```text
1. Shared tokens (document in TECH.md — apply per file)
2. AboutUs          ← highest alignment impact
3. BentoHeroSection ← layout + grid stack
4. ServicesCarousel
5. ArticleCardGrid
6. TestimonialsCarousel
7. Manual QA @ 375 / 390 / 768
```

---

## Open questions (product)

| # | Question |
| - | -------- |
| 1 | Bento @ mobile: single-column stack (proposed) vs 2-col simplified grid @ `md`? **Default: 1 col &lt; md, 2 col md–lg.** |
| 2 | Testimonials: keep nav buttons on mobile (stacked) or swipe-only? **Default: stacked buttons below heading.** |
| 3 | Include `ForestFooter` mobile left-align in same feat? **Default: no — homepage sections only.** |
