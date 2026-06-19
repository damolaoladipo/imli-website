# feat-0023: Tech — Homepage motion & micro-interactions

## Context

See [PRODUCT.md](./PRODUCT.md) and [TASKS.md](./TASKS.md).

**Target route:** `/` — sections from [`app/page.tsx`](../../app/page.tsx).

**Dependency:** `framer-motion@^12.23.24` (installed).

---

## Objective

1. Create `lib/motion.ts` — shared variants, durations, `getMotionVariants(reduced)`.
2. Add `"use client"` only where `motion` hooks are required.
3. Implement S1–S5 per PRODUCT without changing data files or copy.
4. Pass build + reduced-motion QA.

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA:

1. `/` @ 1440×900 — scroll full page; confirm staggered reveals.
2. DevTools → Rendering → **Emulate CSS media prefers-reduced-motion: reduce** — confirms no Y/scale motion.
3. Tab through `ServiceCard` CTA, `ArticleCard`, carousel nav — focus visible throughout.

---

## Files to touch

| File | Action |
| ---- | ------ |
| `lib/motion.ts` | **CREATE** |
| `components/custom/imili/BentoHeroSection.tsx` | **UPDATE** — mount stagger |
| `components/custom/imili/BentoPhotoTile.tsx` | **UPDATE** — hover scale |
| `components/custom/imili/BentoClassroomTile.tsx` | **UPDATE** — hover scale |
| `components/custom/imili/BentoTestimonialTile.tsx` | **UPDATE** — hover scale |
| `components/custom/imili/BentoStatTile.tsx` | **UPDATE** — hover scale |
| `components/custom/about-us.tsx` | **UPDATE** — whileInView columns |
| `components/custom/imili/ServicesCarousel.tsx` | **UPDATE** — header reveal, nav press |
| `components/custom/imili/ServiceCard.tsx` | **UPDATE** — card hover + scroll reveal |
| `components/custom/imili/ArticleCardGrid.tsx` | **UPDATE** — client + header stagger |
| `components/custom/imili/ArticleCard.tsx` | **UPDATE** — image zoom, shell hover |
| `components/custom/imili/TestimonialsCarousel.tsx` | **UPDATE** — header + nav press |
| `components/custom/imili/TestimonialCardStandard.tsx` | **UPDATE** — hover lift |
| `components/custom/imili/TestimonialCardFeatured.tsx` | **UPDATE** — hover scale |
| `components/custom/imili/CarouselNavButton.tsx` | **CREATE** — shared nav visual + motion (S3 + S5) **required** |
| `components/custom/imili/index.ts` | **UPDATE** — export `CarouselNavButton` |

**Do not touch:** `_data/**`, `app/page.tsx` (no wiring change), `app/layout.tsx`, `CustomButton.tsx` (already animated).

---

## 1. `lib/motion.ts` (CREATE)

```ts
import type { Variants, Transition } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const duration = {
  reveal: 0.45,
  hover: 0.18,
} as const;

export const viewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -40px 0px",
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.reveal, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export function motionVariants(
  reduced: boolean | null,
  base: Variants,
): Variants {
  if (!reduced) return base;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } },
  };
}

export const cardHover = {
  y: -4,
  transition: { duration: duration.hover, ease: easeOut },
} as const;

export const navTap = { scale: 0.94 } as const;
export const navHover = { scale: 1.04 } as const;

/** Auto-advance interval (testimonials) */
export const carouselAutoAdvanceMs = 5000;
export const carouselPauseResumeMs = 5000;
```

---

## 2. Architecture

### LazyMotion (optional)

Default: import `motion` directly. If bundle size increases measurably post-implementation, wrap homepage in:

```tsx
import { LazyMotion, domAnimation } from "framer-motion";

<LazyMotion features={domAnimation} strict>
  {children}
</LazyMotion>
```

Only in a client wrapper if needed — not required for v1 acceptance.

### Hydration

- Hero (`BentoHeroSection`): `animate="visible"` on mount — never `whileInView` for above-fold copy.
- Below-fold sections: `whileInView` + `viewport` from `lib/motion.ts`.
- When `useReducedMotion()` is true: `initial={false}` to skip hidden-first paint.

### `main` overflow

`app/layout.tsx` sets `overflow-x-hidden` on `<main>`. Section roots may use `overflow-visible` if card `translateY(-4px)` clips during QA. Do not remove `overflow-x-hidden` from layout in this spec.

