# feat-0026: Photo hero — left copy + single institute image

## Summary

**Superseded by:** [feat-0027](../feat-0027/PRODUCT.md) — product chose **full-section background** with **empty right column** instead of a single image tile on the right. Keep this spec for reference only; **do not implement** unless product reverts.

Create a **new homepage section** (`PhotoHeroSection`) by copying [`BentoHeroSection`](../../components/custom/imili/BentoHeroSection.tsx) and replacing the **right-hand 5-cell bento grid** with **one** full-height photo. It is a **first-class section** on `/` — same pattern as `AboutUs`, `DocumentarySection`, and `ServicesCarousel` (own component, data export, `<section>` landmark, wired in `app/page.tsx`).

**Asset:** [`public/blocks/hero.jpeg`](../../public/blocks/hero.jpeg) — IMILI / UNESCO institute lobby (3D wall branding, totem, plants).

**Left column:** **Unchanged** from current `BentoHeroSection` — headline, subhead, CTA, feature card (same markup, motion, and tokens).

**Right column:** **Single** `next/image` — no bento cells, no overlays, no second image.

**App:** root Next.js site (`imil-institute` package).

**Normative decisions:** [Homepage section](#d3--homepage-section), [Scope](#d1--in-scope), [Out of scope](#d2--out-of-scope), [Section shell](#d4--section-shell), [Left column](#d5--left-column-unchanged), [Right image](#d6--right-column-single-image), [Mobile](#d7--mobile-responsiveness), [Data model](#d8--data-model), [Component API](#d9--component-api), [Acceptance](#acceptance-criteria).

**Related specs:**

| Spec | Relation |
| ---- | -------- |
| [feat-0007](../feat-0007/PRODUCT.md) | Original **5-cell bento** hero — **`BentoHeroSection` stays in repo unchanged** |
| [feat-0022](../feat-0022/PRODUCT.md) | Mobile left-align + section padding on homepage sections |
| [feat-0018](../feat-0018/PRODUCT.md) | Homepage IMILI copy in data files |

**Design reference:** [`./assets/hero-institute-lobby.jpeg`](./assets/hero-institute-lobby.jpeg) (copy of `public/blocks/hero.jpeg` for spec QA).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → component → homepage swap |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, `fill` + `object-cover` |

---

## Assumptions (confirm or correct before implement)

1. **New component** — `PhotoHeroSection.tsx`; **do not modify** `BentoHeroSection.tsx` except shared imports if extracted later (not required v1).
2. **Homepage section** — `PhotoHeroSection` is **added** to `app/page.tsx` as the **first section** in the homepage stack (hero slot). It **replaces** `BentoHeroSection` in that slot only; `BentoHeroSection` remains in the codebase unused on `/`.
3. **Image file exists** — `/blocks/hero.jpeg` is in `public/` (product-supplied).
4. **One image only** on the right — no carousel, no grid, no picture-in-picture.
5. **Left copy** reuses current `bentoHeroHomepageContent` strings (headline, subhead, CTA, feature) — only the **visual right column** changes.
6. **Motion** — keep Framer Motion stagger on left column; optional fade-in on right image (match existing hero patterns).

---

## Problem

| Today | Gap |
| ----- | --- |
| `BentoHeroSection` shows 5-cell bento with stock `public/new/*` photos | Product has official **institute lobby** photo for hero |
| feat-0007 bento grid is wrong layout for this asset | Need **single-image** right column |
| No spec for photo-hero variant | Cannot implement without layout rules |

**Goal:** Ship `PhotoHeroSection` — identical left column to `BentoHeroSection`, single `/blocks/hero.jpeg` on the right, responsive @ 375–1440px.

---

## D1 — In scope

| # | Deliverable |
| - | ----------- |
| 1 | New `PhotoHeroSection` component (copy of `BentoHeroSection` left + new right image) |
| 2 | New data type + `photoHeroHomepageContent` in `_data/imili/photo-hero.ts` |
| 3 | Export from `components/custom/imili/index.ts` |
| 4 | **Add** `PhotoHeroSection` to `app/page.tsx` as homepage section #1 |
| 5 | Spec reference asset in `_specs/feat-0026/assets/` |

---

## D2 — Out of scope

| Item | Reason |
| ---- | ------ |
| Editing `BentoHeroSection.tsx` | Preserve feat-0007 bento hero for QA / revert |
| Bento cell components on right | Replaced by one image |
| feat-0001 hero slider / carousel | Static hero only |
| Image editing or crop in repo | Use `hero.jpeg` as supplied |
| Dark-shell migration | Current light `#F5F5F5` shell unchanged |

---

## D3 — Homepage section

`PhotoHeroSection` is a **standalone homepage section** — not a layout wrapper, not part of another section, and not embedded inside `BentoHeroSection`.

### Section contract (required)

| Rule | Spec |
| ---- | ---- |
| Component name | `PhotoHeroSection` — `*Section` suffix matches `DocumentarySection`, `ServicesCarousel` section pattern |
| Root element | Semantic **`<section>`** — not `<div>` at root |
| Section `id` | `id="photo-hero"` — stable anchor for deep links / scroll |
| `aria-labelledby` | Point to heading `id="photo-hero-heading"` on the `h1` |
| Data | `photoHeroHomepageContent` from `_data/imili/photo-hero.ts` |
| Export | `components/custom/imili/index.ts` |
| Page wiring | Sibling sections in `app/page.tsx` fragment — **no** nested sections |

```tsx
// app/page.tsx — each block is an independent homepage section
<>
  <PhotoHeroSection content={photoHeroHomepageContent} />
  <AboutUs ... />
  <DocumentarySection ... />
  <ServicesCarousel ... />
  <ArticleCardGrid ... />
  <TestimonialsCarousel ... />
</>
```

### Homepage section order (`app/page.tsx`)

| # | Section | Component | `id` (normative) |
| - | ------- | --------- | ---------------- |
| 1 | **Photo hero** | `PhotoHeroSection` | `photo-hero` |
| 2 | About | `AboutUs` | — (add if missing in implement) |
| 3 | Documentary | `DocumentarySection` | `documentary` |
| 4 | What We Do | `ServicesCarousel` | `services` |
| 5 | Latest Updates | `ArticleCardGrid` | `news-blog` |
| 6 | Testimonials | `TestimonialsCarousel` | — |

**Replaces in slot #1 only:** `BentoHeroSection` is **removed** from `app/page.tsx` when `PhotoHeroSection` ships. `BentoHeroSection.tsx` file **stays** in repo.

### Comparison to other homepage sections

| Pattern | `DocumentarySection` | `PhotoHeroSection` |
| ------- | -------------------- | ------------------ |
| Own data file | `homepage.ts` | `photo-hero.ts` |
| Own component file | `DocumentarySection.tsx` | `PhotoHeroSection.tsx` |
| `<section id="...">` | `id="documentary"` | `id="photo-hero"` |
| Wired in `page.tsx` | Yes | Yes |
| Self-contained padding | Yes | Yes |

---

## D4 — Section shell

**Copy from `BentoHeroSection`** — same shell tokens:

| Token | Spec |
| ----- | ---- |
| Min height @ desktop | `min-h-[739px]` |
| Background | `#F5F5F5` + grid pattern + green radial glow (unchanged) |
| Padding | `px-4 py-20 md:px-[68px]` |
| Layout | `flex flex-col gap-20 lg:flex-row` |
| Left width @ lg | `lg:w-[42%]` |
| Right width @ lg | `flex-1` (remaining ~58%) |

---

## D5 — Left column (unchanged)

The left column in `PhotoHeroSection` must be a **literal copy** of the current `BentoHeroSection` left block:

- `motion.div` + `staggerContainer` / `fadeUp` variants
- `h1` — `text-4xl font-semibold lg:text-7xl`
- Subhead — `text-lg md:text-[21px] text-[#5C5C5C]`
- `CustomButton` CTA
- Feature card — `#ECECEC` rounded box, `Layers` icon badge, badge label + body

**Data source:** `photoHeroHomepageContent` — same string fields as `BentoHeroContent` minus `bento`.

---

## D6 — Right column (single image)

### Layout

| Token | @ desktop (`lg+`) | @ mobile (`&lt; lg`) |
| ----- | ----------------- | --------------------- |
| Structure | **One** image container | Same — image **below** left column |
| Width | `flex-1` | `w-full` |
| Height | `h-[619px]` (match bento grid height) | `h-auto min-h-[280px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[619px]` |
| Gap from left | `gap-20` on parent flex | stacked `gap-12` or `gap-20` |

### Image

| Property | Spec |
| -------- | ---- |
| `src` | `/blocks/hero.jpeg` |
| `alt` | `IMILI and UNESCO institute branding in the lobby` (or product-approved alt) |
| Component | `next/image` with `fill` + `object-cover` |
| Wrapper | `relative overflow-hidden rounded-[25px]` (match bento cell radius) |
| `sizes` | `(max-width: 1024px) 100vw, 58vw` |
| `priority` | `true` (LCP hero image) |

### ASCII

```text
┌ section (grid bg) ─────────────────────────────────────────────────────┐
│  ┌ left (42%) ──────────────┐  ┌ right (58%) ─────────────────────────┐ │
│  │ H1, subhead, CTA         │  │ ┌──────────────────────────────────┐ │ │
│  │ feature card             │  │ │                                  │ │ │
│  │                          │  │ │   hero.jpeg (single photo)       │ │ │
│  │                          │  │ │                                  │ │ │
│  └──────────────────────────┘  │ └──────────────────────────────────┘ │ │
│                                 └──────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

**Do not** render `BentoPhotoTile`, `BentoClassroomTile`, `BentoTestimonialTile`, or `BentoStatTile` in this component.

---

## D7 — Mobile responsiveness

Align with [feat-0022](../feat-0022/PRODUCT.md):

| Rule | Spec |
| ---- | ---- |
| Stack order | Copy column **first**, image **second** |
| Text | Left-aligned (`text-left`) |
| Image width | `w-full` — no horizontal overflow @ 375px |
| Image height | `aspect-[4/3]` or min-height — avoid fixed `619px` on phone |
| Padding | `px-4 sm:px-6` inherited from section shell |

**QA viewports:** 375, 390, 768, 1440 px.

---

## D8 — Data model

```ts
// _data/imili/photo-hero.ts

export type PhotoHeroContent = {
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  feature: {
    badgeLabel: string;
    body: string;
  };
  heroImage: {
    src: string;
    alt: string;
  };
};

export const photoHeroHomepageContent: PhotoHeroContent = {
  headline: "Official MIL Institute ",
  subhead:
    "The first international observatory for media and information literacy development and MIL research.",
  cta: { label: "Learn More", href: "/about" },
  feature: {
    badgeLabel: "Strengthen MIL for a Better Future",
    body: "Catalyst for sustained research on MIL social impact globally.",
  },
  heroImage: {
    src: "/blocks/hero.jpeg",
    alt: "IMILI and UNESCO institute branding in the lobby",
  },
};
```

**Rule:** Copy strings from current `bentoHeroHomepageContent` in [`bento-hero.ts`](../../_data/imili/bento-hero.ts) at implement time — keep in sync when product updates hero copy.

---

## D9 — Component API

```tsx
// components/custom/imili/PhotoHeroSection.tsx

type PhotoHeroSectionProps = {
  content: PhotoHeroContent;
};

export function PhotoHeroSection({ content }: PhotoHeroSectionProps) {
  return (
    <section id="photo-hero" aria-labelledby="photo-hero-heading">
      <h1 id="photo-hero-heading">{content.headline}</h1>
      {/* left column + single right image */}
    </section>
  );
}
```

**`"use client"`** — required for Framer Motion (same as `BentoHeroSection`).

---

## Acceptance criteria

- [ ] `PhotoHeroSection` is a **homepage section**: `<section id="photo-hero">` with `h1 id="photo-hero-heading"`
- [ ] `PhotoHeroSection.tsx` exists; `BentoHeroSection.tsx` **unchanged**
- [ ] Left column matches current `BentoHeroSection` left column (copy, CTA, feature card, motion)
- [ ] Right column shows **exactly one** image: `/blocks/hero.jpeg`
- [ ] No bento grid or secondary images on the right
- [ ] `app/page.tsx` lists `PhotoHeroSection` as **section #1** with `photoHeroHomepageContent`
- [ ] `BentoHeroSection` **not** rendered on `/`
- [ ] Image has descriptive `alt` text
- [ ] `priority` on hero image for LCP
- [ ] No horizontal scroll @ 375px
- [ ] `npm run build` passes

---

## Open questions (product)

| # | Question |
| - | -------- |
| 1 | Final `alt` text for lobby photo? **Default in D8.** |
| 2 | Keep `BentoHeroSection` on a preview route for comparison? **Default: no — only swap homepage.** |
| 3 | Mobile image aspect — `4/3` vs `16/10`? **Default: `4/3` @ mobile, `h-[619px]` @ lg.** |

---

## Success criteria

| Request | Testable outcome |
| ------- | ---------------- |
| Copy of bento hero | New `PhotoHeroSection`; original bento hero untouched |
| Single image right | Only `hero.jpeg` visible; no 5-cell grid |
| Homepage section | `PhotoHeroSection` is section #1 on `/` with `id="photo-hero"` |
