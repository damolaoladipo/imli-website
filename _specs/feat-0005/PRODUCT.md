# feat-0005: Testimonials carousel — horizontal card row with featured photo card

## Summary

Implement a **testimonials section** matching the user-supplied reference screenshot: pill badge, two-line heading, prev/next controls, and a **horizontally scrollable row** of testimonial cards — **standard gray cards** (quote + dotted rule + avatar + name + location) and one **featured photo card** (full-bleed image + bottom gradient + white quote + name + location).

**Design reference:** `./assets/testimonials-carousel-reference.png` — **1024×420 px** capture; scale geometry to **1440px** QA viewport using [scale rule](#scale-rule-1024--1440).

**App:** root Next.js site (`imil-institute` package).

**Placement:** Homepage **new section** — stacks with [feat-0003](../feat-0003/PRODUCT.md) and [feat-0004](../feat-0004/PRODUCT.md) on `/`.

**Normative decisions:** [Scope](#d1--in-scope-from-reference-only), [Layout](#d2--section-layout), [Header](#d3--header-anatomy), [Carousel](#d4--carousel-behavior), [Standard card](#d5--standard-card-anatomy), [Featured card](#d6--featured-card-anatomy), [Colors](#d7--colors-from-reference), [Content model](#d8--content-model), [Images](#d9--images-public-folder), [Dark-shell note](#d10--feat-0001-dark-shell-note).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Land data file, then card primitives, then carousel section |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, Next.js App Router patterns |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered implementation tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. Reference capture width is **1024 px**; QA target viewport is **1440 px** (scale per formula below).
2. Reference shows **exactly six testimonial cards** in the carousel track (card 1 partially clipped on the left; card 6 partially visible on the right).
3. Reference shows **exactly one featured card** — the **3rd card** (Derrick Warner) — at the captured scroll position. Do **not** implement “auto-promote center card to featured” without a new design reference.
4. Reference avatar photos and featured background **do not exist** in `public/` — image paths are **TBD** until product assigns from [inventory](#public-raster-inventory) or adds new files.
5. Typography uses project font **Montserrat** (`_data/fonts.tsx`) unless overlay QA proves a mismatch.
6. Reference is a **light/white** section — not feat-0001 dark shell.

---

## Problem

| Today | Gap |
| ----- | --- |
| Legacy `components/testimonials*.tsx` use **grid / star-rating** layouts | Does not match reference carousel + featured photo card |
| No pixel spec for this UI pattern | Implementers would invent spacing, colors, or chrome |
| No `public/` assets match reference portraits | Risk of hallucinated image paths |

**Goal:** Pixel-aligned testimonials carousel @ 1440px against `./assets/testimonials-carousel-reference.png`, using only observable UI elements and real `public/` paths.

---

## Design reference (from `./assets/testimonials-carousel-reference.png`)

### Elements visible in reference (in scope)

```text
┌ section (white bg) ─────────────────────────────────────────────────────────┐
│  [Trusted by customers]                              [ < ]  [ > ]           │
│  Trusted by families                                                        │
│  and businesses alike                                                         │
│                                                                               │
│  ◀partial│ ┌ std card ┐ ┌ FEATURED ┐ ┌ std ┐ ┌ std ┐ ┌ std ┐ │partial▶      │
│          │ │ quote    │ │ [photo]  │ │quote│ │quote│ │quote│ │             │
│          │ │ ·····    │ │ quote    │ │ ··· │ │ ··· │ │ ··· │ │             │
│          │ │ (av) name│ │ name     │ │(av) │ │(av) │ │(av) │ │             │
│          │ │ location │ │ location │ │ loc │ │ loc │ │ loc │ │             │
│          │ └──────────┘ └──────────┘ └─────┘ └─────┘ └─────┘ │             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Elements **not** in reference (out of scope — do not implement)

| Element | Reason |
| ------- | ------ |
| Star ratings | Not visible |
| Section subheading / body paragraph below heading | Not visible |
| “View all” / pagination dots / slide counter | Not visible |
| Auto-advance / autoplay | Not visible |
| Card hyperlinks or external-link icons | Not visible |
| Job title / company name (only name + city, state) | Not visible |
| Date stamps | Not visible |
| Drop shadow on cards or section | Not visible |
| Card border stroke on standard cards | Not visible |
| IMILI-specific copy | Reference is third-party moving-company themed |

---

## Scale rule (1024 → 1440)

Reference capture width **W_ref = 1024**. QA viewport **W_qa = 1440**.

```text
scale = W_qa / W_ref = 1.40625
px_1440 = round(px_1024 × 1.40625)
```

All **@1024** values below are measured against `testimonials-carousel-reference.png`. Implement **@1440** values in Tailwind/CSS unless noted.

---

## Reference strings (layout QA only — do not ship for IMILI)

Use verbatim for component QA. Replace with product copy when wiring production pages.

### Section chrome

| Field | String |
| ----- | ------ |
| Badge | Trusted by customers |
| Heading line 1 | Trusted by families |
| Heading line 2 | and businesses alike |

### Cards (left → right, 6 items)

| # | Variant | Quote | Name | Location |
| - | ------- | ----- | ---- | -------- |
| 1 | standard | **TBD** — capture clips left edge; visible fragments only: `…simple, the…`, `…ed right on time, …`, `…rked quickly…`, `…ing corners. …`, `…e all around.` | **TBD** — visible: `…ma L` | **TBD** — visible: `…ago, IL` |
| 2 | standard | I was worried about damage, but every piece arrived just as it left. Highly recommend! The movers were on time, courteous. | Michael Kee | Seattle, WA |
| 3 | **featured** | Moving always feels overwhelming, but they truly made it a breeze | Derrick Warner | New York, NY |
| 4 | standard | I was dreading the move, but they made it so easy. Everything arrived safely and on time. The team was respectful and helpful. | Jessica Leo | Austin, TX |
| 5 | standard | The crew was friendly, fast, and incredibly organized. They handled our large furniture with ease and didn't leave a scratch. | Aiden T | Boston, MA |
| 6 | standard | We had a tight schedule and lots of fragile items. They made it work effortlessly. Nothing was damaged. | Carlos M | Atlanta, GA |

**Card 1 note:** Left edge is clipped. **Do not invent** full quote, name, or location. For layout QA, use card 2 quote length as a stand-in **or** the fragment string `…simple, the… ed right on time, …rked quickly… ing corners. …e all around.` with `name: '…ma L'`, `location: '…ago, IL'` until product supplies copy.

---

## Design decisions

### D1 — In scope (from reference only)

Ship **only** what appears in the screenshot: badge, two-line heading, two nav buttons, horizontal card track with standard + featured variants. No invented chrome.

### D2 — Section layout

#### Section shell (@1024 reference capture)

| Token | @1024 (measured) | @1440 (scaled) | Tailwind @1440 |
| ----- | ---------------- | -------------- | -------------- |
| Section background | `#FFFFFF` | same | `bg-white` |
| Section top padding | ~24 px | ~34 px | `pt-[34px]` |
| Section bottom padding | ~24 px | ~34 px | `pb-[34px]` |
| Header horizontal inset | ~40 px | ~56 px | `px-14` (56 px) |
| Header → carousel gap | ~32 px | ~45 px | `mt-11` (44 px) |

#### Header + carousel width

| Token | @1024 | @1440 | Notes |
| ----- | ----- | ----- | ----- |
| Header content max width | aligns with left inset | same inset | Badge + heading stay inset |
| Carousel track | **full viewport width** | full bleed | Cards extend under partial clip at edges; **no** `max-w-7xl` on track |

### D3 — Header anatomy

| # | Element | @1024 | @1440 | Notes |
| - | ------- | ----- | ----- | ----- |
| 1 | Badge pill | bg `#EBEBEB`; text `#5A5A5A`; ~12 px medium; px ~12 py ~6; full radius | ~17 px | `rounded-full bg-[#EBEBEB] px-3 py-1.5 text-[12px] font-medium text-[#5A5A5A]` @1024 |
| 2 | Badge → heading gap | ~12 px | ~17 px | `mt-3` |
| 3 | Heading | ~36 px bold, `#000000`, two lines | ~51 px | `text-[51px] font-bold leading-[1.12] text-black` |
| 4 | Nav cluster | top-right of header row | same | `flex gap-2` aligned with heading block |
| 5 | Nav button | ~44×44 px; radius ~10 px; bg `#EBEBEB` | ~62×62 px; radius ~14 px | `size-11 rounded-[10px] bg-[#EBEBEB]` @1024 → `size-[62px] rounded-[14px]` @1440 |
| 6 | Chevron icon | ~20 px, `#111111` | ~28 px | `lucide-react` `ChevronLeft` / `ChevronRight` |
| 7 | Button gap | ~8 px | ~11 px | `gap-2` |

**Header row structure:** `flex items-start justify-between` — left stack (badge + heading), right nav cluster vertically aligned with heading block (not badge).

### D4 — Carousel behavior

| Behavior | Spec |
| -------- | ---- |
| Layout | Horizontal row; `overflow-x` scroll on track |
| Initial scroll | Match reference: card 3 (featured) near horizontal center; card 1 partially off-screen left |
| Prev / next buttons | Scroll track by **one card width + gap** per click; disable at ends (no wrap) |
| Featured variant | Applied via data flag `variant: 'featured'` — **not** computed from scroll position |
| Snap | Optional `scroll-snap` — **not** observable in static reference; omit unless QA requests |
| Autoplay | **Out of scope** |
| Partial edge cards | **Required** — track wider than viewport; first/last cards clip at viewport edge in reference |

#### Track geometry (@1024)

| Token | @1024 | @1440 |
| ----- | ----- | ----- |
| Inter-card gap | ~16 px | ~23 px (`gap-[23px]`) |
| Standard card width | ~272 px | ~382 px |
| Standard card height | ~264 px | ~371 px |
| Featured card width | ~300 px | ~422 px |
| Featured card height | ~292 px | ~411 px |
| Card border radius (all) | ~18 px | ~25 px (`rounded-[25px]`) |

### D5 — Standard card anatomy

Standard cards use **solid fill** `#F2F2F2` — no photo background.

| # | Element | @1024 | @1440 | Notes |
| - | ------- | ----- | ----- | ----- |
| 1 | Card surface | bg `#F2F2F2`; radius ~18 px | same | No border, no shadow |
| 2 | Inner padding | ~22 px | ~31 px | `p-[31px]` @1440 |
| 3 | Quote | ~15 px regular, `#141414`, line-height ~1.45 | ~21 px | `text-[21px] leading-[1.45] text-[#141414]` |
| 4 | Vertical layout | quote top; footer bottom | — | `flex flex-col justify-between h-full` |
| 5 | Dotted separator | 1 px dotted `#D4D4D4`; full inner width | same | `border-t border-dotted border-[#D4D4D4]` |
| 6 | Separator → avatar row | ~14 px | ~20 px | `mt-5` |
| 7 | Avatar | ~44×44 px; radius ~10 px | ~62×62 px; radius ~14 px | `next/image` `width`/`height` fixed |
| 8 | Avatar → text gap | ~12 px | ~17 px | `gap-3` |
| 9 | Name | ~14 px semibold, `#111111` | ~20 px | `text-[20px] font-semibold text-[#111111]` |
| 10 | Location | ~13 px regular, `#6B6B6B` | ~18 px | `text-[18px] text-[#6B6B6B]` |

### D6 — Featured card anatomy

| # | Element | @1024 | @1440 | Notes |
| - | ------- | ----- | ----- | ----- |
| 1 | Background | full-bleed photo; `object-cover` | same | `next/image` `fill` |
| 2 | Bottom overlay | dark gradient covering ~45% of card height | same | `bg-gradient-to-t from-black/70 via-black/30 to-transparent` — tune in QA |
| 3 | Inner padding | ~22 px | ~31 px | Content inset from edges |
| 4 | Quote | ~15 px regular, `#FFFFFF` | ~21 px | `text-[21px] leading-[1.45] text-white` |
| 5 | Quote position | lower third over image | — | `flex flex-col justify-end h-full` |
| 6 | Quote → name gap | ~16 px | ~23 px | `mt-4` |
| 7 | Name | ~14 px semibold, `#FFFFFF` | ~20 px | No avatar on featured card |
| 8 | Location | ~13 px, `#FFFFFF` at ~85% opacity | ~18 px | `text-white/85` |
| 9 | Dotted separator | **absent** | — | Do not add |
| 10 | Avatar | **absent** | — | Do not add |

### D7 — Colors (from reference)

| Role | Hex | Usage |
| ---- | --- | ----- |
| Section background | `#FFFFFF` | Full section |
| Badge background | `#EBEBEB` | Pill |
| Badge text | `#5A5A5A` | Pill label |
| Heading text | `#000000` | Two-line heading |
| Nav button background | `#EBEBEB` | Prev / next |
| Nav icon | `#111111` | Chevrons |
| Standard card fill | `#F2F2F2` | Card surface |
| Quote text (standard) | `#141414` | Card body |
| Dotted rule | `#D4D4D4` | Separator |
| Name (standard) | `#111111` | Footer |
| Location (standard) | `#6B6B6B` | Footer sublabel |
| Featured quote / name | `#FFFFFF` | On photo |
| Featured location | `#FFFFFF` @ ~85% | On photo |

### D8 — Content model

```ts
export type TestimonialCardVariant = 'standard' | 'featured';

export type TestimonialItem = {
  id: string;
  variant: TestimonialCardVariant;
  quote: string;
  name: string;
  location: string; // display verbatim e.g. "Seattle, WA"
  avatarSrc?: string;  // required when variant === 'standard'
  avatarAlt?: string;  // required when variant === 'standard'
  photoSrc?: string;   // required when variant === 'featured'
  photoAlt?: string;   // required when variant === 'featured'
};
```

```ts
export type TestimonialsSectionContent = {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  items: TestimonialItem[]; // reference: exactly 6
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

#### Reference portrait mapping

| Card | Reference depicts | Matching file in `public/` |
| ---- | ----------------- | --------------------------- |
| 1–2, 4–6 avatars | Distinct human portrait crops | **None** |
| 3 featured bg | Woman with wavy/curly hair, smiling | **None** |

**Rule:** Do **not** invent filenames. For **layout QA only**, assign distinct existing paths. For **production**, product must add portrait assets to `public/` and update data before ship.

Suggested **layout-QA placeholder** assignment (not content-accurate):

| Card | Field | QA path | `alt` |
| ---- | ----- | ------- | ----- |
| 1 | `avatarSrc` | `/toyosi.png` | Placeholder — card 1 avatar QA |
| 2 | `avatarSrc` | `/new/corps.jpeg` | Placeholder — card 2 avatar QA |
| 3 | `photoSrc` | `/new/humans.png` | Placeholder — featured card QA |
| 4 | `avatarSrc` | `/new/airi.png` | Placeholder — card 4 avatar QA |
| 5 | `avatarSrc` | `/mide.png` | Placeholder — card 5 avatar QA |
| 6 | `avatarSrc` | `/bipoc.png` | Placeholder — card 6 avatar QA |

### D10 — feat-0001 dark-shell note

[feat-0001](../feat-0001/PRODUCT.md) mandates a **dark-only** marketing shell. This reference is a **white** section.

| | Detail |
| --- | ------ |
| **This spec** | Reference colors are **normative for pixel QA** of this component |
| **Placement** | Not part of feat-0001 carousel stack until product assigns |
| **Do not** | Silently remap white → `#0a0a0a` while claiming pixel accuracy to this reference |

---

## Acceptance criteria

- [ ] Section matches `./assets/testimonials-carousel-reference.png` @ 1440px within **±2 px** on spacing tokens in [D2–D6](#design-decisions)
- [ ] Badge, two-line heading, and **two** nav buttons present — nothing else in header
- [ ] **Six** cards in track; card 3 is **featured**; cards 1–2, 4–6 are **standard**
- [ ] Standard cards: quote → dotted rule → avatar + name + location
- [ ] Featured card: photo + gradient + white quote + name + location — **no** avatar, **no** dotted rule
- [ ] Carousel bleeds horizontally; card 1 partially clipped left in initial state
- [ ] Prev/next scroll horizontally; no autoplay, dots, stars, or “view all”
- [ ] Copy matches [reference table](#reference-strings-layout-qa-only--do-not-ship-for-imili) in QA build
- [ ] All `avatarSrc` / `photoSrc` resolve to real files under `public/` (no 404)
- [ ] Nav buttons keyboard-focusable; chevrons have accessible names (`Previous testimonial`, `Next testimonial`)

---

## Open questions

1. **Homepage placement** — which route/section should mount this component after QA?
2. **Production portraits** — when will matching avatar/featured assets be added to `public/`?
3. **Featured-on-scroll** — should featured styling follow the centered card after prev/next? Reference only shows card 3 featured at one scroll position.
