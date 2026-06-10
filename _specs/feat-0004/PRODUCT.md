# feat-0004: Homepage — News & Blog section (header + three cards + CTA)

## Summary

Implement a **full-width News & Blog homepage section** matching the user-supplied reference: category badge, split header (title left / description right), **three** blog cards (image + date row + divider + title + “Read more”), and centered pill CTA.

**Design reference:** `./assets/news-blog-section-reference.png` — **1024×485 px** capture; scale geometry to **1440px** QA viewport using [scale rule](#scale-rule-1024--1440).

**App:** root Next.js site (`imil-institute` package).

**Parent spec:** [feat-0001 Carousel 5 — Latest Updates](../feat-0001/PRODUCT.md#carousel-5--latest-updates) (URLs + placement). This spec defines **section chrome + card anatomy** for the new reference.

**Related:** [feat-0003](../feat-0003/PRODUCT.md) is a **separate** homepage section (different screenshot: summary + category pill + circular arrow). Both ship on `/` — do **not** merge layouts.

**Normative decisions:** [Scope](#d1--in-scope-from-reference-only), [Placement](#d2--placement), [Section header](#d3--section-header), [Card anatomy](#d4--card-anatomy), [CTA](#d5--footer-cta), [Colors](#d6--colors-from-reference), [Content model](#d7--content-model), [Images](#d8--images-public-folder), [Interaction](#d9--interaction), [feat-0001 conflict](#d10--feat-0001-dark-shell-conflict).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → card → section → homepage wire-up |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, Next.js App Router |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. Reference capture width is **1024 px**; QA target viewport is **1440 px** (scale per formula below).
2. Reference shows **exactly three cards** — no carousel, no fourth card, no pagination dots.
3. Reference section background is **white** (`#FFFFFF`), not cream — distinct from [feat-0003](../feat-0003/PRODUCT.md) `#FAF7F2` band.
4. Reference thumbnails (shelter / meals / community dining) **do not exist** in `public/` — paths are **TBD** until product assigns from [inventory](#public-raster-inventory) or adds files.
5. Typography uses project font **Montserrat** (`_data/fonts.tsx`) unless overlay QA proves a mismatch.
6. `/news` route is the CTA destination (href exists in `headerNavItems`); page body is **out of scope** for this feat.

---

## Problem

| Today | Gap |
| ----- | --- |
| Homepage wires [feat-0003](../feat-0003/PRODUCT.md) `ArticleCardGrid` — wrong card anatomy for this reference | No badge, split header, gray card body, “Read more”, or section CTA |
| feat-0001 Carousel 5 lists five URLs but no pixel spec for **this** layout | Implementers cannot match reference without inventing UI |
| Reference charity photos absent from `public/` | Risk of hallucinated image paths |

**Goal:** Pixel-aligned section @ **1440px** against `./assets/news-blog-section-reference.png`, shipping **only** observable UI elements and real `public/` paths.

---

## Design reference (from `./assets/news-blog-section-reference.png`)

### Elements visible in reference (in scope)

```text
┌ section (white bg) ──────────────────────────────────────────────────────┐
│  py                                                                      │
│  ┌ header ─────────────────────────────────────────────────────────────┐ │
│  │ [badge: icon + "News & Blog"]                                       │ │
│  │ ┌ left ~62% ───────────────┐  ┌ right ~34% ──────────────────────┐ │ │
│  │ │ Stories and insights     │  │ Feeding families, educating…     │ │ │
│  │ │ (H2 bold)                │  │ (gray paragraph, smaller)        │ │ │
│  │ └──────────────────────────┘  └──────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  mt                                                                        │
│  ┌ card 1 ──────────┐  gap  ┌ card 2 ──────────┐  gap  ┌ card 3 ───────┐ │
│  │ [rounded image]   │       │ [rounded image]   │       │ [rounded image]│ │
│  │ ┌ light gray ───┐ │       │                   │       │                │ │
│  │ │ (cal) date     │ │       │                   │       │                │ │
│  │ │ ─────────────  │ │       │                   │       │                │ │
│  │ │ title (bold)   │ │       │                   │       │                │ │
│  │ │ Read more →    │ │       │                   │       │                │ │
│  │ └───────────────┘ │       │                   │       │                │ │
│  └───────────────────┘       └───────────────────┘       └────────────────┘ │
│  mt                                                                        │
│                    [ Explore All Blogs ]  (pill, green, centered)          │
└────────────────────────────────────────────────────────────────────────────┘
```

### Elements **not** in reference (out of scope — do not implement)

| Element | Reason |
| ------- | ------ |
| Card summary / body paragraph | Not visible |
| Category pill | Not visible ([feat-0003](../feat-0003/PRODUCT.md) only) |
| Circular arrow control in meta row | Not visible |
| Carousel arrows / dots | Not visible |
| Author, read time, share icons | Not visible |
| Card drop shadow on image | Cards use flat light-gray body only |
| Fourth or fifth card @ desktop | Reference shows exactly 3 |

### Reference strings (layout QA only — do not ship on IMILI homepage)

Use **only** to verify typography and spacing during component QA. Replace with [IMILI production content](#r1--imili-production-content) when wiring homepage.

| Role | Reference text |
| ---- | -------------- |
| Badge | News & Blog |
| Section title | Stories and insights |
| Section description | Feeding families, educating children & rebuilding lives what our impact shows. |
| Card 1 date | February 25, 2026 |
| Card 1 title | Safe Shelter. Stronger Lives. Sustainable Futures. |
| Card 2 date | February 25, 2026 |
| Card 2 title | Delivering Warm Meals, Spreading Real Hope |
| Card 3 date | February 25, 2026 |
| Card 3 title | Hope That Feeds, Protects, and Uplifts Communities |
| Card read-more | Read more |
| Section CTA | Explore All Blogs |

---

## Scale rule (1024 → 1440)

Reference capture width **W_ref = 1024**. QA viewport **W_qa = 1440**.

```text
scale = W_qa / W_ref = 1.40625
px_1440 = round(px_1024 × 1.40625)
```

All **@1024** values below are measured against `news-blog-section-reference.png`. Implement **@1440** values in Tailwind/CSS unless noted.

---

## Design decisions

### D1 — In scope (from reference only)

Ship **only** what appears in the screenshot: section shell + header block + 3-card grid + per-card stacked content + centered CTA. No invented chrome.

### D2 — Placement

| Option | Detail |
| ------ | ------ |
| **Recommended** | Homepage **new section** — stacks after [feat-0003](../feat-0003/PRODUCT.md); does **not** replace it |
| **Standalone** | Preview route acceptable for isolated pixel QA before homepage wire-up |

### D3 — Section header

#### Section shell (@1024 reference capture)

| Token | @1024 (measured) | @1440 (scaled) | Tailwind @1440 |
| ----- | ---------------- | -------------- | -------------- |
| Section `id` | `news-blog` | same | `id="news-blog"` |
| Section background | `#FFFFFF` | same | `bg-white` |
| Section padding Y | ~64 px | ~90 px | `py-[90px]` |
| Container max width | ~944 px content in capture | site shell | `mx-auto max-w-7xl px-4 md:px-6` |

#### Badge row

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Badge shape | rounded rect / pill | same | `inline-flex items-center gap-2 rounded-full px-4 py-2` |
| Badge background | reference green `#4FAF50` (sampled) | same | `bg-[#4FAF50]` |
| Badge icon | newspaper / document outline, white | `lucide-react` `Newspaper` | `size-4 text-white` |
| Badge label | ~13 px medium, dark on green per capture | ~18 px | `text-[18px] font-medium text-[#1A1A1A]` |
| Badge → title gap | ~16 px | ~22 px | `mt-5` |

#### Split header row (@1024)

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Layout | 2 columns, title left, description right | same | `grid grid-cols-1 gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-end` |
| Section title (H2) | ~34 px bold `#111111` | ~48 px | `text-[48px] font-bold leading-tight text-[#111111]` |
| Description | ~14 px regular `#6B7280`, right column | ~20 px | `text-[20px] leading-relaxed text-[#6B7280] lg:text-right` |
| Header → grid gap | ~40 px | ~56 px | `mt-14` |

### D4 — Card anatomy

Each card: **image flush top** + **light-gray content block** below (not transparent like feat-0003).

| # | Element | @1024 | @1440 | Notes |
| - | ------- | ----- | ----- | ----- |
| 1 | Card outer radius | ~16 px | ~22 px | `rounded-[22px] overflow-hidden` |
| 2 | Card body background | `#F3F4F6` | same | `bg-[#F3F4F6]` |
| 3 | Thumbnail | full card width; height ~160 px | ~225 px | wrapper `relative h-[225px] w-full`; `next/image` `fill` `object-cover` |
| 4 | Content padding | ~20 px | ~28 px | `p-7` |
| 5 | Date row | calendar icon + date text | | `flex items-center gap-2` |
| 5a | Calendar icon | ~14 px, `#9CA3AF` | ~20 px | `lucide-react` `Calendar` `size-5 text-[#9CA3AF]` |
| 5b | Date text | ~13 px `#9CA3AF` | ~18 px | `text-[18px] text-[#9CA3AF]` |
| 6 | Divider | 1 px `#E5E7EB`, full width | same | `mt-4 border-t border-[#E5E7EB]` |
| 7 | Title | ~17 px bold `#111111`, 2–3 lines in reference | ~24 px | `mt-4 text-[24px] font-bold leading-snug text-[#111111]` |
| 8 | Read more row | ~14 px `#111111` + right arrow | ~20 px | `mt-5 inline-flex items-center gap-1.5 text-[20px] text-[#111111]` |
| 8a | Arrow | thin `→` or `ArrowRight` ~14 px | | `lucide-react` `ArrowRight` `size-4` |

**Card surface:** light gray body `#F3F4F6` — **no** outer border, **no** drop shadow (matches reference).

#### Grid

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Columns @ desktop | 3 | 3 | `lg:grid-cols-3` |
| Column gap | ~20 px | ~28 px | `gap-7` |

#### Responsive (minimal — not in reference)

| Breakpoint | Rule |
| ---------- | ---- |
| `< lg` | Single column (`grid-cols-1`) |
| `lg+` | 3 columns (reference layout) |

### D5 — Footer CTA

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Position | centered below grid | same | `mt-14 flex justify-center` |
| Shape | full pill | same | `rounded-full` |
| Background | reference green `#4FAF50` | same | `bg-[#4FAF50]` |
| Text | white ~15 px semibold | ~21 px | `text-[21px] font-semibold text-white` |
| Padding | ~14 px × ~32 px | ~20 px × ~45 px | `px-11 py-5` |
| Grid → CTA gap | ~40 px | ~56 px | covered by `mt-14` |

**href:** `/news` (nav item in `_data/imili/header-nav.ts` — route may 404 until built).

### D6 — Colors (from reference)

| Role | Hex | Usage |
| ---- | --- | ----- |
| Section background | `#FFFFFF` | Full-width band |
| Badge + CTA green | `#4FAF50` | Sampled from reference PNG — normative for pixel QA |
| Card body | `#F3F4F6` | Below image |
| Title text | `#111111` | Section H2 + card titles |
| Description text | `#6B7280` | Header right paragraph |
| Date + calendar | `#9CA3AF` | Card meta row |
| Divider | `#E5E7EB` | Below date |
| Read more | `#111111` | Card footer link |

**IMILI brand note (production optional):** Badge and CTA may use `#0548bd` ([`CustomButton`](../components/custom/custom-button.tsx)) **only** after explicit product sign-off — that is **not** pixel-accurate to this reference.

### D7 — Content model

```ts
export type NewsBlogCardItem = {
  id: string;
  href: string;           // required; not rendered as URL text
  imageSrc: string;       // under public/
  imageAlt: string;
  date: string;           // display verbatim; use "TBD" when unknown
  title: string;
  external?: boolean;     // true for feat-0001 news URLs
};

export type NewsBlogSectionContent = {
  badgeLabel: string;     // reference: "News & Blog"
  heading: string;        // reference: "Stories and insights"
  description: string;    // reference right column paragraph
  readMoreLabel: string;  // reference: "Read more"
  ctaLabel: string;       // reference: "Explore All Blogs"
  ctaHref: string;        // "/news"
  items: NewsBlogCardItem[]; // min 3 for desktop grid
};
```

**Homepage (feat-0001):** show **first 3** of five Latest Updates URLs @ desktop; all **5** remain in data file for `/news` index later.

### D8 — Images (`public/` folder)

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
| 1 | Child among blankets / shelter supplies | **None** |
| 2 | Hands serving food | **None** |
| 3 | Woman feeding child at communal table | **None** |

**Rule:** Do **not** invent filenames. For **layout QA only**, use three **distinct** paths from inventory:

| Card | `imageSrc` (QA only) | `imageAlt` |
| ---- | -------------------- | ---------- |
| 1 | `/new/humans.png` | Placeholder — card 1 layout QA |
| 2 | `/new/corps.png` | Placeholder — card 2 layout QA |
| 3 | `/new/mision.png` | Placeholder — card 3 layout QA |

### D9 — Interaction

| Behavior | Spec |
| -------- | ---- |
| Card | Entire card clickable via `Link` / `<a>` on `item.href` |
| Read more | Visual only — same click target as card (not a separate button) |
| External URLs | `target="_blank"` `rel="noopener noreferrer"` when `external: true` |
| CTA | `Link` to `ctaHref` (`/news`) |
| Hover | Optional title/read-more opacity — **not** in reference; **omit** v1 |
| Motion | No carousel |

### D10 — feat-0001 dark-shell conflict

[feat-0001](../feat-0001/PRODUCT.md) mandates a **dark-only** marketing shell. This reference is a **white** section.

| | Detail |
| --- | ------ |
| **This spec** | Reference colors are **normative for pixel QA** |
| **Resolution** | Treat as explicit [feat-0001 exception](../feat-0001/PRODUCT.md#d2--dark-only-policy) for Carousel 5 only |
| **Do not** | Silently remap white → dark while claiming pixel accuracy to this reference |

---

## Acceptance criteria

- [ ] Section matches `./assets/news-blog-section-reference.png` @ 1440px within **±2 px** on tokens in [D3–D5](#d3--section-header)
- [ ] Badge, split header, 3-card grid, and centered CTA all present
- [ ] Card anatomy order: image → date row → divider → title → read more
- [ ] **No** summary paragraph, category pill, circular arrow meta, or carousel controls
- [ ] QA build uses [reference strings](#reference-strings-layout-qa-only--do-not-ship-on-imili-homepage); production uses [R1](#r1--imili-production-content) without charity copy
- [ ] `imageSrc` values resolve to real files under `public/` (no 404)
- [ ] feat-0003 `ArticleCard` / `ArticleCardGrid` **removed or replaced** on homepage when this ships
- [ ] `npm run build` passes

---

## Recommendations

### R1 — IMILI production content

| Field | Production value | Source |
| ----- | ---------------- | ------ |
| `badgeLabel` | Latest Updates | feat-0001 Carousel 5 heading |
| `heading` | **TBD** | No IMILI string equivalent to “Stories and insights” — do not invent |
| `description` | `siteConfig.tagline` | `_data/site-config.tsx` |
| `readMoreLabel` | Read more | Reference UI label (literal) |
| `ctaLabel` | **TBD** | No `/blogs` route; nav uses **News** — do not ship “Explore All Blogs” on production without product copy |
| `ctaHref` | `/news` | `_data/imili/header-nav.ts` |
| Card `title` | feat-0001 `latestUpdates.items[].title` | [feat-0001 TECH](../feat-0001/TECH.md) — first 3 items |
| Card `href` | feat-0001 URLs | same |
| Card `date` | **TBD** | feat-0001 snippets/dates not supplied — do not fabricate “February 25, 2026” |
| Card `imageSrc` | **TBD** | Use [QA placeholders](#rule-do-not-invent-filenames) until production assets added |

### R2 — Production images

Add three MIL/launch thumbnails to `public/news/` before launch. Until then, ship [QA placeholders](#card--imagesrc-qa-only--imagealt) only in dev/preview.

### R3 — Reuse

Export `NewsBlogSection` + `NewsBlogCard` for `/news` index when that route exists (show all 5 feat-0001 items).
