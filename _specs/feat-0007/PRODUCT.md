# feat-0007: Bento hero — left copy column + 5-cell image grid

## Summary

Implement a **two-column hero section** matching the user-supplied reference: light grid background with soft green glow, left column (headline, subhead, pill CTA, bottom feature card), and right column **5-cell bento grid** (2 photo tiles, 1 testimonial tile, 1 statistic tile).

**Design reference:** `./assets/bento-hero-reference.png` — **1024×526 px** capture; scale geometry to **1440px** QA viewport using [scale rule](#scale-rule-1024--1440).

**App:** root Next.js site (`imil-institute` package).

**Parent spec:** [feat-0001 Carousel 1 — Hero slider](../feat-0001/PRODUCT.md#carousel-1--hero-slider). This reference is a **single static hero**, not a carousel — see [D10 conflict](#d10--feat-0001-carousel-1-conflict).

**Normative decisions:** [Scope](#d1--in-scope-from-reference-only), [Placement](#d2--placement), [Section shell](#d3--section-shell), [Left column](#d4--left-column), [Bento grid](#d5--bento-grid-layout), [Bento cells](#d6--bento-cell-anatomy), [Colors](#d7--colors-from-reference), [Content model](#d8--content-model), [Images](#d9--images-public-folder), [Parent conflict](#d10--feat-0001-carousel-1-conflict), [Dark-shell note](#d11--feat-0001-dark-shell-note).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → cell primitives → section shell → homepage wire-up |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, CSS Grid, Next.js App Router |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. Reference capture width is **1024 px**; QA target viewport is **1440 px** (scale per formula below).
2. Capture shows **one static hero** — no carousel dots, no slide animation, no auto-advance.
3. Capture does **not** include site header, footer, or nav — **do not add** them inside this section.
4. Reference photos (hijab portrait, classroom, man on blue, testimonial avatars) **do not exist** in `public/` — paths are **TBD** until product assigns from [inventory](#public-raster-inventory) or adds files.
5. Typography uses project font **Montserrat** (`_data/fonts.tsx`) unless overlay QA proves a mismatch.
6. CTA `href` is **not visible** in reference — use `#` for layout QA; mark **TBD** for production.

---

## Problem

| Today | Gap |
| ----- | --- |
| feat-0001 Carousel 1 specifies slider behavior | No pixel spec for this bento hero alternative |
| `components/custom/hero.tsx` / `hero-section.tsx` use different layouts | Does not match reference 5-cell bento |
| No `public/` assets match reference portraits | Risk of hallucinated image paths |

**Goal:** Pixel-aligned bento hero @ 1440px against `./assets/bento-hero-reference.png`, using only observable UI elements and real `public/` paths.

---

## Design reference (from `./assets/bento-hero-reference.png`)

### Elements visible in reference (in scope)

```text
┌ section (grid bg + green glow) ─────────────────────────────────────────────┐
│  ┌ left column ─────────────┐  ┌ right bento (5 cells) ─────────────────┐ │
│  │ H1 (3 lines)              │  │ ┌ woman ──┐ ┌ classroom ────────────┐ │ │
│  │ subhead                   │  │ │ photo   │ │ photo + overlay label │ │ │
│  │ [Explore Course ↗]        │  │ └─────────┘ └───────────────────────┘ │ │
│  │                           │  │ ┌ testimonial ┐ ┌ man photo ────────┐ │ │
│  │ ┌ feature card ─────────┐ │  │ │ avatars Best│ │ (tall, spans    │ │ │
│  │ │ [icon] Built for…     │ │  │ │ quote       │ │  testimonial+stat)│ │ │
│  │ │ guided learning paths │ │  │ └─────────────┘ └───────────────────┘ │ │
│  │ └───────────────────────┘ │  │ ┌ stat 62+ ───┐                       │ │
│  └───────────────────────────┘  │ └─────────────┘                       │ │
│                                  └───────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Elements **not** in reference (out of scope — do not implement)

| Element | Reason |
| ------- | ------ |
| Site header / logo / nav | Not in capture |
| Carousel indicators / prev-next | Not visible |
| Search bar | Not visible |
| Secondary CTA | Only one button visible |
| Star ratings on testimonial | Not visible |
| Testimonial author names | Not visible |
| Hyperlinks on bento cells | Not visible |
| Footer | Not in capture |
| Video embed | Not visible |
| IMILI-specific copy | Reference is third-party education themed |

---

## Scale rule (1024 → 1440)

Reference capture width **W_ref = 1024**. QA viewport **W_qa = 1440**.

```text
scale = W_qa / W_ref = 1.40625
px_1440 = round(px_1024 × 1.40625)
```

All **@1024** values below are measured against `bento-hero-reference.png`. Implement **@1440** values in Tailwind/CSS unless noted.

---

## Reference strings (layout QA only — do not ship for IMILI)

| Field | String |
| ----- | ------ |
| Headline | Build Skills That Shape Your Future |
| Subhead | Practical online courses designed to help you gain real-world experience and grow with confidence. |
| CTA label | Explore Course |
| Feature badge | Built for real growth. |
| Feature body | Follow guided learning paths from beginner to job-ready level. |
| Classroom overlay | Interactive Classrooms |
| Testimonial quote | Hands-on lessons that helped me apply skills right away. |
| Testimonial badge | Best |
| Stat value | 62+ |
| Stat label | Courses built around real-world projects. |

---

## Design decisions

### D1 — In scope (from reference only)

Ship **only** what appears in the screenshot: grid background, left copy stack + feature card, right 5-cell bento. No invented chrome.

### D2 — Placement

| Option | Detail |
| ------ | ------ |
| **Recommended** | Homepage **hero** slot — alternative to feat-0001 Carousel 1 after product resolves [D10](#d10--feat-0001-carousel-1-conflict) |
| **Standalone** | Preview route or isolated section on `/` for pixel QA before hero swap |

### D3 — Section shell

| Token | @1024 (measured) | @1440 (scaled) | Tailwind @1440 |
| ----- | ---------------- | -------------- | -------------- |
| Section min height | ~526 px (capture) | ~739 px | `min-h-[739px]` |
| Horizontal padding | ~48 px | ~68 px | `px-[68px]` |
| Vertical padding | ~40 px top/bottom | ~56 px | `py-14` |
| Column gap (left ↔ bento) | ~40 px | ~56 px | `gap-14` |
| Left column width | ~42% (~430 px) | same ratio | `w-[42%]` or `flex-[0.42]` |
| Right column width | ~58% (~490 px) | same ratio | `flex-[0.58]` |
| Background base | `#F5F5F5` off-white | same | `bg-[#F5F5F5]` |
| Grid pattern | faint ~1 px lines, ~40 px cells | same | CSS `background-image` linear gradients — tune in QA |
| Green glow | soft radial, upper-center-right | same | `bg-[radial-gradient(...)]` overlay — tune in QA |

### D4 — Left column

| # | Element | @1024 | @1440 | Notes |
| - | ------- | ----- | ----- | ----- |
| 1 | Headline | ~44 px bold, `#0A3D34`, 3 lines, leading ~1.08 | ~62 px | `text-[62px] font-bold leading-[1.08] text-[#0A3D34]` |
| 2 | Headline → subhead gap | ~16 px | ~23 px | `mt-6` |
| 3 | Subhead | ~15 px regular, `#5C5C5C`, max-width ~380 px | ~21 px | `text-[21px] text-[#5C5C5C] max-w-[534px]` |
| 4 | Subhead → CTA gap | ~24 px | ~34 px | `mt-8` |
| 5 | CTA button | pill; bg `#2EBC5E`; text white ~15 px; px ~24 py ~14 | ~21 px | `rounded-full bg-[#2EBC5E] px-8 py-4 text-[21px] font-medium text-white` |
| 6 | CTA icon | `↗` after label; white ~18 px | ~25 px | `lucide-react` `ArrowUpRight` — **QA stand-in** for reference arrow |
| 7 | CTA → feature card gap | flex spacer pushes feature card to bottom | — | `flex flex-col justify-between min-h-full` on left column |
| 8 | Feature card | bg `#ECECEC`; radius ~16 px; padding ~16 px | radius ~23 px | `rounded-[23px] bg-[#ECECEC] p-6` |
| 9 | Feature badge | white pill; ~1 px border `#1A1A1A`; green circle icon + label ~12 px | ~17 px | See [D4 badge](#feature-badge-anatomy) |
| 10 | Badge → body gap | ~10 px | ~14 px | `mt-3.5` |
| 11 | Feature body | ~13 px regular `#4A4A4A` | ~18 px | `text-[18px] text-[#4A4A4A]` |

#### Feature badge anatomy

| Part | @1024 | Notes |
| ---- | ----- | ----- |
| Pill container | white bg; border ~1 px dark; full radius; inline-flex; gap ~8 px; py ~6 px ~12 px | |
| Icon circle | ~24 px circle; bg `#2EBC5E`; white icon inside | Reference shows **stacked-layers** symbol — use `lucide-react` `Layers` as **QA stand-in** until product supplies SVG |
| Badge label | `Built for real growth.` — ~12 px medium `#111` | Include trailing period per reference |

### D5 — Bento grid layout

Right column is a **CSS grid** with **2 columns**, **3 rows**, **14 px** gutters, all cells `border-radius ~18 px` (@1024) / **~25 px** (@1440).

```text
              col A          col B
row 1         woman          classroom
row 2         testimonial    man (row-span 2)
row 3         stat           man (continued)
```

| Token | @1024 | @1440 |
| ----- | ----- | ----- |
| Grid columns | `1fr` `1.08fr` (B slightly wider) | same ratio |
| Grid rows | `1.15fr` `0.95fr` `0.9fr` | tune to overlay |
| Cell gap | ~14 px | ~20 px (`gap-5`) |
| Cell radius | ~18 px | ~25 px (`rounded-[25px]`) |
| Grid height | ~440 px (fills right column) | ~619 px |

**Do not** change cell count or arrangement — reference shows exactly **5** cells.

### D6 — Bento cell anatomy

#### Cell 1 — Woman portrait (`photo-tile`)

| Property | Spec |
| -------- | ---- |
| Position | row 1, col A |
| Content | Photo only — no overlay text |
| Image | `object-cover`; `fill` in relative wrapper |

#### Cell 2 — Classroom (`photo-tile-overlay`)

| Property | Spec |
| -------- | ---- |
| Position | row 1, col B |
| Image | `object-cover`; `fill` |
| Overlay | bottom gradient `from-black/60 to-transparent` covering ~35% height |
| Label | `Interactive Classrooms` — white ~13 px @1024 / ~18 px @1440; bottom-left inset ~14 px |

#### Cell 3 — Testimonial (`testimonial`)

| Property | Spec |
| -------- | ---- |
| Position | row 2, col A |
| Background | solid `#3CCB6A` (bright green) |
| Padding | ~16 px @1024 / ~23 px @1440 |
| Top row | left: **3 overlapping circular avatars** (~28 px @1024, ~-10 px overlap); right: white pill **Best** |
| Quote | white ~14 px @1024 / ~20 px @1440; positioned lower in cell |
| **No** name, stars, or link | Not in reference |

**Avatar overlap:** `flex -space-x-2.5`; each avatar `size-7` @1024 → `size-10` @1440; `rounded-full` `border-2 border-[#3CCB6A]`.

**Best badge:** white pill; text `#0A3D34` or dark green ~12 px; px ~10 py ~4.

#### Cell 4 — Stat (`stat`)

| Property | Spec |
| -------- | ---- |
| Position | row 3, col A |
| Background | solid `#0A3D34` (matches headline green) |
| Padding | ~16 px @1024 / ~23 px @1440 |
| Value | `62+` — white ~36 px bold @1024 / ~51 px @1440 |
| Label | white ~13 px @1024 / ~18 px @1440; below value ~6 px gap |

#### Cell 5 — Man portrait (`photo-tile`)

| Property | Spec |
| -------- | ---- |
| Position | row 2–3, col B (`row-span-2`) |
| Content | Photo only — no overlay text |
| Image | `object-cover`; `fill` |

### D7 — Colors (from reference)

| Role | Hex | Usage |
| ---- | --- | ----- |
| Section background | `#F5F5F5` | Base fill |
| Grid lines | `#E0E0E0` @ low opacity | Background pattern |
| Green glow | `#2EBC5E` @ ~8% opacity | Radial highlight |
| Headline / stat card | `#0A3D34` | H1 + stat tile |
| Subhead / feature body | `#5C5C5C` / `#4A4A4A` | Body copy |
| CTA / testimonial green | `#2EBC5E` / `#3CCB6A` | CTA pill; testimonial tile (two close greens in reference) |
| Feature card fill | `#ECECEC` | Bottom-left card |
| Badge border | `#1A1A1A` | Feature pill outline |
| White text | `#FFFFFF` | CTA, testimonial, stat, overlay label |
| Best badge bg | `#FFFFFF` | Testimonial corner |
| Best badge text | `#0A3D34` | "Best" label |

### D8 — Content model

```ts
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
      avatars: { src: string; alt: string }[]; // exactly 3
    };
    stat: { value: string; label: string };
    manPhoto: { src: string; alt: string };
  };
};
```

### D9 — Images (`public/` folder)

#### Public raster inventory (repo scan 2026-06-10)

These are the **only** raster paths that exist today. No other image paths are valid without adding files.

| Path |
| ---- |
| `/afr.png` |
| `/bipoc.png` |
| `/crown.png` |
| `/csc.png` |
| `/mide.png` |
| `/mycity.png` |
| `/settle.png` |
| `/toyosi.png` |
| `/blocks/imli.png` |
| `/new/airi.png` |
| `/new/bg-hero.png` |
| `/new/corps.jpeg` |
| `/new/corps.png` |
| `/new/humans.png` |
| `/new/mision.png` |
| `/new/vision.png` |

#### Reference photo mapping

| Cell | Reference depicts | Matching file in `public/` |
| ---- | ----------------- | --------------------------- |
| Woman portrait | Smiling woman, hijab, red sweater | **None** |
| Classroom | Wooden desks, blackboard | **None** (closest: `/new/corps.jpeg` — QA only) |
| Man portrait | Smiling man, blue background | **None** |
| Testimonial avatars (×3) | Small profile photos | **None** (tiny circular crops) |

**Rule:** Do **not** invent filenames. For **layout QA only**, assign distinct existing paths. For **production**, product must add assets to `public/` and update data before ship.

Suggested **layout-QA placeholder** assignment (not content-accurate):

| Cell | QA path | `alt` |
| ---- | ------- | ----- |
| Woman | `/new/airi.png` | Placeholder — woman tile QA |
| Classroom | `/new/corps.jpeg` | Placeholder — classroom tile QA |
| Man | `/new/humans.png` | Placeholder — man tile QA |
| Avatar 1 | `/toyosi.png` | Placeholder — testimonial avatar 1 |
| Avatar 2 | `/mide.png` | Placeholder — testimonial avatar 2 |
| Avatar 3 | `/bipoc.png` | Placeholder — testimonial avatar 3 |

### D10 — feat-0001 Carousel 1 conflict

| | Detail |
| --- | ------ |
| feat-0001 | Carousel 1 = **4-slide auto-advance hero slider** |
| This spec | **Single static** bento hero |
| Resolution | Product chooses: (a) replace Carousel 1 with this layout, or (b) use as alternate marketing page only |
| Do not | Implement both as homepage hero without product decision |

### D11 — feat-0001 dark-shell note

[feat-0001](../feat-0001/PRODUCT.md) mandates a **dark-only** marketing shell. This reference is a **light** section with green accents.

| | Detail |
| --- | ------ |
| **This spec** | Reference colors are **normative for pixel QA** of this component |
| **Do not** | Silently remap light greens → `#0a0a0a` while claiming pixel accuracy to this reference |

---

## Acceptance criteria

- [ ] Section matches `./assets/bento-hero-reference.png` @ 1440px within **±2 px** on spacing tokens in [D3–D6](#design-decisions)
- [ ] Left column: headline (3 lines), subhead, **one** CTA, feature card — nothing else
- [ ] Right column: **exactly 5** bento cells in [grid positions](#d5--bento-grid-layout)
- [ ] Testimonial: 3 avatars + **Best** badge + quote — **no** names or stars
- [ ] Stat: `62+` + label on dark green tile
- [ ] Classroom: bottom overlay **Interactive Classrooms** only
- [ ] Grid background + green glow present
- [ ] **No** header, carousel, dots, or extra CTAs added
- [ ] Copy matches [reference strings](#reference-strings-layout-qa-only--do-not-ship-for-imili) in QA build
- [ ] All image paths resolve under `public/` (no 404)
- [ ] CTA keyboard-focusable with visible focus ring

---

## Open questions

1. **Hero swap** — replace feat-0001 Carousel 1 or use on a separate route?
2. **Production photos** — when will hijab portrait, classroom, man, and avatar crops be added?
3. **CTA destination** — `href` for "Explore Course" (not visible in reference).
4. **Feature badge icon** — supply exact SVG or keep `Layers` lucide stand-in?
