# feat-0019: Site footer — dual-card over forest background

## Summary

Implement a **new global footer** (separate from [feat-0017 `ImiliFooter`](../feat-0017/PRODUCT.md)): full-width **forest photo background** with two **white rounded cards** — left (logo + newsletter pitch + inline subscribe) and right (**2×2 grid**: Pages, Address, Contact, Social media).

**Design reference:** `./assets/forest-footer-reference.png` — **1024×396 px** capture; scale geometry to **1440px** QA viewport using [scale rule](#scale-rule-1024--1440).

**App:** root Next.js site (`imil-institute` package). Wired via `app/layout.tsx` (replaces current `FooterSection` when product approves).

**Related (do not merge):** [feat-0017](../feat-0017/PRODUCT.md) cream/dark column footer — keep `ImiliFooter.tsx` **unchanged**; this is a **second footer implementation**.

**Normative decisions:** [Scope](#d1--in-scope-from-reference-only), [Placement](#d2--placement), [Background](#d3--background), [Card shell](#d4--card-shell), [Left card](#d5--left-card-newsletter), [Right card grid](#d6--right-card-2×2-grid), [Colors](#d7--colors-from-reference), [Content model](#d8--content-model), [Assets](#d9--images-public-folder), [IMILI production](#r1--imili-production-content).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → sub-panels → `ForestFooter` → layout swap |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, `fill` background, forms |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |
| [security-and-hardening](../../.agents/skills/security-and-hardening/SKILL.md) | Email input validation; no secrets in client |

---

## Assumptions (confirm or correct before implement)

1. Reference capture width is **1024 px**; QA target viewport is **1440 px** (scale per formula below).
2. Capture shows **one footer block** only — no site header above, no content below the cards.
3. Reference brand is **eco-supply / Webestica** — strings are **layout QA only** ([reference strings](#reference-strings-layout-qa-only--do-not-ship-for-imili)).
4. **Forest background photo does not exist** in `public/` today — path is **TBD** until product adds file ([D9](#d9--images-public-folder)).
5. Newsletter **submit backend** is not in repo — v1 is **UI + client validation only**; `action` **TBD**.
6. Typography uses project font **Montserrat** (`_data/fonts.tsx`) unless overlay QA proves a mismatch.
7. Social row shows **exactly 3 icons** in reference: Facebook, Instagram, YouTube — **not** LinkedIn or Twitter.

---

## Problem

| Today | Gap |
| ----- | --- |
| `ImiliFooter` ([feat-0017](../feat-0017/PRODUCT.md)) is dark single-band + 3 columns | No spec for dual-card forest footer |
| No forest-background footer component | User reference cannot be implemented from existing footer |

**Goal:** Pixel-aligned **new** `ForestFooter` @ **1440px** against `./assets/forest-footer-reference.png`, shipping **only** observable UI elements and real `public/` paths.

---

## Design reference (from `./assets/forest-footer-reference.png`)

### Elements visible in reference (in scope)

```text
┌ section (forest bg, full width) ───────────────────────────────────────────┐
│  ┌ left white card ─────────────┐ ┌ right white card ──────────────────┐ │
│  │ [leaf logo]                   │ │ ┌ Pages ─────┐ ┌ Address ─────────┐ │ │
│  │ H2: We believe real change…   │ │ │ 2-col links│ │ 2 address blocks │ │ │
│  │ sub: Join our eco-supply…     │ │ ├────────────┼────────────────────┤ │ │
│  │ [Type your email | Subscribe] │ │ │ Contact    │ Social media       │ │ │
│  │ Designed by Webestica…        │ │ │ email+phone│ (○)(○)(○) 3 icons  │ │ │
│  └───────────────────────────────┘ └────────────────────────────────────┘ │
│         (small white bridge connects cards at vertical center)            │
└──────────────────────────────────────────────────────────────────────────┘
```

### Elements **not** in reference (out of scope — do not implement)

| Element | Reason |
| ------- | ------ |
| Site header | Not in capture |
| Scroll-to-top control | Not visible |
| Separate copyright / bottom meta bar | Only small attribution on left card |
| Fourth social icon | Exactly **3** icons visible |
| LinkedIn / Twitter icons | Not visible |
| Newsletter heading separate from H2 | Pitch is the H2 itself |
| `ImiliFooter` cream/dark layout | Different footer — do not merge |
| Card drop shadow (heavy) | Reference shows flat white on photo; optional subtle shadow only if overlay QA requires |

### Reference strings (layout QA only — do not ship for IMILI)

| Role | Reference text |
| ---- | -------------- |
| Newsletter H2 (before emphasis) | We believe |
| Newsletter H2 (emphasis) | real change |
| Newsletter H2 (after emphasis) | starts deep within the supply chain. |
| Newsletter subtext | Join our eco-supply community. |
| Input placeholder | Type your email |
| Subscribe button | Subscribe |
| Attribution | Designed by Webestica, Powered by Framer |
| Pages column 1 | Home · Home 2 · About · Service Static · Case Studies |
| Pages column 2 | Contact · Blog · Privacy policy · Changelog |
| Address block 1 | 123 Remote Work Avenue, San Francisco, CA 94105 |
| Address block 2 | 144 Creative Street, Suite 456, New York, NY 10001, USA |
| Contact email | hello@yourbrand.com |
| Contact phone | +1 202 555 0147 |
| Quadrant headings | Pages · Address · Contact · Social media |

---

## Scale rule (1024 → 1440)

Reference capture width **W_ref = 1024**. QA viewport **W_qa = 1440**.

```text
scale = W_qa / W_ref = 1.40625
px_1440 = round(px_1024 × 1.40625)
```

All **@1024** values below are measured against `forest-footer-reference.png`. Implement **@1440** values in Tailwind/CSS unless noted.

---

## Design decisions

### D1 — In scope (from reference only)

Ship **only** what appears in the screenshot: forest background + two white cards + center bridge + left newsletter card + right 2×2 grid + 3 social icons + attribution line.

### D2 — Placement

| Option | Detail |
| ------ | ------ |
| **Required** | New `ForestFooter` wired through `components/custom/forest-footer.tsx` (or swap `footer.tsx`) in `app/layout.tsx` |
| **Keep** | `ImiliFooter.tsx` and [feat-0017](../feat-0017/PRODUCT.md) files **unchanged** — alternate footer |

### D3 — Background

| Token | @1024 (measured) | @1440 (scaled) | Tailwind @1440 |
| ----- | ---------------- | -------------- | -------------- |
| Section | full viewport width | same | `relative w-full` |
| Background image | forest canopy, `object-cover` | same | `next/image` `fill` + `object-cover` |
| Min height | ~396 px (capture) | ~556 px | `min-h-[556px]` |
| Section padding | ~24 px vertical, ~32 px horizontal | ~34 / ~45 px | `px-4 py-[34px] md:px-[45px] md:py-10` |
| Overlay (optional) | none visible in reference | none | **Do not add** dark overlay unless QA requires |

### D4 — Card shell

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Layout | 2 cards side by side | same | `flex flex-col gap-4 lg:flex-row lg:items-stretch` |
| Card background | `#FFFFFF` | same | `bg-white` |
| Card radius | ~20 px | ~28 px | `rounded-[28px]` |
| Card padding | ~28 px | ~39 px | `p-10` |
| Gap between cards | ~8 px + bridge | ~11 px | `lg:gap-3` |
| Center bridge | ~12 × 40 px white tab between cards | ~17 × 56 px | see [TECH.md](./TECH.md) |
| Left card width | ~52% | same | `lg:w-[52%]` |
| Right card width | ~48% | same | `lg:flex-1` |

### D5 — Left card (newsletter)

#### Logo

| Token | @1024 | @1440 | Notes |
| ----- | ----- | ----- | ----- |
| Mark | leaf icon ~32 px | ~45 px | Reference only — **IMILI:** `/blocks/imli-logo.svg` on white card |
| Position | top-left | same | `mb-6` below logo to headline |

#### Headline (H2)

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Font size | ~28 px semibold | ~39 px | `text-[39px] font-semibold leading-[1.15] text-[#111111]` |
| Emphasis span | bold same size | same | `font-bold` on emphasis words only |
| Logo → H2 gap | ~16 px | ~22 px | covered by `mb-6` |

#### Subtext

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Font size | ~14 px regular | ~20 px | `mt-4 text-[20px] text-[#6B7280]` |
| H2 → subtext gap | ~12 px | ~17 px | `mt-4` |

#### Inline subscribe control

Reference shows **one** rounded field with placeholder left and **solid green** Subscribe pill **nested inside** the right end (not a separate outline button).

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Container | pill, light border | same | `relative mt-8 flex items-center rounded-full border border-[#D1D5DB] bg-white` |
| Input | borderless inside container | same | `flex-1 bg-transparent px-6 py-4 text-[18px] outline-none placeholder:text-[#9CA3AF]` |
| Subscribe btn | solid green pill inside right | same | `m-1 shrink-0 rounded-full bg-[#4FAF50] px-8 py-3 text-[17px] font-medium text-white` |
| Subtext → control gap | ~20 px | ~28 px | `mt-8` |

**Do not** use `CustomButton` — reference geometry is inset green pill, not IMILI blue CTA.

#### Attribution

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Text | ~11 px muted | ~15 px | `mt-auto pt-10 text-[15px] text-[#9CA3AF]` |
| Position | bottom-left of left card | same | left card `flex flex-col` so attribution pins bottom |

### D6 — Right card (2×2 grid)

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Grid | 2 cols × 2 rows | same | `grid h-full grid-cols-2 grid-rows-2` |
| Cell dividers | 1 px `#E5E7EB` | same | `divide-x divide-y divide-[#E5E7EB]` or per-cell borders |
| Cell padding | ~16 px | ~22 px | `p-6` |
| Quadrant heading | ~15 px semibold `#111111` | ~21 px | `text-[21px] font-semibold text-[#111111]` |
| Body / links | ~13 px `#6B7280` | ~18 px | `text-[18px] text-[#6B7280]` |
| Link stack gap | ~8 px | ~11 px | `mt-3 space-y-2` |
| Pages layout | **2 columns** of links inside top-left cell | same | `grid grid-cols-2 gap-x-4` |
| Address blocks | **2** separate paragraphs | same | `mt-3 space-y-4` |
| Social icons | 3 icons in a row, ~20 px | ~28 px | `mt-3 flex gap-4` |
| Social icon color | `#111111` | same | `text-[#111111]` |

**Quadrant order (fixed):**

| Cell | Heading |
| ---- | ------- |
| top-left | Pages |
| top-right | Address |
| bottom-left | Contact |
| bottom-right | Social media |

### D7 — Colors (from reference)

| Role | Hex | Usage |
| ---- | --- | ----- |
| Card surface | `#FFFFFF` | Both cards |
| Primary text | `#111111` | Headings, quadrant titles |
| Muted text | `#6B7280` | Subtext, links, address, contact |
| Attribution | `#9CA3AF` | Left card footer line |
| Input border | `#D1D5DB` | Email field outline |
| Subscribe green | `#4FAF50` | Inset Subscribe pill |
| Grid divider | `#E5E7EB` | Right card quadrant lines |
| Placeholder | `#9CA3AF` | Input placeholder |

### D8 — Content model

```ts
// _data/imili/forest-footer.ts

export type ForestFooterNavLink = {
  label: string;
  href: string;
};

export type ForestFooterSocialId = "facebook" | "instagram" | "youtube";

export type ForestFooterSocialLink = {
  id: ForestFooterSocialId;
  href: string;
};

export type ForestFooterContent = {
  background: { src: string; alt: string };
  logo: { src: string; alt: string };
  newsletter: {
    headlineBefore: string;
    headlineEmphasis: string;
    headlineAfter: string;
    subtext: string;
    placeholder: string;
    buttonLabel: string;
  };
  attribution: string;
  pages: {
    title: string;
    columns: [ForestFooterNavLink[], ForestFooterNavLink[]];
  };
  address: {
    title: string;
    blocks: string[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
  };
  social: {
    title: string;
    links: ForestFooterSocialLink[];
  };
};
```

### D9 — Images (`public/` folder)

#### Public raster inventory (repo scan 2026-06-10)

| Path |
| ---- |
| `/new/bg-hero.png` |
| `/new/mision.png` |
| `/new/vision.png` |
| `/new/humans.png` |
| `/new/corps.png` |
| `/blocks/imli.png` |
| (see [feat-0016 inventory](../feat-0016/PRODUCT.md#public-raster-inventory) for full list) |

#### Background mapping

| Reference depicts | Matching file in `public/` |
| ----------------- | --------------------------- |
| Forest canopy aerial photo | **None** |

**Rule:** Do **not** invent `/brand/footer-forest.jpg`. For **layout QA only** until product adds forest asset:

| Field | QA interim `src` | Notes |
| ----- | ---------------- | ----- |
| `background.src` | `/new/vision.png` | Placeholder — not subject-matched |
| `background.alt` | Placeholder — forest footer background QA | |

**Production:** Product adds forest photo → e.g. `/brand/footer-forest-bg.jpg` (**TBD** path when file exists).

#### Logo

| Surface | Path |
| ------- | ---- |
| White card (dark logo) | `/blocks/imli-logo.svg` |
| Do **not** use | `/blocks/imli-white.svg` (invisible on white card) |

---

## Acceptance criteria

- [ ] New `ForestFooter` matches `./assets/forest-footer-reference.png` @ 1440px within **±2 px** on tokens in [D3–D6](#d3--background)
- [ ] `ImiliFooter.tsx` **unchanged**
- [ ] Two white cards + center bridge + 2×2 right grid
- [ ] Subscribe control: inset solid green pill inside email field (reference geometry)
- [ ] Social row: **exactly 3** icons (Facebook, Instagram, YouTube)
- [ ] Pages quadrant: **two columns** of links
- [ ] Address quadrant: **two** address blocks
- [ ] QA build uses [reference strings](#reference-strings-layout-qa-only--do-not-ship-for-imili); production uses [R1](#r1--imili-production-content)
- [ ] All image `src` values resolve under `public/` (no 404)
- [ ] `npm run build` passes

---

## Recommendations

### R1 — IMILI production content

| Field | Production value | Source |
| ----- | ---------------- | ------ |
| `logo` | `/blocks/imli-logo.svg` | White card |
| `background.src` | **TBD** | Forest asset when added |
| `newsletter.*` | **TBD** | No IMILI equivalent to reference eco-supply copy — product must supply |
| `attribution` | **Omit or replace** | Reference “Webestica / Framer” — do not ship on IMILI production |
| `pages` | `headerNavItems` split into two columns | [`header-nav.ts`](../../_data/imili/header-nav.ts) |
| `address.blocks` | **TBD** | `siteConfig.contact.address` — single or split blocks when known |
| `contact.email` / `phone` | `siteConfig.contact` | [`site-config.tsx`](../../_data/site-config.tsx) |
| `social.links` | `siteConfig.links` (facebook, instagram, youtube only) | Hide empty hrefs |

### R2 — Layout swap

```tsx
// components/custom/forest-footer.tsx
import { forestFooterHomepageContent } from "@/_data/imili/forest-footer";
import { ForestFooter } from "@/components/custom/imili/ForestFooter";

export default function ForestFooterSection() {
  return <ForestFooter content={forestFooterHomepageContent} />;
}
```

Swap `FooterSection` import in `app/layout.tsx` when product approves.

### R3 — feat-0001 alignment

[feat-0001 Carousel 6](../feat-0001/PRODUCT.md#carousel-6--footer) requires IMILI social, contact, and header nav repeat — map to right-card quadrants, not reference eco-supply strings.

---

## Open questions (product)

| # | Question |
| - | -------- |
| 1 | Forest background image file path? |
| 2 | IMILI newsletter headline + subtext (replace eco-supply copy)? |
| 3 | Physical address(es) for Address quadrant? |
| 4 | YouTube URL (reference shows 3 icons; `siteConfig` may lack youtube)? |
| 5 | Replace or remove Webestica attribution on production? |
