# feat-0016: Tech — Mission split section

## Context

See [PRODUCT.md](./PRODUCT.md). Implement the **new mission split section** from `./assets/mission-section-reference.png` (**1024×396** capture; QA @ **1440px**).

**Pixel tables:** [Section shell](./PRODUCT.md#d3--section-shell), [Left column](./PRODUCT.md#d4--left-column), [Right grid](./PRODUCT.md#d5--right-grid-layout), [Cell anatomy](./PRODUCT.md#d6--cell-anatomy), [Swirl](./PRODUCT.md#d7--decorative-swirl-on-primary-photo).

**Related (do not merge):** [feat-0007](../feat-0007/PRODUCT.md) `BentoHeroSection`, `components/custom/about-us.tsx`.

---

## Objective

1. Add `_data/imili/mission-section.ts` with `MissionSectionContent` (reference + homepage exports).
2. Implement `MissionStatTile`, `MissionPhotoTile` (with swirl), `MissionSection` under `components/custom/imili/`.
3. Wire `MissionSection` into `app/page.tsx` after `AboutUs`.
4. Pixel QA @ 1440px against `./assets/mission-section-reference.png`.
5. Use **only** existing `public/` raster paths until production assets are added ([D10](./PRODUCT.md#d10--images-public-folder)).

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| Images | `next/image` — `fill` + `object-cover` |
| Icons | `lucide-react` — `HeartHandshake`, `ArrowRight` |
| Font | Montserrat via `_data/fonts.tsx` |
| Styling | Tailwind v4 — literal hex from [PRODUCT D8](./PRODUCT.md#d8--colors-from-reference) |
| CTA (QA) | `Link` styled as reference pill per [D4](./PRODUCT.md#d4--left-column) |
| Grid | CSS Grid `grid-cols-2 grid-rows-2` |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA @ **1440×900**: overlay `./assets/mission-section-reference.png` at 1440 width — badge, grid proportions, stat card, swirl, pill CTA.

---

## Project structure

```text
./
├── _data/imili/
│   └── mission-section.ts              # NEW
├── components/custom/imili/
│   ├── MissionPhotoTile.tsx            # NEW — photo + optional swirl
│   ├── MissionStatTile.tsx             # NEW — light stat card
│   ├── MissionSection.tsx              # NEW — section shell
│   └── index.ts                        # UPDATE — exports
├── app/page.tsx                        # UPDATE — wire MissionSection
└── _specs/feat-0016/
    ├── PRODUCT.md
    ├── TECH.md
    └── assets/mission-section-reference.png
```

---

## Data file

```ts
// _data/imili/mission-section.ts

import { IMILI_IMAGES } from "@/_data/imili/images";

export type MissionSectionImage = {
  src: string;
  alt: string;
};

export type MissionSectionContent = {
  badgeLabel: string;
  heading: string;
  description: string;
  cta: { label: string; href: string };
  primaryPhoto: MissionSectionImage;
  stat: { value: string; label: string };
  secondaryPhoto: MissionSectionImage;
};

export const missionSectionReferenceContent: MissionSectionContent = {
  badgeLabel: "Our Mission",
  heading: "Our Inspiring Mission and Ambitious Goals",
  description:
    "Every cause we support is driven by real needs, real people, and real outcomes.",
  cta: { label: "Learn More", href: "/about" },
  primaryPhoto: {
    src: "/new/humans.png",
    alt: "Placeholder — primary photo layout QA",
  },
  stat: { value: "200+", label: "Dedicated Volunteers" },
  secondaryPhoto: {
    src: "/new/corps.png",
    alt: "Placeholder — secondary photo layout QA",
  },
};

export const missionSectionHomepageContent: MissionSectionContent = {
  badgeLabel: "Our Mission",
  heading: "TBD",
  description: "TBD",
  cta: { label: "Learn more", href: "/about" },
  primaryPhoto: IMILI_IMAGES.mission,
  stat: { value: "TBD", label: "TBD" },
  secondaryPhoto: IMILI_IMAGES.vision,
};
```

---

## Component sketches

### `MissionPhotoTile.tsx`

```tsx
type MissionPhotoTileProps = {
  src: string;
  alt: string;
  showSwirl?: boolean;
  className?: string;
};

// relative h-full w-full overflow-hidden rounded-[25px]
// Image fill object-cover
// if showSwirl: absolute SVG arc bottom-left (see PRODUCT D7)
```

### `MissionStatTile.tsx`

```tsx
// Light card per PRODUCT D6 — NOT BentoStatTile
// HeartHandshake icon + value + label, centered
```

### `MissionSection.tsx`

```tsx
type MissionSectionProps = {
  content: MissionSectionContent;
};

// section#mission.bg-white.py-[68px]
//   container flex lg:flex-row lg:items-center
//     left column: badge, h2, p, CTA pill Link
//     right: grid h-[422px] grid-cols-2 grid-rows-2 gap-4
//       MissionPhotoTile primary row-span-2 showSwirl
//       MissionStatTile top-right
//       MissionPhotoTile secondary bottom-right
```

### Mission badge (QA)

```tsx
<span className="inline-flex items-center gap-2 rounded-full bg-[#EBEBEB] px-5 py-2.5">
  <span className="flex size-[34px] items-center justify-center rounded-full bg-[#2EBC5E] text-white">
    <HeartHandshake className="size-4" aria-hidden />
  </span>
  <span className="text-[18px] font-medium text-[#111111]">{content.badgeLabel}</span>
</span>
```

### Reference CTA pill (QA)

**Do not use `CustomButton`** — reference is green pill + white trailing disc, not IMILI blue CTA.

```tsx
<Link
  href={content.cta.href}
  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#2EBC5E] px-10 py-5 text-[21px] font-medium text-white"
>
  {content.cta.label}
  <span className="flex size-12 items-center justify-center rounded-full bg-white">
    <ArrowRight className="size-5 text-[#2EBC5E]" aria-hidden />
  </span>
</Link>
```

---

## Implementation tasks (ordered)

| # | Task | Done when |
| - | ---- | --------- |
| 1 | `_data/imili/mission-section.ts` | Reference + homepage exports |
| 2 | `MissionPhotoTile.tsx` | Image + optional swirl SVG |
| 3 | `MissionStatTile.tsx` | Light stat card matches D6 |
| 4 | `MissionSection.tsx` | Full section matches reference |
| 5 | Export from `components/custom/imili/index.ts` | Named export |
| 6 | `app/page.tsx` | After `AboutUs`, before `ArticleCardGrid` |
| 7 | `npm run build` + overlay QA | PRODUCT acceptance criteria |

---

## Boundaries

### Always

- Match reference geometry before swapping IMILI production copy.
- Use `public/` paths from [inventory](./PRODUCT.md#public-raster-inventory) only.
- Mark unknown copy/stat `TBD` — never fabricate “200+ volunteers” on production.

### Ask first

- Replacing reference pill CTA with `CustomButton` ([D11](./PRODUCT.md#d11--cta--imil-brand)).
- Removing green swirl to simplify v1.

### Never

- Reuse `BentoStatTile` dark styling for this stat card.
- Ship reference charity heading/description on IMILI production homepage.
- Add fourth grid cell or carousel controls.

---

## Verification

```bash
npm run build
```

| Check | Expected |
| ----- | -------- |
| `/` renders `MissionSection` | Badge + 3-cell grid visible |
| Primary photo | Swirl overlay visible |
| Stat card | Light gray background, centered icon/value/label |
| CTA | Navigates to `cta.href` |
| Images | All `imageSrc` return 200 |
