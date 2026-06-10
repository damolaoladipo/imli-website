# feat-0006: Services carousel — dark three-card row with line-art

## Summary

Implement a **dark services section** matching the user-supplied reference: outline badge, split-color heading, dashed-circle prev/next controls, and **three** service cards (lime icon, title, description, “View detail” pill, bottom line-art illustration).

**Design reference:** `./assets/services-carousel-reference.png` — **1024×456 px** capture; scale geometry to **1440px** QA viewport using [scale rule](#scale-rule-1024--1440).

**App:** root Next.js site (`imil-institute` package).

**Placement:** Homepage **new section** — stacks with [feat-0003](../feat-0003/PRODUCT.md), [feat-0004](../feat-0004/PRODUCT.md), and [feat-0005](../feat-0005/PRODUCT.md) on `/`.

**Normative decisions:** [Scope](#d1--in-scope-from-reference-only), [Placement](#d2--placement), [Section shell](#d3--section-shell), [Header](#d4--header-anatomy), [Carousel](#d5--carousel-behavior), [Service card](#d6--service-card-anatomy), [Colors](#d7--colors-from-reference), [Content model](#d8--content-model), [Assets](#d9--icons-and-illustrations-public-folder), [Dark-shell alignment](#d10--feat-0001-dark-shell-alignment).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → card → carousel section → homepage wire-up |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, CSS scroll, Next.js App Router |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. Reference capture width is **1024 px**; QA target viewport is **1440 px** (scale per formula below).
2. Reference shows **exactly three** full service cards @ desktop — no fourth card, no pagination dots.
3. Prev/next controls are visible — implement horizontal scroll on the card track (same pattern as [feat-0005](../feat-0005/PRODUCT.md)); **no** autoplay in reference.
4. Lime line-art **icons** and white **bottom illustrations** per card **do not exist** in `public/` — paths are **TBD** until assets are added ([D9](#d9--icons-and-illustrations-public-folder)).
5. Typography uses project font **Montserrat** (`_data/fonts.tsx`) unless overlay QA proves a mismatch.
6. Card 1 description is **truncated in the reference** — ship verbatim; do not complete the sentence.

---

## Problem

| Today | Gap |
| ----- | --- |
| First `ServicesCarousel` pass used **lucide** icons only | Missing lime icons + bottom line-art ([D6](#d6--service-card-anatomy) #5, #13) |
| Header stacked badge + heading + nav in one flex row | Nav must align with **H2 row**, badge on its own line ([D4](#d4--header-anatomy)) |
| `_data/imili/services.ts` omitted `iconSrc` / `illustrationSrc` | Data model incomplete ([D8](#d8--content-model)) |
| Nav used thick `ChevronLeft` / `ChevronRight` | Reference uses **thin** line arrows in dashed rings ([D4](#d4--header-anatomy) #8) |
| `@3` cards used horizontal scroll only | Reference shows **3-up grid** @ desktop when `items.length === 3` ([D5](#d5--carousel-behavior)) |

**Goal:** Pixel-aligned services carousel @ 1440px against `./assets/services-carousel-reference.png`, using only observable UI elements.

### Implementation delta (v1 → v2)

| Check | v1 (wrong) | v2 (normative) |
| ----- | ---------- | -------------- |
| Card icons | `Container` / `Map` / `Package` lucide | `/services/icon-*.svg` lime line-art |
| Card bottom | None | `/services/art-*.svg` white line-art @ 45% height |
| Badge row | Grouped with heading + nav | Badge alone; H2 + nav on next row |
| Nav icons | `Chevron*` size-7 | `ArrowLeft` / `ArrowRight` stroke 1.5, size-5 |
| Desktop layout | Always `overflow-x-auto` | `grid-cols-3` when exactly 3 items |

---

## Design reference (from `./assets/services-carousel-reference.png`)

### Elements visible in reference (in scope)

```text
┌ section (dark bg) ─────────────────────────────────────────────────────────┐
│  [OUR SERVICES]                                    ( ◌← )  ( ◌→ )          │
│  Clean mobility & supply chain services                                        │
│                              ^^^^^^^^ lime accent on "services" only         │
│                                                                               │
│  ┌ card 1 ──────────┐  ┌ card 2 ──────────┐  ┌ card 3 ──────────┐         │
│  │ [lime icon]       │  │ [lime icon]       │  │ [lime icon]       │         │
│  │ title             │  │ title             │  │ title             │         │
│  │ description       │  │ description       │  │ description       │         │
│  │ [View detail]     │  │ [View detail]     │  │ [View detail]     │         │
│  │ ─── line art ───  │  │ ─── line art ───  │  │ ─── line art ───  │         │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘         │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Nav buttons:** circular control with **dashed/dotted white ring** (not solid fill), white chevron inside.

### Elements **not** in reference (out of scope — do not implement)

| Element | Reason |
| ------- | ------ |
| “Get it for FREE” floating pill (bottom-right of capture) | Third-party template chrome — not part of section |
| Section subheading / body paragraph below H2 | Not visible |
| Star ratings, price, tags | Not visible |
| Carousel pagination dots / slide counter | Not visible |
| Card drop shadow | Cards are flat elevated surfaces |
| Fourth card @ desktop | Not visible |
| IMILI-specific copy | Reference is freight-themed — use [reference strings](#reference-strings-layout-qa-only) for QA only |

### Reference strings (layout QA only)

| Role | Copy (verbatim from reference) |
| ---- | -------------------------------- |
| Badge | OUR SERVICES |
| Heading (white) | Clean mobility & supply chain  |
| Heading (lime accent) | services |
| Card 1 title | Green freight solution |
| Card 1 description | Our Green Freight Solution is designed to help businesses minimize their environmental. |
| Card 2 title | Intelligent route optimization |
| Card 2 description | Cut down on miles and emissions through data-driven route optimization. |
| Card 3 title | Fleet management |
| Card 3 description | Eco-focused fleet operations for better sustainability control. |
| Card CTA (all) | View detail |

**Card 1 description:** Ends mid-sentence in reference — **do not** append missing words.

---

## Scale rule (1024 → 1440)

```text
W_ref = 1024
W_qa  = 1440
scale = 1.40625
px_1440 = round(px_1024 × 1.40625)
```

---

## Design decisions

### D1 — In scope (from reference only)

Ship section shell, header (badge + split H2 + nav), horizontal card track with **min 3** service cards, per-card anatomy as captured. No invented chrome.

### D2 — Placement

| Option | Detail |
| ------ | ------ |
| **Recommended** | Homepage **new section** on `/` — stacks with feat-0003, feat-0004, feat-0005 |
| **Standalone** | Preview route for isolated overlay QA |

### D3 — Section shell

| Token | @1024 (visual) | @1440 (scaled) | Tailwind @1440 |
| ----- | -------------- | -------------- | -------------- |
| Section `id` | `services` | same | `id="services"` |
| Background | ~`#141414` charcoal | same | `bg-[#141414]` |
| Section padding Y | ~48 px | ~68 px | `py-[68px]` |
| Section padding X | ~40 px | ~56 px | `px-14` |
| Max content width | full in capture | site shell | inner `max-w-7xl` optional for header only; **card track full bleed** like feat-0005 |

### D4 — Header anatomy

| # | Element | @1024 | @1440 | Notes |
| - | ------- | ----- | ----- | ----- |
| 1 | Badge | outline pill; white border ~1 px; label ALL CAPS white ~11 px | ~15 px | `rounded-full border border-white/80 px-4 py-1.5 text-[15px] font-medium uppercase tracking-wide text-white` |
| 2 | Badge → heading gap | ~16 px | ~22 px | `mt-5` |
| 3 | Heading | ~32 px bold; “services” lime, rest white; single line in reference | ~45 px | `text-[45px] font-bold leading-tight` |
| 4 | Heading accent | word **services** only | `#B8F43C` lime (sampled) | `text-[#B8F43C]` on `<span>` |
| 5 | Header row | badge + heading left; nav right | `flex items-start justify-between` |
| 6 | Nav cluster | 2 circular buttons, top-right | `flex gap-3` |
| 7 | Nav button | ~44 px circle; **dashed** white ring ~1 px; transparent fill | ~62 px | `size-[62px] rounded-full border border-dashed border-white/70 bg-transparent` |
| 8 | Nav chevron | white ~18 px | ~25 px | `lucide-react` `ChevronLeft` / `ChevronRight` |
| 9 | Header → track gap | ~32 px | ~45 px | `mt-11` |

### D5 — Carousel behavior

| Behavior | Spec |
| -------- | ---- |
| Layout | Horizontal row; `overflow-x-auto` on track |
| Visible cards @ desktop | **3** full cards (reference) |
| Prev / next | Scroll by one card width + gap per click; no wrap |
| Initial scroll | `scrollLeft = 0` (all three cards visible in reference) |
| Autoplay | **Out of scope** |
| Dots | **Out of scope** |
| Data | `items.length >= 3`; additional items scroll off-screen |

#### Track geometry (@1440)

| Token | @1440 |
| ----- | ----- |
| Card width | ~382 px |
| Card gap | ~23 px |
| Track horizontal padding | `px-14` (align with header) |

### D6 — Service card anatomy

Each card: dark elevated panel, fixed min-height, content top + illustration bottom.

| # | Element | @1024 | @1440 | Notes |
| - | ------- | ----- | ----- | ----- |
| 1 | Card size | ~272 w × ~280 h (approx in capture) | ~382 w × ~394 h | `w-[382px] shrink-0 min-h-[394px]` |
| 2 | Card radius | ~16 px | ~22 px | `rounded-[22px]` |
| 3 | Card background | ~`#1C1C1C` | same | `bg-[#1C1C1C]` |
| 4 | Card padding | ~20 px | ~28 px | `p-7` |
| 5 | Top icon | lime line-art ~32 px | ~45 px | `Image` or inline SVG from asset path |
| 6 | Icon → title gap | ~12 px | ~17 px | `mt-4` |
| 7 | Title | ~16 px bold white | ~22 px | `text-[22px] font-bold text-white` |
| 8 | Title → description gap | ~8 px | ~11 px | `mt-3` |
| 9 | Description | ~13 px regular white/80 | ~18 px | `text-[18px] leading-relaxed text-white/80` |
| 10 | Description → CTA gap | ~16 px | ~22 px | `mt-5` |
| 11 | CTA pill | dark bg ~`#2A2A2A`; white label ~12 px | ~17 px | `rounded-full bg-[#2A2A2A] px-5 py-2 text-[17px] text-white` |
| 12 | CTA label | View detail | verbatim |
| 13 | Bottom illustration | white line-art, anchored bottom of card, ~40% card height | | `relative` card; illustration `absolute bottom-0 inset-x-0 h-[45%]` |

**Card structure:**

```text
┌ rounded dark panel ─────────────┐
│ [lime icon]                     │
│ Title                           │
│ Description                     │
│ [View detail]                   │
│                                 │
│     (white line-art graphic)    │
└─────────────────────────────────┘
```

**href:** `View detail` is a `Link` / `<a>` — URL not shown in reference; use `item.href` from data.

### D7 — Colors (from reference)

| Role | Hex | Usage |
| ---- | --- | ----- |
| Section background | `#141414` | Full band |
| Card background | `#1C1C1C` | Service cards |
| Heading white | `#FFFFFF` | Most of H2 |
| Heading accent / icons | `#B8F43C` | Word “services”; card top icons |
| Body text | `#FFFFFF` @ ~80% | Descriptions |
| Badge border + label | `#FFFFFF` | Outline badge |
| Nav dashed ring | `#FFFFFF` @ ~70% | Circle border |
| CTA pill bg | `#2A2A2A` | “View detail” |
| Line-art illustrations | `#FFFFFF` @ ~35% | Bottom graphics |

**QA note:** Sample exact hex via DevTools overlay on `./assets/services-carousel-reference.png`.

### D8 — Content model

```ts
export type ServiceCardItem = {
  id: string;
  href: string;
  iconSrc: string;        // lime line-art SVG/PNG under public/
  iconAlt: string;
  title: string;
  description: string;
  ctaLabel: string;       // reference: "View detail"
  illustrationSrc: string; // white line-art at card bottom
  illustrationAlt: string;
};

export type ServicesSectionContent = {
  badge: string;          // reference: "OUR SERVICES"
  headingPrefix: string;  // "Clean mobility & supply chain "
  headingAccent: string;  // "services"
  items: ServiceCardItem[]; // min 3
};
```

### D9 — Icons and illustrations (`public/` folder)

#### Public file inventory (repo scan 2026-06-10)

**Raster:** `/afr.png`, `/bipoc.png`, `/crown.png`, `/csc.png`, `/mide.png`, `/mycity.png`, `/settle.png`, `/toyosi.png`, `/blocks/imli.png`, `/new/*.png`, `/new/*.jpeg`

**SVG (generic):** `/file.svg`, `/globe.svg`, `/window.svg`, `/blocks/imli.svg`, `/blocks/imli-logo.svg`, `/icons/icon-*.svg`, `/new/asure-us-icon.svg`, etc.

#### Reference asset mapping

| Card | Reference depicts | `public/` path (v2 QA SVGs) |
| ---- | ----------------- | --------------------------- |
| 1 icon | Shipping container (lime line-art) | `/services/icon-freight.svg` |
| 1 illustration | Semi-truck + leaf (white line-art) | `/services/art-truck.svg` |
| 2 icon | Map route + pins (lime line-art) | `/services/icon-route.svg` |
| 2 illustration | Delivery van + pin (white line-art) | `/services/art-van.svg` |
| 3 icon | Box + gear (lime line-art) | `/services/icon-fleet.svg` |
| 3 illustration | Cargo ship + crane (white line-art) | `/services/art-ship.svg` |

**Rule:** Do **not** substitute `/globe.svg`, `/file.svg`, or lucide icons and claim pixel accuracy.

**v2 note:** Six simplified line-art SVGs ship in `public/services/` for layout QA. Trace from reference PNG before production sign-off if overlay shows drift.

### D10 — feat-0001 dark-shell alignment

Unlike feat-0003/4/5 (light exceptions), this reference is **dark** and aligns with [feat-0001](../feat-0001/PRODUCT.md) near-black marketing shell.

| | Detail |
| --- | ------ |
| Section bg `#141414` | Close to feat-0001 `#0a0a0a` / `#171717` card tokens — minor delta acceptable for reference fidelity |
| Lime accent `#B8F43C` | **Not** IMILI `#03A904` — reference color is normative for pixel QA |

---

## Responsive (minimal — desktop reference only)

| Breakpoint | Rule |
| ---------- | ---- |
| `< lg` | Horizontal scroll; card width unchanged; nav buttons remain |
| `< md` | Single-card scroll step; header stacks if needed |

---

## Acceptance criteria

- [ ] Layout matches `./assets/services-carousel-reference.png` @ 1440px within **±2 px** on card size, gaps, radii
- [ ] Badge, split H2 (lime **services** only), dashed-circle nav buttons
- [ ] Exactly **3** cards visible @ desktop in initial state
- [ ] Per card: lime icon, title, description, “View detail”, bottom line-art
- [ ] Card 1 description ends with “…environmental.” — **unchanged**
- [ ] **No** “Get it for FREE” widget, dots, autoplay, or fourth card chrome
- [ ] Icon/illustration `src` resolves (200) or explicit QA waiver with lucide placeholders documented
- [ ] Section stacks on `/` without removing feat-0003/4/5

---

## Recommendations

### R1 — IMILI production copy

Map badge to “WHAT WE DO”, heading to IMILI observatory language, cards to MIL pillars — **only after** product approves copy; do not invent in v1 QA build.

### R2 — Asset pipeline

Trace or export the six line-art assets from the reference PNG into `public/services/` before final QA.

### R3 — `href` targets

Default QA `href: '#'`; production links to `/what-we-do` anchors or child routes when they exist.
