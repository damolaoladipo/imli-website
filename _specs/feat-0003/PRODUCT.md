# feat-0003: Article card grid — three-up latest updates row

## Summary

Implement a **horizontal row of three article cards** matching the user-supplied reference screenshot: rounded thumbnail, circular arrow + date meta row, bold title, summary paragraph, and category pill.

**Design reference:** `./assets/article-card-grid-reference.png` — **1024×502 px** capture; scale geometry to **1440px** QA viewport using [scale rule](#scale-rule-1024--1440).

**App:** root Next.js site (`imil-institute` package).

**Parent spec:** [feat-0001 Carousel 5 — Latest Updates](../feat-0001/PRODUCT.md#carousel-5--latest-updates) (placement + IMILI news URLs). This spec defines **card layout only**.

**Normative decisions:** [Scope](#d1--in-scope-from-reference-only), [Placement](#d2--placement), [Layout](#d3--layout), [Card anatomy](#d4--card-anatomy), [Colors](#d5--colors-from-reference), [Content model](#d6--content-model), [Images](#d7--images-public-folder), [Interaction](#d8--interaction), [Parent-spec conflict](#d9--feat-0001-dark-shell-conflict).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Land data file, then card, then section |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, Next.js App Router patterns |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered implementation tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. Reference capture width is **1024 px**; QA target viewport is **1440 px** (scale per formula below).
2. Reference shows **exactly three cards** — no carousel, no fourth card, no pagination.
3. **No section heading**, subheading, or “View all” control appears in the reference — **do not add**.
4. Reference thumbnails (volunteer / cafeteria / masked classroom) **do not exist** in `public/` — image paths are **TBD** until product assigns from [inventory](#public-raster-inventory) or adds new files.
5. Card 3’s **dark circular arrow** is a **hover/focus** state, not a third default style (cards 1–2 show default arrow).
6. Typography uses project font **Montserrat** (`_data/fonts.tsx`) unless overlay QA proves a mismatch.

---

## Problem

| Today | Gap |
| ----- | --- |
| feat-0001 defines Carousel 5 as “thumbnail + snippet + link” but has **no pixel spec** | Implementers cannot match a concrete layout |
| `components/blocks/feature.tsx` uses a **compact list** layout (64×64 thumb + horizontal row) | Does not match reference **stacked card** pattern |
| No `public/` assets match reference photos | Risk of inventing image paths or wrong aspect ratios |

**Goal:** Pixel-aligned three-card row @ 1440px against `./assets/article-card-grid-reference.png`, using only observable UI elements and real `public/` paths.

---

## Design reference (from `./assets/article-card-grid-reference.png`)

### Elements visible in reference (in scope)

```text
┌ section (cream bg) ────────────────────────────────────────────────────────┐
│  horizontal padding                                                        │
│  ┌ card 1 ──────────┐  gap  ┌ card 2 ──────────┐  gap  ┌ card 3 ───────┐ │
│  │ [rounded image]   │       │ [rounded image]   │       │ [rounded image]│ │
│  │ (○→)    date      │       │ (○→)    date      │       │ (●→)    date   │ │
│  │ title (bold)      │       │ title (bold)      │       │ title (bold)   │ │
│  │ summary           │       │ summary           │       │ summary        │ │
│  │ [Category pill]   │       │ [Health pill]     │       │ [Education]    │ │
│  └───────────────────┘       └───────────────────┘       └────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Elements **not** in reference (out of scope — do not implement)

| Element | Reason |
| ------- | ------ |
| Section `<h2>` / “Latest Updates” heading | Not visible in capture |
| “View all” / pagination / carousel controls | Not visible |
| Card border, drop shadow, or distinct card fill | Cards sit flush on section background |
| Author name, read time, share icons | Not visible |
| Per-card URL labels | Not visible (href is data-layer only) |

### Reference strings (layout QA only — do not ship on IMILI homepage)

Use these strings **only** to verify typography and spacing during component QA. Replace with feat-0001 news data when wiring homepage.

| Card | Date | Title | Summary | Category pill |
| ---- | ---- | ----- | ------- | ------------- |
| 1 | February 3, 2026 | The Role of Volunteers in Supporting Children's Futures | Volunteers play an essential role in creating caring environments where children feel supported, valued, and encouraged. | Community |
| 2 | February 3, 2026 | How Daily Nutrition Shapes a Child's Well-Being | Proper daily nutrition supports not only physical growth, but also a child's ability to learn, focus, and feel well. | Health |
| 3 | February 3, 2026 | Why Staying in School Changes a Child's Future | Staying in school gives children more than education — it offers stability, confidence, and a pathway to long-term opportunity. | Education |

---

## Scale rule (1024 → 1440)

Reference capture width **W_ref = 1024**. QA viewport **W_qa = 1440**.

```text
scale = W_qa / W_ref = 1.40625
px_1440 = round(px_1024 × 1.40625)
```

All **@1024** values below are measured against `article-card-grid-reference.png`. Implement **@1440** values in Tailwind/CSS unless noted.

---

## Design decisions

### D1 — In scope (from reference only)

Ship **only** what appears in the screenshot: section band + 3-card grid + per-card stacked content. No invented chrome.

### D2 — Placement

| Option | Detail |
| ------ | ------ |
| **Recommended** | Homepage **new section** — stacks with [feat-0004](../feat-0004/PRODUCT.md) and [feat-0005](../feat-0005/PRODUCT.md); does **not** replace them |
| **Standalone** | Preview route acceptable for isolated pixel QA before homepage wire-up |

### D3 — Layout

#### Section shell (@1024 reference capture)

| Token | @1024 (measured) | @1440 (scaled) | Tailwind @1440 |
| ----- | ---------------- | -------------- | -------------- |
| Section background | `#FAF7F2` cream | same | `bg-[#FAF7F2]` |
| Section horizontal padding | ~32 px | ~45 px | `px-11` (44 px) |
| Section vertical padding | not fully visible in crop; use symmetric | ~56 px top/bottom | `py-14` (56 px) |
| Grid columns (desktop) | 3 | 3 | `grid-cols-3` |
| Column gap | ~20 px | ~28 px | `gap-7` (28 px) |
| Max content width | ~944 px content in 1024 capture | align to site shell | `mx-auto max-w-7xl px-4 md:px-6` per feat-0001 |

#### Responsive (not in reference — minimal rules only)

| Breakpoint | Rule |
| ---------- | ---- |
| `< md` | Single column stack (`grid-cols-1`), preserve card internal anatomy |
| `md–lg` | 2 columns if needed to avoid unreadable narrow cards |
| `≥ lg` | 3 columns (reference layout) |

Do not add breakpoints or layouts not required to prevent overflow.

### D4 — Card anatomy

Each card is a **vertical stack** (no horizontal thumb+text split).

| # | Element | @1024 | @1440 | Notes |
| - | ------- | ----- | ----- | ----- |
| 1 | Thumbnail | width = card column width; height ~168 px; radius ~14 px | height ~236 px; radius ~20 px | `next/image` `fill` + `object-cover`; wrapper `relative aspect-[16/10] rounded-[20px] overflow-hidden` |
| 2 | Meta row | below image, ~14 px gap | ~20 px gap | flex row, `justify-between items-center` |
| 2a | Arrow control | circle ~32 px; border ~1 px `#E5E5E5`; bg white; arrow black | circle ~45 px | `lucide-react` `ArrowRight` ~16 px @1440 |
| 2b | Date | right-aligned, ~13 px regular, `#6B6B6B` | ~18 px | `text-[18px] text-[#6B6B6B]` |
| 3 | Title | ~18 px bold, `#111111`, 2 lines max in reference | ~25 px | `text-[25px] font-bold leading-snug text-[#111111]` |
| 4 | Title → summary gap | ~10 px | ~14 px | `mt-3.5` |
| 5 | Summary | ~14 px regular, `#5C5C5C`, 3 lines in reference | ~20 px | `text-[20px] leading-relaxed text-[#5C5C5C]` |
| 6 | Summary → pill gap | ~14 px | ~20 px | `mt-5` |
| 7 | Category pill | bg `#B8E4FA`; text `#0B4F7A`; ~12 px medium; px ~12 py ~6; full radius | ~17 px | `rounded-full bg-[#B8E4FA] px-3 py-1.5 text-[17px] font-medium text-[#0B4F7A]` |

**Card surface:** transparent — no `bg-card`, no `border`, no `shadow` (matches reference).

### D5 — Colors (from reference)

| Role | Hex | Usage |
| ---- | --- | ----- |
| Section background | `#FAF7F2` | Full-width band |
| Title text | `#111111` | Card headline |
| Summary text | `#5C5C5C` | Card body |
| Date text | `#6B6B6B` | Meta row date |
| Arrow circle default bg | `#FFFFFF` | Cards 1–2 |
| Arrow circle default border | `#E5E5E5` | 1 px |
| Arrow icon default | `#111111` | Inside default circle |
| Arrow circle hover bg | `#434343` | Card 3 in reference; matches `custom-button` hover neutral |
| Arrow icon hover | `#FFFFFF` | On hover/focus |
| Category pill bg | `#B8E4FA` | Tag background |
| Category pill text | `#0B4F7A` | Tag label |

### D6 — Content model

```ts
export type ArticleCardItem = {
  id: string;
  href: string;           // required for <a>; not shown in UI
  imageSrc: string;       // path under public/
  imageAlt: string;
  date: string;           // display verbatim e.g. "February 3, 2026"
  title: string;
  summary: string;
  category: string;       // single pill label
};
```

**Homepage (feat-0001):** min **3** cards visible; data file may contain **5** URLs per parent spec — grid shows first 3 @ desktop or product defines slice rules in TECH.

### D7 — Images (`public/` folder)

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

#### Reference thumbnail mapping

| Card | Reference depicts | Matching file in `public/` |
| ---- | ----------------- | --------------------------- |
| 1 | Volunteer t-shirt, children background | **None** |
| 2 | Children eating at yellow table | **None** |
| 3 | Masked classroom, student writing | **None** |

**Rule:** Do **not** invent filenames. For **layout QA only**, pick any **three distinct** paths from the inventory above. For **production**, product must add assets to `public/` (or `_specs/feat-0003/assets/`) and update `_data/imili/article-cards.ts` before ship.

Suggested **layout-QA placeholder** assignment (not content-accurate):

| Card | `imageSrc` (QA only) | `imageAlt` |
| ---- | -------------------- | ---------- |
| 1 | `/new/humans.png` | Placeholder — card 1 layout QA |
| 2 | `/new/corps.jpeg` | Placeholder — card 2 layout QA |
| 3 | `/new/mision.png` | Placeholder — card 3 layout QA |

### D8 — Interaction

| Behavior | Spec |
| -------- | ---- |
| Entire card | Wrap in `Link` or clickable `<a>` using `item.href` |
| Hover | Arrow circle: default → `#434343` bg, white arrow (card 3 state in reference) |
| Focus | Same as hover; visible focus ring per a11y |
| External URLs | `target="_blank"` `rel="noopener noreferrer"` when `href` is external |
| Motion | No auto-carousel; optional subtle card hover lift **not** in reference — **omit** unless QA requests |

### D9 — feat-0001 dark-shell conflict

[feat-0001](../feat-0001/PRODUCT.md) mandates a **dark-only** marketing shell. This reference is a **light cream band** (`#FAF7F2`).

| | Detail |
| --- | ------ |
| **This spec** | Reference colors are **normative for pixel QA** of this component |
| **Resolution** | Treat as explicit [feat-0001 exception](../feat-0001/PRODUCT.md#d2--dark-only-policy) for Carousel 5 only, **or** open follow-up feat to dark-adapt card tokens after layout ships |
| **Do not** | Silently remap cream → `#0a0a0a` while claiming pixel accuracy to this reference |

---

## Acceptance criteria

- [ ] Section matches `./assets/article-card-grid-reference.png` @ 1440px within **±2 px** on spacing tokens in [D4](#d4--card-anatomy)
- [ ] Exactly **3** cards @ `lg`; card anatomy order: image → meta → title → summary → pill
- [ ] **No** section heading, view-all, borders, or shadows added
- [ ] Copy matches [reference table](#reference-strings-layout-qa-only--do-not-ship-on-imili-homepage) in QA build; feat-0001 URLs wired in homepage build
- [ ] `imageSrc` values resolve to real files under `public/` (no 404)
- [ ] Arrow hover matches card 3 reference (`#434343` / white arrow)
- [ ] Category pills use `#B8E4FA` / `#0B4F7A`
- [ ] Keyboard focus reaches each card link; `imageAlt` present on every thumbnail

---

## Recommendations

### R1 — IMILI homepage content

When wired to Carousel 5, replace reference strings with feat-0001 [Latest Updates URLs](../feat-0001/PRODUCT.md#carousel-5--latest-updates). Derive `title`, `summary`, `category` from articles or mark `summary` / `category` **TBD** in data — do not invent article text.

### R2 — Production images

Add three production thumbnails to `public/blocks/` or `public/news/` before launch. Until then, ship with [QA placeholders](#suggested-layout-qa-placeholder-assignment-not-content-accurate) only in dev/preview.

### R3 — Reuse

Export `ArticleCard` + `ArticleCardGrid` for `/news` index when that route exists.
