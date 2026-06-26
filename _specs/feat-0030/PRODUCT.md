# feat-0030: News — single article (`/news/fg-describes-imili-launch-as-milestone-against-misinformation`)

## Summary

Ship a **news article detail page** matching the user-supplied reference layout: two-column article with hero image, date, headline, long-form body, and a **Latest Media Mentions** sidebar.

| Route | Purpose |
| ----- | ------- |
| `/news` | News index (minimal v1 — list of articles; may reuse `NewsBlogCard` patterns) |
| `/news/fg-describes-imili-launch-as-milestone-against-misinformation` | Launch article — TVC / Federal Government IMILI launch coverage |

**Design reference:** `./assets/news-article-reference.png` (Counter Extremism Project–style article layout; IMILI branding applied).

**Parent context:** Nav already links to `/news` ([`header-nav.ts`](../../_data/imili/header-nav.ts)). Homepage cards reference this story in [`article-cards.ts`](../../_data/imili/article-cards.ts) (`id: "tvc-news"`).

**Related specs:**

| Spec | Relationship |
| ---- | ------------ |
| [feat-0029](../feat-0029/PRODUCT.md) | Essays (`/essays`) — owned long-form; **News** = press / event reports |
| [feat-0004](../feat-0004/PRODUCT.md) | `NewsBlogSection` + `NewsBlogCard` — index card anatomy differs from article detail |
| [feat-0003](../feat-0003/PRODUCT.md) | `ArticleCardGrid` — homepage latest updates |

**Agent skills:** [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md), [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md), [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md).

---

## Assumptions (confirm or correct before implement)

