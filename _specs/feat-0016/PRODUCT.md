# feat-0016: Homepage — Mission split section (copy + 3-cell media grid)

## Summary

Implement a **new homepage section**: two columns on white — left (mission badge, headline, description, pill CTA) and right (**3-cell grid**: tall photo, stat card, secondary photo). Matches user reference; **not** a refactor of `AboutUs` or [feat-0007](../feat-0007/PRODUCT.md) bento hero.

**Design reference:** `./assets/mission-section-reference.png` — **1024×396 px** capture (user screenshot 2026-06-10 — byte-identical); scale geometry to **1440px** QA viewport using [scale rule](#scale-rule-1024--1440).

**App:** root Next.js site (`imil-institute` package).

**Normative decisions:** [Scope](#d1--in-scope-from-reference-only), [Placement](#d2--placement), [Section shell](#d3--section-shell), [Left column](#d4--left-column), [Right grid](#d5--right-grid-layout), [Cell anatomy](#d6--cell-anatomy), [Decorative swirl](#d7--decorative-swirl-on-primary-photo), [Colors](#d8--colors-from-reference), [Content model](#d9--content-model), [Images](#d10--images-public-folder), [CTA note](#d11--cta--imil-brand), [Dark-shell note](#d12--feat-0001-dark-shell-note).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → tiles → section → homepage wire-up |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, CSS Grid, Next.js App Router |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. Reference capture width is **1024 px**; QA target viewport is **1440 px** (scale per formula below).
2. Capture shows **exactly one section** — no carousel, no extra rows below the grid.
3. Capture does **not** include site header or footer — **do not add** them inside this section.
4. Reference photos (volunteers, hands huddle) **do not exist** in `public/` — paths are **TBD** until product assigns from [inventory](#public-raster-inventory) or adds files.
5. Typography uses project font **Montserrat** (`_data/fonts.tsx`) unless overlay QA proves a mismatch.
6. Stat value **200+** and label **Dedicated Volunteers** are **reference-only** — no IMILI source; mark **TBD** for production.

---

## Problem

| Today | Gap |
| ----- | --- |
| `AboutUs` on homepage is a different layout (single image + copy) | No pixel spec for this mission split + stat grid |
| [feat-0007](../feat-0007/PRODUCT.md) bento hero is a separate 5-cell pattern | Must not conflate with this 3-cell mission grid |
| No `public/` assets match volunteer reference photos | Risk of hallucinated image paths |

**Goal:** Pixel-aligned new section @ **1440px** against `./assets/mission-section-reference.png`, shipping **only** observable UI elements and real `public/` paths.

---

## Design reference (from `./assets/mission-section-reference.png`)

### Elements visible in reference (in scope)

```text
┌ section (white bg) ────────────────────────────────────────────────────────┐
│  ┌ left column (~45%) ──────────┐  ┌ right grid (~55%) ──────────────────┐ │
│  │ [badge: icon + Our Mission]  │  │ ┌ primary photo ─┐ ┌ stat card ─┐ │ │
│  │ H2 (2 lines)                 │  │ │ (row-span 2)   │ │ 200+       │ │ │
│  │ description paragraph        │  │ │ + green swirl  │ │ volunteers │ │ │
│  │ [Learn More ○→] pill CTA     │  │ └────────────────┘ ├────────────┤ │ │
│  │                              │  │                    │ secondary  │ │ │
│  │                              │  │                    │ photo      │ │ │
│  │                              │  │                    └────────────┘ │ │
│  └──────────────────────────────┘  └────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Elements **not** in reference (out of scope — do not implement)

| Element | Reason |
| ------- | ------ |
| Site header / nav | Not in capture |
| Second CTA | Only one button visible |
| Carousel / tabs | Not visible |
| Star ratings | Not visible |
| Hyperlinks on grid images | Not visible |
| Fourth grid cell | Exactly 3 cells |
| IMILI-specific charity copy on QA build | Use [reference strings](#reference-strings-layout-qa-only--do-not-ship-for-imili) for layout QA only |

### Reference strings (layout QA only — do not ship for IMILI)

| Role | Reference text |
| ---- | -------------- |
| Badge label | Our Mission |
| Heading | Our Inspiring Mission and Ambitious Goals |
| Description | Every cause we support is driven by real needs, real people, and real outcomes. |
| CTA label | Learn More |
| Stat value | 200+ |
| Stat label | Dedicated Volunteers |

---

## Scale rule (1024 → 1440)

Reference capture width **W_ref = 1024**. QA viewport **W_qa = 1440**.

```text
scale = W_qa / W_ref = 1.40625
px_1440 = round(px_1024 × 1.40625)
```

All **@1024** values below are measured against `mission-section-reference.png`. Implement **@1440** values in Tailwind/CSS unless noted.

---

## Design decisions

### D1 — In scope (from reference only)

Ship **only** what appears in the screenshot: section shell + left copy column + 3-cell right grid + decorative swirl on primary photo + pill CTA.

### D2 — Placement

| Option | Detail |
| ------ | ------ |
| **Recommended** | Homepage **new section** after `AboutUs` inside/outside `Background` — **before** `ArticleCardGrid` |
| **Standalone** | Preview route acceptable for isolated pixel QA |

**Do not** replace `AboutUs` or `BentoHeroSection` in v1 — this is an **additional** section.

### D3 — Section shell

| Token | @1024 (measured) | @1440 (scaled) | Tailwind @1440 |
| ----- | ---------------- | -------------- | -------------- |
| Section `id` | `mission` | same | `id="mission"` |
| Background | `#FFFFFF` | same | `bg-white` |
| Section padding Y | ~48 px | ~68 px | `py-[68px]` |
| Container | ~944 px content in capture | site shell | `mx-auto max-w-7xl px-4 md:px-6` |
| Layout | 2 columns, vertically centered | same | `flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14` |
| Left column width | ~45% | same | `lg:w-[45%]` |
| Right column width | ~55% | same | `lg:flex-1` |

### D4 — Left column

#### Mission badge

Pill with **green icon disc** (white glyph) + label — not a bare green icon on gray.

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Shape | pill | same | `inline-flex items-center gap-2 rounded-full` |
| Background | `#EBEBEB` | same | `bg-[#EBEBEB]` |
| Padding | ~8 × 14 px | ~11 × 20 px | `px-5 py-2.5` |
| Icon disc | ~24 px circle `#2EBC5E` | ~34 px | `flex size-[34px] items-center justify-center rounded-full bg-[#2EBC5E] text-white` |
| Icon glyph | hand + heart, white | `lucide-react` `HeartHandshake` | `size-4` (white on disc) |
| Label | ~14 px medium `#111111` | ~18 px | `text-[18px] font-medium text-[#111111]` |

#### Heading (H2)

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Font size | ~34 px bold | ~48 px | `text-[48px] font-bold leading-[1.1]` |
| Color | `#111111` | same | `text-[#111111]` |
| Badge → heading gap | ~20 px | ~28 px | `mt-7` |

#### Description

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Font size | ~15 px regular | ~21 px | `text-[21px] leading-relaxed` |
| Color | `#6B7280` | same | `text-[#6B7280]` |
| Heading → description gap | ~16 px | ~22 px | `mt-5` |

#### CTA (reference geometry)

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Shape | full pill | same | `rounded-full` |
| Background | `#2EBC5E` | same | `bg-[#2EBC5E]` |
| Text | white ~16 px medium | ~21 px | `text-[21px] font-medium text-white` |
| Padding | ~14 × 28 px | ~20 × 39 px | `px-10 py-5` |
| Trailing control | white circle ~36 px + green `ArrowRight` inside | ~50 px circle | see [TECH.md](./TECH.md) |
| Description → CTA gap | ~24 px | ~34 px | `mt-8` |

See [D11](#d11--cta--imil-brand) for IMILI `CustomButton` deviation.

### D5 — Right grid layout

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Grid columns | 2 | 2 | `grid-cols-2` |
| Grid rows | 2 | 2 | `grid-rows-2` |
| Gap | ~12 px | ~17 px | `gap-4` |
| Grid height | ~300 px | ~422 px | `h-[422px]` |
| Primary photo | `col-start-1 row-span-2` | same | `col-start-1 row-span-2 row-start-1` |
| Stat card | `col-start-2 row-start-1` | same | `col-start-2 row-start-1` |
| Secondary photo | `col-start-2 row-start-2` | same | `col-start-2 row-start-2` |

### D6 — Cell anatomy

#### Primary photo tile

| Token | @1024 | @1440 | Notes |
| ----- | ----- | ----- | ----- |
| Radius | ~18 px | ~25 px | `rounded-[25px] overflow-hidden` |
| Image | `fill` `object-cover` | | `next/image` |
| Swirl overlay | bottom-left green stroke | | [D7](#d7--decorative-swirl-on-primary-photo) |

#### Stat card

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Background | `#F3F4F6` | same | `bg-[#F3F4F6]` |
| Radius | ~18 px | ~25 px | `rounded-[25px]` |
| Padding | ~20 px | ~28 px | `p-7` |
| Alignment | centered | same | `flex flex-col items-center justify-center text-center` |
| Icon | green heart-hands ~28 px | ~39 px | `HeartHandshake size-10 text-[#2EBC5E]` |
| Value | ~36 px bold `#111111` | ~51 px | `text-[51px] font-bold leading-none text-[#111111]` |
| Label | ~14 px `#6B7280` | ~18 px | `mt-2 text-[18px] text-[#6B7280]` |

**Do not** reuse [feat-0007](../feat-0007/PRODUCT.md) `BentoStatTile` (dark green `#0A3D34`) — reference stat card is **light gray**.

#### Secondary photo tile

| Token | @1024 | @1440 | Notes |
| ----- | ----- | ----- | ----- |
| Radius | ~18 px | ~25 px | `rounded-[25px] overflow-hidden` |
| Image | `fill` `object-cover` | | `next/image` |

### D7 — Decorative swirl on primary photo

Reference shows a **thin bright-green curved stroke** across the lower portion of the primary photo (not a separate asset file).

| Token | Spec |
| ----- | ---- |
| Color | `#2EBC5E` (match reference green) |
| Stroke width | ~3 px @1440 |
| Position | bottom-left, partial arc entering frame |
| Implementation | Inline SVG overlay `absolute inset-0 pointer-events-none` — **do not** add image file under `public/` for swirl |
| z-index | above photo, below any future text overlay |

### D8 — Colors (from reference)

| Role | Hex | Usage |
| ---- | --- | ----- |
| Section background | `#FFFFFF` | Full band |
| Badge background | `#EBEBEB` | Mission pill |
| Reference green | `#2EBC5E` | Badge icon, CTA, stat icon, swirl |
| Heading | `#111111` | H2 + stat value |
| Body / stat label | `#6B7280` | Description + stat label |
| Stat card fill | `#F3F4F6` | Top-right cell |
| CTA text | `#FFFFFF` | Button label |

### D9 — Content model

```ts
// _data/imili/mission-section.ts

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
```

### D10 — Images (`public/` folder)

#### Public raster inventory (repo scan 2026-06-10)

Complete list of raster files under `public/`:

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
| `/blocks/imli-icon.png` |
| `/new/airi.png` |
| `/new/bg-hero.png` |
| `/new/corps.jpeg` |
| `/new/corps.png` |
| `/new/humans.png` |
| `/new/mision.png` |
| `/new/vision.png` |

**Approved IMILI rasters** (reuse via `_data/imili/images.ts` → `IMILI_IMAGES`):

| Key | Path | Alt |
| --- | ---- | --- |
| `bgHero` | `/new/bg-hero.png` | IMILI hero |
| `humans` | `/new/humans.png` | IMILI community |
| `mission` | `/new/mision.png` | IMILI observatory |
| `vision` | `/new/vision.png` | IMILI vision |

#### Reference thumbnail mapping

**Rule:** Do **not** invent filenames. Reference volunteer photos are **not** in `public/`.

| Cell | Reference depicts | Matching file in `public/` |
| ---- | ----------------- | --------------------------- |
| Primary | Two volunteers, thumbs up, green shirts | **None** |
| Secondary | Hands huddle, volunteer shirts | **None** |

For **layout QA only** (geometry check — not subject-matched):

| Cell | `imageSrc` (QA only) | `imageAlt` |
| ---- | -------------------- | ---------- |
| Primary | `/new/humans.png` | Placeholder — primary photo layout QA |
| Secondary | `/new/corps.png` | Placeholder — secondary photo layout QA |

For **IMILI production** until volunteer assets are added:

| Cell | `imageSrc` | Source |
| ---- | ---------- | ------ |
| Primary | `/new/mision.png` | `IMILI_IMAGES.mission` |
| Secondary | `/new/vision.png` | `IMILI_IMAGES.vision` |

### D11 — CTA / IMILI brand

Reference CTA is a **green pill** with embedded white circle + arrow ([D4](#d4--left-column)).

| Mode | CTA |
| ---- | --- |
| **Pixel QA** | Implement reference pill geometry + `#2EBC5E` per [D4](#d4--left-column) |
| **IMILI production (optional)** | May swap to [`CustomButton`](../../components/custom/custom-button.tsx) (`#0548bd` / hover `#5ce43a`, `rounded-sm`) — **not** pixel-identical; requires explicit product sign-off |

Default v1 implement: **reference pill** for QA fidelity.

### D12 — feat-0001 dark-shell note

[feat-0001](../feat-0001/PRODUCT.md) mandates **dark-only** shell. This reference is **white**.

Treat as explicit feat-0001 exception for this section; do not remap white → dark while claiming pixel accuracy.

---

## Acceptance criteria

- [ ] Section matches `./assets/mission-section-reference.png` @ 1440px within **±2 px** on tokens in [D3–D7](#d3--section-shell)
- [ ] Left column: badge, H2, description, CTA — order preserved
- [ ] Right grid: exactly **3** cells in 2×2 layout (primary spans 2 rows)
- [ ] Green swirl overlay on primary photo
- [ ] Stat card uses **light** `#F3F4F6` surface (not feat-0007 dark stat tile)
- [ ] QA build uses [reference strings](#reference-strings-layout-qa-only--do-not-ship-for-imili); production uses [R1](#r1--imili-production-content) without charity copy
- [ ] All `imageSrc` values resolve under `public/` (no 404)
- [ ] `npm run build` passes

---

## Recommendations

### R1 — IMILI production content

| Field | Production value | Source |
| ----- | ---------------- | ------ |
| `badgeLabel` | Our Mission | `app/about/page.tsx` `Feature2` title |
| `heading` | **TBD** | No IMILI string equivalent to reference heading — do not invent |
| `description` | **TBD** | First sentence of about `Feature2` description is normative but long — product must trim or supply copy |
| `cta.label` | Learn more | Lowercase variant acceptable; reference uses “Learn More” for QA |
| `cta.href` | `/about` | Existing route |
| `stat.value` / `stat.label` | **TBD** | “200+” / “Dedicated Volunteers” are **not** in repo — do not fabricate |
| Primary / secondary `imageSrc` | **TBD** | Use [QA placeholders](#rule-do-not-invent-filenames) until production assets added |

### R2 — Homepage stack

Insert after `AboutUs` block in `app/page.tsx`:

```text
BentoHeroSection → AboutUs → MissionSection (feat-0016) → ArticleCardGrid → …
```

### R3 — Reuse

Export `MissionSection` for `/about` if product wants the same layout there later.
