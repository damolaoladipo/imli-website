# feat-0004: Tech — News & Blog homepage section

## Context

See [PRODUCT.md](./PRODUCT.md). Implement the **full News & Blog section** from `./assets/news-blog-section-reference.png` (**1024×485** capture; QA @ **1440px**).

**Pixel tables:** [Section header](./PRODUCT.md#d3--section-header), [Card anatomy](./PRODUCT.md#d4--card-anatomy), [CTA](./PRODUCT.md#d5--footer-cta), [Colors](./PRODUCT.md#d6--colors-from-reference).

**Parent:** [feat-0001 Carousel 5](../feat-0001/PRODUCT.md#carousel-5--latest-updates).

**Homepage:** New section alongside [feat-0003](../feat-0003/PRODUCT.md) `ArticleCardGrid` and [feat-0005](../feat-0005/PRODUCT.md) `TestimonialsCarousel`.

---

## Objective

1. Add `_data/imili/news-blog.ts` with `NewsBlogSectionContent` (reference strings for QA export; feat-0001 fields for homepage export).
2. Implement `NewsBlogCard` + `NewsBlogSection` under `components/custom/imili/`.
3. Add `NewsBlogSection` to `app/page.tsx` as a new section (keep `ArticleCardGrid`).
4. Pixel QA @ 1440px against `./assets/news-blog-section-reference.png`.
5. Use **only** existing `public/` raster paths until production assets are added ([D8](./PRODUCT.md#d8--images-public-folder)).

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| Images | `next/image` — `fill` + `object-cover` in fixed-height wrapper |
| Icons | `lucide-react` — `Newspaper`, `Calendar`, `ArrowRight` |
| Font | Montserrat via `_data/fonts.tsx` / `app/layout.tsx` |
| Styling | Tailwind v4 — literal hex from [PRODUCT D6](./PRODUCT.md#d6--colors-from-reference) |
| Data | `_data/imili/news-blog.ts` |
| CTA | `Link` from `next/link` (reference green pill) — not `CustomButton` (different shape/color in reference) |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA:

1. Open homepage @ **1440×900** and **375×812**.
2. Overlay `./assets/news-blog-section-reference.png` at 1440 width — check badge, header split, card gray body, divider, CTA pill.
3. Tab through cards and CTA — visible focus ring.
4. Confirm `imageSrc` requests return **200**.

---

## Project structure

```text
./
├── _data/imili/
│   └── news-blog.ts                    # NEW — NewsBlogSectionContent
├── components/custom/imili/
│   ├── NewsBlogCard.tsx                # NEW — single card
│   ├── NewsBlogSection.tsx             # NEW — section shell + grid + CTA
│   └── index.ts                        # UPDATE — export new components
├── app/page.tsx                        # UPDATE — add NewsBlogSection (new section)
└── _specs/feat-0004/
    ├── PRODUCT.md
    ├── TECH.md
    └── assets/news-blog-section-reference.png
```

**Coexist on homepage:** feat-0003 `ArticleCardGrid` remains on `/` above this section.

---

## Data file

```ts
// _data/imili/news-blog.ts

import { siteConfig } from "@/_data/site-config";

export type NewsBlogCardItem = { /* see PRODUCT D7 */ };
export type NewsBlogSectionContent = { /* see PRODUCT D7 */ };

/** Layout QA — reference strings + placeholder images */
export const newsBlogReferenceContent: NewsBlogSectionContent = {
  badgeLabel: "News & Blog",
  heading: "Stories and insights",
  description:
    "Feeding families, educating children & rebuilding lives what our impact shows.",
  readMoreLabel: "Read more",
  ctaLabel: "Explore All Blogs",
  ctaHref: "/news",
  items: [
    {
      id: "ref-1",
      href: "#",
      imageSrc: "/new/humans.png",
      imageAlt: "Placeholder — card 1 layout QA",
      date: "February 25, 2026",
      title: "Safe Shelter. Stronger Lives. Sustainable Futures.",
    },
    // ... cards 2–3 per PRODUCT reference table
  ],
};

/** Homepage — feat-0001 Latest Updates (first 3 visible) */
export const newsBlogHomepageContent: NewsBlogSectionContent = {
  badgeLabel: "Latest Updates",
  heading: "TBD",
  description: siteConfig.tagline,
  readMoreLabel: "Read more",
  ctaLabel: "TBD",
  ctaHref: "/news",
  items: [
    {
      id: "unesco-abuja",
      href: "https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja",
      imageSrc: "/new/humans.png",
      imageAlt: "TBD — UNESCO Abuja launch",
      date: "TBD",
      title: "UNESCO — IMILI launched in Abuja",
      external: true,
    },
    // ... arise-tv, fmino per feat-0001 TECH
  ],
};
```

---

## Component sketches

### `NewsBlogCard.tsx`

```tsx
// Entire card is one Link/a
// Structure:
//   div.rounded-[22px].overflow-hidden.bg-[#F3F4F6]
//     div.relative.h-[225px] → Image fill
//     div.p-7
//       div.flex.items-center.gap-2 → Calendar + time
//       hr border-[#E5E7EB] mt-4
//       h3 title mt-4
//       span readMoreLabel + ArrowRight mt-5
```

### `NewsBlogSection.tsx`

```tsx
// section#news-blog.bg-white.py-[90px]
//   container max-w-7xl
//     badge row (Newspaper icon + badgeLabel)
//     header grid (h2 + p description)
//     grid lg:grid-cols-3 gap-7 mt-14 → NewsBlogCard × items.length
//     Link cta pill centered mt-14
```

Props:

```tsx
type NewsBlogSectionProps = {
  content: NewsBlogSectionContent;
};
```

---

## Implementation tasks (ordered)

| # | Task | Done when |
| - | ---- | --------- |
| 1 | Create `_data/imili/news-blog.ts` with both exports | Types + 3 QA cards + 3 homepage cards |
| 2 | `NewsBlogCard.tsx` | Card anatomy matches [D4](./PRODUCT.md#d4--card-anatomy) |
| 3 | `NewsBlogSection.tsx` | Header + grid + CTA match [D3–D5](./PRODUCT.md#d3--section-header) |
| 4 | Export from `components/custom/imili/index.ts` | Named exports available |
| 5 | `app/page.tsx` | `NewsBlogSection` with `newsBlogReferenceContent` for QA **or** `newsBlogHomepageContent` per product choice |
| 6 | Keep `ArticleCardGrid` on homepage | feat-0003 + feat-0004 both on `/` |
| 7 | `npm run build` + manual overlay QA | Acceptance criteria in PRODUCT |

---

## Boundaries

### Always

- Match reference geometry before swapping IMILI production copy.
- Use `public/` paths from [inventory](./PRODUCT.md#public-raster-inventory) only.
- Mark unknown copy/images `TBD` — never fabricate dates or article bodies.

### Ask first

- Swapping reference green `#4FAF50` → IMILI `#0548bd` on badge/CTA.
- Shipping homepage with `newsBlogHomepageContent` while `heading` / `ctaLabel` / dates are `TBD`.

### Never

- Add summary paragraphs, category pills, or carousel controls (not in reference).
- Copy hopely charity titles onto IMILI production homepage.
- Reference `/brand/updates/*` paths from feat-0001 TECH (files not in `public/`).

---

## Verification

```bash
npm run build
```

| Check | Expected |
| ----- | -------- |
| Homepage renders `NewsBlogSection` | Badge + 3 cards + CTA visible |
| Card click | Navigates to `href` (external opens new tab) |
| CTA | Links to `/news` |
| Broken images | None — all `imageSrc` return 200 |
