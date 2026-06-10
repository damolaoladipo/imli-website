# feat-0008: Curved hero card — photo + bottom-left white copy cutout

## Summary

Implement a **single hero card** matching the user-supplied reference: large rounded container, **full-bleed photograph** (top + right), and a **white bottom-left copy panel** separated from the photo by a smooth **organic S-curve** (large inverted corner). Panel contains a two-line headline, two-line body paragraph, and one **dark pill CTA** aligned to the right of the body text.

**Design reference:** `./assets/curved-hero-reference.png` — **1024×556 px** capture; scale geometry to **1440px** QA viewport using [scale rule](#scale-rule-1024--1440).

**App:** root Next.js site (`imil-institute` package).

**Placement:** Homepage section — stacks with other feat sections on `/`; product assigns order. **Not** feat-0001 Carousel 1 (see [D10](#d10--feat-0001-carousel-1-conflict)).

**Normative decisions:** [Scope](#d1--in-scope-from-reference-only), [Placement](#d2--placement), [Container](#d3--outer-container), [Photo layer](#d4--photo-layer), [Curve / white panel](#d5--curve-and-white-panel), [Copy block](#d6--copy-block-anatomy), [Colors](#d7--colors-from-reference), [Content model](#d8--content-model), [Images](#d9--images-public-folder), [Parent conflict](#d10--feat-0001-carousel-1-conflict), [Dark-shell note](#d11--feat-0001-dark-shell-note).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → section component → homepage wire-up |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, `clip-path` / radius masking, Next.js App Router |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. Reference capture width is **1024 px**; QA target viewport is **1440 px** (scale per formula below).
2. Capture shows **one static card** — no carousel, animation, or video.
3. Capture does **not** include site header, footer, or nav — **do not add** inside this section.
4. Reference volunteer photo **does not exist** in `public/` — path is **TBD** until product assigns from [inventory](#public-raster-inventory) or adds a file.
5. Typography uses project font **Montserrat** (`_data/fonts.tsx`) unless overlay QA proves a mismatch.
6. CTA `href` is **not visible** in reference — use `#` for layout QA; mark **TBD** for production.

---

## Problem

| Today | Gap |
| ----- | --- |
| `components/custom/about-us.tsx` uses a **two-column grid** (text left, square image right) | Does not match curved cutout hero |
| feat-0007 bento hero is a **different layout** (5-cell grid + left copy column) | Not interchangeable |
| No pixel spec for organic curve hero | Implementers would invent chrome or wrong geometry |

**Goal:** Pixel-aligned curved hero @ 1440px against `./assets/curved-hero-reference.png`, using only observable UI elements and real `public/` paths.

---

## Design reference (from `./assets/curved-hero-reference.png`)

### Elements visible in reference (in scope)

```text
┌ outer card (large radius) ──────────────────────────────────────────────────┐
│  [photo: volunteers, table, wheelchair — fills top + right]                 │
│                                                          ╭── curve ──╮      │
│                                                          │ white panel │      │
│  ╭───────────────────────────────────────────────────────╯             │      │
│  │ Lambda – Transforming Lives                                        │      │
│  │ with Compassion                                                    │      │
│  │                                                                    │      │
│  │ Lambda is a dynamic charity…          [ Donate Now ]               │      │
│  │ committed to making a positive…                                    │      │
│  ╰────────────────────────────────────────────────────────────────────╯      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Elements **not** in reference (out of scope — do not implement)

| Element | Reason |
| ------- | ------ |
| Site header / logo / nav | Not in capture |
| Secondary CTA | Only **one** button visible |
| Badge / eyebrow / kicker | Not visible |
| Stats, icons, or decorative graphics in copy panel | Not visible |
| Carousel dots / prev-next | Not visible |
| Drop shadow on outer card | Not clearly visible — **omit** unless overlay QA shows one |
| Video / embed | Not visible |
| IMILI-specific copy | Reference is third-party charity themed |
| `CustomButton` split blue pattern | Reference CTA is a **single dark pill** |

---

## Scale rule (1024 → 1440)

Reference capture width **W_ref = 1024**. QA viewport **W_qa = 1440**.

```text
scale = W_qa / W_ref = 1.40625
px_1440 = round(px_1024 × 1.40625)
```

All **@1024** values below are measured against `curved-hero-reference.png`. Implement **@1440** values in Tailwind/CSS unless noted.

---

## Reference strings (layout QA only — do not ship for IMILI)

| Field | String |
| ----- | ------ |
| Headline line 1 | Lambda – Transforming Lives |
| Headline line 2 | with Compassion |
| Body | Lambda is a dynamic charity donation organization committed to making a positive impact on communities around the world. |
| CTA label | Donate Now |

**Headline note:** Reference wraps after **Lives** — line 2 is `with Compassion` (not a third line).

---

## Design decisions

### D1 — In scope (from reference only)

Ship **only** what appears in the screenshot: rounded outer card, photo layer, curved white panel, headline, body, one CTA. No invented chrome.

### D2 — Placement

| Option | Detail |
| ------ | ------ |
| **Recommended** | New homepage section on `/` — product defines stack order relative to feat-0007 bento hero |
| **Standalone** | Preview route for isolated pixel QA |

### D3 — Outer container

| Token | @1024 (measured) | @1440 (scaled) | Tailwind @1440 |
| ----- | ---------------- | -------------- | -------------- |
| Section horizontal inset | ~16 px | ~23 px | `px-[23px]` or site shell `px-4 md:px-6` |
| Section vertical padding | not fully visible; use symmetric | ~32 px top/bottom | `py-8` |
| Card width | ~992 px in 1024 capture | ~100% of content shell | `mx-auto max-w-7xl` |
| Card height | ~520 px | ~731 px | `h-[731px]` min |
| Outer border radius | ~48 px | ~67 px | `rounded-[67px]` |
| Card overflow | clipped to radius | — | `overflow-hidden` |
| Page background | white (outside card) | same | section wrapper `bg-white` |

### D4 — Photo layer

| Token | @1024 | @1440 | Notes |
| ----- | ----- | ----- | ----- |
| Coverage | fills entire card; visible in top ~60% and full right edge | same | `next/image` `fill` + `object-cover` |
| Object position | center-top bias (volunteers + table visible) | tune in QA | `object-[center_30%]` starting point |
| z-index | below white panel | — | `z-0` |

### D5 — Curve and white panel

The white copy area occupies the **bottom-left** of the card. The boundary with the photo is a **smooth concave curve** — white panel has a **large rounded top-right corner** that scoops into the image (organic S-curve in reference).

| Token | @1024 | @1440 | Notes |
| ----- | ----- | ----- | ----- |
| Panel background | `#FFFFFF` | same | `bg-white` |
| Panel width | ~58% of card (~575 px) | ~58% | `w-[58%]` or absolute positioning |
| Panel height | ~42% of card (~218 px) | ~42% | `h-[42%]` min ~306 px @1440 |
| Panel position | bottom-left, flush to card edges | — | `absolute bottom-0 left-0` |
| Curve radius (top-right of panel) | ~120 px | ~169 px | `rounded-tr-[169px]` — **tune against overlay** |
| Panel z-index | above photo | — | `z-10` |

**Implementation constraint:** Match the reference curve silhouette @ 1440px within **±4 px** using one of:

1. Absolute white panel + large `border-top-right-radius` (preferred — simplest)
2. `clip-path` path traced from overlay
3. SVG mask

Do **not** use a simple diagonal slash or hard corner — reference shows a **smooth** curve only.

### D6 — Copy block anatomy

All copy is **left-aligned** inside the white panel.

| # | Element | @1024 | @1440 | Notes |
| - | ------- | ----- | ----- | ----- |
| 1 | Panel inner padding | ~40 px | ~56 px | `p-14` (56 px) |
| 2 | Headline | ~36 px bold, dark teal, 2 lines | ~51 px | `text-[51px] font-bold leading-[1.1]` |
| 3 | Headline → body row gap | ~20 px | ~28 px | `mt-7` |
| 4 | Body row layout | horizontal flex; body left, CTA right; `items-center` | — | `flex items-center justify-between gap-6` |
| 5 | Body text | ~15 px regular, same color as headline; max-width ~55% of panel | ~21 px | `max-w-[55%] text-[21px] leading-relaxed` |
| 6 | CTA button | pill; bg matches headline color; white label ~14 px; px ~28 py ~14 | ~20 px | `rounded-full px-7 py-3.5 text-[20px] font-medium text-white` |
| 7 | CTA position | right side of body row; vertically centered with body block | — | `shrink-0` on button |

**Do not** stack CTA below body on desktop — reference shows **side-by-side** body + button.

### D7 — Colors (from reference)

| Role | Hex | Usage |
| ---- | --- | ----- |
| White panel | `#FFFFFF` | Copy cutout |
| Headline + body text | `#1E3D3D` | Dark teal/charcoal — tune in QA |
| CTA background | `#1E3D3D` | Same as text |
| CTA label | `#FFFFFF` | Button text |
| Photo | full-bleed | No color overlay on photo |

### D8 — Content model

```ts
export type CurvedHeroContent = {
  headlineLine1: string;
  headlineLine2: string;
  body: string;
  cta: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
};
```

### D9 — Images (`public/` folder)

#### Public raster inventory (repo scan 2026-06-10)

These are the **only** raster paths that exist today. No other image paths are valid without adding files.

| Path |
| ---- |
| `/afr.png` |
| `/bipoc.png` |
| `/blocks/imli-icon.png` |
| `/blocks/imli.png` |
| `/crown.png` |
| `/csc.png` |
| `/mide.png` |
| `/mycity.png` |
| `/settle.png` |
| `/toyosi.png` |
| `/new/airi.png` |
| `/new/bg-hero.png` |
| `/new/corps.jpeg` |
| `/new/corps.png` |
| `/new/humans.png` |
| `/new/mision.png` |
| `/new/vision.png` |

#### Reference photo mapping

| Reference depicts | Matching file in `public/` |
| ----------------- | --------------------------- |
| Volunteers at outdoor table, wheelchair recipient, brick building | **None** |

**Rule:** Do **not** invent filenames. For **layout QA only**, use closest available path. For **production**, product must add asset to `public/` before ship.

Suggested **layout-QA placeholder** (not content-accurate):

| Field | QA value |
| ----- | -------- |
| `imageSrc` | `/new/humans.png` |
| `imageAlt` | Placeholder — curved hero photo QA |

### D10 — feat-0001 Carousel 1 conflict

| | Detail |
| --- | ------ |
| feat-0001 | Carousel 1 = **4-slide auto-advance hero slider** |
| This spec | **Single static** curved photo hero |
| Resolution | Product chooses hero slot assignment — do not ship both without decision |

### D11 — feat-0001 dark-shell note

[feat-0001](../feat-0001/PRODUCT.md) mandates a **dark-only** marketing shell. This reference is a **light/white** card on white page.

| | Detail |
| --- | ------ |
| **This spec** | Reference colors are **normative for pixel QA** |
| **Do not** | Remap white panel or teal text to dark-shell tokens while claiming pixel accuracy |

---

## Acceptance criteria

- [ ] Card matches `./assets/curved-hero-reference.png` @ 1440px within **±4 px** on [D3–D6](#design-decisions) tokens (curve radius may need ±4 px tune)
- [ ] Outer card `rounded-[67px]` with photo full-bleed inside
- [ ] White bottom-left panel with **smooth** curved boundary — not a hard diagonal
- [ ] Headline exactly **2 lines** per [reference strings](#reference-strings-layout-qa-only--do-not-ship-for-imili)
- [ ] Body + **one** CTA in a **horizontal row** (CTA right of body)
- [ ] CTA is dark pill with white label — **not** `CustomButton`
- [ ] **No** header, badge, second CTA, stats, or carousel added
- [ ] Copy matches reference strings in QA build
- [ ] `imageSrc` resolves under `public/` (no 404)
- [ ] CTA keyboard-focusable with visible focus ring

---

## Open questions

1. **Homepage order** — above or below feat-0007 bento hero?
2. **Production photo** — when will volunteer-scene asset be added?
3. **CTA href** — donate URL for production (not visible in reference).
4. **Curve implementation** — confirm `rounded-tr-[169px]` panel vs SVG mask after first QA overlay.
