# feat-0031: Stock images — Unsplash sourcing for all raster placements

## Summary

Replace placeholder and recycled raster assets with **curated Unsplash stock photography** mapped to every **in-scope** image slot on the IMILI marketing site.

| Deliverable | Purpose |
| ----------- | ------- |
| `_data/imili/images.ts` | Canonical registry — four core IMILI images + metadata |
| `public/stock/` | Downloaded, optimized JPEG/WebP files (committed to repo) |
| `_data/imili/image-attributions.ts` | Photographer name + Unsplash URL per file (site footer or credits page optional in v2) |
| Per-content heroes | Unique heroes where editorial context demands it (news, gallery) |

**Target repo:** `imil-institute` (this project).

**Out of scope:** SVG logos (`public/blocks/*`, UNESCO mark), service carousel line art (`public/services/*`), favicon, legacy `components/blocks/*` not wired in `app/layout.tsx` or `app/page.tsx`.

**Agent skills:** [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md), [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md), [documentation-and-adrs](../../.agents/skills/documentation-and-adrs/SKILL.md).

---

## Assumptions (confirm or correct before implement)

1. **Unsplash License** applies — free use including commercial; [license](https://unsplash.com/license). Store photographer credit in `image-attributions.ts`; visible credits page is **optional v1**.
2. **Prefer African / global-south context** where subjects are people or civic settings (Nigeria, West Africa, multicultural education) — not mandatory for abstract/editorial shots.
3. **No hotlinking** Unsplash CDN URLs in production — download, optimize, commit under `public/stock/`.
4. **v1 keeps four core slots** in `IMILI_IMAGES`; consumers that today cycle the same four files keep doing so until product requests unique art per card.
5. **Real IMILI event photography** replaces Unsplash for launch/news heroes when comms team supplies files — until then, stock “conference / government / media” imagery is acceptable interim.
6. **Gallery route** (`/gallery`) ships with a minimum **12-image** grid in v1 if page exists; otherwise defer gallery batch to v1.1.

---

## Problem

| Today | Gap |
| ----- | --- |
| `public/new/*.png` referenced in data but often missing from repo | Broken or placeholder heroes in dev |
| Same four images reused across news, testimonials, mega-menu, bento | Visually repetitive; weak editorial fit |
| `/blocks/hero.jpeg` is single lobby shot | Background + photo heroes share one unoptimized file |
| Testimonial avatars use landscape scene photos | Wrong aspect and subject for portrait circles |
| No attribution registry | Compliance and comms review friction |

**Goal:** Every active surface has an intentional image (or explicit reuse rule), sourced from Unsplash with documented search terms and file paths.

---

## Unsplash workflow (normative)

### 1. Search

Use [unsplash.com](https://unsplash.com) (or Unsplash API for batch). Prefer filters: **Orientation** matching slot aspect, **Relevance**, diverse subjects.

### 2. Select

Reject: watermarks, heavy brand logos, violence, partisan political rallies, misleading “news” staging that implies a specific real event IMILI did not host.

### 3. Download

- Use Unsplash **Download** (tracks photographer; required for API compliance if using API).
- Target width: **2400 px** on long edge for heroes; **1200 px** for cards/thumbnails.

### 4. Optimize

```bash
# Example — adjust quality per file
npx sharp-cli -i ./raw/hero.jpg -o ./public/stock/bg-hero.jpg resize 2400 1350 --fit cover --jpegQuality 82
```

### 5. Register

1. Copy to `public/stock/<slot-id>.jpg`
2. Add entry to `_data/imili/image-attributions.ts`
3. Point `IMILI_IMAGES` or content file `src` at `/stock/<slot-id>.jpg`
4. Update `alt` text to describe **image content**, not marketing slogan

---

## Core image registry (`IMILI_IMAGES`)

These four slots are the **single source of truth** for most of the site.

| Slot ID | File (v1) | Subject & mood | Unsplash search terms (try in order) | Typical aspect | Primary consumers |
| ------- | ----------- | -------------- | ------------------------------------ | -------------- | ----------------- |
| `bgHero` | `bg-hero.jpg` | Wide civic / conference / city education summit | `africa conference`, `university auditorium`, `panel discussion audience`, `abuja skyline` | 16:9 | Bento `manPhoto`, FMINO article card, Activities mega-menu, Resources mega-menu, testimonial avatar (interim) |
| `humans` | `humans.jpg` | Diverse group learning / workshop | `africa workshop`, `students group discussion`, `community meeting africa`, `media literacy classroom` | 4:3 or 3:2 | Bento `womanPhoto`, TVC news hero, article cards, testimonial avatars, media mention |
| `mission` | `mission.jpg` | Research, library, observatory, institute work | `research library`, `african students studying`, `journalist newsroom`, `education technology africa` | 4:3 | About section, About Us mega-menu, bento `classroomPhoto`, UNESCO article card, Resources mega-menu |
| `vision` | `vision.jpg` | Future-forward literacy, digital citizenship, global cooperation | `digital literacy`, `global connection`, `youth smartphone africa`, `sustainable development education` | 4:3 | About Us mega-menu, What We Do mega-menu, Arise TV card, featured testimonial photo, policy article card |

**Alt text examples (replace after shoot selection):**

| Slot | Example alt |
| ---- | ----------- |
| `bgHero` | Audience seated at an international education conference |
| `humans` | Participants collaborating in a media literacy workshop |
| `mission` | Students and researchers reviewing materials in a library setting |
| `vision` | Young adults engaging with digital media in a learning environment |

---

## Additional slots (beyond `IMILI_IMAGES`)

| Slot ID | File (v1) | Subject | Unsplash search terms | Aspect | Consumer |
| ------- | --------- | ------- | --------------------- | ------ | -------- |
| `hero-lobby` | `hero-lobby.jpg` | Modern institute lobby / signage wall (no fake IMILI logo) | `modern university lobby`, `institute entrance`, `conference center interior` | 3:4 portrait or 16:9 | `photo-hero.ts`, `background-photo-hero.ts` (`/blocks/hero.jpeg` replacement) |
| `og-default` | `og-default.jpg` | Brand-safe wide shot (subset of `bgHero` or dedicated) | same as `bgHero` | 1200×630 crop | `site-config.tsx` `ogImage` |
| `news-tvc-launch` | `news-tvc-launch.jpg` | Government / media launch podium (generic) | `press conference africa`, `minister speech podium`, `media launch event` | 16:9 | `news/content/fg-describes-imili-launch-*.mdx` `heroImage` |
| `gallery-01` … `gallery-12` | `gallery-01.jpg` … | IMILI-themed variety: events, training, research, cartoons stills | mix: `workshop`, `africa education`, `newsroom`, `cartoon drawing class` | mixed 4:3 + 1:1 | `/gallery` page (when implemented) |

---

## Surface-by-surface inventory (in-scope)

### Homepage (`app/page.tsx`)

| # | Component / data | Field(s) | Slot or rule |
| - | ---------------- | -------- | ------------ |
| 1 | `BentoHeroSection` / `bento-hero.ts` | `womanPhoto` | `humans` |
| 2 | | `classroomPhoto` | `mission` |
| 3 | | `testimonial.avatars[0–2]` | `humans`, `mission`, `vision` (or dedicated portrait slots v1.1) |
| 4 | | `manPhoto` | `bgHero` |
| 5 | `PhotoHeroSection` / `photo-hero.ts` | `heroImage` | `hero-lobby` |
| 6 | `BackgroundPhotoHeroSection` / `background-photo-hero.ts` | `backgroundImage` | `hero-lobby` (same file; crop differs in CSS) |
| 7 | `AboutUs` / `homepage.ts` | `imageSrc` | `mission` |
| 8 | `DocumentarySection` | YouTube embed | **No Unsplash** — video only |
| 9 | `ServicesCarousel` / `services.ts` | `illustrationSrc` | **Out of scope** — SVG line art until IMILI service copy ships |
| 10 | `ArticleCardGrid` / `article-cards.ts` | 5× `imageSrc` | v1: map per table below; v1.1: unique file per article |
| 11 | `TestimonialsCarousel` / `testimonials.ts` | `avatarSrc` / `photoSrc` | v1.1: `testimonial-portrait-01` … `06`; v1 interim: core four |

**Homepage article card mapping (v1):**

| Card `id` | Recommended slot | Optional unique Unsplash file |
| --------- | ---------------- | ----------------------------- |
| `unesco-abuja` | `mission` | `news-unesco-abuja.jpg` |
| `arise-tv` | `vision` | `news-arise-tv.jpg` |
| `fmino` | `bgHero` | `news-fmino-launch.jpg` |
| `tvc-news` | `humans` | `news-tvc-launch` |
| `unesco-policy` | `vision` | `news-unesco-policy.jpg` |

### Header mega-menu (`header-nav.ts` → `HeaderMegaMenuPanel`)

Each dropdown requires **exactly two** images (`HeaderNavDropdown.images`).

| Nav item | Image 1 | Image 2 |
| -------- | ------- | ------- |
| About Us | `mission` | `vision` |
| What We Do | `humans` | `vision` |
| Activities | `humans` | `bgHero` |
| Resources | `mission` | `bgHero` |

**Optional v1.1:** dedicated mega-menu pairs (`mega-about-1.jpg`, `mega-about-2.jpg`, …) if marketing wants unique pairs per menu.

### News

| # | File | Field | Slot |
| - | ---- | ----- | ---- |
| 1 | `news/content/*.mdx` | `heroImage` | Per-article; launch article → `news-tvc-launch` |
| 2 | `NewsIndexSection` | `heroImage` from frontmatter | same |
| 3 | `media-mentions.ts` | 4× `imageSrc` | v1: core four; v1.1: `mention-01` … `mention-04` |

### Site metadata

| # | File | Field | Slot |
| - | ---- | ----- | ---- |
| 1 | `site-config.tsx` | `ogImage` | `og-default` (1200×630) |

### Testimonials (portrait-quality requirement)

| Variant | Field | v1 interim | v1.1 target |
| ------- | ----- | ---------- | ----------- |
| `standard` | `avatarSrc` | crop-friendly square from `humans` / `mission` | `testimonial-portrait-01` … `05` — Unsplash: `professional portrait africa`, `headshot journalist`, `african woman professional` |
| `featured` | `photoSrc` | `vision` | `testimonial-featured-01` — Unsplash: `journalist interview`, `woman reporter` |

### Gallery (`/gallery`)

When route ships: **12 images** minimum, themes aligned to Activities (events, training, research, community). Filename pattern `gallery-NN.jpg`. Search batch: `education event africa`, `training workshop`, `media literacy`, `university campus africa`.

---

## Reuse rules (normative)

1. **Never** reference `/new/*.png` in new code — migrate to `/stock/*`.
2. **Mega-menu** images must exist in repo before dropdown QA.
3. **Same file** may serve photo hero + background hero (`hero-lobby`).
4. **Do not** use unrelated stock (freight trucks, logistics) — current `services.ts` art is placeholder from another brand.
5. **MDX / news** heroes must have `heroImageAlt` describing the photograph.

---

## Acceptance criteria

### Assets

- [ ] All files in [Core registry](#core-image-registry-imili_images) exist under `public/stock/` and load in dev
- [ ] `hero-lobby` replaces `/blocks/hero.jpeg` references in hero data files
- [ ] `news-tvc-launch` wired to launch article MDX
- [ ] `image-attributions.ts` lists every committed stock file with photographer + Unsplash page URL

### Visual QA @ 1440px

- [ ] Homepage heroes (bento, photo, background) show crisp images — no 404 broken icons
- [ ] Mega-menu panels show two images per dropdown
- [ ] Article cards and news index show distinct-feeling thumbs (v1 reuse acceptable if subjects differ in crop)
- [ ] Testimonial avatars are recognizable faces at 40–48 px circle (v1.1 for dedicated portraits)

### Build

- [ ] `npm run build` passes with `next/image` local paths only
- [ ] No external Unsplash hotlinks in `src` attributes

---

## Open questions

| # | Question | Default if unanswered |
| - | -------- | --------------------- |
| 1 | Public `/credits` page for photographers? | Attribution file only; no public page in v1 |
| 2 | Unique image per homepage news card in v1? | Reuse core four |
| 3 | Replace services carousel SVGs with Unsplash? | No — wait for IMILI service copy |
| 4 | WebP + JPEG dual format? | JPEG only in v1; WebP optional v1.1 |
