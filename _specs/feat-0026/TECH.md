# feat-0026: Tech — Photo hero (single right image)

## Context

See [PRODUCT.md](./PRODUCT.md). New `PhotoHeroSection` — copy `BentoHeroSection` left column; replace right bento grid with [`/blocks/hero.jpeg`](../../public/blocks/hero.jpeg).

**Do not modify:** `BentoHeroSection.tsx`, bento tile components.

---

## Objective

1. Add `_data/imili/photo-hero.ts` with `PhotoHeroContent`.
2. Create `PhotoHeroSection.tsx` from `BentoHeroSection` template.
3. Export + **add section** to `app/page.tsx` (section #1).
4. Copy reference image to `_specs/feat-0026/assets/`.
5. QA @ 375 / 1440 px; `npm run build`.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router |
| Image | `next/image` — `fill`, `object-cover`, `priority` |
| Motion | `framer-motion` — same as `BentoHeroSection` |
| Styling | Tailwind v4 |
| Data | `_data/imili/photo-hero.ts` |

---

## Commands

```bash
cp public/blocks/hero.jpeg _specs/feat-0026/assets/hero-institute-lobby.jpeg
npm run dev
npm run build
npm run lint
```

Manual QA @ `/`:

1. Hero shows lobby photo on the right (desktop) or below copy (mobile).
2. Only **one** image — no bento cells.
3. Left copy + CTA + feature card unchanged from prior bento hero.
4. 375px — stacked, no overflow.

---

## Project structure

```text
./
├── _data/imili/
│   └── photo-hero.ts                    # NEW
├── public/blocks/
│   └── hero.jpeg                        # EXISTS — normative src
├── components/custom/imili/
│   ├── BentoHeroSection.tsx             # UNCHANGED
│   ├── PhotoHeroSection.tsx             # NEW
│   └── index.ts                         # MODIFY — export
├── app/page.tsx                         # MODIFY — add PhotoHeroSection as section #1
└── _specs/feat-0026/
    ├── PRODUCT.md
    ├── TECH.md
    └── assets/hero-institute-lobby.jpeg # COPY for spec QA
```

---

## Implementation tasks

### Task 1 — Data file

**File:** `_data/imili/photo-hero.ts`

Copy strings from `bentoHeroHomepageContent`; set `heroImage.src` to `/blocks/hero.jpeg`.

---

### Task 2 — `PhotoHeroSection.tsx`

**Root markup:**

```tsx
<section id="photo-hero" aria-labelledby="photo-hero-heading" className="relative min-h-[739px] ...">
  ...
  <motion.h1 id="photo-hero-heading" ...>
```

**Approach:** Duplicate `BentoHeroSection.tsx` → rename → delete right `motion.div` grid and bento imports.

**Right column replacement:**

```tsx
<motion.div
  className="relative h-[280px] w-full sm:aspect-[16/10] lg:h-[619px] lg:flex-1"
  initial={reduced ? false : "hidden"}
  animate="visible"
  variants={motionVariants(reduced, fadeUp)}
>
  <div className="relative h-full w-full overflow-hidden rounded-[25px]">
    <Image
      src={content.heroImage.src}
      alt={content.heroImage.alt}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 58vw"
      priority
    />
  </div>
</motion.div>
```

**Remove imports:** `BentoClassroomTile`, `BentoPhotoTile`, `BentoStatTile`, `BentoTestimonialTile`.

---

### Task 3 — Add homepage section

```tsx
// app/page.tsx — PhotoHeroSection is section #1 in the stack
import { photoHeroHomepageContent } from "@/_data/imili/photo-hero";
import { PhotoHeroSection, ... } from "@/components/custom/imili";

export default function Home() {
  return (
    <>
      <PhotoHeroSection content={photoHeroHomepageContent} />
      <AboutUs ... />
      <DocumentarySection ... />
      ...
    </>
  );
}
```

Remove `BentoHeroSection` from `app/page.tsx` only (keep file in repo).

---

### Task 4 — Export

```ts
// index.ts
export { PhotoHeroSection } from "./PhotoHeroSection";
```

---

### Task 5 — Verify

| Check | Action |
| ----- | ------ |
| Build | `npm run build` |
| Single image | Visual — no bento grid |
| LCP | `priority` on Image |
| Section landmark | `id="photo-hero"` + `aria-labelledby` on `h1` |

---

## Boundaries

| Tier | Rule |
| ---- | ---- |
| **Always** | One image `/blocks/hero.jpeg`; preserve left column parity with `BentoHeroSection` |
| **Ask first** | Changing left-column copy or layout; deleting `BentoHeroSection` |
| **Never** | Multiple images on right; bento grid in `PhotoHeroSection` |
