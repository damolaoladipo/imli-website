# feat-0029: Essays — MDX content system (`/essays`, `/essays/who-is-imili`)

## Summary

Add a **file-based MDX essays system** to the IMILI site, ported from the reference implementation at `/Users/pro/Documents/madebydamola/damola-oladipo`.

Ship two routes in v1:

| Route | Purpose |
| ----- | ------- |
| `/essays` | Index — lists all essays, newest first, optional tag filter |
| `/essays/who-is-imili` | First production essay — “Who is IMILI?” |

Content lives in MDX files under `essays/content/`. Slugs are derived from filenames (`who-is-imili.mdx` → `/essays/who-is-imili`).

**Target repo:** `imil-institute` (this project).

**Reference implementation:** `/Users/pro/Documents/madebydamola/damola-oladipo` (fumadocs-mdx + Next.js App Router — port patterns, not Damola branding).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Tooling → content → index → essay page → nav |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | Next.js App Router, `next/image`, SSG |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |

---

## Assumptions (confirm or correct before implement)

1. Essays are **static MDX** compiled at build time — no CMS, no database.
2. **fumadocs-mdx** + **fumadocs-core** are acceptable new dependencies (same stack as reference).
3. Slug `who-is-imili` is the canonical URL for the launch essay; no redirect from `/about` required in v1.
4. IMILI visual language follows existing site tokens (Montserrat, green palette, `ImiliFooter` on all pages via root layout).
5. Essay prose styling uses Tailwind Typography (`@tailwindcss/typography`) — new dev dependency if not present.
6. Author model is simplified for v1: single org author **IMILI** (no multi-author sidebar cards unless content team requests).
7. RSS feed (`/essays/feed`) is **in scope** — reference already ships it; low cost to port.
8. Dynamic OG image generation per essay is **out of scope** for v1; use essay `thumbnail` or site default OG image.
9. **Package manager** is `npm` (not pnpm) — matches this repo.
10. Essays ship **light theme only** — no `dark:prose-invert` (site has `.dark` tokens but essays pages do not toggle theme in v1).
11. Contact email for in-essay CTAs is **`info@imilinstitute.org`** (`siteConfig.contact.email`).

---

## Essays vs News (normative)

| Surface | URL | Content type |
| ------- | --- | ------------ |
| **Essays** | `/essays`, `/essays/[slug]` | Owned long-form MDX published by IMILI |
| **News** (nav today) | `/news` (future) + external URLs in dropdown | Press coverage, announcements, links out |
| **Blog** | — | **Deprecated label** — do not use in UI; footer reference strings that say "Blog" are QA-only |

**Rule:** `/essays/who-is-imili` is the canonical owned story for “who we are”; `/about` may summarize and link to it (cross-link is optional in v1, not a redirect).

---

## Problem

| Today | Gap |
| ----- | --- |
| No `/essays` route | No long-form editorial surface for institute storytelling |
| About copy lives only in homepage data (`_data/imili/homepage.ts`) | No dedicated, shareable URL for “who we are” narrative |
| News nav links to external press | No owned content hub for institute perspective |

**Goal:** Visitors can browse essays at `/essays` and read a polished “Who is IMILI?” piece at `/essays/who-is-imili`, with SEO metadata, readable typography, and navigation integration.

---

## User stories

### US-1 — Browse essays

As a visitor, I open `/essays` and see a list of published essays with title, description, date, and optional thumbnail so I can choose what to read.

### US-2 — Read an essay

As a visitor, I open `/essays/who-is-imili` and read the full MDX article with headings, links, images, and a table of contents on desktop.

### US-3 — Discover from site chrome

As a visitor, I can reach Essays from site navigation (header and/or footer) without typing the URL.

### US-4 — Share and index

As a communicator, each essay has correct `<title>`, description, Open Graph tags, and canonical URL so links preview well on social platforms and search engines.

---

## Scope

### In scope (v1)

