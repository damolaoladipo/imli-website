# feat-0027: Background photo hero — lobby image full bleed

## Summary

Create a **new homepage section** by copying the **left column** of [`BentoHeroSection`](../../components/custom/imili/BentoHeroSection.tsx) and using [`public/blocks/hero.jpeg`](../../public/blocks/hero.jpeg) as the **full-section background** (entire hero area).

**Right side:** **No content** — no bento grid, no `<Image>` tile, no cards. The background photo **shows through** on the right (~58% @ desktop) as a clean display of the institute lobby (IMILI + UNESCO branding, totem, plants).

**Left side:** Headline, subhead, CTA, and feature card — **must remain readable** over the photo via a left scrim/gradient overlay.

**Supersedes for implement:** [feat-0026](../feat-0026/PRODUCT.md) (single image in right column) — product chose **full-bleed background** instead.

**App:** root Next.js site (`imil-institute` package).

**Normative decisions:** [Homepage section](#d3--homepage-section), [Background](#d4--full-section-background), [Right column empty](#d5--right-column-empty), [Left readability](#d6--left-column-readability), [Layout](#d7--layout), [Mobile](#d8--mobile-responsiveness), [Data](#d9--data-model), [Acceptance](#acceptance-criteria).

**Design reference:** [`./assets/hero-institute-lobby.jpeg`](./assets/hero-institute-lobby.jpeg)

**Related specs:**

| Spec | Relation |
| ---- | -------- |
| [feat-0026](../feat-0026/PRODUCT.md) | **Superseded** — right-column image tile approach |
| [feat-0007](../feat-0007/PRODUCT.md) | `BentoHeroSection` — **unchanged** in repo |
| [feat-0022](../feat-0022/PRODUCT.md) | Mobile left-align |

---

## Assumptions

1. **New component** — `BackgroundPhotoHeroSection.tsx`; do **not** modify `BentoHeroSection.tsx`.
2. **Homepage section #1** — replaces `BentoHeroSection` on `/`; `BentoHeroSection` file remains.
3. **Background asset** — `/blocks/hero.jpeg` exists in `public/`.
4. **Right column is intentionally empty** — not a bug; photo is the visual.
5. **No** grid pattern (`#F5F5F5` lines) from bento hero — background is the photo only (+ readability overlays).
6. **object-position** favors **right** so lobby branding/totem appear on the empty right side @ desktop.

---

## Problem

| Today | Gap |
| ----- | --- |
| `BentoHeroSection` uses gray grid + 5-cell bento | Product wants institute lobby as **hero atmosphere** |
| feat-0026 puts image in right **column tile** | Product wants **full-section background**; right side **empty** |
| Text over photo needs contrast rules | No spec for scrim + readable left content |

**Goal:** Full-bleed `hero.jpeg` section; left copy visible; right shows unobstructed photo.

---

## D1 — In scope

| # | Deliverable |
| - | ----------- |
| 1 | `BackgroundPhotoHeroSection` — left content from bento hero + full background image |
| 2 | `_data/imili/background-photo-hero.ts` + `backgroundPhotoHeroHomepageContent` |
| 3 | Export + wire as homepage section #1 in `app/page.tsx` |
| 4 | Left readability overlay (gradient/scrim) |
| 5 | Empty right column region @ `lg+` |

---

## D2 — Out of scope

| Item | Reason |
| ---- | ------ |
| Right-column UI (images, cards, bento) | Explicitly empty |
| `BentoHeroSection` edits | Preserve feat-0007 |
| feat-0026 `PhotoHeroSection` | Superseded by this feat |
| Video / autoplay background | Static JPEG only |
| Dark-shell migration | Light scrim on left |

---

## D3 — Homepage section

| Rule | Spec |
| ---- | ---- |
| Component | `BackgroundPhotoHeroSection` |
| Root | `<section id="photo-hero" aria-labelledby="photo-hero-heading">` |
| `h1` | `id="photo-hero-heading"` |
| Position | Section **#1** on `/` (replaces `BentoHeroSection` in `page.tsx`) |

```tsx
<>
  <BackgroundPhotoHeroSection content={backgroundPhotoHeroHomepageContent} />
  <AboutUs ... />
  <DocumentarySection ... />
  ...
</>
```

---

## D4 — Full-section background

### Image layer

| Property | Spec |
| -------- | ---- |
| `src` | `/blocks/hero.jpeg` |
| Implementation | `next/image` with `fill` **or** CSS `background-image` on section |
| Preferred | `next/image` `fill` + `object-cover` for LCP + `priority` |
| `alt` | `""` if decorative (`alt=""` + `aria-hidden` on wrapper) **or** descriptive if treated as informative — **default: decorative** (copy carries message) |
| `object-position` | `object-right center` @ `lg+` — lobby/totem on right |
| `object-position` @ mobile | `object-center` |
| Coverage | `absolute inset-0` — covers entire `<section>` |

### Remove from bento hero shell

| Remove | Replace with |
| ------ | ------------ |
| `bg-[#F5F5F5]` | Photo visible |
| Grid line `backgroundImage` | None |
| Green radial glow overlay | Optional subtle left-only scrim only ([D6](#d6--left-column-readability)) |

---

## D5 — Right column empty

@ `lg+` layout preserves **two-column flex** from bento hero:

| Column | Width | Content |
| ------ | ----- | ------- |
| Left | `lg:w-[42%]` | Copy stack + feature card ([D6](#d6--left-column-readability)) |
| Right | `flex-1` (~58%) | **Empty** — no DOM content except optional `aria-hidden` spacer |

```tsx
<div className="relative z-10 flex flex-col gap-20 lg:flex-row">
  <motion.div className="lg:w-[42%]">{/* headline, subhead, CTA, feature */}</motion.div>
  <div className="hidden min-h-[619px] flex-1 lg:block" aria-hidden="true" />
</div>
```

**Do not** render: `BentoPhotoTile`, classroom, testimonial, stat, or any `<Image>` in the right column.

The right side is purely the **visible portion** of the background photograph (institute wall + UNESCO + totem).

### ASCII (@ desktop)

```text
┌ section (hero.jpeg full bleed) ────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░ LEFT (42%) — readable          │  RIGHT (58%) — photo only ░░░░░░░░ │
│ ░ [scrim/gradient]               │  (no widgets)              ░░░░░░░░ │
│ ░ H1, subhead, CTA               │  IMILI + UNESCO wall       ░░░░░░░░ │
│ ░ feature card                   │  totem visible             ░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────────────────────────────────────────────┘
  ░ = photo visible; left has light overlay for text contrast
```

---

## D6 — Left column readability

Left copy and buttons **must pass contrast** over the photo.

### Overlay (required)

Absolute layer **above** background image, **below** content (`z-10` on content):

| Token | @ desktop (`lg+`) | @ mobile |
| ----- | ----------------- | -------- |
| Type | Horizontal gradient | Stronger full-width scrim |
| CSS (indicative) | `bg-gradient-to-r from-white/95 via-white/85 to-transparent` | `from-white/92 via-white/88 to-white/70` |
| Width | Covers ~50–55% of section | Full width behind stacked content |

Optional: `backdrop-blur-[2px]` on left half only — **tune in QA**; not required v1.

### Left column content (copy from `BentoHeroSection`)

Unchanged markup/motion:

- `motion.h1` — `text-4xl lg:text-7xl font-semibold`
- Subhead — `text-lg md:text-[21px] text-[#5C5C5C]`
- `CustomButton` CTA
- Feature card — `bg-[#ECECEC]/95` or solid `#ECECEC` with slight transparency optional

**Text colors:** Keep existing dark text (`#111`, `#5C5C5C`) — scrim ensures visibility.

---

## D7 — Layout

| Token | Spec |
| ----- | ---- |
| Min height | `min-h-[739px]` @ `lg+`; `min-h-[520px]` @ mobile |
| Padding | `px-4 py-20 md:px-[68px]` |
| Flex | `flex-col gap-12 lg:flex-row lg:gap-20` |
| Content `z-index` | `relative z-10` |
| Background `z-index` | `absolute inset-0 z-0` |
| Overlay `z-index` | `absolute inset-0 z-[1]` |

---

## D8 — Mobile responsiveness

| Rule | Spec |
| ---- | ---- |
| Stack | Content **on top** of full-bleed background (no side-by-side) |
| Right empty column | `hidden` below `lg` — not needed; photo fills section behind content |
| Text | Left-aligned ([feat-0022](../feat-0022/PRODUCT.md)) |
| Scrim | **Stronger** on mobile — full-width gradient so H1/CTA readable |
| Overflow | No horizontal scroll @ 375px |
| Feature card | Full width below CTA |

**QA:** 375, 390, 768, 1440 px.

---

## D9 — Data model

```ts
// _data/imili/background-photo-hero.ts

export type BackgroundPhotoHeroContent = {
  headline: string;
  subhead: string;
  cta: { label: string; href: string };
  feature: {
    badgeLabel: string;
    body: string;
  };
  backgroundImage: {
    src: string;
    alt: string; // "" if decorative
  };
};

export const backgroundPhotoHeroHomepageContent: BackgroundPhotoHeroContent = {
  headline: "Official MIL Institute ",
  subhead:
    "The first international observatory for media and information literacy development and MIL research.",
  cta: { label: "Learn More", href: "/about" },
  feature: {
    badgeLabel: "Strengthen MIL for a Better Future",
    body: "Catalyst for sustained research on MIL social impact globally.",
  },
  backgroundImage: {
    src: "/blocks/hero.jpeg",
    alt: "",
  },
};
```

Copy strings from `bentoHeroHomepageContent` at implement time.

---

## D10 — Component API

```tsx
// components/custom/imili/BackgroundPhotoHeroSection.tsx
"use client";

type BackgroundPhotoHeroSectionProps = {
  content: BackgroundPhotoHeroContent;
};
```

Structure:

```tsx
<section id="photo-hero" className="relative min-h-[520px] overflow-hidden lg:min-h-[739px]">
  <Image fill src={content.backgroundImage.src} className="object-cover object-center lg:object-right" priority />
  <div aria-hidden className="absolute inset-0 z-[1] bg-gradient-to-r from-white/95 via-white/85 to-transparent" />
  <div className="relative z-10 container ...">
    {/* left column only + empty right spacer @ lg */}
  </div>
</section>
```

---

## Acceptance criteria

- [ ] `BackgroundPhotoHeroSection` on `/` as section #1; `BentoHeroSection` not on `/`
- [ ] `/blocks/hero.jpeg` covers **entire** section (full bleed)
- [ ] Right column @ `lg+` has **no** images, cards, or bento cells
- [ ] Lobby photo clearly visible on the right (object-position right)
- [ ] Left H1, subhead, CTA, feature card **readable** (scrim/gradient)
- [ ] `h1` has `id="photo-hero-heading"`; section `id="photo-hero"`
- [ ] Framer Motion on left column preserved from bento hero
- [ ] Mobile: content readable over photo @ 375px
- [ ] `npm run build` passes

---

## Open questions

| # | Question |
| - | -------- |
| 1 | Scrim strength — `white/95` vs darker? **Default: white gradient per D6.** |
| 2 | Mobile: show more of totem (less scrim on right)? **Default: readability first.** |
| 3 | Cancel feat-0026 implement? **Yes — feat-0027 is canonical.** |

---

## Success criteria

| Request | Outcome |
| ------- | ------- |
| Background = hero.jpeg | Full section background |
| Right empty | Photo displays; no right widgets |
| Left content visible | Scrim + unchanged copy/CTA/feature card |