### Hover gating

```tsx
const canHover = !reduced; // plus optional matchMedia("(hover: hover)") in CSS

<motion.article whileHover={canHover ? cardHover : undefined} />
```

For CSS-only hovers on `ArticleCard`:

```css
@media (hover: hover) and (pointer: fine) {
  .group:hover .article-image { transform: scale(1.05); }
}
```

Or Tailwind: `hover:scale-105` only applies on devices that support hover.

---

## 3. Client boundary rules

| Component | Needs `"use client"`? |
| --------- | --------------------- |
| `BentoHeroSection` | **Yes** — add at file top |
| `Bento*Tile` | **Yes** if using `motion` + hover |
| `AboutUs` | Already client |
| `ServicesCarousel` | Already client |
| `ServiceCard` | **Yes** — `whileInView` per card |
| `ArticleCardGrid` | **Yes** — or extract `ArticleCardGridMotion` client child |
| `ArticleCard` | **Yes** if `motion` on link wrapper |
| `TestimonialsCarousel` | Already client |
| Testimonial cards | **Yes** for hover |

**Pattern for server components:** keep data-fetching parent server-side; wrap animated subtree in client child. For this repo all section roots can be client components (no RSC data in section files today).

---

## 5. Implementation patterns

### Scroll reveal (section header)

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, motionVariants, staggerContainer, viewport } from "@/lib/motion";

const reduced = useReducedMotion();

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={viewport}
  variants={motionVariants(reduced, staggerContainer)}
>
  <motion.span variants={motionVariants(reduced, fadeUp)}>{badge}</motion.span>
  <motion.h2 variants={motionVariants(reduced, fadeUp)}>{heading}</motion.h2>
</motion.div>
```

### Hero mount (above fold — no whileInView)

```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={motionVariants(reduced, staggerContainer)}
>
```

### Card with index stagger

```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial="hidden"
    whileInView="visible"
    viewport={viewport}
    variants={motionVariants(reduced, fadeUp)}
    transition={{ delay: reduced ? 0 : index * 0.06 }}
  >
    <ServiceCard item={item} />
  </motion.div>
))}
```

### Nav button

```tsx
<motion.button
  whileHover={reduced ? undefined : navHover}
  whileTap={reduced ? undefined : navTap}
  className="..."
>
```

### Article image zoom (CSS — preferred for perf)

```tsx
<Image className="object-cover transition-transform duration-500 group-hover:scale-105" />
```

---

## 6. Per-file checklist

### `BentoHeroSection.tsx`

- Add `"use client"`.
- Wrap left column + grid in mount `motion.div` with `staggerContainer`.
- Children: `motion.h1`, `motion.p`, feature card `motion.div` with `fadeUp` variants.

### `BentoPhotoTile.tsx` / `BentoClassroomTile.tsx`

- `motion.div` root, `whileHover={{ scale: 1.02 }}` when `!reduced`.
- Inner `motion` wrapper on image optional — or CSS `group-hover:scale-105` on `Image`.

### `BentoTestimonialTile.tsx` / `BentoStatTile.tsx`

- Same hover as photo tiles; stat tile no image — scale shell only.

### `about-us.tsx`

- Wrap text column + image in `whileInView` `motion.div` pair.
- Image: `motion.div` with `fadeUp` + optional `x: 24` variant for lg.

### `ServicesCarousel.tsx`

- Animate badge + heading block.
- Replace inline nav `button` with `CarouselNavButton` (×2).

### `TestimonialsCarousel.tsx`

- Header motion + `CarouselNavButton` (replaces gray chevron pills).
- **Pause / Resume** button (`lg+` only, next to nav):
  - `aria-pressed={isPaused}`
  - Toggles `pausedRef`; when paused, clear interval.
- **Auto-advance** per [PRODUCT S5](./PRODUCT.md#auto-advance-product-yes):
  - `sectionRef` + `IntersectionObserver` (`threshold: 0.35`).
  - `useEffect` interval `carouselAutoAdvanceMs` calling `scroll(1)` when visible, not paused, `document.visibilityState === "visible"`.
  - `pausedRef` true on `mouseenter`, `focusin`, nav click, Pause click, `visibilitychange` → hidden.
  - Resume debounce `carouselPauseResumeMs` after pause ends.
  - Skip when `useReducedMotion()` is true.
  - End: `scrollLeft + clientWidth >= scrollWidth - 8` → `scrollTo({ left: 0, behavior: "smooth" })`.
  - On mount (lg): set `INITIAL_SCROLL_OFFSET`, then start timer.
- Do not wrap track in single `whileInView` — animate cards individually.

### `ServiceCard.tsx`

- `"use client"`.
- Root `motion.article` with `whileHover` lift (hover-gated) + shadow toggle.
- Illustration opacity `0.2 → 0.28` on hover.
- CTA: `group` on article + `group-hover:translate-x-0.5` on label.

### `ArticleCardGrid.tsx`

- `"use client"`.
- Header stagger; grid items wrapped in `motion.div` with index delay.

### `ArticleCard.tsx`

- Prefer CSS `group-hover` + `group-focus-visible` for image zoom and title color.
- Ensure `overflow-hidden` on image container for zoom.

### `TestimonialCardStandard.tsx` / `TestimonialCardFeatured.tsx`

- `motion.article` with `whileHover` per PRODUCT S5 (hover-gated).

---

## 7. `CarouselNavButton` (shared, required)

**File:** `components/custom/imili/CarouselNavButton.tsx`

```tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { navHover, navTap } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CarouselNavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  ariaLabel: string;
  className?: string;
};

