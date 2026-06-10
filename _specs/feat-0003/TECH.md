# feat-0003: Tech — Article card grid (three-up row)

## Context

See [PRODUCT.md](./PRODUCT.md). Implement the **three-card article row** from `./assets/article-card-grid-reference.png` (**1024×502** capture; QA @ **1440px**).

**Pixel tables:** [Section shell](./PRODUCT.md#d3--layout), [Card anatomy](./PRODUCT.md#d4--card-anatomy), [Colors](./PRODUCT.md#d5--colors-from-reference).

**Parent:** [feat-0001 Carousel 5](../feat-0001/PRODUCT.md#carousel-5--latest-updates).

---

## Objective

1. Add `_data/imili/article-cards.ts` with `ArticleCardItem[]` (reference strings for QA; feat-0001 URLs for homepage).
2. Implement `ArticleCard` + `ArticleCardGrid` under `components/custom/imili/`.
3. Wire `ArticleCardGrid` into `app/page.tsx` as Carousel 5 (or preview route for isolated QA).
4. Pixel QA @ 1440px against `./assets/article-card-grid-reference.png`.
5. Use **only** existing `public/` raster paths until production assets are added ([D7](./PRODUCT.md#d7--images-public-folder)).

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| Images | `next/image` — `fill` + `object-cover` in aspect wrapper |
| Icons | `lucide-react` `ArrowRight` (already in project) |
| Font | Montserrat via `_data/fonts.tsx` / `app/layout.tsx` |
| Styling | Tailwind v4 — literal hex from [PRODUCT D5](./PRODUCT.md#d5--colors-from-reference) for reference fidelity |
| Data | `_data/imili/article-cards.ts` |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA:

1. Open homepage (or preview route) @ **1440×900** and **375×812**.
2. Overlay `./assets/article-card-grid-reference.png` at 1440 width — check card gaps, image radius, meta row, pill size.
3. Tab through cards — focus ring + arrow hover state.
4. Confirm `imageSrc` requests return **200** (no broken thumbnails).

---

## Project structure

```text
./
├── _data/imili/
│   └── article-cards.ts                 # NEW — ArticleCardItem[]
├── components/custom/imili/
│   ├── ArticleCard.tsx                  # NEW — single card
│   ├── ArticleCardGrid.tsx              # NEW — section + 3-col grid
│   └── index.ts                         # NEW — barrel export
├── app/
│   └── page.tsx                         # wire ArticleCardGrid (Carousel 5)
└── _specs/feat-0003/assets/
    └── article-card-grid-reference.png  # design QA overlay
```

**Minimum v1:** data file + `ArticleCard.tsx` + `ArticleCardGrid.tsx` (no new UI primitives).

---

## Data model

```ts
// _data/imili/article-cards.ts
export type ArticleCardItem = {
  id: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  title: string;
  summary: string;
  category: string;
};

/** Layout QA — strings from reference screenshot. */
export const articleCardReferenceItems: ArticleCardItem[] = [
  {
    id: 'ref-1',
    href: '#',
    imageSrc: '/new/humans.png',
    imageAlt: 'Placeholder — card 1 layout QA',
    date: 'February 3, 2026',
    title: "The Role of Volunteers in Supporting Children's Futures",
    summary:
      'Volunteers play an essential role in creating caring environments where children feel supported, valued, and encouraged.',
    category: 'Community',
  },
  {
    id: 'ref-2',
    href: '#',
    imageSrc: '/new/corps.jpeg',
    imageAlt: 'Placeholder — card 2 layout QA',
    date: 'February 3, 2026',
    title: "How Daily Nutrition Shapes a Child's Well-Being",
    summary:
      "Proper daily nutrition supports not only physical growth, but also a child's ability to learn, focus, and feel well.",
    category: 'Health',
  },
  {
    id: 'ref-3',
    href: '#',
    imageSrc: '/new/mision.png',
    imageAlt: 'Placeholder — card 3 layout QA',
    date: 'February 3, 2026',
    title: "Why Staying in School Changes a Child's Future",
    summary:
      'Staying in school gives children more than education — it offers stability, confidence, and a pathway to long-term opportunity.',
    category: 'Education',
  },
];

/**
 * Homepage — feat-0001 Latest Updates URLs.
 * title / summary / category: TBD until copied from articles.
 * imageSrc: TBD — assign from public/ when assets exist.
 */
export const articleCardHomepageItems: ArticleCardItem[] = [
  {
    id: 'unesco-abuja',
    href: 'https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja',
    imageSrc: '/blocks/imli.png',
    imageAlt: 'TBD — UNESCO Abuja launch',
    date: 'TBD',
    title: 'TBD — UNESCO Abuja launch',
    summary: 'TBD',
    category: 'TBD',
  },
  {
    id: 'arise-tv',
    href: 'https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/',
    imageSrc: '/blocks/imli.png',
    imageAlt: 'TBD — Arise TV coverage',
    date: 'TBD',
    title: 'TBD — Arise TV coverage',
    summary: 'TBD',
    category: 'TBD',
  },
  {
    id: 'fmino',
    href: 'https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/',
    imageSrc: '/blocks/imli.png',
    imageAlt: 'TBD — FMINO official launch',
    date: 'TBD',
    title: 'TBD — FMINO official launch',
    summary: 'TBD',
    category: 'TBD',
  },
];
```

**Export rule:** Preview/isolated QA uses `articleCardReferenceItems`. Homepage uses `articleCardHomepageItems` once product fills TBD fields — until then, ship reference data for layout sign-off.

---

## Component API

### `ArticleCard`

```tsx
// components/custom/imili/ArticleCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ArticleCardItem } from '@/_data/imili/article-cards';

type ArticleCardProps = {
  item: ArticleCardItem;
};

export function ArticleCard({ item }: ArticleCardProps) {
  const isExternal = item.href.startsWith('http');

  return (
    <Link
      href={item.href}
      className="group flex flex-col"
      {...(isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {/* 1. Thumbnail — PRODUCT D4 #1 */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px]">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      {/* 2. Meta row — PRODUCT D4 #2 */}
      <div className="mt-5 flex items-center justify-between">
        <span
          className="flex size-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-white transition-colors group-hover:border-[#434343] group-hover:bg-[#434343] group-focus-visible:border-[#434343] group-focus-visible:bg-[#434343]"
          aria-hidden
        >
          <ArrowRight className="size-4 text-[#111111] transition-colors group-hover:text-white group-focus-visible:text-white" />
        </span>
        <time className="text-[18px] text-[#6B6B6B]" dateTime={item.date}>
          {item.date}
        </time>
      </div>

      {/* 3–5. Title, summary, pill — PRODUCT D4 #3–7 */}
      <h3 className="mt-3.5 text-[25px] font-bold leading-snug text-[#111111]">
        {item.title}
      </h3>
      <p className="mt-5 text-[20px] leading-relaxed text-[#5C5C5C]">
        {item.summary}
      </p>
      <span className="mt-5 inline-flex w-fit rounded-full bg-[#B8E4FA] px-3 py-1.5 text-[17px] font-medium text-[#0B4F7A]">
        {item.category}
      </span>
    </Link>
  );
}
```

### `ArticleCardGrid`

```tsx
// components/custom/imili/ArticleCardGrid.tsx
import { ArticleCard } from './ArticleCard';
import type { ArticleCardItem } from '@/_data/imili/article-cards';

type ArticleCardGridProps = {
  items: ArticleCardItem[];
};

export function ArticleCardGrid({ items }: ArticleCardGridProps) {
  return (
    <section className="bg-[#FAF7F2] py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ArticleCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Do not add** a section `<h2>` — not in reference.

---

## Homepage wire-up

```tsx
// app/page.tsx (excerpt)
import { ArticleCardGrid } from '@/components/custom/imili';
import { articleCardReferenceItems } from '@/_data/imili/article-cards';

// During layout QA:
<ArticleCardGrid items={articleCardReferenceItems} />

// After product fills homepage data:
// <ArticleCardGrid items={articleCardHomepageItems.slice(0, 3)} />
```

Insert **after** What We Do section and **before** footer per [feat-0001 §D6](../feat-0001/PRODUCT.md#d6--homepage-stack).

---

## Implementation tasks (ordered)

Per [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md):

| # | Task | Done when |
| - | ---- | --------- |
| 1 | Copy reference PNG to `_specs/feat-0003/assets/` | File exists |
| 2 | Create `_data/imili/article-cards.ts` | Types + reference + homepage stubs compile |
| 3 | Implement `ArticleCard.tsx` | Single card renders all 7 anatomy layers |
| 4 | Implement `ArticleCardGrid.tsx` | 3-col grid @ lg, cream band |
| 5 | Add preview wire on `app/page.tsx` or `/preview/article-cards` | Visible in `npm run dev` |
| 6 | Pixel QA @ 1440 with overlay | Acceptance checkboxes in PRODUCT |
| 7 | Swap to `articleCardHomepageItems` when TBD fields filled | feat-0001 URLs live |

---

## Files to create / modify

| File | Action |
| ---- | ------ |
| `_data/imili/article-cards.ts` | **Create** |
| `components/custom/imili/ArticleCard.tsx` | **Create** |
| `components/custom/imili/ArticleCardGrid.tsx` | **Create** |
| `components/custom/imili/index.ts` | **Create** |
| `app/page.tsx` | **Modify** — import grid |
| `components/blocks/feature.tsx` | **Do not reuse** — different layout (horizontal 64px thumb) |

---

## Accessibility

| Requirement | Implementation |
| ----------- | -------------- |
| Card link name | `aria-label` optional; visible title inside link is sufficient |
| Arrow decoration | `aria-hidden` on icon wrapper |
| Date | `<time>` with `dateTime` when machine-parseable; display string may remain human format from reference |
| Focus | `group-focus-visible` styles mirror hover |
| External links | `rel="noopener noreferrer"` |

---

## QA checklist

| Check | Method |
| ----- | ------ |
| 3 cards @ 1440 | Visual |
| Cream `#FAF7F2` band | DevTools computed style |
| Image `rounded-[20px]` | DevTools |
| No section heading | DOM query — no `h2` in section |
| Hover arrow `#434343` | Hover card 1 or 2 |
| Pills `#B8E4FA` / `#0B4F7A` | DevTools |
| Images 200 OK | Network tab for `/new/humans.png`, etc. |
| No invented copy on homepage build | `title`/`summary` not lorem; TBD explicit in data |

---

## Boundaries

**Always:**

- Read [PRODUCT.md](./PRODUCT.md) before coding.
- Use paths from [public inventory](./PRODUCT.md#public-raster-inventory) only.
- Match reference geometry before dark-theme adaptation.

**Never:**

- Add UI elements absent from reference (heading, carousel, shadows, borders).
- Invent image filenames not in `public/`.
- Invent article titles/summaries for homepage — use TBD or source from feat-0001 URLs.
- Copy `components/blocks/feature.tsx` list layout — wrong pattern.

**Ask first:**

- Dark-adapt Carousel 5 while claiming this reference as QA source.
- Show more than 3 cards @ desktop without new design reference.