- MDX pipeline: `source.config.ts`, `fumadocs-mdx` build step, `mdx-components.tsx`
- Content directory: `essays/content/*.mdx`
- Routes: `app/essays/page.tsx`, `app/essays/[slug]/page.tsx`
- Essay metadata: `app/essays/[slug]/metadata.ts`
- Types: `types/essay.ts`
- Shared essay source loader (single module — no copy-paste per file)
- Index UI: title, intro blurb, essay cards sorted by `date` desc
- Essay detail UI: breadcrumb, title, date, tags, description, thumbnail, prose body, TOC sidebar (desktop), mobile TOC
- Launch content: `essays/content/who-is-imili.mdx`
- RSS: `app/essays/feed/route.ts`
- Nav link: **Essays** → `/essays` in `_data/imili/header-nav.ts` (footer auto-syncs via `headerNavItems` map — see [D2](#d2--navigation-placement))
- `siteConfig.baseLinks.essays` + `metadataBase` in root layout (see [TECH §site-config](./TECH.md#18-site-config--metadata-contract))
- Share buttons (`essay-share-buttons.tsx`) — X, LinkedIn, WhatsApp, copy link
- Hash deep-link scroll (`hash-scroll-handler.tsx`) for `#section` URLs
- Tag filter on index (`?tag=`) — desktop pills; mobile via Radix Accordion (no `vaul` drawer — IMILI does not ship reference `Drawer`)
- Read-more section at bottom of essay — **hidden when fewer than 2 other essays exist**
- Mobile TOC — floating trigger + Accordion panel (not reference `Drawer`)
- SEO: JSON-LD `Article`, sitemap entries, RSS `<link rel="alternate">` in layout
- `generateStaticParams` on `[slug]` (required)
- Optional frontmatter `draft: true` — excluded from index, RSS, and sitemap

### Out of scope (v1)

- CMS / admin UI for essays
- Comments, reactions, newsletter gate on essays
- Full-text search
- Per-essay `opengraph-image.tsx` dynamic OG generator → **future feat-0030**
- Homepage `latest-essays` / `essays-preview` modules → **future feat-0031**
- `featured` essay carousel on homepage
- Localization / i18n
- Legacy `lib/essaymarkdown.ts` gray-matter path (reference dead code)
- `author-card` sidebar, `promo-content`, `media-viewer` lightbox, heading copy-link buttons (`copy-header`)
- Dark-mode essay styling

---

## Normative decisions

### D1 — Slug ↔ filename

```text
essays/content/who-is-imili.mdx  →  /essays/who-is-imili
```

- Slug = filename without `.mdx`
- Lowercase kebab-case only
- No nested folders in v1

### D2 — Navigation placement

Add **Essays** nav item:

```ts
{ name: "Essays", href: "/essays" }
```

Place after **News** and before **Gallery** in `headerNavItems` unless product specifies otherwise.

**Footer:** `footerHomepageContent` builds the Pages column from `headerNavItems` — adding Essays to nav automatically adds footer link. No separate footer task unless product wants Essays duplicated elsewhere.

**Active nav:** When `pathname` starts with `/essays`, highlight the Essays nav item (header + mobile drawer).

### D3 — Frontmatter schema

Required and optional fields (validated by Zod in `source.config.ts`):

| Field | Type | Required | Notes |
| ----- | ---- | -------- | ----- |
| `title` | string | yes | H1 on essay page |
| `description` | string | yes | Card excerpt + meta description |
| `date` | string (ISO date) | yes | `YYYY-MM-DD`; drives sort order |
| `tags` | string[] | no | Display chips + future filter |
| `featured` | boolean | no | Default `false`; homepage use later |
| `readTime` | string | no | e.g. `"6 min read"` |
| `author` | string | no | v1: omit or `"imili"` |
| `thumbnail` | string | no | Path under `public/`, e.g. `/essays/who-is-imili.png` |
| `draft` | boolean | no | Default `false`. When `true`, page 404 in production build OR omitted from index/RSS/sitemap (see [D9](#d9--draft--publish-gate)) |

**Slug validation (filename):** kebab-case `[a-z0-9]+(-[a-z0-9]+)*` — enforce in editorial review; optional Zod refine on a computed slug in CI script.

### D4 — Essay page layout

Match reference information architecture, restyled for IMILI:

```text
┌─────────────────────────────────────────────────────────────┐
│ [breadcrumb: Home / Essays]                                 │
│ H1 title                                                    │
│ date · readTime (optional)                                    │
│ share buttons (X, LinkedIn, WhatsApp, copy)                   │
│ description paragraph                                       │
│ tag chips                                                   │
├─────────────────────────────────────────────────────────────┤
│ [optional thumbnail — 2:1 aspect]                           │
├──────────────────────────────┬──────────────────────────────┤
│ prose MDX body               │ sticky TOC (lg+)            │
│                              │                             │
│ read-more (if ≥2 other essays)                             │
└──────────────────────────────┴──────────────────────────────┘
│ [mobile] floating TOC button → Accordion panel               │
└─────────────────────────────────────────────────────────────┘
```

### D5 — Index page layout

```text
┌─────────────────────────────────────────────────────────────┐
│ H1: Essays                                                  │
│ intro paragraph (IMILI-specific)                            │
│ tag filter pills (hidden if only one essay or no tags)      │
├─────────────────────────────────────────────────────────────┤
│ EssayCard × N (newest first; drafts excluded)               │
│   date | title | description | Read essay | thumbnail       │
└─────────────────────────────────────────────────────────────┘
```

### D6 — MDX authoring rules

Writers may use in essay body:

- Standard Markdown: headings, lists, blockquotes, links, images, tables (GFM)
- MDX components exported from `mdx-components.tsx`: `Accordion`, `Author`, images via `next/image`
- Fenced code blocks with optional `filename="..."` meta (reference `Pre` component)

Writers must **not** embed React route code or `export default function Page` inside MDX (some reference files accidentally contain pasted app code — clean this in IMILI content).

**Heading rules:**

- Page template renders the **only H1** from frontmatter `title`.
- MDX body starts at **`##` (H2)** — never use `#` in essay body.
- TOC indexes `h2` (and `h1` if present) with auto-generated `id`s from fumadocs/rehype pipeline.

**Allowed MDX components (v1):**

| Component | Usage |
| --------- | ----- |
| `Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionContent` | FAQs in essays |
| `YouTube` | `youtubeId` prop — institute documentary embeds |
| Standard markdown | GFM tables, task lists, images |

### D7 — Images

| Asset | Path | Use |
| ----- | ---- | --- |
| Who-is-IMILI hero/thumbnail | `public/essays/who-is-imili.png` (or `.jpg`) | `thumbnail` frontmatter |
| In-article images | `public/images/essays/...` | `![alt](/images/essays/...)` in MDX |

Use only paths that exist under `public/`. Reuse approved rasters from `_data/imili/images.ts` (`IMILI_IMAGES`) where appropriate.

### D8 — Styling (design tokens)

No pixel reference PNG for v1 — use IMILI CSS variables from `app/globals.css`.

| Token | Value / class | Use on essays |
| ----- | ------------- | ------------- |
| Page background | `bg-background` | Index + essay |
| Body text | `text-foreground` / `prose-neutral` | Prose paragraphs |
| Muted meta | `text-muted-foreground` | Dates, breadcrumbs |
| Links in prose | `prose-a:text-primary` | In-article links |
| Primary brand | `--primary: oklch(0.503 0.234 136.5)` | Tags, filter active state, mobile TOC button |
| Card border | `border-border` | EssayCard dividers |
| Font | Montserrat via `useMont` | Inherited from layout |
| Index max width | `max-w-3xl` | Essay list |
| Essay shell max width | `max-w-5xl` | Header + body grid |
| Header clearance | `pt-28 md:pt-32` | Below sticky `HeroHeader` (~88–104px) |
| Heading scroll margin | `prose-headings:scroll-mt-28` | Anchor + TOC offset |
| Thumbnail aspect | `aspect-[2/1]` | Hero image |

**Responsive:**

| Breakpoint | Index | Essay |
| ---------- | ----- | ----- |
| `< lg` | Single column cards | Full-width prose; TOC in floating Accordion |
| `≥ lg` | Same | Prose + sticky TOC sidebar `w-64` |

### D9 — Draft / publish gate

```yaml
draft: true   # optional — default false
```

| `draft` | Index | RSS | Sitemap | Direct URL |
| ------- | ----- | --- | ------- | ---------- |
| `false` / omitted | listed | included | included | 200 |
| `true` | hidden | hidden | hidden | **404 in production**; visible in `development` only (optional dev preview) |

Implement via `lib/essay-source.ts` helper `getPublishedEssayPages()` filtering `draft !== true`.

### D10 — Empty states

| State | `/essays` behavior |
| ----- | ------------------ |
| Zero published essays | Show H1 + intro + message: “No essays published yet.” (no cards) |
| Tag filter matches nothing | “No essays in this category.” + link to clear filter |

### D11 — Error states

- Unknown slug → Next.js `notFound()` (default 404 page)
- Optional: `app/essays/[slug]/not-found.tsx` with link back to `/essays` (nice-to-have, not blocking)

---

## Launch essay — `who-is-imili`

**File:** `essays/content/who-is-imili.mdx`

**URL:** `/essays/who-is-imili`

### Frontmatter (production)

```yaml
---
title: "Who Is IMILI?"
description: "The International Media and Information Literacy Institute — the world's first international observatory for MIL development, launched under the auspices of UNESCO."
date: "2026-06-26"
tags: ["About IMILI", "Media Literacy", "UNESCO"]
featured: true
readTime: "6 min read"
thumbnail: "/essays/who-is-imili.png"
---
```

### Body outline (minimum sections)

Writers must cover these H2 sections (copy is content-team owned; engineering provides structure):

1. **What IMILI is** — first international MIL observatory; catalyst for research and empirical evidence on social impact of MIL globally
2. **Why it exists** — misinformation, digital citizenship, sustainable development (SDGs), African and global policy context
3. **What we do** — research, clearinghouse, convening, global development agenda (align with `_data/imili/header-nav.ts` What We Do pillars)
4. **Who we serve** — governments, educators, media, civil society, international partners
5. **How to engage** — link to `/about`, `/what-we-do`, `/news`, [info@imilinstitute.org](mailto:info@imilinstitute.org)

### Approved facts (do not contradict without product review)

| Fact | Source |
| ---- | ------ |
| Full name: International Media and Information Literacy Institute (IMILI) | `siteConfig.fullName` |
| First international observatory for MIL development | `siteConfig.tagline`, `imiliHomepageAbout` |
| Catalyst for sustained research on social impact of MIL | `imiliHomepageAbout` |
| Launched under UNESCO auspices (Abuja) | `headerNavItems` News dropdown |
| Documentary YouTube ID `oH2s7rjl8Os` | `imiliHomepageDocumentary` |
| Contact: `info@imilinstitute.org` | `siteConfig.contact.email` |

### Editorial workflow

| Step | Owner | Output |
| ---- | ----- | ------ |
| 1. Draft MDX | Content / comms | `essays/content/who-is-imili.mdx` with `draft: true` |
| 2. Fact review | Product + comms | Approved facts table above verified |
| 3. Legal review | (if required) | UNESCO partnership wording signed off |
| 4. Publish | Engineering | Set `draft: false` or remove field; set final `date` |
| 5. QA | Engineering | Acceptance criteria below |

**Ship blocker:** Essay must not launch with HTML comment placeholders in production build.

### Starter body copy (engineering may ship; content team replaces)

See [TECH §10](./TECH.md#10-launch-content--who-is-imilmdx) for full starter MDX including `YouTube` embed.

---

## Acceptance criteria

### Routes

- [ ] `GET /essays` returns 200 with essay list including “Who Is IMILI?”
- [ ] `GET /essays/who-is-imili` returns 200 with rendered MDX body
- [ ] `GET /essays/nonexistent` returns 404
- [ ] `GET /essays/feed` returns valid RSS XML including `who-is-imili` item

### Content pipeline

- [ ] `npm run build` runs `fumadocs-mdx` before `next build` without errors
- [ ] Adding `essays/content/new-essay.mdx` with valid frontmatter auto-appears on index after rebuild
- [ ] Invalid frontmatter (missing `date`) fails build with clear Zod error
- [ ] `draft: true` essays excluded from index, RSS, sitemap

### SEO

- [ ] `/essays/who-is-imili` has unique `<title>` and `meta description`
- [ ] Open Graph `og:type` is `article` on essay pages
- [ ] Canonical URL is `{siteUrl}/essays/who-is-imili`
- [ ] JSON-LD `Article` present on essay pages
- [ ] `/essays` and each published essay appear in `sitemap.xml`
- [ ] Layout includes `<link rel="alternate" type="application/rss+xml" href="/essays/feed" />`

### UX

- [ ] Essay list sorted newest-first by `date`
- [ ] Desktop TOC highlights current section on scroll
- [ ] Mobile TOC opens via floating button; usable with keyboard
- [ ] Breadcrumb links work: Home → `/`, Essays → `/essays`
- [ ] Thumbnail renders via `next/image` when `thumbnail` is set
- [ ] Share buttons copy link and open X / LinkedIn / WhatsApp intents
- [ ] Hash URLs (`#section`) scroll with header offset
- [ ] Tag filter works on desktop; hidden when ≤1 essay
- [ ] Read-more hidden when only one published essay exists
- [ ] Empty index message when zero published essays

### Navigation

- [ ] Header includes **Essays** → `/essays`
- [ ] Footer Pages column includes Essays (via `headerNavItems`)
- [ ] Active state on `/essays` and `/essays/*`

### Accessibility

- [ ] Single H1 per page (from template, not MDX `#`)
- [ ] Heading hierarchy is logical (body starts at H2)
- [ ] Images have `alt` text in MDX
- [ ] Share / TOC controls have accessible names
- [ ] Tag filter buttons keyboard-operable

### Performance

- [ ] Essay pages statically generated (`generateStaticParams`)
- [ ] No layout shift from thumbnail (`priority` on hero image)

---

## Component manifest (port / skip)

| Reference file | IMILI action |
| -------------- | ------------ |
| `source.config.ts` | Port + `draft` field |
| `lib/essay-source.ts` | **Create** (extract from 6 duplicates) |
| `app/essays/*` | Port |
| `components/sections/essays.tsx` | Port |
| `components/essay-card.tsx` | Port |
| `components/essay-share-buttons.tsx` | **Port** |
| `components/hash-scroll-handler.tsx` | **Port** |
| `components/read-more-section.tsx` | **Port** (conditional render) |
| `components/table-of-contents.tsx` | Port |
| `components/tag-filter.tsx` | **Port** — mobile UI uses `@/components/ui/accordion`, not `Drawer` |
| `components/essay-mobile-toc.tsx` | **Create** — Accordion-based (replaces reference `mobile-toc.tsx`) |
| `components/mdx/youtube.tsx` | **Create** |
| `components/author-card.tsx` | Skip v1 |
| `components/promo-content.tsx` | Skip v1 |
| `components/copy-header.tsx` | Skip v1 |
| `components/media-viewer.tsx` | Skip v1 |
| `components/ui/drawer.tsx` | Do not add — use Accordion |
| `app/essays/[slug]/opengraph-image.tsx` | Skip → feat-0030 |
| `components/sections/latest-essays.tsx` | Skip → feat-0031 |

---

## Reference mapping (damola-oladipo → imil-institute)

| Reference path | IMILI path | Action |
| -------------- | ---------- | ------ |
| `source.config.ts` | `source.config.ts` | Port + IMILI schema |
| `essays/content/*.mdx` | `essays/content/*.mdx` | New IMILI content |
| `app/essays/page.tsx` | `app/essays/page.tsx` | Port + restyle |
| `app/essays/[slug]/page.tsx` | `app/essays/[slug]/page.tsx` | Port + restyle |
| `app/essays/[slug]/metadata.ts` | same | Port + IMILI `siteConfig` |
| `app/essays/feed/route.ts` | same | Port |
| `components/sections/essays.tsx` | `components/custom/imili/EssaysSection.tsx` or `components/essays/` | Port |
| `components/essay-card.tsx` | `components/essay-card.tsx` | Port + IMILI tokens |
| `components/table-of-contents.tsx` | same | Port |
| `components/essay-share-buttons.tsx` | same | **Port** |
| `components/hash-scroll-handler.tsx` | same | **Port** |
| `components/read-more-section.tsx` | same | **Port** |
| `components/tag-filter.tsx` | same | **Port** (Accordion mobile) |
| `components/essay-mobile-toc.tsx` | **NEW** | Accordion mobile TOC |
| `components/mdx/youtube.tsx` | **NEW** | YouTube embed |
| `app/sitemap.ts` | **NEW or UPDATE** | Include essay URLs |
| `mdx-components.tsx` | `mdx-components.tsx` | Port subset |
| `types/essay.ts` | `types/essay.ts` | Copy + `draft?` |
| `lib/essay-source.ts` | **NEW** | Central loader + publish filter |
| `next.config.ts` | `next.config.ts` | Add `createMDX()` wrapper |
| `app/layout.tsx` | same | `metadataBase`, RSS link, title template |
| `_data/site-config.tsx` | same | `baseLinks`, `absoluteOgImageUrl()` |

---

## Boundaries

### Always

- Run `npm run build` before marking feat complete
- Keep essay content in `essays/content/` — not in React components
- Use shared `lib/essay-source.ts` for all essay data access
- Filter drafts via `getPublishedEssayPages()` for public surfaces
- Validate frontmatter via Zod in `source.config.ts`
- Commit `.source/index.ts` after `fumadocs-mdx` (generated source tracked in repo)

### Ask first

- Adding new MDX components beyond reference set
- Changing URL structure (`/blog` vs `/essays`)
- Homepage featured-essay module

### Never

- Paste Next.js page components inside `.mdx` files
- Hardcode essay list in TSX (always derive from source)
- Commit broken image paths under `public/`
