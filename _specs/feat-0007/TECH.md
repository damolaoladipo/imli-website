# feat-0007: Tech — Bento hero (left copy + 5-cell grid)

## Context

See [PRODUCT.md](./PRODUCT.md). Implement the **bento hero** from `./assets/bento-hero-reference.png` (**1024×526** capture; QA @ **1440px**).

**Pixel tables:** [Section shell](./PRODUCT.md#d3--section-shell), [Left column](./PRODUCT.md#d4--left-column), [Bento grid](./PRODUCT.md#d5--bento-grid-layout), [Bento cells](./PRODUCT.md#d6--bento-cell-anatomy), [Colors](./PRODUCT.md#d7--colors-from-reference).

**Parent:** [feat-0001 Carousel 1](../feat-0001/PRODUCT.md#carousel-1--hero-slider) — resolve [D10](./PRODUCT.md#d10--feat-0001-carousel-1-conflict) before homepage hero swap.

---

## Objective

1. Add `_data/imili/bento-hero.ts` with `BentoHeroContent` (reference strings + QA image paths).
2. Implement bento cell components + `BentoHeroSection` under `components/custom/imili/`.
3. Wire `BentoHeroSection` into preview route or `app/page.tsx` for isolated QA.
4. Pixel QA @ 1440px against `./assets/bento-hero-reference.png`.
5. Use **only** existing `public/` raster paths until production assets land ([D9](./PRODUCT.md#d9--images-public-folder)).

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| Images | `next/image` — `fill` + `object-cover` in grid cells |
| Icons | `lucide-react` `ArrowUpRight` (CTA), `Layers` (feature badge QA stand-in) |
| Font | Montserrat via `_data/fonts.tsx` / `app/layout.tsx` |
| Layout | CSS Grid for bento; flex for left column |
| Styling | Tailwind v4 — literal hex from [PRODUCT D7](./PRODUCT.md#d7--colors-from-reference) |
| Data | `_data/imili/bento-hero.ts` |

**Do not use** `CustomButton` — reference CTA is a single green pill with `ArrowUpRight`, not the split blue `CustomButton` pattern.

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA:

1. Open preview @ **1440×900** and **375×812**.
2. Overlay `./assets/bento-hero-reference.png` at 1440 width — check column ratio, bento grid, CTA pill, feature card, testimonial avatars.
3. Tab to CTA — focus ring visible.
4. Confirm all `src` paths return **200**.

---

## Project structure

```text
./
├── _data/imili/
│   └── bento-hero.ts                       # NEW — BentoHeroContent
├── components/custom/imili/
│   ├── BentoHeroSection.tsx                # NEW — section shell + columns
│   ├── BentoPhotoTile.tsx                  # NEW — woman / man cells
│   ├── BentoClassroomTile.tsx              # NEW — classroom + overlay
│   ├── BentoTestimonialTile.tsx            # NEW — green testimonial cell
│   ├── BentoStatTile.tsx                   # NEW — 62+ stat cell
│   └── index.ts                            # MODIFY — barrel export
├── app/
│   └── page.tsx                            # optional preview wire
└── _specs/feat-0007/assets/
    └── bento-hero-reference.png
```

**Minimum v1:** data file + 5 cell components + section wrapper. Do **not** reuse `components/custom/hero.tsx` wholesale — different layout.

---

## Data model

```ts
// _data/imili/bento-hero.ts
export type BentoHeroContent = {
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  feature: {
    badgeLabel: string;
    body: string;
  };
  bento: {
    womanPhoto: { src: string; alt: string };
    classroomPhoto: { src: string; alt: string; overlayLabel: string };
    testimonial: {
      quote: string;
      badgeLabel: string;
      avatars: { src: string; alt: string }[];
    };
    stat: { value: string; label: string };
    manPhoto: { src: string; alt: string };
  };
};

/** Layout QA — strings from reference screenshot. */
export const bentoHeroReferenceContent: BentoHeroContent = {
  headline: 'Build Skills That Shape Your Future',
  subhead:
    'Practical online courses designed to help you gain real-world experience and grow with confidence.',
  cta: { label: 'Explore Course', href: '#' },
  feature: {
    badgeLabel: 'Built for real growth.',
    body: 'Follow guided learning paths from beginner to job-ready level.',
  },
  bento: {
    womanPhoto: {
      src: '/new/airi.png',
      alt: 'Placeholder — woman tile QA',
    },
    classroomPhoto: {
      src: '/new/corps.jpeg',
      alt: 'Placeholder — classroom tile QA',
      overlayLabel: 'Interactive Classrooms',
    },
    testimonial: {
      quote: 'Hands-on lessons that helped me apply skills right away.',
      badgeLabel: 'Best',
      avatars: [
        { src: '/toyosi.png', alt: 'Placeholder — testimonial avatar 1' },
        { src: '/mide.png', alt: 'Placeholder — testimonial avatar 2' },
        { src: '/bipoc.png', alt: 'Placeholder — testimonial avatar 3' },
      ],
    },
    stat: {
      value: '62+',
      label: 'Courses built around real-world projects.',
    },
    manPhoto: {
      src: '/new/humans.png',
      alt: 'Placeholder — man tile QA',
    },
  },
};
```

---

## Component API

### `BentoHeroSection`

```tsx
// components/custom/imili/BentoHeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Layers } from 'lucide-react';
import type { BentoHeroContent } from '@/_data/imili/bento-hero';
import { BentoClassroomTile } from './BentoClassroomTile';
import { BentoPhotoTile } from './BentoPhotoTile';
import { BentoStatTile } from './BentoStatTile';
import { BentoTestimonialTile } from './BentoTestimonialTile';

type Props = { content: BentoHeroContent };

export function BentoHeroSection({ content }: Props) {
  return (
    <section
      className="relative min-h-[739px] bg-[#F5F5F5] px-[68px] py-14"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(224,224,224,0.35) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(224,224,224,0.35) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(46,188,94,0.08),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-7xl gap-14">
        {/* Left column — PRODUCT D4 */}
        <div className="flex w-[42%] flex-col justify-between">
          <div>
            <h1 className="text-[62px] font-bold leading-[1.08] text-[#0A3D34]">
              {content.headline}
            </h1>
            <p className="mt-6 max-w-[534px] text-[21px] text-[#5C5C5C]">
              {content.subhead}
            </p>
            <Link
              href={content.cta.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2EBC5E] px-8 py-4 text-[21px] font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D34]"
            >
              {content.cta.label}
              <ArrowUpRight className="size-6" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 rounded-[23px] bg-[#ECECEC] p-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A] bg-white px-3 py-1.5 text-[17px] font-medium text-[#111111]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2EBC5E] text-white">
                <Layers className="size-3.5" aria-hidden />
              </span>
              {content.feature.badgeLabel}
            </span>
            <p className="mt-3.5 text-[18px] text-[#4A4A4A]">{content.feature.body}</p>
          </div>
        </div>

        {/* Right bento — PRODUCT D5 */}
        <div className="grid h-[619px] flex-[0.58] grid-cols-[1fr_1.08fr] grid-rows-[1.15fr_0.95fr_0.9fr] gap-5">
          <BentoPhotoTile
            className="col-start-1 row-start-1"
            src={content.bento.womanPhoto.src}
            alt={content.bento.womanPhoto.alt}
          />
          <BentoClassroomTile
            className="col-start-2 row-start-1"
            src={content.bento.classroomPhoto.src}
            alt={content.bento.classroomPhoto.alt}
            overlayLabel={content.bento.classroomPhoto.overlayLabel}
          />
          <BentoTestimonialTile
            className="col-start-1 row-start-2"
            quote={content.bento.testimonial.quote}
            badgeLabel={content.bento.testimonial.badgeLabel}
            avatars={content.bento.testimonial.avatars}
          />
          <BentoStatTile
            className="col-start-1 row-start-3"
            value={content.bento.stat.value}
            label={content.bento.stat.label}
          />
          <BentoPhotoTile
            className="col-start-2 row-span-2 row-start-2"
            src={content.bento.manPhoto.src}
            alt={content.bento.manPhoto.alt}
          />
        </div>
      </div>
    </section>
  );
}
```

### `BentoPhotoTile`

```tsx
// components/custom/imili/BentoPhotoTile.tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export function BentoPhotoTile({ src, alt, className }: Props) {
  return (
    <div className={cn('relative overflow-hidden rounded-[25px]', className)}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1440px) 30vw, 400px" />
    </div>
  );
}
```

### `BentoClassroomTile`

```tsx
// components/custom/imili/BentoClassroomTile.tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  src: string;
  alt: string;
  overlayLabel: string;
  className?: string;
};

export function BentoClassroomTile({ src, alt, overlayLabel, className }: Props) {
  return (
    <div className={cn('relative overflow-hidden rounded-[25px]', className)}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1440px) 35vw, 450px" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-10">
        <p className="text-[18px] text-white">{overlayLabel}</p>
      </div>
    </div>
  );
}
```

### `BentoTestimonialTile`

```tsx
// components/custom/imili/BentoTestimonialTile.tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Avatar = { src: string; alt: string };

type Props = {
  quote: string;
  badgeLabel: string;
  avatars: Avatar[];
  className?: string;
};

export function BentoTestimonialTile({ quote, badgeLabel, avatars, className }: Props) {
  return (
    <div
      className={cn(
        'relative flex flex-col justify-between overflow-hidden rounded-[25px] bg-[#3CCB6A] p-6',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex -space-x-2.5">
          {avatars.map((a) => (
            <Image
              key={a.src}
              src={a.src}
              alt={a.alt}
              width={40}
              height={40}
              className="size-10 rounded-full border-2 border-[#3CCB6A] object-cover"
            />
          ))}
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-[17px] font-medium text-[#0A3D34]">
          {badgeLabel}
        </span>
      </div>
      <p className="text-[20px] leading-snug text-white">{quote}</p>
    </div>
  );
}
```

### `BentoStatTile`

```tsx
// components/custom/imili/BentoStatTile.tsx
import { cn } from '@/lib/utils';

type Props = {
  value: string;
  label: string;
  className?: string;
};

export function BentoStatTile({ value, label, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center overflow-hidden rounded-[25px] bg-[#0A3D34] p-6',
        className,
      )}
    >
      <p className="text-[51px] font-bold leading-none text-white">{value}</p>
      <p className="mt-2 text-[18px] text-white">{label}</p>
    </div>
  );
}
```

**Do not add** header, carousel, dots, star ratings, testimonial names, or second CTA.

---

## Preview wire-up

```tsx
// app/page.tsx (excerpt) — during layout QA only
import { BentoHeroSection } from '@/components/custom/imili';
import { bentoHeroReferenceContent } from '@/_data/imili/bento-hero';

<BentoHeroSection content={bentoHeroReferenceContent} />
```

Gate behind product approval before replacing feat-0001 Carousel 1 — reference copy is education themed.

---

## Implementation tasks (ordered)

Per [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md):

| # | Task | Done when |
| - | ---- | --------- |
| 1 | Reference PNG in `_specs/feat-0007/assets/` | File exists |
| 2 | Create `_data/imili/bento-hero.ts` | Types + reference content compile |
| 3 | Implement `BentoPhotoTile.tsx` | Photo cells render with radius |
| 4 | Implement `BentoClassroomTile.tsx` | Overlay label visible |
| 5 | Implement `BentoTestimonialTile.tsx` | 3 avatars + Best + quote |
| 6 | Implement `BentoStatTile.tsx` | 62+ + label |
| 7 | Implement `BentoHeroSection.tsx` | Full two-column layout + grid bg |
| 8 | Export from `components/custom/imili/index.ts` | Barrel compiles |
| 9 | Preview wire on `app/page.tsx` or `/preview/bento-hero` | Visible in `npm run dev` |
| 10 | Pixel QA @ 1440 with overlay | PRODUCT acceptance checkboxes |

---

## Files to create / modify

| File | Action |
| ---- | ------ |
| `_data/imili/bento-hero.ts` | **Create** |
| `components/custom/imili/BentoPhotoTile.tsx` | **Create** |
| `components/custom/imili/BentoClassroomTile.tsx` | **Create** |
| `components/custom/imili/BentoTestimonialTile.tsx` | **Create** |
| `components/custom/imili/BentoStatTile.tsx` | **Create** |
| `components/custom/imili/BentoHeroSection.tsx` | **Create** |
| `components/custom/imili/index.ts` | **Modify** |
| `app/page.tsx` | **Modify** (optional) |
| `components/custom/hero.tsx` | **Do not reuse** — different pattern |

---

## Responsive (minimal — not in reference)

| Breakpoint | Rule |
| ---------- | ---- |
| `< lg` | Stack: left column full width, bento below; **preserve 5 cells** in 2-col grid (do not drop cells) |
| `≥ lg` | Side-by-side layout per reference |

Do not collapse bento to fewer than 5 cells.

---

## Accessibility

| Requirement | Implementation |
| ----------- | -------------- |
| Page hero | Single `<h1>` for headline |
| CTA | `<Link>` or `<a>` with visible label; `ArrowUpRight` `aria-hidden` |
| Decorative grid/glow | `aria-hidden` on glow overlay |
| Classroom overlay | Visible text in DOM (not `aria-label` only) |
| Testimonial avatars | Meaningful `alt` from data |
| Bento photos | `alt` from data |
| Focus | CTA `focus-visible` ring |

---

## QA checklist

| Check | Method |
| ----- | ------ |
| 5 bento cells in correct grid slots | Visual / DOM |
| Headline 3 lines @ 1440 | Visual |
| One green CTA pill + ↗ icon | Visual |
| Feature card with bordered badge | Visual |
| Testimonial: 3 avatars, Best, quote — no names | DOM |
| Stat `62+` on `#0A3D34` tile | DevTools |
| Classroom overlay text | Visual |
| Grid background + green glow | Visual |
| No header/carousel in section | DOM |
| Images 200 OK | Network tab |
| No invented copy on IMILI build | Data uses TBD or IMILI copy when wired |

---

## Boundaries

**Always:**

- Read [PRODUCT.md](./PRODUCT.md) before coding.
- Use paths from [public inventory](./PRODUCT.md#public-raster-inventory) only.
- Match reference geometry before dark-theme adaptation.

**Never:**

- Add UI absent from reference (header, carousel, stars, testimonial names, second CTA).
- Invent image filenames not in `public/`.
- Invent education copy for IMILI production — reference strings are QA only.
- Use `CustomButton` for CTA — wrong visual pattern.

**Ask first:**

- Replace feat-0001 Carousel 1 with this hero.
- Dark-adapt while claiming this reference as QA source.
- Change bento cell count or grid topology.
