# feat-0008: Tech — Curved hero card (photo + white copy cutout)

## Context

See [PRODUCT.md](./PRODUCT.md). Implement the **curved hero card** from `./assets/curved-hero-reference.png` (**1024×556** capture; QA @ **1440px**).

**Pixel tables:** [Container](./PRODUCT.md#d3--outer-container), [Photo](./PRODUCT.md#d4--photo-layer), [Curve / panel](./PRODUCT.md#d5--curve-and-white-panel), [Copy block](./PRODUCT.md#d6--copy-block-anatomy), [Colors](./PRODUCT.md#d7--colors-from-reference).

---

## Objective

1. Add `_data/imili/curved-hero.ts` with `CurvedHeroContent` (reference strings + QA image path).
2. Implement `CurvedHeroSection` under `components/custom/imili/`.
3. Wire into preview route or `app/page.tsx` for isolated QA.
4. Pixel QA @ 1440px against `./assets/curved-hero-reference.png`.
5. Use **only** existing `public/` raster paths until production asset lands ([D9](./PRODUCT.md#d9--images-public-folder)).

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| Images | `next/image` — `fill` + `object-cover` on photo layer |
| CTA | `next/link` — single dark pill; **not** `CustomButton` |
| Font | Montserrat via `app/layout.tsx` |
| Curve | Absolute white panel + `rounded-tr-[169px]` (tune in QA); escalate to SVG mask only if overlay fails |
| Styling | Tailwind v4 — hex from [PRODUCT D7](./PRODUCT.md#d7--colors-from-reference) |
| Data | `_data/imili/curved-hero.ts` |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA @ **1440×900**:

1. Overlay `./assets/curved-hero-reference.png` at 1440 width.
2. Verify outer radius, curve silhouette, 2-line headline, body+CTA row.
3. Tab to CTA — focus ring visible.
4. Confirm `imageSrc` returns **200**.

---

## Project structure

```text
./
├── _data/imili/
│   └── curved-hero.ts                    # NEW — CurvedHeroContent
├── components/custom/imili/
│   ├── CurvedHeroSection.tsx             # NEW
│   └── index.ts                          # MODIFY — barrel export
├── app/page.tsx                          # optional preview wire
└── _specs/feat-0008/assets/
    └── curved-hero-reference.png
```

**Do not reuse** `components/custom/about-us.tsx` — different layout (grid, no curve).

---

## Data model

```ts
// _data/imili/curved-hero.ts
export type CurvedHeroContent = {
  headlineLine1: string;
  headlineLine2: string;
  body: string;
  cta: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
};

/** Layout QA — strings from reference screenshot. */
export const curvedHeroReferenceContent: CurvedHeroContent = {
  headlineLine1: 'Lambda – Transforming Lives',
  headlineLine2: 'with Compassion',
  body: 'Lambda is a dynamic charity donation organization committed to making a positive impact on communities around the world.',
  cta: { label: 'Donate Now', href: '#' },
  imageSrc: '/new/humans.png',
  imageAlt: 'Placeholder — curved hero photo QA',
};
```

---

## Component API

### `CurvedHeroSection`

```tsx
// components/custom/imili/CurvedHeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { CurvedHeroContent } from '@/_data/imili/curved-hero';

type Props = { content: CurvedHeroContent };

const TEAL = '#1E3D3D';

export function CurvedHeroSection({ content }: Props) {
  return (
    <section className="bg-white px-4 py-8 md:px-6">
      <div className="relative mx-auto h-[731px] max-w-7xl overflow-hidden rounded-[67px]">
        {/* Photo layer — PRODUCT D4 */}
        <Image
          src={content.imageSrc}
          alt={content.imageAlt}
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="(max-width: 1440px) 100vw, 1280px"
        />

        {/* White copy cutout — PRODUCT D5–D6 */}
        <div
          className="absolute bottom-0 left-0 z-10 flex w-[58%] min-h-[306px] flex-col justify-center rounded-tr-[169px] bg-white p-14"
        >
          <h1
            className="text-[51px] font-bold leading-[1.1]"
            style={{ color: TEAL }}
          >
            {content.headlineLine1}
            <br />
            {content.headlineLine2}
          </h1>

          <div className="mt-7 flex items-center justify-between gap-6">
            <p
              className="max-w-[55%] text-[21px] leading-relaxed"
              style={{ color: TEAL }}
            >
              {content.body}
            </p>
            <Link
              href={content.cta.href}
              className="shrink-0 rounded-full px-7 py-3.5 text-[20px] font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: TEAL, outlineColor: TEAL }}
            >
              {content.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Curve tuning:** If `rounded-tr-[169px]` does not match overlay, adjust in 8 px steps or switch to SVG mask — do **not** change panel width/height ratio without re-checking PRODUCT D5.

**Responsive (minimal — not in reference):** @ `< lg`, stack body above CTA (`flex-col items-start`) while preserving white panel + curve; do not drop photo or headline.

---

## Preview wire-up

```tsx
// app/page.tsx (excerpt) — during layout QA only
import { CurvedHeroSection } from '@/components/custom/imili';
import { curvedHeroReferenceContent } from '@/_data/imili/curved-hero';

<CurvedHeroSection content={curvedHeroReferenceContent} />
```

Gate before IMILI production — reference copy is charity themed.

---

## Implementation tasks (ordered)

Per [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md):

| # | Task | Done when |
| - | ---- | --------- |
| 1 | Reference PNG in `_specs/feat-0008/assets/` | File exists |
| 2 | Create `_data/imili/curved-hero.ts` | Types + reference content compile |
| 3 | Implement `CurvedHeroSection.tsx` | Photo + panel + copy row render |
| 4 | Export from `components/custom/imili/index.ts` | Barrel compiles |
| 5 | Preview wire on `app/page.tsx` or `/preview/curved-hero` | Visible in `npm run dev` |
| 6 | Tune `rounded-tr-*` + `object-position` against overlay | Curve ±4 px |
| 7 | PRODUCT acceptance checkboxes | QA sign-off |

---

## Files to create / modify

| File | Action |
| ---- | ------ |
| `_data/imili/curved-hero.ts` | **Create** |
| `components/custom/imili/CurvedHeroSection.tsx` | **Create** |
| `components/custom/imili/index.ts` | **Modify** |
| `app/page.tsx` | **Modify** (optional) |
| `components/custom/about-us.tsx` | **Do not reuse** |

---

## Accessibility

| Requirement | Implementation |
| ----------- | -------------- |
| Hero heading | Single `<h1>` with two lines |
| CTA | `<Link>` with visible label; `href` from data |
| Photo | Meaningful `imageAlt` |
| Focus | CTA `focus-visible` outline |
| Decorative curve | No extra ARIA — structure is semantic |

---

## QA checklist

| Check | Method |
| ----- | ------ |
| Outer `rounded-[67px]` | DevTools |
| Smooth curve (not diagonal) | Visual overlay |
| 2-line headline | Visual |
| Body + CTA horizontal @ lg | Visual / DOM flex |
| Dark pill CTA, white label | DevTools |
| No second CTA / badge / nav | DOM |
| Image 200 OK | Network tab |
| Not using `CustomButton` | Code review |

---

## Boundaries

**Always:**

- Read [PRODUCT.md](./PRODUCT.md) before coding.
- Use paths from [public inventory](./PRODUCT.md#public-raster-inventory) only.
- Match reference curve geometry before responsive tweaks.

**Never:**

- Add UI absent from reference (badge, stats, carousel, second CTA, header).
- Invent image filenames not in `public/`.
- Invent charity copy for IMILI production.
- Use `CustomButton` for CTA.
- Replace curve with a simple rectangle or diagonal split.

**Ask first:**

- Homepage placement vs feat-0007.
- Dark-adapt while using this reference for QA.
- Change headline line breaks.
