# feat-0032: Projects — `/projects` and AFAX-P detail page

## Summary

Add a **file-based MDX projects system** to the IMILI site, mirroring the existing **news** and **essays** pipelines ([feat-0029](../feat-0029/PRODUCT.md)).

Ship two routes in v1:

| Route | Purpose |
| ----- | ------- |
| `/projects` | Index — lists published institute projects, newest / featured first |
| `/projects/africa-against-xenophobia-project` | Launch project — **Africa Against Xenophobia Project (AFAX-P)** call for papers |

Content is sourced from legacy copy at `https://imilinstitute.org/projects/africa-against-xenophobia-project` (normative text in [TECH § launch MDX](./TECH.md#10-launch-content--africa-against-xenophobia-projectmdx)).

**Target repo:** `imil-institute` (this project).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Tooling → data → index → detail → nav |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | Next.js App Router, fumadocs-mdx, SSG |

---

## Assumptions (confirm or correct before implement)

1. Projects are **static MDX** compiled at build time — no CMS, no database.
2. Reuse the existing **fumadocs-mdx** toolchain (same as essays/news) — add a third `defineDocs` collection in `source.config.ts`.
3. Canonical slug is **`africa-against-xenophobia-project`** — matches legacy URL path segment.
4. IMILI visual language follows existing site tokens (Montserrat, green palette, `ImiliFooter` via root layout).
5. Project pages use **light theme** prose (`prose-neutral`) — no dark-mode toggle on project routes in v1.
6. Submission CTA email is **`info@imilinstitute.org`** with subject **`GJMIL`** (from legacy copy).
7. **Package manager** is `npm`.
8. Legacy domain **`imilinstitute.org`** redirect to new canonical host is **out of scope** for v1 (DNS/hosting); ship correct paths on current `siteConfig.url` only.
9. Only **one** project ships in v1; index must still work when more projects are added later.
10. Hero image uses **`STOCK_IMAGES.nav.activities[0]`** until a dedicated AFAX-P asset is provided.

---

## Problem

| Today | Gap |
| ----- | --- |
| No `/projects` route | AFAX-P call for papers has no owned URL on the new site |
| Activities nav links to `#combating-xenophobia` anchor | No destination page for “Combating xenophobia” |
| Long-form project copy lives only on legacy `imilinstitute.org` | Content not in repo; not searchable or version-controlled |

**Goal:** Visitors can browse projects at `/projects` and read the full AFAX-P call for papers at `/projects/africa-against-xenophobia-project`, with correct SEO, readable typography, submission deadlines surfaced prominently, and navigation from Activities.

---

## User stories

### US-1 — Browse projects

As a visitor, I open `/projects` and see a list of published projects with title, short description, status badge, and optional hero thumbnail so I can choose what to explore.

### US-2 — Read AFAX-P call for papers

As a researcher or policymaker, I open `/projects/africa-against-xenophobia-project` and read the full call for papers: introduction, scope, objectives, submission categories, deadlines, plagiarism policy, and references.

### US-3 — Submit an abstract

As an author, I can find submission instructions (email, subject line, word limit, deadlines) without hunting through prose — surfaced in a sidebar or callout.

### US-4 — Discover from site chrome

As a visitor, I reach the AFAX-P page from **Activities → Combating xenophobia** in the header mega menu.

### US-5 — Share and index

As a communicator, the project page has correct `<title>`, description, Open Graph tags, canonical URL, and sitemap entry.

---

## Scope

### In scope (v1)

- MDX collection: `projects/content/*.mdx` + `defineDocs` in `source.config.ts`
- Types: `types/project.ts`
- Loader: `lib/project-source.ts` (mirror `lib/news-source.ts`)
- Routes: `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`, `app/projects/[slug]/metadata.ts`
- Index UI: `ProjectsIndexSection` — title, intro, project cards
- Detail UI: `ProjectDetailLayout` — hero, H1, acronym/subtitle, prose body, **submission sidebar** (deadlines + mailto CTA), optional TOC on desktop
- Launch content: `projects/content/africa-against-xenophobia-project.mdx` (full legacy copy)
- `generateStaticParams` on `[slug]`
- `draft: true` frontmatter — excluded from index and sitemap in production
- Sitemap entries for `/projects` and each published project slug
- `siteConfig.baseLinks.projects` → `/projects`
- Nav: **Activities → Combating xenophobia** → `/projects/africa-against-xenophobia-project`
- JSON-LD `Article` or `WebPage` on detail route

### Out of scope (v1)

- CMS / admin UI
- Online submission form (email-only per legacy copy)
- Multi-language versions
- Project filtering by region or status (index lists all published projects)
- RSS feed for projects
- Comments or reactions
- Redirect rules from `imilinstitute.org` (hosting/DNS)
- Additional projects beyond AFAX-P (structure supports them; content not required in v1)

---

## Projects vs Activities vs News

| Surface | URL | Content type |
| ------- | --- | ------------ |
| **Projects** | `/projects`, `/projects/[slug]` | Long-form institute programmes, calls for papers, initiative pages |
| **Activities** | `/activities` (future hub) | Short overview / anchor sections linking into projects and events |
| **News** | `/news`, `/news/[slug]` | Press coverage and announcements |

**Rule:** AFAX-P is a **project** with a stable slug — not a news article. Activities nav “Combating xenophobia” deep-links to the project detail page in v1.

---

## Information architecture

### Index (`/projects`)

```text
┌ ProjectsIndexSection ─────────────────────────────────────────────┐
│  H1: Projects                                                     │
│  p:  Institute programmes, research initiatives, and calls for papers │
│                                                                    │
│  ┌ card ──────────────────────────────────────────────────────┐   │
│  │ [hero thumb]  Badge: Call for papers                        │   │
│  │               H2: Africa Against Xenophobia Project (AFAX-P) │   │
│  │               p:  Short description (frontmatter)          │   │
│  └─────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

### Detail (`/projects/africa-against-xenophobia-project`)

```text
┌ ProjectDetailLayout ──────────────────────────────────────────────┐
│  Breadcrumb: Home / Projects / AFAX-P                             │
│                                                                    │
│  ┌ main (lg:8) ────────────────┐  ┌ aside (lg:4) ─────────────┐ │
│  │ [hero 16:9]                  │  │ Submit your abstract      │ │
│  │ H1 + subtitle                │  │ Abstract deadline         │ │
│  │ prose body (MDX)             │  │ First draft deadline      │ │
│  │   - Introduction             │  │ mailto CTA                │ │
│  │   - Scope of Submissions     │  │ Subject: GJMIL            │ │
│  │   - Objective                │  └───────────────────────────┘ │
│  │   - Plagiarism / LLM policy  │                                │
│  │   - Submission Categories    │  [TOC desktop — optional]     │
│  │   - Publication & Recognition│                                │
│  │   - Submission               │                                │
│  │   - References               │                                │
│  └──────────────────────────────┘                                │
└────────────────────────────────────────────────────────────────────┘
```

---

## Content contract (AFAX-P)

### Frontmatter (normative)

| Field | Value |
| ----- | ----- |
| `title` | Call for Papers: Africa Against Xenophobia Project. AfAX-P |
| `description` | Combating Xenophobia Misinformation and Hate Speech for a United Africa — call for scholarly and policy submissions. |
| `subtitle` | (Combating Xenophobia Misinformation and Hate Speech for a United Africa) |
| `acronym` | AFAX-P |
| `status` | `call-for-papers` |
| `date` | `2026-01-15` (publication / page date — adjust if product supplies) |
| `heroImage` | `/stock/nav-activities-1.jpg` (or `STOCK_IMAGES` path) |
| `heroImageAlt` | Conference workshop with participants |
| `abstractDeadline` | `2026-07-30` |
| `firstDraftDeadline` | `2026-11-30` |
| `submissionEmail` | `info@imilinstitute.org` |
| `submissionEmailSubject` | `GJMIL` |
| `abstractWordLimit` | 250 |

### Body sections (normative headings)

1. **Introduction** — xenophobia in Africa, San José 2020 context, media role, AfCFTA, digital landscape, Afrophobia/Afrophilia
2. **Scope of Submissions** — bullet list (14 themes from legacy copy)
3. **Objective** — harmonized continental policy framework
4. **Plagiarism and the use of ChatGPT or similar LLMs** — LLM policy
5. **Submission Categories** — Academic papers, Policy briefs, Innovation case studies (word counts)
6. **Publication & Recognition** — Global Journal on MIL; Kigali launch
7. **Submission** — abstract instructions, deadlines, contact note
8. **References** — bibliography from legacy copy

Full MDX source in [TECH.md §10](./TECH.md#10-launch-content--africa-against-xenophobia-projectmdx).

---

## Visual & layout (D1)

| Element | Spec |
| ------- | ---- |
| Page background | `bg-background` (white) |
| Content max width | `max-w-7xl` container; main column `lg:col-span-8` |
| Text align | **left** ([feat-0022](../feat-0022/PRODUCT.md)) |
| Prose | `prose prose-lg prose-neutral max-w-none` |
| Status badge | `call-for-papers` → green pill; future: `active`, `completed` |
| Submission sidebar | `lg:sticky lg:top-28`; prominent `CustomButton` or mailto link |
| Breadcrumb | `Home` → `Projects` → project title (truncated on mobile) |

---

## Navigation (D2)

| Location | Label | Href (v1) |
| -------- | ----- | --------- |
| Activities dropdown | Combating xenophobia | `/projects/africa-against-xenophobia-project` |
| Footer | Projects (optional) | `/projects` — add if footer column lists programme links |

Update `_data/imili/header-nav.ts` only — footer syncs via existing nav map if applicable.

---

## SEO & metadata (D3)

| Route | `<title>` pattern |
| ----- | ----------------- |
| Index | `Projects — IMILI` |
| AFAX-P | `Africa Against Xenophobia Project (AFAX-P) — IMILI` |

- `description` from frontmatter
- `openGraph.type`: `article` on detail, `website` on index
- Canonical: `${siteConfig.url}/projects/[slug]`
- Sitemap: `/projects` priority `0.8`; project slugs `0.7`

---

## Acceptance criteria

- [ ] `/projects` renders index with AFAX-P card
- [ ] `/projects/africa-against-xenophobia-project` renders full legacy copy with all normative sections
- [ ] Submission sidebar shows abstract deadline **July 30, 2026**, first draft **November 30, 2026**, email **info@imilinstitute.org**, subject **GJMIL**
- [ ] Activities → Combating xenophobia navigates to AFAX-P detail page
- [ ] `npm run build` succeeds; `generateStaticParams` includes `africa-against-xenophobia-project`
- [ ] Sitemap includes `/projects` and project URL
- [ ] `draft: true` projects hidden in production index
- [ ] Prose lists, links, and references render correctly (remark-gfm)

---

## Open questions

| # | Question | Default if unanswered |
| - | -------- | --------------------- |
| 1 | Confirm `date` frontmatter for AFAX-P page? | `2026-01-15` |
| 2 | Add **Projects** link to top-level nav (not only Activities)? | No — Activities deep-link only in v1 |
| 3 | Dedicated AFAX-P hero image? | Stock interim per assumption 10 |
| 4 | Redirect `imilinstitute.org/projects/...` → new host? | Out of scope v1 |

---

## Related specs

| Spec | Relationship |
| ---- | ------------ |
| [feat-0029](../feat-0029/PRODUCT.md) | MDX essays pattern to mirror |
| [feat-0031](../feat-0031/PRODUCT.md) | Stock images for hero |
| [feat-0021](../feat-0021/PRODUCT.md) | Header nav / Activities dropdown |