const navClassName =
  "flex size-11 items-center justify-center rounded-full border border-dashed border-[#111111]/25 bg-transparent text-[#111111] transition-opacity hover:opacity-80 lg:size-[62px]";

export function CarouselNavButton({
  direction,
  onClick,
  ariaLabel,
  className,
}: CarouselNavButtonProps) {
  const reduced = useReducedMotion();
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={reduced ? undefined : navHover}
      whileTap={reduced ? undefined : navTap}
      className={cn(navClassName, className)}
    >
      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
    </motion.button>
  );
}
```

Export from `components/custom/imili/index.ts`.

### Testimonials pause toggle (sketch)

```tsx
<button
  type="button"
  aria-pressed={isPaused}
  onClick={() => setIsPaused((p) => !p)}
  className="hidden rounded-full border border-dashed border-[#111111]/25 px-4 py-2 text-sm text-[#111111] lg:inline-flex"
>
  {isPaused ? "Resume" : "Pause"}
</button>
```

Place in nav cluster beside `CarouselNavButton` pair.

---

## 8. Testing

| Check | How |
| ----- | --- |
| Build | `npm run build` |
| Reduced motion | Chrome DevTools → Rendering → prefers-reduced-motion |
| Keyboard | Tab through each interactive card |
| Mobile | 375px — no horizontal overflow from scale transforms |
| Auto-advance | Scroll testimonials into view — advances every 5s; pauses on hover; stops with reduced motion |
| Pause control | Click Pause — auto-advance stops; Resume restarts after debounce |
| Tab hidden | Switch tab — auto-advance stops |
| Touch | No sticky hover on cards after tap (iOS) |
| Clip QA | Card lift not clipped by `main` overflow |

---

## 9. Boundaries

### Always

- Use `lib/motion.ts` tokens — no one-off `y: 50` or `duration: 1s`.
- `viewport.once: true` on scroll reveals.
- Match [PRODUCT](./PRODUCT.md) motion principles.

### Ask first

- Adding motion to `HeroHeader` / footer.
- Auto-advance on **Services** carousel (testimonials only for v1).
- Replacing CSS hovers with motion where CSS is sufficient.

### Never

- Animate `width`, `height`, `margin`, or `padding`.
- Block pointer events during entrance animations.
- Remove existing `CustomButton` framer-motion behavior.

---

## Related specs

| Spec | Relation |
| ---- | -------- |
| [feat-0007](../feat-0007/PRODUCT.md) | Bento hero layout — motion must not change grid geometry |
| [feat-0006](../feat-0006/PRODUCT.md) | Services carousel — preserve scroll/grid modes |
| [feat-0003](../feat-0003/PRODUCT.md) | Article cards — preserve external link behavior |
| [feat-0005](../feat-0005/PRODUCT.md) | Testimonials — preserve initial scroll offset |
| [feat-0018](../feat-0018/PRODUCT.md) | Homepage copy — data-only; no conflict |
| feat-0024 (TBD) | Layout chrome motion — header, footers, drawer |
