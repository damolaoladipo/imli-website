# feat-0018: Homepage IMILI content — data only (no component edits)

## Summary

Replace homepage **placeholder and reference copy** with **normative IMILI institute content** for the six homepage carousels defined in [feat-0001 Carousel 1–6](../feat-0001/PRODUCT.md#homepage-content-normative).

**Scope:** Edit **data files**, **`site-config`**, and **`app/page.tsx` content wiring only** (which export is imported/passed). **Do not modify any file under `components/`.**

**Parent spec:** [feat-0001](../feat-0001/PRODUCT.md) — identity, section order, normative copy.

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → implement data tasks |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | One carousel’s data per slice |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `public/` paths, external link attrs |

---

## Assumptions (confirm or correct before implement)

1. **Components are frozen** — existing `BentoHeroSection`, `AboutUs`, `ServicesCarousel`, `ArticleCardGrid`, `ImiliFooter` render whatever content they receive; this spec does not change their markup or styles.
2. **Carousel 1 (hero slider)** and **Carousel 3 (documentary)** have **no dedicated homepage component** on `/` today — content is **staged** in `_data/imili/homepage.ts` until [feat-0001](../feat-0001/TECH.md) section components ship.
3. **Slides 3–4**, **slide 1 image**, **documentary embed URL**, **social URLs**, **phone**, and **physical address** are **TBD** until product supplies them — do not invent.
4. **Latest Updates snippets** are not in the product brief — use [header-nav subtext](#carousel-5--latest-updates) as interim one-liners (already authored in repo from the same URLs) until copy is pulled from articles.
5. **Raster images** for news cards and slides must use paths that exist under `public/` today, or new files product adds to `public/` — do not reference missing `/brand/updates/*.jpg` paths from [feat-0001 TECH](../feat-0001/TECH.md) until files exist.

---

## Problem

| Today | Gap |
| ----- | --- |
| `bento-hero.ts`, `services.ts`, `article-cards.ts` ship **reference / placeholder** strings | Homepage does not reflect IMILI institute copy |
| `articleCardHomepageItems` has **3 of 5** URLs; titles/snippets are `TBD` | Carousel 5 incomplete |
| `servicesReferenceContent` is freight/logistics placeholder | Carousel 4 wrong domain |
| `siteConfig.links` social + `contact.telephone` / `address` empty | Footer social hidden; contact incomplete |
| `_data/imili/homepage.ts` **does not exist** | Carousel 1–3 normative content not centralized |

**Goal:** Single source of truth for IMILI homepage copy in `_data/`; wire existing sections to **homepage exports** where components already exist.

---

## Hard boundary — do not edit components

| Allowed | Not allowed |
| ------- | ----------- |
| `_data/**/*.ts`, `_data/site-config.tsx` | `components/**/*` |
| `app/page.tsx` — import/swap content exports and `AboutUs` string props only | `app/layout.tsx`, `app/globals.css` |
| Add raster files under `public/` (product-supplied) | New React components, props, or layout changes |
| `public/brand/new-frontiers-banner-finale.png` when file supplied | Changing `ServiceCard`, `ArticleCard`, carousel markup |

**Out of scope for this spec:** `TestimonialsCarousel`, `MissionSection`, `BentoHeroSection` geometry, dark-shell migration, hero slider component, documentary embed component.

---

## Homepage carousel map (current site)

| Carousel | Product section | Current component on `/` | Data file (this spec) |
| -------- | --------------- | ------------------------ | --------------------- |
| 1 — Hero slider | 4 slides | `BentoHeroSection` (interim; not a slider) | `_data/imili/homepage.ts` → `heroSlides` (**staged**) |
| 2 — About IMILI | Observatory intro | `AboutUs` props in `app/page.tsx` | `homepage.ts` → `about` + page props |
| 3 — Documentary | Embedded video | **Not on homepage** | `homepage.ts` → `documentary` (**staged**) |
| 4 — What We Do | 4 linked boxes | `ServicesCarousel` | `_data/imili/services.ts` → `servicesHomepageContent` |
| 5 — Latest Updates | 5 external links | `ArticleCardGrid` | `_data/imili/article-cards.ts` → `articleCardGridHomepageContent` |
| 6 — Footer | Social, contact, nav | `ImiliFooter` via `footer.tsx` | `_data/site-config.tsx` + `_data/imili/footer.ts` (already reads config) |

---

## Normative content (product brief)

### Carousel 1 — Hero slider

| Slide | Title | Body / caption | Image asset |
| ----- | ----- | -------------- | ----------- |
| 1 | **IMILI Launch** | — (image-led slide) | **TBD** — launch creative; interim: `IMILI_IMAGES.bgHero` (`/new/bg-hero.png`) until product asset added |
| 2 | **New Frontiers Event** | Pioneering knowledge on the pivotal role of MIL in navigating the evolving digital landscape and raising awareness towards innovative MIL initiatives | `New Frontiers Banner (Finale).png` → place at **`/public/brand/new-frontiers-banner-finale.png`** |
| 3 | **TBD** | — | — |
| 4 | **TBD** | — | — |

**Data rule:** Only include slides 1–2 in `heroSlides` until slides 3–4 copy and assets exist. Do not fabricate slide 3–4.

### Carousel 2 — About the International Media and Information Literacy Institute

| Field | Copy |
| ----- | ---- |
| **Heading** | About the International Media and Information Literacy Institute |
| **Body** | First international observatory dedicated to media and information literacy. The International Institute supports countries in monitoring progress, generating research, strengthening public–private partnerships, and advancing media and information literacy policies that promote informed, resilient and peaceful societies. |
| **Image** | `IMILI_IMAGES.mission` (`/new/mision.png`, alt: IMILI observatory) — already on homepage |

### Carousel 3 — IMILI Documentary

| Field | Copy / value |
| ----- | ------------ |
| **Heading** | IMILI Documentary |
| **Media label** | Online Version - IMILI Documentary |
| **embedUrl** | **TBD** — product supplies YouTube/Vimeo/embed URL |
| **posterSrc** (optional) | `IMILI_IMAGES.humans` until documentary poster added |

### Carousel 4 — What We Do

Section heading: **What We Do**. Each box links to the **What We Do** menu (anchors from [`header-nav.ts`](../../_data/imili/header-nav.ts)).

| Box | Title (from nav label) | Body (normative) | `href` |
| --- | ---------------------- | ---------------- | ------ |
| 1 | Research & analysis | Advance media and information literacy knowledge through evidence-based research and analysis of media and information literacy for peace, justice, and sustainable development. | `/what-we-do#research` |
| 2 | MIL clearinghouse | Act as a clearinghouse on MIL best practices while contributing to stimulating the development of sustainable international, regional, and national media and information policies and strategies. | `/what-we-do#clearinghouse` |
| 3 | Global development agenda | Influence media and information literacy in global development agenda, fostering open and transparent dialogue on MIL to achieve the Sustainable Development Goals (SDGs) and implement the Pact for the Future. | `/what-we-do#global-agenda` |
| 4 | Convening & networking | Leverage convening and networking power globally for South-South and North-South cooperation on research, capacity enhancement, and advance consensus for integrating media and information literacy and digital competencies in educational planning, management, curriculum development and teacher trainings. | `/what-we-do#convening` |

**Component note (read-only):** `ServicesCarousel` with **4 items** uses horizontal scroll (existing behavior when `items.length > 3`). No component change required.

### Carousel 5 — Latest Updates

Connects to **News and Stories** and/or **Publications**. Each item: image + title + snippet + external link.

| # | URL | Title (interim — from `header-nav`) | Snippet (interim — nav `description`) |
| - | --- | ----------------------------------- | ------------------------------------- |
| 1 | https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja | UNESCO Abuja launch | Launched under UNESCO auspices |
| 2 | https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/ | Arise TV story | First media literacy institute |
| 3 | https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/ | FMINO unveiling | Official IMILI government launch |
| 4 | https://www.tvcnews.tv/fg-describes-launch-of-media-literacy-institute-as-milestone-in-fight-against-misinformation/ | TVC News story | Milestone against public misinformation |
| 5 | https://www.unesco.org/en/articles/towards-african-media-and-information-literacy-policy-framework | African MIL policy | Towards regional policy framework |

**Section chrome (feat-0001):**

| Field | Value |
| ----- | ----- |
| `badgeLabel` | Latest Updates |
| `heading` | Latest Updates |
| `description` | Coverage and publications on IMILI and media and information literacy. |
| `date` (per card) | **TBD** — do not invent publication dates |
| `category` | News |
| `imageSrc` | Rotate `IMILI_IMAGES` (`mission`, `vision`, `bgHero`, `humans`) — paths must exist in `public/` |

**Link behavior:** `href` as above; treat as external (`target="_blank"`, `rel="noopener noreferrer"`) — already supported when `href` starts with `http`.

### Carousel 6 — Footer

| Block | Source | Content |
| ----- | ------ | ------- |
| **Social** | `siteConfig.links` | IMILI social media URLs — **TBD** per platform until product supplies |
| **Contact email** | `siteConfig.contact.email` | `info@imili.org` (confirm with product) |
| **Contact phone** | `siteConfig.contact.telephone` | **TBD** |
| **Contact address** | `siteConfig.contact.address` | **TBD** — add to `FooterContactLine` model only when `footer.ts` extended; v1 email + phone via existing `buildContactLines()` |
| **Nav repeat** | `headerNavItems` | Already mapped in `footerHomepageContent` Pages column |
| **Tagline** | `siteConfig.tagline` | First international observatory dedicated to media and information literacy. |
| **Newsletter** | `footerHomepageContent` | Heading remains **TBD** until product copy |

---

## Public folder — allowed image paths (repo scan 2026-06-10)

Use only these until product adds assets:

| Path | Use |
| ---- | --- |
| `/new/bg-hero.png` | Slide 1 interim, news card |
| `/new/mision.png` | About image, news card |
| `/new/vision.png` | News card, service illustration |
| `/new/humans.png` | News card, documentary poster interim |
| `/new/corps.png` | Optional service illustration |
| `/blocks/imli.png` | Optional branding |
| `/brand/new-frontiers-banner-finale.png` | Slide 2 — **add file when supplied** |
| `/services/icon-freight.svg` | Service card icon (reuse existing SVG set) |
| `/services/icon-route.svg` | Service card icon |
| `/services/icon-fleet.svg` | Service card icon |
| `/services/art-truck.svg` | Service card illustration (decorative) |

---

## Acceptance criteria

- [ ] No files under `components/` changed
- [ ] `_data/imili/homepage.ts` exists with Carousel 1–3 normative content (TBD fields marked, not invented)
- [ ] `servicesHomepageContent` has **4** What We Do boxes with normative body copy and correct `href`s
- [ ] `articleCardGridHomepageContent` has **5** items with correct URLs; no `TBD` titles on shipped homepage
- [ ] `app/page.tsx` uses homepage exports for Services + Article grid (not `*ReferenceContent`)
- [ ] About copy in `app/page.tsx` matches Carousel 2 normative strings
- [ ] `siteConfig` updated where product values are known; unknown social/phone/address left `""`
- [ ] All `imageSrc` / `illustrationSrc` resolve under `public/` (no 404)
- [ ] `npm run build` passes

---

## Open questions (product)

| # | Question |
| - | -------- |
| 1 | Slide 1 launch creative path? |
| 2 | Slides 3–4 title, copy, and assets? |
| 3 | Documentary embed URL (`Online Version - IMILI Documentary`)? |
| 4 | IMILI social profile URLs (Twitter/X, LinkedIn, Facebook, Instagram, YouTube)? |
| 5 | Official phone and physical address for footer? |
| 6 | Publication dates for Latest Updates cards? |
| 7 | Replace interim nav-derived snippets with article-lede copy? |
