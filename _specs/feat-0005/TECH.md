# feat-0005: Tech — Testimonials carousel

## Context

See [PRODUCT.md](./PRODUCT.md). Implement the **testimonials carousel** from `./assets/testimonials-carousel-reference.png` (**1024×420** capture; QA @ **1440px**).

**Pixel tables:** [Section layout](./PRODUCT.md#d2--section-layout), [Header](./PRODUCT.md#d3--header-anatomy), [Carousel](./PRODUCT.md#d4--carousel-behavior), [Standard card](./PRODUCT.md#d5--standard-card-anatomy), [Featured card](./PRODUCT.md#d6--featured-card-anatomy), [Colors](./PRODUCT.md#d7--colors-from-reference).

---

## Objective

1. Add `_data/imili/testimonials.ts` with `TestimonialsSectionContent` (reference strings + QA image paths).
2. Implement `TestimonialCardStandard`, `TestimonialCardFeatured`, and `TestimonialsCarousel` under `components/custom/imili/`.
3. Add `TestimonialsCarousel` to `app/page.tsx` as a new section (alongside feat-0003 and feat-0004).
4. Pixel QA @ 1440px against `./assets/testimonials-carousel-reference.png`.
5. Use **only** existing `public/` raster paths until production assets are added ([D9](./PRODUCT.md#d9--images-public-folder)).

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| Images | `next/image` — `fill` + `object-cover` (featured); fixed `width`/`height` (avatars) |
| Icons | `lucide-react` `ChevronLeft` / `ChevronRight` |
| Font | Montserrat via `_data/fonts.tsx` / `app/layout.tsx` |
| Styling | Tailwind v4 — literal hex from [PRODUCT D7](./PRODUCT.md#d7--colors-from-reference) |
| Scroll | Native `scrollBy` on track ref from nav buttons — **no** new carousel dependency |
| Data | `_data/imili/testimonials.ts` |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA:

1. Open preview route or homepage wire @ **1440×900** and **375×812**.
2. Overlay `./assets/testimonials-carousel-reference.png` at 1440 width — check header, card sizes, featured gradient, dotted rule.
3. Click prev/next — track scrolls; featured card stays `variant: 'featured'` on item 3.
4. Tab to nav buttons — focus ring visible; `aria-label` announced.
5. Confirm all `avatarSrc` / `photoSrc` return **200**.

---

## Project structure

```text
./
├── _data/imili/
│   └── testimonials.ts                    # NEW — TestimonialsSectionContent
├── components/custom/imili/
│   ├── TestimonialCardStandard.tsx        # NEW — gray card
│   ├── TestimonialCardFeatured.tsx        # NEW — photo card
│   ├── TestimonialsCarousel.tsx           # NEW — section + header + track
│   └── index.ts                           # MODIFY — barrel export
├── app/
│   └── page.tsx                           # optional preview wire
└── _specs/feat-0005/assets/
    └── testimonials-carousel-reference.png
```

**Minimum v1:** data file + two card components + carousel section. Do **not** reuse `components/testimonials.tsx` / `testimonials-two.tsx` / `testimonials-three.tsx`.

---

## Data model

```ts
// _data/imili/testimonials.ts
export type TestimonialCardVariant = 'standard' | 'featured';

export type TestimonialItem = {
  id: string;
  variant: TestimonialCardVariant;
  quote: string;
  name: string;
  location: string;
  avatarSrc?: string;
  avatarAlt?: string;
  photoSrc?: string;
  photoAlt?: string;
};

export type TestimonialsSectionContent = {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  items: TestimonialItem[];
};

/** Layout QA — strings and geometry from reference screenshot. */
export const testimonialsReferenceContent: TestimonialsSectionContent = {
  badge: 'Trusted by customers',
  headingLine1: 'Trusted by families',
  headingLine2: 'and businesses alike',
  items: [
    {
      id: 'ref-1',
      variant: 'standard',
      // Clip obscures full copy — fragments only per PRODUCT.md; do not expand.
      quote:
        '…simple, the… ed right on time, …rked quickly… ing corners. …e all around.',
      name: '…ma L',
      location: '…ago, IL',
      avatarSrc: '/toyosi.png',
      avatarAlt: 'Placeholder — card 1 avatar QA',
    },
    {
      id: 'ref-2',
      variant: 'standard',
      quote:
        'I was worried about damage, but every piece arrived just as it left. Highly recommend! The movers were on time, courteous.',
      name: 'Michael Kee',
      location: 'Seattle, WA',
      avatarSrc: '/new/corps.jpeg',
      avatarAlt: 'Placeholder — card 2 avatar QA',
    },
    {
      id: 'ref-3',
      variant: 'featured',
      quote:
        'Moving always feels overwhelming, but they truly made it a breeze',
      name: 'Derrick Warner',
      location: 'New York, NY',
      photoSrc: '/new/humans.png',
      photoAlt: 'Placeholder — featured card QA',
    },
    {
      id: 'ref-4',
      variant: 'standard',
      quote:
        'I was dreading the move, but they made it so easy. Everything arrived safely and on time. The team was respectful and helpful.',
      name: 'Jessica Leo',
      location: 'Austin, TX',
      avatarSrc: '/new/airi.png',
      avatarAlt: 'Placeholder — card 4 avatar QA',
    },
    {
      id: 'ref-5',
      variant: 'standard',
      quote:
        "The crew was friendly, fast, and incredibly organized. They handled our large furniture with ease and didn't leave a scratch.",
      name: 'Aiden T',
      location: 'Boston, MA',
      avatarSrc: '/mide.png',
      avatarAlt: 'Placeholder — card 5 avatar QA',
    },
    {
      id: 'ref-6',
      variant: 'standard',
      quote:
        'We had a tight schedule and lots of fragile items. They made it work effortlessly. Nothing was damaged.',
      name: 'Carlos M',
      location: 'Atlanta, GA',
      avatarSrc: '/bipoc.png',
      avatarAlt: 'Placeholder — card 6 avatar QA',
    },
  ],
};
```

---

## Component API

### `TestimonialCardStandard`

```tsx
// components/custom/imili/TestimonialCardStandard.tsx
import Image from 'next/image';
import type { TestimonialItem } from '@/_data/imili/testimonials';

type Props = {
  item: TestimonialItem;
  className?: string;
};

export function TestimonialCardStandard({ item, className }: Props) {
  return (
    <article
      className={cn(
        'flex h-[371px] w-[382px] shrink-0 flex-col justify-between rounded-[25px] bg-[#F2F2F2] p-[31px]',
        className,
      )}
    >
      <p className="text-[21px] leading-[1.45] text-[#141414]">{item.quote}</p>
      <div>
        <div className="border-t border-dotted border-[#D4D4D4]" />
        <div className="mt-5 flex items-center gap-3">
          <Image
            src={item.avatarSrc!}
            alt={item.avatarAlt ?? ''}
            width={62}
            height={62}
            className="size-[62px] rounded-[14px] object-cover"
          />
          <div>
            <p className="text-[20px] font-semibold text-[#111111]">{item.name}</p>
            <p className="text-[18px] text-[#6B6B6B]">{item.location}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
```

### `TestimonialCardFeatured`

```tsx
// components/custom/imili/TestimonialCardFeatured.tsx
import Image from 'next/image';
import type { TestimonialItem } from '@/_data/imili/testimonials';

type Props = {
  item: TestimonialItem;
  className?: string;
};

export function TestimonialCardFeatured({ item, className }: Props) {
  return (
    <article
      className={cn(
        'relative h-[411px] w-[422px] shrink-0 overflow-hidden rounded-[25px]',
        className,
      )}
    >
      <Image
        src={item.photoSrc!}
        alt={item.photoAlt ?? ''}
        fill
        className="object-cover"
        sizes="422px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-[31px]">
        <p className="text-[21px] leading-[1.45] text-white">{item.quote}</p>
        <div className="mt-4">
          <p className="text-[20px] font-semibold text-white">{item.name}</p>
          <p className="text-[18px] text-white/85">{item.location}</p>
        </div>
      </div>
    </article>
  );
}
```

### `TestimonialsCarousel`

```tsx
// components/custom/imili/TestimonialsCarousel.tsx
'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCardFeatured } from './TestimonialCardFeatured';
import { TestimonialCardStandard } from './TestimonialCardStandard';
import type { TestimonialsSectionContent } from '@/_data/imili/testimonials';

const SCROLL_STEP = 382 + 23; // standard width + gap @1440 — PRODUCT D4

type Props = {
  content: TestimonialsSectionContent;
};

export function TestimonialsCarousel({ content }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: 'smooth' });
  };

  return (
    <section className="bg-white pb-[34px] pt-[34px]">
      <div className="px-14">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex rounded-full bg-[#EBEBEB] px-3 py-1.5 text-[12px] font-medium text-[#5A5A5A]">
              {content.badge}
            </span>
            <h2 className="mt-3 text-[51px] font-bold leading-[1.12] text-black">
              {content.headingLine1}
              <br />
              {content.headingLine2}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scroll(-1)}
              className="flex size-[62px] items-center justify-center rounded-[14px] bg-[#EBEBEB] text-[#111111]"
            >
              <ChevronLeft className="size-7" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scroll(1)}
              className="flex size-[62px] items-center justify-center rounded-[14px] bg-[#EBEBEB] text-[#111111]"
            >
              <ChevronRight className="size-7" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-11 flex gap-[23px] overflow-x-auto px-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {content.items.map((item) =>
          item.variant === 'featured' ? (
            <TestimonialCardFeatured key={item.id} item={item} />
          ) : (
            <TestimonialCardStandard key={item.id} item={item} />
          ),
        )}
      </div>
    </section>
  );
}
```

**Initial scroll offset:** After mount, set `scrollLeft` so card 3 (featured) is near center and card 1 is partially clipped — e.g. `scrollLeft ≈ (382 + 23)` for one standard card width. Tune in QA against overlay.

**Do not add** stars, dots, autoplay, subheading, or “view all”.

---

## Preview wire-up

```tsx
// app/page.tsx (excerpt) — new section alongside feat-0003 + feat-0004
import { TestimonialsCarousel } from '@/components/custom/imili';
import { testimonialsReferenceContent } from '@/_data/imili/testimonials';

<TestimonialsCarousel content={testimonialsReferenceContent} />
```

Replace reference copy with IMILI production content before launch — reference strings are moving-company themed.

---

## Implementation tasks (ordered)

Per [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md):

| # | Task | Done when |
| - | ---- | --------- |
| 1 | Reference PNG in `_specs/feat-0005/assets/` | File exists |
| 2 | Create `_data/imili/testimonials.ts` | Types + 6 reference items compile |
| 3 | Implement `TestimonialCardStandard.tsx` | Dotted rule + avatar footer |
| 4 | Implement `TestimonialCardFeatured.tsx` | Photo + gradient + white text |
| 5 | Implement `TestimonialsCarousel.tsx` | Header + scroll track + nav |
| 6 | Export from `components/custom/imili/index.ts` | Barrel compiles |
| 7 | Preview wire on `app/page.tsx` or `/preview/testimonials` | Visible in `npm run dev` |
| 8 | Pixel QA @ 1440 with overlay | PRODUCT acceptance checkboxes |
| 9 | Set initial `scrollLeft` for card-1 clip | Matches reference capture |

---

## Files to create / modify

| File | Action |
| ---- | ------ |
| `_data/imili/testimonials.ts` | **Create** |
| `components/custom/imili/TestimonialCardStandard.tsx` | **Create** |
| `components/custom/imili/TestimonialCardFeatured.tsx` | **Create** |
| `components/custom/imili/TestimonialsCarousel.tsx` | **Create** |
| `components/custom/imili/index.ts` | **Modify** — export carousel |
| `app/page.tsx` | **Modify** (optional) — preview wire |
| `components/testimonials*.tsx` | **Do not reuse** — wrong layouts |

---

## Accessibility

| Requirement | Implementation |
| ----------- | -------------- |
| Section heading | `<h2>` with two lines from content (matches visible heading) |
| Nav buttons | `aria-label` on prev/next; `type="button"` |
| Decorative chevrons | `aria-hidden` on icons |
| Card quotes | Plain text in `<article>`; no fake links |
| Avatars | Meaningful `avatarAlt` from data |
| Featured photo | `photoAlt` from data |
| Keyboard | Nav buttons focusable; track scrollable via keyboard when focused (native overflow) |
| Reduced motion | Respect `prefers-reduced-motion: reduce` — use `behavior: 'auto'` instead of `smooth` |

---

## Responsive (minimal — not in reference)

| Breakpoint | Rule |
| ---------- | ---- |
| `< md` | Keep card **widths** fixed (shrink-0); horizontal scroll required |
| `≥ md` | Same as reference — horizontal bleed carousel |

Do not reflow cards into a vertical stack — not in reference.

---

## QA checklist

| Check | Method |
| ----- | ------ |
| Badge + 2-line heading + 2 nav buttons | Visual / DOM |
| 6 cards | Count children in track |
| Card 3 featured (taller/wider) | DevTools width/height |
| Standard card `#F2F2F2` | Computed background |
| Dotted separator on standard only | DOM |
| No avatar on featured | DOM |
| White section bg | Computed |
| Images 200 OK | Network tab |
| No stars / dots / view-all | DOM query |
| Initial clip on card 1 | Visual @ 1440 |

---

## Boundaries

**Always:**

- Read [PRODUCT.md](./PRODUCT.md) before coding.
- Use paths from [public inventory](./PRODUCT.md#public-raster-inventory) only.
- Match reference geometry before dark-theme adaptation.

**Never:**

- Add UI elements absent from reference (stars, dots, subheading, links, autoplay).
- Invent image filenames not in `public/`.
- Invent testimonial copy for IMILI production — use reference strings for QA only.
- Promote center card to featured on scroll without new design reference.
- Reuse legacy `components/testimonials*.tsx` layouts.

**Ask first:**

- Homepage placement in feat-0001 stack.
- Dark-adapt this section while claiming this reference as QA source.
- Change card count or featured index.