1. **Target repo:** `imil-institute`.
2. **Package manager:** `npm`.
3. Article body is **owned summary** on IMILI site with **attribution** to [TVC News original](https://www.tvcnews.tv/fg-describes-launch-of-media-literacy-institute-as-milestone-in-fight-against-misinformation/) — not a full republication without permission; link out prominently.
4. Sidebar items are **external media mentions** (outlet + link off-site), not other owned `/news` articles in v1.
5. If [feat-0029](../feat-0029/PRODUCT.md) MDX pipeline is not merged yet, v1 may ship article body from `_data/imili/news/` (see [TECH fallback](./TECH.md#fallback-without-mdx-v1-only)).
6. Link accent in prose uses IMILI **`--primary`** green, not the pink in the reference PNG.
7. Typography: **Montserrat** (site default).

---

## Problem

| Today | Gap |
| ----- | --- |
| `/news` 404 | Nav and homepage CTAs point to missing route |
| TVC story only exists as external `href` on homepage cards | No owned URL for sharing institute-framed coverage |
| No article detail layout | Cannot match reference two-column press layout |

**Goal:** Visitors open `/news/fg-describes-imili-launch-as-milestone-against-misinformation` and read the story in the reference layout, with related press coverage in the sidebar.

---

## User stories

### US-1 — Read the launch article

As a visitor, I open the article URL and see date, hero image, headline, and readable body copy about the FG / IMILI launch milestone.

### US-2 — Discover related press coverage

As a visitor, I see **Latest Media Mentions** in the sidebar with outlet name, thumbnail, headline, and excerpt; clicking opens the original source in a new tab.

### US-3 — Reach news from the site

As a visitor, I can open `/news` from nav or homepage and find this article.

### US-4 — Share and index

As a communicator, the page has correct title, description, Open Graph tags, and canonical URL.

---

## Design reference (`./assets/news-article-reference.png`)

### Layout (in scope)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│  max-w-7xl mx-auto px-6 py-16 md:py-24                                   │
│  ┌──────────────────────────────┬─────────────────────────────────────┐ │
│  │ MAIN (~62–65%)               │ SIDEBAR (~35–38%)                     │ │
│  │                              │                                       │ │
│  │ May 2, 2026  (date, muted)   │ LATEST MEDIA MENTIONS (label)         │ │
│  │                              │                                       │ │
│  │ ┌──────────────────────────┐ │ ┌─ mention card ─────────────────────┐ │ │
│  │ │   hero image 16:9-ish  │ │ │ [AP] logo                          │ │ │
│  │ └──────────────────────────┘ │ │ [thumb]  Headline bold             │ │ │
│  │                              │ │ excerpt 2–3 lines muted            │ │ │
│  │ # Article headline           │ └────────────────────────────────────┘ │ │
│  │   large bold                 │ ┌─ mention card ─────────────────────┐ │ │
│  │                              │ │ ...                                │ │ │
│  │ Body paragraphs              │ └────────────────────────────────────┘ │ │
│  │ Links in accent color        │ (stack 3–5 cards, vertical gap)       │ │
│  │ Generous line-height         │                                       │ │
│  └──────────────────────────────┴─────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

### Elements **in** reference (implement)

| Element | Notes |
| ------- | ----- |
| Publication date above hero | Formatted `MMMM D, YYYY` |
| Full-width hero image in main column | `next/image`, rounded optional (reference: square corners) |
| Headline below image | Single H1 |
| Body prose | Paragraphs; inline links styled |
| Sidebar section label | `LATEST MEDIA MENTIONS` — uppercase, letter-spaced, muted |
| Mention cards | Outlet identifier, thumbnail, headline, excerpt |
| Two-column split @ `lg+` | Sidebar right |

### Elements **not** in reference (out of scope v1)

| Element | Reason |
| ------- | ------ |
| Author byline / avatar | Not in reference |
| Breadcrumb | Optional; not in reference |
| Share buttons | Not in reference |
| Table of contents | Not in reference |
| Comments | Not in reference |
| Related articles grid below fold | Sidebar only |

### Responsive

| Breakpoint | Layout |
| ---------- | ------ |
| `< lg` | Single column: main stack → sidebar below body |
| `≥ lg` | Two columns; sidebar `sticky top-28` |

---

## Normative decisions

### D1 — Slug ↔ URL

```text
news/content/fg-describes-imili-launch-as-milestone-against-misinformation.mdx
  →  /news/fg-describes-imili-launch-as-milestone-against-misinformation
```

Homepage `articleCardHomepageItems` entry `tvc-news` **`href` must update** from external TVC URL to internal `/news/fg-describes-imili-launch-as-milestone-against-misinformation` (keep `externalSourceUrl` for attribution).

### D2 — News vs Essays

| | News | Essays (feat-0029) |
| - | ---- | ------------------ |
| URL | `/news/*` | `/essays/*` |
| Content | Press, launches, event reports | Owned explainers, institute perspective |
| Sidebar | Media mentions (external) | TOC + related essays |
| This article | TVC / FG launch milestone | N/A |

### D3 — Frontmatter schema (MDX path)

| Field | Type | Required | Notes |
| ----- | ---- | -------- | ----- |
| `title` | string | yes | H1 below hero |
| `description` | string | yes | Meta + excerpt |
| `date` | string | yes | ISO `YYYY-MM-DD` |
| `heroImage` | string | yes | `/news/...` under `public/` |
| `heroImageAlt` | string | yes | |
| `category` | string | no | e.g. `"News"` |
| `externalSourceUrl` | string | no | Link to TVC original |
| `externalSourceLabel` | string | no | e.g. `"TVC News"` |
| `draft` | boolean | no | Default `false` |

### D4 — Media mention card (sidebar)

```ts
type MediaMention = {
  id: string;
  outlet: string;        // "UNESCO", "Arise TV", "AP"
  outletLogoSrc?: string; // optional /news/outlets/unesco.svg
  href: string;          // external
  imageSrc: string;
  imageAlt: string;
  headline: string;
  excerpt: string;
};
```

Data file: `_data/imili/media-mentions.ts` — excludes current article; ordered by editorial priority.

### D5 — Styling tokens (IMILI, not reference pink)

| Role | Token / value |
| ---- | ------------- |
| Page bg | `bg-background` (`#FFFFFF`) |
| Body text | `text-foreground` |
| Muted date / sidebar label | `text-muted-foreground` |
| Prose links | `text-primary` + underline (`--primary` green) |
| Sidebar label | `text-xs font-semibold uppercase tracking-widest text-muted-foreground` |
| Mention headline | `text-base font-bold text-foreground` |
| Mention excerpt | `text-sm text-muted-foreground leading-relaxed` |
| Main column max | `max-w-none` within `lg:col-span-7` grid |
| Grid | `lg:grid lg:grid-cols-12 lg:gap-12` — main `lg:col-span-7`, sidebar `lg:col-span-5` |
| Hero aspect | `aspect-[16/9]` or `aspect-[3/2]` |
| H1 | `text-3xl md:text-4xl font-bold tracking-tight` |
| Body | `text-lg leading-[1.8]` |
| Header clearance | `pt-8` below site header (article starts in `<main>`) |

### D6 — Attribution block

Below hero or end of article, include source line when `externalSourceUrl` set:

```text
Source: TVC News — read the original coverage ↗
```

Opens in new tab with `rel="noopener noreferrer"`.

### D7 — `/news` index (minimal v1)

- H1: **News**
- Short intro line
- List of news cards (reuse `NewsBlogCard` or slimmer row variant)
- Only published articles from news source
- Link each card to `/news/[slug]`

---

## Launch article content

**Title:** FG Describes IMILI Launch as Milestone Against Misinformation

**Slug:** `fg-describes-imili-launch-as-milestone-against-misinformation`

**External source:** https://www.tvcnews.tv/fg-describes-launch-of-media-literacy-institute-as-milestone-in-fight-against-misinformation/

**Suggested date:** `2026-04-15` (align with launch window — confirm with comms)

**Hero image:** `public/news/fg-imili-launch-milestone.png` (or `IMILI_IMAGES.humans` until asset ready)

### Approved facts (from TVC / official statements — do not contradict)

- Federal Government described IMILI launch as major step against misinformation
- Launch event at National Open University of Nigeria (NOUN), two-day event
- Minister of Information and National Orientation: Mohammed Idris (represented by Dr. Dili Ezughah, Nigerian Press Council)
- IMILI presented Strategic Plan 2026–2030
- UNESCO Category 2 institute hosted by Nigeria
- Stakeholders: Lai Mohammed, Prof. Uduma Oji Uduma (NOUN VC), Dr. Sharon Omotosho (IMILI Director), Dr. Ike Neliaku (NIPR President)

Full starter body: [TECH §article MDX](./TECH.md#launch-article-mdx).

### Sidebar mentions (v1)

Include 4 items from `headerNavItems` News dropdown (exclude TVC if it's the current page):

1. UNESCO Abuja launch
2. Arise TV story
3. FMINO unveiling
4. African MIL policy (UNESCO)

---

## Acceptance criteria

### Routes

- [ ] `GET /news` → 200 with article card linking to launch story
- [ ] `GET /news/fg-describes-imili-launch-as-milestone-against-misinformation` → 200
- [ ] Unknown slug → 404

### Layout (QA @ 1440px against `./assets/news-article-reference.png`)

- [ ] Date above hero in main column
- [ ] Hero image spans main column width
- [ ] H1 below hero
- [ ] Two-column layout @ `lg+` with sidebar right
- [ ] Sidebar title reads **Latest Media Mentions**
- [ ] ≥3 mention cards with outlet, image, headline, excerpt
- [ ] Single column on mobile with sidebar after body

### Content & links

- [ ] Homepage `tvc-news` card links to internal article URL
- [ ] Source attribution links to TVC original (new tab)
- [ ] Sidebar mentions link externally (new tab)
- [ ] No lorem / TBD in production body

### SEO

- [ ] Unique `<title>` and meta description
- [ ] Open Graph `article` type, `publishedTime`, hero image
- [ ] Canonical URL on article page

### a11y

- [ ] One H1
- [ ] Hero `alt` text
- [ ] External links announced via visible text (not icon-only)

---

## Boundaries

### Always

- Match reference **layout structure**; use IMILI colors/fonts
- Attribute external source (TVC)
- Use real `public/` image paths or `IMILI_IMAGES`

### Ask first

- Full republication of TVC article text
- Additional `/news` articles beyond launch piece

### Never

- Present sidebar mentions as IMILI-owned articles when they are external
- Remove UNESCO / government attribution
