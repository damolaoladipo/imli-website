# feat-0027: Tech — Background photo hero

## Context

See [PRODUCT.md](./PRODUCT.md). `BackgroundPhotoHeroSection` — full-bleed [`/blocks/hero.jpeg`](../../public/blocks/hero.jpeg), empty right column, readable left copy.

**Supersedes:** [feat-0026](../feat-0026/PRODUCT.md) for implementation.

**Do not modify:** `BentoHeroSection.tsx`.

---

## Objective

1. `_data/imili/background-photo-hero.ts`
2. `BackgroundPhotoHeroSection.tsx`
3. Export + `app/page.tsx` section #1
4. QA @ 375 / 1440 px

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

---

## Project structure

```text
_data/imili/background-photo-hero.ts          # NEW
components/custom/imili/BackgroundPhotoHeroSection.tsx  # NEW
components/custom/imili/index.ts               # export
app/page.tsx                                   # section #1
_specs/feat-0027/assets/hero-institute-lobby.jpeg
```

---

## Implementation sketch

```tsx
"use client";

import Image from "next/image";
import { Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { BackgroundPhotoHeroContent } from "@/_data/imili/background-photo-hero";
import { CustomButton } from "@/components/custom/custom-button";
import { fadeUp, motionVariants, staggerContainer } from "@/lib/motion";

export function BackgroundPhotoHeroSection({ content }: { content: BackgroundPhotoHeroContent }) {
  const reduced = useReducedMotion();

  return (
    <section
      id="photo-hero"
      aria-labelledby="photo-hero-heading"
      className="relative min-h-[520px] overflow-hidden px-4 py-20 md:px-[68px] lg:min-h-[739px]"
    >
      <Image
        src={content.backgroundImage.src}
        alt={content.backgroundImage.alt}
        fill
        priority
        className="object-cover object-center lg:object-right"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-r from-white/95 via-white/88 to-white/20 lg:via-white/80 lg:to-transparent"
      />
      <div className="relative z-10 mx-auto flex container flex-col gap-12 lg:flex-row lg:gap-20">
        <motion.div
          className="flex w-full flex-col justify-between lg:w-[42%]"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={motionVariants(reduced, staggerContainer)}
        >
          {/* copy left column from BentoHeroSection — h1 id="photo-hero-heading" */}
        </motion.div>
        <div className="hidden min-h-[619px] flex-1 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
```

---

## Tasks

1. Data file — mirror `bentoHeroHomepageContent` strings + `backgroundImage`
2. Copy left column from `BentoHeroSection.tsx` verbatim (motion + feature card)
3. Background `Image` + gradient overlay
4. Empty `lg:flex-1` spacer — no bento imports
5. `page.tsx` — replace `BentoHeroSection` with `BackgroundPhotoHeroSection`
6. Visual QA — right shows totem/wall; left text readable

---

## Boundaries

| Always | Full-bleed bg; empty right; left scrim |
| Never | Bento tiles on right; feat-0026 right-column Image tile |
