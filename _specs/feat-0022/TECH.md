# feat-0022: Tech — Homepage mobile (left-aligned)

## Context

See [PRODUCT.md](./PRODUCT.md). Responsive implementation plan for all sections on `/` with **left alignment** @ `&lt; lg`.

**Do not change:** `app/page.tsx` structure (order), desktop (`lg+`) pixel specs from feat-0003–0007, navbar ([feat-0021](../feat-0021/PRODUCT.md)).

---

## Objective

1. Apply shared mobile tokens across 5 homepage sections.
2. Fix alignment (`text-left`, `items-start`, `justify-start`) on every section @ `&lt; lg`.
3. Scale headings and padding for 375 / 390 / 768 px QA.
4. Fix carousel overflow (Services, Testimonials).
5. Manual QA + `npm run build`.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router |
| Styling | Tailwind v4 responsive prefixes (`sm:`, `md:`, `lg:`) |
| Carousels | Native `overflow-x-auto` + `scroll-snap` — no new deps |
| Data | Unchanged (`_data/imili/*`) |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

### Manual QA

1. DevTools → **375×812** → `/`
2. Scroll full page — confirm **left-aligned** copy in every section
3. Swipe Services + Testimonials carousels — no overflow
4. Repeat @ **390px**, **768px** portrait
5. @ **1024px** — desktop layout unchanged

---

## Shared tokens (copy into each section)

```tsx
// Section shell
const sectionX = "px-4 sm:px-6 lg:px-14";
const sectionY = "py-12 md:py-20 lg:py-32";

// Text — left on mobile/tablet always
const copyAlign = "text-left items-start";

// Heading ladder (tune desktop literal per component)
const headingScale = "text-2xl sm:text-3xl md:text-4xl";

// Carousel track
const carouselTrack =
  "flex snap-x snap-mandatory gap-[23px] overflow-x-auto pl-4 pr-4 sm:pl-6 sm:pr-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const carouselCard = "w-[min(100%,340px)] shrink-0 snap-start";
```

---

## Task breakdown

### Task 1 — AboutUs (alignment + padding)

**File:** `components/custom/about-us.tsx`

| Change | From → To |
| ------ | --------- |
| Copy wrapper | `items-center text-center lg:items-start lg:text-left` → `items-start text-left` |
| CTA row | `justify-center lg:justify-start` → `justify-start` |
| Section | `py-32 px-4 sm:px-50` → `py-12 md:py-20 lg:py-32 px-4 sm:px-6` |
| Title | add `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` |

**Acceptance:** @ 375px title and body flush left with `px-4` gutter.

**Verify:** Visual @ 375px; no `text-center` in computed styles.

---

### Task 2 — BentoHeroSection (stack + grid)

**File:** `components/custom/imili/BentoHeroSection.tsx`

| Change | Spec |
| ------ | ---- |
| Section | `py-12 md:py-20 lg:py-20`; remove `min-h-[739px]` @ mobile or use `min-h-0 lg:min-h-[739px]` |
| Headline | `text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-left` |
| Subhead | `text-base sm:text-lg text-left` |
| Grid | @ `&lt; md`: `grid-cols-1 auto-rows-auto h-auto`; drop `h-[619px]` |
| Grid | @ `md`: `grid-cols-2 h-auto` with simplified spans |
| Grid | @ `lg`: restore current `h-[619px]` + row/col spans |

**Sub-task:** Adjust bento tile `className` col/row spans per breakpoint (may need responsive classes on each tile).

**Acceptance:** @ 375px — headline left, grid cells stack readable height.

**Verify:** No fixed 619px height @ 375px.

---

### Task 3 — ServicesCarousel

**File:** `components/custom/imili/ServicesCarousel.tsx`

```tsx
// Header wrapper
<div className={`mx-auto container ${sectionX}`}>

// Heading
<h2 className={`${headingScale} lg:text-[45px] font-bold leading-tight text-left`}>

// Track when showScroll
className={`mt-11 ${carouselTrack} lg:px-14`}

// ServiceCard wrapper
<div className={carouselCard}>
```

Restore nav buttons @ `lg` only when uncommenting.

**Acceptance:** Heading left @ 375px; cards scroll horizontally with snap.

---

### Task 4 — ArticleCardGrid

**File:** `components/custom/imili/ArticleCardGrid.tsx`

```tsx
<section className={`bg-stone-100 ${sectionY}`}>
  <div className={`mx-auto container ${sectionX}`}>
    {/* badge — self-start */}
    <h2 className={`${headingScale} lg:text-[48px] font-bold text-left`} />
    <p className="text-base text-left text-[#6B7280] lg:text-[20px] lg:text-right" />
```

**Acceptance:** Description left @ mobile; right only @ `lg`.

---

### Task 5 — TestimonialsCarousel

**File:** `components/custom/imili/TestimonialsCarousel.tsx`

```tsx
// Header
<div className={`${sectionX} lg:px-14`}>
  <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div className="text-left">...</div>
    <div className="flex gap-2 lg:shrink-0">/* nav buttons size-11 */</div>
  </div>
</div>

// Track — same carouselTrack; guard initial scroll:
useEffect(() => {
  if (window.innerWidth >= 1024) {
    track.scrollLeft = INITIAL_SCROLL_OFFSET;
  }
}, []);
```

**Acceptance:** @ 375px header stacked left; first card fully visible.

---

### Task 6 — QA + regression

| Check | Action |
| ----- | ------ |
| Alignment | Inspect each section @ 375px — no `text-center` |
| Overflow | `document.documentElement.scrollWidth === clientWidth` |
| Desktop | @ 1024px compare to pre-change screenshots |
| Build | `npm run build` |

---

## Project structure

```text
./
├── app/page.tsx                              # VERIFY only
├── components/custom/
│   ├── about-us.tsx                          # Task 1
│   └── imili/
│       ├── BentoHeroSection.tsx              # Task 2
│       ├── ServicesCarousel.tsx              # Task 3
│       ├── ArticleCardGrid.tsx               # Task 4
│       └── TestimonialsCarousel.tsx          # Task 5
└── _specs/feat-0022/
    ├── PRODUCT.md
    ├── TECH.md
    └── assets/README.md
```

---

## Boundaries

| Tier | Rule |
| ---- | ---- |
| **Always** | Left-align copy @ `&lt; lg`; run build before merge |
| **Ask first** | Changing desktop `lg:` tokens; new carousel library |
| **Never** | `text-center` on section copy @ mobile; invent new homepage sections |

---

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Bento grid span refactor is verbose | Simplify mobile to single-column first |
| `container` class may add unwanted centering | Pair with explicit `px-4 sm:px-6` |
| Testimonials initial scroll hides card 1 | Gate offset by `matchMedia('(min-width: 1024px)')` |
