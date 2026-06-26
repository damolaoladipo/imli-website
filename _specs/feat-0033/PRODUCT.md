# feat-0033: About Us page — What We Are, Vision, Mission sections

## Summary

Extend **`/about-us`** with three content sections below the existing hero and intro block:

| Section | Heading | Purpose |
| ------- | ------- | ------- |
| **What We Are** | What We Are | Institute role, global centre framing, digital-age threats context |
| **Vision** | Vision | Normative vision statement for MIL's future |
| **Mission** | Mission | Normative mission statement |

**Design references:** User screenshots (2026-06-26) — save to `./assets/` before implement (see [assets/README.md](./assets/README.md)).

**Target repo:** `imil-institute` (this project).

**Depends on (already shipped):**

| Prior work | Status |
| ---------- | ------ |
| `PageHeroSection` | Shipped on `/about-us` |
| `AboutUsIntroSection` | Shipped on `/about-us` |
| [feat-0016](../feat-0016/PRODUCT.md) `MissionSection` | Shipped on homepage — **reuse or adapt** for About Mission block |

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → components → page wire-up → nav |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | Next.js App Router, `next/image`, Tailwind v4 |

---

## Assumptions (confirm or correct before implement)

1. Canonical route is **`/about-us`** (already live). Header/footer links still point to **`/about`** — add redirect or update nav in this feat.
2. Copy below is **normative** (comms-approved); do not paraphrase without sign-off.
3. Section layout follows user reference screenshots — text + image split blocks with alternating alignment on desktop.
4. Typography uses **Montserrat** (`_data/fonts.tsx`) and existing IMILI neutrals (`#111111`, `#6B7280`, white sections).
5. Images are **TBD** until product drops reference captures into `./assets/` and assigns `public/` paths — use [QA placeholders](#image-placeholders-qa-only) for layout QA only.
6. **No dark-mode** variant for these sections in v1 (light bands on white page shell).
7. **Package manager** is `npm`.
8. Mission block may **reuse** `MissionSection` (feat-0016) if reference matches the 3-cell grid; otherwise ship a simpler `AboutSplitSection` variant per [TECH § layout](./TECH.md#section-layouts).

---

## Problem

| Today | Gap |
| ----- | --- |
| `/about-us` has hero + intro only | No What We Are / Vision / Mission content |
| Nav links to `/about` | 404 — no alias to `/about-us` |
| Mission copy exists on homepage `MissionSection` | About page needs dedicated normative Vision + What We Are + Mission stack |
| Legacy `imilinstitute.org/about` content not in repo | Institute positioning not fully represented |

**Goal:** Visitors reading `/about-us` understand what IMILI is, its vision, and its mission — with readable typography, responsive image splits, and correct SEO on a single scrollable page.

---

## User stories

### US-1 — Read institute positioning

As a policymaker or partner, I scroll `/about-us` and read **What We Are** explaining IMILI's global centre role and the digital threats it addresses.

### US-2 — Understand vision and mission

As a visitor, I find clearly labelled **Vision** and **Mission** sections with normative IMILI statements (not placeholder charity copy).

### US-3 — Visual credibility

As a visitor, each major section includes a supporting photograph or illustration that matches the reference layout (not a broken image).

### US-4 — Discover from navigation

As a visitor, I reach the page from **About Us** in the header without hitting a 404.

### US-5 — Share and index

As a communicator, `/about-us` has stable metadata, Open Graph tags, and a sitemap entry.

---

## Scope

### In scope (v1)

- Extend `_data/imili/about-us-page.ts` with `whatWeAre`, `vision`, `mission` content blocks
- New or reused section components (see [TECH](./TECH.md))
- Wire sections on `app/about-us/page.tsx` in order below intro
- Section `id` anchors: `#what-we-are`, `#vision`, `#mission`
- Image placeholders from `STOCK_IMAGES` until production assets assigned
- `/about` → `/about-us` redirect **or** nav href updates (pick one — [R2](#r2--route-alignment))
- Sitemap entry for `/about-us`
- Export new components from `components/custom/imili/index.ts`

### Out of scope (v1)

- Board, team, scientific advisory committee child routes (`/about/board`, etc.)
- MDX-driven about page
- Animations beyond existing motion patterns ([feat-0023](../feat-0023/PRODUCT.md) optional follow-up)
- Video embeds in these three sections
- Translations / i18n

---

## Page stack (normative order)

```text
/about-us
├── PageHeroSection              # shipped — bg-neutral-100 hero
├── AboutUsIntroSection          # shipped — two-column intro
├── AboutWhatWeAreSection        # NEW — feat-0033
├── AboutVisionSection           # NEW — feat-0033
├── AboutMissionSection          # NEW — feat-0033 (or adapted MissionSection)
└── (future sections — board, team, etc.)
```

---

## Normative copy

### What We Are

**Heading:** `What We Are`

**Body:**

> IMILI serves as a global centre for research, training, policy innovation, and international cooperation aimed at strengthening information integrity, digital literacy, and responsible media engagement in the digital age. Our establishment is a direct response to the escalating global threats posed by misinformation, disinformation, hate speech, deepfakes, algorithmic manipulation, and the rapid expansion of Artificial Intelligence and emerging technologies.

### Vision

**Heading:** `Vision`

**Body:**

> A world that embraces the value of Media and Information Literacy for the future we desire, recognizes the importance of empirical evidence on the impact of MIL, and ensures that MIL is inclusively, sustainably, and rightfully accessible to all.

### Mission

**Heading:** `Mission`

**Body:**

> To strengthen research and cooperation that bolster Media and Information Literacy for all for a just, peaceful, and sustainable future.

---

## Design reference (from user screenshots)

Save captures to `./assets/` before pixel QA:

| File | Section |
| ---- | ------- |
| `what-we-are-reference.png` | What We Are — text + image |
| `vision-reference.png` | Vision — text + image |
| `mission-reference.png` | Mission — text + image / grid |

### Expected layout patterns (confirm against assets)

| Section | Desktop layout (expected) | Mobile |
| ------- | ------------------------- | ------ |
| What We Are | Text left (~50%), image right (~50%) | Stack: heading → body → image |
| Vision | Image left (~50%), text right (~50%) — **alternating** | Stack: heading → body → image |
| Mission | Match `mission-reference.png` — if grid: reuse feat-0016; if simple split: text + single image | Single column |

### Shared section tokens

| Token | Value |
| ----- | ----- |
| Section background | `#FFFFFF` (`bg-white`) |
| Section padding Y | `py-16 md:py-20 lg:py-24` |
| Container | `container mx-auto px-6 md:px-8` |
| H2 | `text-3xl md:text-4xl font-bold text-neutral-900` |
| Body | `text-base md:text-lg leading-relaxed text-neutral-600` |
| Image radius | `rounded-2xl` or `rounded-[25px]` (match reference) |
| Image aspect | `aspect-[4/3]` or `aspect-[16/10]` per reference |

---

## Image placeholders (QA only)

Until production assets are assigned, use `STOCK_IMAGES` — **not subject-accurate**:

| Section | QA `imageSrc` | Notes |
| ------- | ------------- | ----- |
| What We Are | `STOCK_IMAGES.home.about` | Replace when `about-what-we-are.jpg` added |
| Vision | `STOCK_IMAGES.mission.secondary` | Replace when `about-vision.jpg` added |
| Mission (primary) | `STOCK_IMAGES.mission.primary` | If using feat-0016 grid |
| Mission (secondary) | `STOCK_IMAGES.mission.secondary` | If using feat-0016 grid |

Add production keys to `_data/imili/images.ts` under `aboutUs: { whatWeAre, vision, missionPrimary, missionSecondary }` when files land in `public/stock/`.

---

## Acceptance criteria

- [ ] `/about-us` renders hero + intro + **What We Are** + **Vision** + **Mission** in order
- [ ] All three headings and body copy match [Normative copy](#normative-copy) exactly
- [ ] Each section has `id` anchor (`what-we-are`, `vision`, `mission`)
- [ ] Images load without 404 (QA placeholders acceptable until production assets)
- [ ] Layout matches reference screenshots @ 1440px within reasonable tolerance (±4px spacing)
- [ ] Mobile @ 375px: readable stack, no horizontal overflow
- [ ] `/about` resolves to `/about-us` **or** all nav `href`s updated to `/about-us`
- [ ] `/about-us` in `app/sitemap.ts`
- [ ] `npm run build` passes

---

## Recommendations

### R1 — Reuse `MissionSection` for Mission block

If `mission-reference.png` matches the feat-0016 3-cell grid, wire `MissionSection` with about-specific content:

```ts
{
  badgeLabel: "Our Mission",
  heading: "Mission",
  description: "To strengthen research and cooperation…",
  cta: { label: "Learn More", href: "/what-we-do" },
  primaryPhoto: …,
  stat: { value: "1st", label: "UNESCO Category 2 MIL Institute" },
  secondaryPhoto: …,
}
```

If reference is a **simple** text + image split, ship `AboutSplitSection` instead — do not force the grid.

### R2 — Route alignment

| Option | Recommendation |
| ------ | -------------- |
| A | `app/about/page.tsx` → `redirect('/about-us')` |
| B | Update `_data/imili/header-nav.ts`, `site-config.tsx`, footer links: `/about` → `/about-us` |

**Recommended:** **A + B** — redirect preserves old bookmarks; nav points to canonical URL.

### R3 — Homepage cross-link

Optional CTA from homepage `AboutUs` block → `/about-us#what-we-are`.

### R4 — Downstream pages

Board (`/about-us/board`), team, and scientific advisory committee are separate future feats — link from header mega menu when those routes ship.
