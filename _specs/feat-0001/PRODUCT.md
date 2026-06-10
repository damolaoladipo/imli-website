# feat-0001: IMILI website — identity, homepage, dark-only shell

## Summary

Establish **IMILI** (International Media and Information Literacy Institute) as the canonical project and marketing-site identity, ship the **homepage** as six ordered sections (hero slider, about, documentary, what we do, latest updates, footer), and lock the public site to a **dark-only** visual shell.

**App:** root Next.js site (`imil-institute` package). **Domain (target):** product-approved IMILI domain (TBD).

**Normative decisions:** [Identity](#d1--project-identity), [Homepage stack](#d6--homepage-stack), [Carousel content](#homepage-content-normative), [Dark-only policy](#d2--dark-only-policy), [Shell tokens](#d3--marketing-dark-tokens), [Reference adaptation](#d4--light-reference-adaptation), [Rebrand scope](#d5--rebrand-touchpoints-v1).

**Recommendations:** [R1 Display name](#r1--display-name), [R2 Logo & OG](#r2--logo--og-assets), [R3 Downstream specs](#r3--downstream-specs).

---

## Problem

| Today | Gap |
| ----- | --- |
| Package and site config still use **AssureUs Club** / `assureus-club` | No single source of truth for **IMILI** branding |
| Homepage is legacy AssureUs blocks (hero, impact, partners) | No IMILI homepage: slider, about, documentary, what we do, news |
| `:root` light tokens are default; `.dark` is optional | Marketing pages mix light bands, `dark:` pairs, and ad-hoc colors |
| feat-0012 and future specs reference a dark policy that **does not exist** | Need a normative parent spec before shipping new homepage sections |

**Goal:** One IMILI-branded homepage on a dark-only shell that downstream features can extend without re-deciding theme, naming, or section order.

---

## Design reference (marketing shell)

The public site is a **near-black canvas** with **white primary text** and **zinc secondary text**. Section geometry may follow light reference screenshots; **color values below are normative** for QA.

### ASCII shell (@ desktop ~1440px)

```text
┌ html.dark ───────────────────────────────────────────────────────────────┐
│  <body class="bg-background text-foreground">                            │
│                                                                          │
│  ┌ header (sticky) ─────────────────────────────────────────────────┐  │
│  │ logo · nav · CTA          bg-background/80 backdrop-blur           │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌ main sections ────────────────────────────────────────────────────┐  │
│  │  bg-background (#0a0a0a) or subtle border-y border-white/5       │  │
│  │  headlines: text-white                                             │  │
│  │  body / subtext: text-zinc-400                                     │  │
│  │  chips / pills: bg-[#262626] text-zinc-300                         │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌ footer ───────────────────────────────────────────────────────────┐  │
│  │  bg-background · muted links text-zinc-400                        │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### ASCII homepage stack (@ desktop ~1440px)

```text
┌ IMILI Home Page ─────────────────────────────────────────────────────────┐
│  [Header — nav menus]                                                    │
├──────────────────────────────────────────────────────────────────────────┤
│  Carousel 1 — Hero slider (4 slides; slides 3–4 TBD)                     │
├──────────────────────────────────────────────────────────────────────────┤
│  Carousel 2 — About IMILI (observatory intro paragraph)                    │
├──────────────────────────────────────────────────────────────────────────┤
│  Carousel 3 — IMILI Documentary (embedded video)                         │
├──────────────────────────────────────────────────────────────────────────┤
│  Carousel 4 — What We Do (4 linked boxes → What We Do menu)              │
├──────────────────────────────────────────────────────────────────────────┤
│  Carousel 5 — Latest Updates (image + snippets → News / Publications)    │
├──────────────────────────────────────────────────────────────────────────┤
│  Carousel 6 — Footer (social, contact, header menus repeated)            │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Homepage content (normative)

Product-authored copy and links below are **normative for v1** unless marked TBD.

### Carousel 1 — Hero slider

| Slide | Title / theme | Content | Asset |
| ----- | ------------- | ------- | ----- |
| 1 | **IMILI Launch** | Launch announcement slide | TBD — launch creative |
| 2 | **New Frontiers Event** | Pioneering knowledge on the pivotal role of MIL in navigating the evolving digital landscape and raising awareness towards innovative MIL initiatives | `New Frontiers Banner (Finale).png` |
| 3 | **TBD** | — | — |
| 4 | **TBD** | — | — |

**Behavior:** Auto-advance carousel with manual prev/next and dot indicators. Each slide may be image-only or image + optional caption overlay. Slides 3–4 ship when product supplies copy and assets.

### Carousel 2 — About IMILI

| Field | Copy |
| ----- | ---- |
| **Heading** | About the International Media and Information Literacy Institute |
| **Body** | First international observatory dedicated to media and information literacy. The International Institute supports countries in monitoring progress, generating research, strengthening public–private partnerships, and advancing media and information literacy policies that promote informed, resilient and peaceful societies. |

### Carousel 3 — IMILI Documentary

| Field | Detail |
| ----- | ------ |
| **Heading** | IMILI Documentary (or product-approved section title) |
| **Media** | Embed **Online Version - IMILI Documentary** video |
| **Behavior** | Responsive embed (16:9); poster frame optional; no autoplay with sound |

### Carousel 4 — What We Do

Section heading: **What We Do**. Each box is a **link** to the **What We Do** menu / landing (route TBD, e.g. `/what-we-do` with anchor or child page).

| Box | Copy |
| --- | ---- |
| 1 | Advance media and information literacy knowledge through evidence-based research and analysis of media and information literacy for peace, justice, and sustainable development. |
| 2 | Act as a clearinghouse on MIL best practices while contributing to stimulating the development of sustainable international, regional, and national media and information policies and strategies. |
| 3 | Influence media and information literacy in global development agenda, fostering open and transparent dialogue on MIL to achieve the Sustainable Development Goals (SDGs) and implement the Pact for the Future. |
| 4 | Leverage convening and networking power globally for South-South and North-South cooperation on research, capacity enhancement, and advance consensus for integrating media and information literacy and digital competencies in educational planning, management, curriculum development and teacher trainings. |

### Carousel 5 — Latest Updates

Section connects to **News and Stories** and/or **Publications**. Each item: **thumbnail image + headline snippet + link** (external or internal).

| # | URL | Snippet (derive from article or TBD) |
| - | --- | ------------------------------------- |
| 1 | https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja | TBD — UNESCO Abuja launch |
| 2 | https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/ | TBD — Arise TV coverage |
| 3 | https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/ | TBD — FMINO official launch |
| 4 | https://www.tvcnews.tv/fg-describes-launch-of-media-literacy-institute-as-milestone-in-fight-against-misinformation/ | TBD — TVC News |
| 5 | https://www.unesco.org/en/articles/towards-african-media-and-information-literacy-policy-framework | TBD — African MIL policy framework |

**v1:** Minimum **3** cards visible on desktop; all **5** URLs in data file. Open external links in new tab with `rel="noopener noreferrer"`.

### Carousel 6 — Footer

| Block | Content |
| ----- | ------- |
| **Social** | IMILI social media links (from `siteConfig.links`) |
| **Contact** | IMILI contact email, phone, and physical address |
| **Nav repeat** | Header menus repeated in footer column(s) |

---

## Design reference (tokens @ 1440px viewport)

Values **normative for all marketing pages** unless a child spec documents an explicit [feat-0001 exception](#d2--dark-only-policy).

### Page shell

| Token | Value | Tailwind / CSS |
| ----- | ----- | -------------- |
| `html` class | **`dark`** always | `className="dark"` on `<html>` |
| Page background | **#0a0a0a** near-black | `bg-background` mapped to `--background` |
| Default text | **#fafafa** | `text-foreground` / `text-white` on marketing H1–H3 |
| Max content width | **1280px** | `container mx-auto max-w-7xl px-4 md:px-6` |
| Section separator (optional) | 1px white @ 5% | `border-y border-white/5` |

### Typography colors

| Role | Hex (normative) | Tailwind |
| ---- | --------------- | -------- |
| Primary headline | `#ffffff` | `text-white` |
| Secondary / subtext | `#a1a1aa` | `text-zinc-400` |
| Tertiary / caption | `#71717a` | `text-zinc-500` |
| Link default | `#d4d4d8` | `text-zinc-300` |
| Link hover | `#ffffff` | `hover:text-white` |

### Surfaces & chips

| Role | Hex (normative) | Tailwind |
| ---- | --------------- | -------- |
| Elevated surface / card | `#171717` | `bg-[#171717]` or `bg-card` |
| Pill / tag background | `#262626` | `bg-[#262626]` |
| Pill / tag text | `#d4d4d8` | `text-zinc-300` |
| Input / field bg | white @ 15% | `bg-white/15` or `dark:bg-input/30` |
| Border subtle | white @ 10% | `border-white/10` |

### Brand accents (from existing palette)

| Token | Hex | Usage |
| ----- | --- | ----- |
| Primary green | `#03A904` | CTAs, active nav, brand moments |
| Accent gold | `#FBAF4B` | Highlights, badges |
| Deep neutral | `#251F1E` | Optional hero overlays |
| Accent rose | `#BD3E51` | Alerts, emphasis (sparingly) |

Map to CSS variables in `app/globals.css`; do not hardcode hex in new components when a semantic token exists.

---

## Design decisions

### D1 — Project identity

| | Detail |
| --- | ------ |
| **Decision** | Canonical slug and package name: **`imil-institute`**. |
| **Acronym** | **IMILI** in UI chrome (header, footer, `<title>`, homepage). |
| **Full name** | **International Media and Information Literacy Institute** — use on first mention and About section. |
| **Replaces** | `assureus-club`, **AssureUs Club**, and legacy **Troott** strings in specs and `_data/`. |
| **Why** | UNESCO-aligned institute site; single brand for marketing and downstream specs. |
| **Not in v1** | Mobile app rename, backend service names, production DNS cutover |

### D6 — Homepage stack

| | Detail |
| --- | ------ |
| **Decision** | Replace `app/page.tsx` legacy blocks with **six sections** in fixed order per [Homepage content](#homepage-content-normative). |
| **Remove from homepage v1** | `Hero`, `Background`, `Impact`, `Partners`, legacy `AboutUs`, `CallToAction` (AssureUs-era) |
| **Section IDs** | `hero-slider`, `about-imili`, `documentary`, `what-we-do`, `latest-updates` (+ layout footer) |
| **Why** | Product homepage brief is the source of truth for IMILI launch site. |
| **Not in v1** | CMS admin; slide 3–4 until assets supplied |

### D2 — Dark-only policy

| | Detail |
| --- | ------ |
| **Decision** | Marketing site ships **dark mode only** for v1. |
| **Enforcement** | `<html lang="en" class="dark">` — no `prefers-color-scheme` toggle, no theme switcher. |
| **Reject** | Light-gray marketing bands (`#f5f5f5`, `bg-gray-50`) on public pages without a documented exception. |
| **Reject** | Paired `dark:hidden` / `hidden dark:block` image swaps on marketing sections — one dark asset set only. |
| **Exception process** | Child spec adds an **feat-0001 exception** subsection with rationale and expiry; default is dark tokens above. |

### D3 — Marketing dark tokens

Normative tables: [Page shell](#page-shell), [Typography](#typography-colors), [Surfaces](#surfaces--chips).

All new sections use `bg-background` or transparent-on-background; never ship a contrasting light section band.

### D4 — Light reference adaptation

External design references (e.g. light screenshots in [feat-0012](../feat-0012/assets/centered-story-headline-reference.png)) are **layout-only**.

| Reference (light) | IMILI v1 |
| ----------------- | -------- |
| Band `#f5f5f5` / off-white | `bg-background` or `border-y border-white/5` |
| Headline `#171717` | `text-white` |
| Subtext `#737373` | `text-zinc-400` |
| Pill bg `#e5e5e5` | `bg-[#262626]` |
| Pill text `#404040` | `text-zinc-300` |

**Do not** ship literal light bands on IMILI marketing pages without an explicit [D2](#d2--dark-only-policy) exception.

### D5 — Rebrand touchpoints (v1)

| Surface | Change |
| ------- | ------ |
| `package.json` `name` | `imil-institute` |
| `_data/site-config.tsx` | IMILI name, title, url, social, contact email / phone / address |
| `app/layout.tsx` metadata | title + description from `siteConfig` |
| `app/page.tsx` | Six-carousel IMILI homepage per [D6](#d6--homepage-stack) |
| Header / footer copy | **IMILI** |
| `public/brand/` | IMILI logo, slider assets, documentary poster |
| `_data/imili/homepage.ts` | Normative homepage content (see [TECH](./TECH.md#data-model)) |

**Out of v1 rebrand:** every historical page (`/faq`, `/auc-campaign`, etc.) — homepage + shared chrome only unless trivial.

---

## Recommendations

### R1 — Display name

| Context | Suggested value |
| ------- | --------------- |
| `<title>` | IMILI — International Media and Information Literacy Institute |
| Homepage `description` | First international observatory dedicated to media and information literacy. |
| Header logo alt | IMILI logo |
| Footer legal | © {year} International Media and Information Literacy Institute (IMILI) |
| OG / social | `IMILI` |

### R2 — Logo & OG assets

| | Recommendation |
| --- | -------------- |
| **Logo** | `public/brand/imili-logo.svg` |
| **Slider slide 2** | `public/brand/new-frontiers-banner-finale.png` (from `New Frontiers Banner (Finale).png`) |
| **Documentary** | Embed URL or file for `Online Version - IMILI Documentary` |
| **OG** | `public/brand/og-image.png` — dark background, IMILI mark |
| **Favicon** | `app/icon.png` or `public/favicon.ico` updated to match |

Until brand assets exist, use placeholders with correct `alt` and config strings.

### R3 — Downstream specs

Child specs **must** link here for theme and naming:

- [feat-0012](../feat-0012/PRODUCT.md) — centered story section; dark adaptation per [D4](#d4--light-reference-adaptation)

Update `_specs/README.md` when created to list feat-0001 as the foundation spec.

---

## Acceptance criteria

### Identity

- [ ] `package.json` name is `imil-institute`
- [ ] `siteConfig.name` is **IMILI** (full name available in config)
- [ ] Header and footer show **IMILI** (not AssureUs Club)

### Homepage (six sections)

- [ ] Carousel 1: slides 1–2 per [content table](#carousel-1--hero-slider); slides 3–4 hidden or placeholder until TBD filled
- [ ] Carousel 2: About heading + body copy exact match
- [ ] Carousel 3: Documentary video embeds and plays (muted autoplay off)
- [ ] Carousel 4: Four What We Do boxes link to What We Do destination
- [ ] Carousel 5: All five news URLs with image + snippet; links to News/Stories or Publications where applicable
- [ ] Carousel 6: Social links, contact email/phone/address, header nav repeated

### Dark-only shell

- [ ] `<html>` has `class="dark"` on every marketing route
- [ ] No theme toggle in header or footer
- [ ] `bg-background` resolves to near-black (`#0a0a0a` or equivalent)
- [ ] No light-gray full-width section bands on homepage
- [ ] Marketing headlines use `text-white`; subtext uses `text-zinc-400`

### Build

- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes

### Visual QA @ 1440px

- [ ] Page reads as cohesive dark shell (header, main, footer)
- [ ] Primary green CTA visible against dark background
- [ ] Contrast: white on `#0a0a0a` meets WCAG AA for body text sizes used

---

## Out of scope (v1)

- Hero slider slides 3–4 (until product supplies copy and assets)
- Automated news snippet fetching (manual snippets in data file v1)
- Light theme or system-preference theme switching
- Full-site copy audit of every route
- Mobile app / API package renames
- Production DNS and email migration
- CMS or i18n for brand strings

---

## References

- Token source: `app/globals.css`
- Site config: `_data/site-config.tsx`
- Downstream example: [feat-0012 PRODUCT](../feat-0012/PRODUCT.md)
