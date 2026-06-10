# feat-0017: Site footer — cream layout (brand + newsletter + link columns + bottom bar)

## Summary

Replace the current dark footer with a **new cream footer** matching the user reference: top row (brand + socials | newsletter form), three link columns, and bottom bar (copyright, meta links, scroll-to-top).

**Design reference:** `./assets/footer-reference.png` — **1024×417 px** capture; scale geometry to **1440px** QA viewport using [scale rule](#scale-rule-1024--1440).

**App:** root Next.js site (`imil-institute` package). Wired via `app/layout.tsx` (global footer).

**Parent spec:** [feat-0001 Carousel 6 — Footer](../feat-0001/PRODUCT.md#carousel-6--footer) (social, contact, nav repeat). This spec defines **pixel layout** for the new reference.

**Normative decisions:** [Scope](#d1--in-scope-from-reference-only), [Placement](#d2--placement), [Top row](#d3--top-row), [Link columns](#d4--link-columns), [Bottom bar](#d5--bottom-bar), [Colors](#d6--colors-from-reference), [Content model](#d7--content-model), [Logo assets](#d8--logo-public-folder), [Newsletter](#d9--newsletter-form), [Interaction](#d10--interaction), [Dark-shell note](#d11--feat-0001-dark-shell-conflict).

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → subcomponents → footer shell → layout swap |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | `next/image`, forms, Next.js App Router |
| [planning-and-task-breakdown](../../.agents/skills/planning-and-task-breakdown/SKILL.md) | Ordered tasks in [TECH.md](./TECH.md) |
| [security-and-hardening](../../.agents/skills/security-and-hardening/SKILL.md) | Newsletter input validation; no secrets in client |

---

## Assumptions (confirm or correct before implement)

1. Reference capture width is **1024 px**; QA target viewport is **1440 px** (scale per formula below).
2. Capture shows **one footer block** only — no content below the scroll-to-top control.
3. Reference brand is **Carevia** — strings are **layout QA only** ([reference strings](#reference-strings-layout-qa-only--do-not-ship-for-imili)).
4. Newsletter **submit backend** is not in repo — v1 is **UI + client validation only**; `action` **TBD**.
5. Typography uses project font **Montserrat** (`_data/fonts.tsx`) unless overlay QA proves a mismatch.
6. `Privacy Policy`, `Terms of Service`, `Cookies Settings`, `Style Guide`, `Changelog`, `Licensing` routes **do not exist** in app today — production hrefs **TBD** (do not invent pages).

---

## Problem

| Today | Gap |
| ----- | --- |
| `components/custom/footer.tsx` is **dark** (`bg-black`) | Reference is **cream** multi-zone footer |
| Current footer: tagline + `CustomButton` + simple nav | Reference: newsletter, 3 columns, social row, bottom meta bar |
| feat-0001 Carousel 6 lists blocks but no pixel spec | Implementers cannot match reference |

**Goal:** Pixel-aligned footer @ **1440px** against `./assets/footer-reference.png`, using only observable UI elements and real `public/` logo paths.

---

## Design reference (from `./assets/footer-reference.png`)

### Elements visible in reference (in scope)

```text
┌ footer (cream bg) ─────────────────────────────────────────────────────────┐
│  ┌ top row ──────────────────────────────────────────────────────────────┐ │
│  │ [logo+Carevia]  tagline          │  Stay Connected                    │ │
│  │ (○)(○)(○)(○)(○) socials          │  subtext                           │ │
│  │                                  │  [Enter Email…] [Subscribe]        │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│  ┌ col Pages ──┐ ┌ col Information ┐ ┌ col Contact Us ─────────────────┐ │
│  │ Home         │ │ Privacy Policy   │ │ email                          │ │
│  │ Who We Are   │ │ Terms of Service │ │ phone                          │ │
│  │ …            │ │ Cookies Settings │ │                                │ │
│  └──────────────┘ └──────────────────┘ └────────────────────────────────┘ │
│  ───────────────────────────────────────────────────────────────────────── │
│  © Carevia…          Style Guide  Changelog  Licensing            (↑)    │
└────────────────────────────────────────────────────────────────────────────┘
```

### Elements **not** in reference (out of scope — do not implement)

| Element | Reason |
| ------- | ------ |
| Site header | Not in capture |
| Physical address block | Not visible (only email + phone in Contact column) |
| Payment icons | Not visible |
| Language selector | Not visible |
| Map embed | Not visible |
| IMILI dark footer styling | Replaced by this spec |

### Reference strings (layout QA only — do not ship for IMILI)

| Role | Reference text |
| ---- | -------------- |
| Brand name | Carevia |
| Tagline | Built with care for a better future. |
| Newsletter heading | Stay Connected |
| Newsletter subtext | Get stories of impact, program updates, and ways to help — straight to your inbox. |
| Input placeholder | Enter Email Address |
| Subscribe button | Subscribe |
| Pages column | Home · Who We Are · Our Programs · Get Involved · Blog · Contact |
| Information column | Privacy Policy · Terms of Service · Cookies Settings |
| Contact email | hello@carevia.org |
| Contact phone | +123 456 7890 |
| Copyright | © Carevia. All rights reserved. |
| Bottom links | Style Guide · Changelog · Licensing |

---

## Scale rule (1024 → 1440)

Reference capture width **W_ref = 1024**. QA viewport **W_qa = 1440**.

```text
scale = W_qa / W_ref = 1.40625
px_1440 = round(px_1024 × 1.40625)
```

---

## Design decisions

### D1 — In scope (from reference only)

Ship **only** what appears in the screenshot: cream footer shell + top brand/social + newsletter + 3 link columns + divider + bottom bar + scroll-to-top.

### D2 — Placement

| Option | Detail |
| ------ | ------ |
| **Required** | Replace `FooterSection` in `app/layout.tsx` — global on all pages |
| **File** | New `ImiliFooter` (or refactor `components/custom/footer.tsx`) per [TECH.md](./TECH.md) |

### D3 — Top row

| Token | @1024 (measured) | @1440 (scaled) | Tailwind @1440 |
| ----- | ---------------- | -------------- | -------------- |
| Layout | 2 columns ~50/50 | same | `grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16` |
| Top padding | ~48 px | ~68 px | `pt-[68px]` |
| Brand row | logo icon + wordmark horizontal | same | `flex items-center gap-3` |
| Logo mark | ~40 px icon | ~56 px | `size-14` on `next/image` |
| Wordmark | ~22 px semibold brown | ~31 px | `text-[31px] font-semibold` |
| Tagline | ~14 px regular brown muted | ~20 px | `mt-2 text-[20px] text-[#6B5E57]` |
| Social row | 5 circles, ~36 px, gap ~10 px | ~50 px circles | `mt-6 flex gap-3` |
| Social circle bg | medium brown `#9A7B5B` | same | `bg-[#9A7B5B]` |
| Social icon | white, centered | | `text-white size-5` |

#### Newsletter (right column)

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Heading | ~20 px semibold `#3D2E2A` | ~28 px | `text-[28px] font-semibold text-[#3D2E2A]` |
| Subtext | ~14 px `#6B5E57` | ~20 px | `mt-2 text-[20px] leading-relaxed text-[#6B5E57]` |
| Form layout | input + button horizontal | same | `mt-5 flex flex-col gap-3 sm:flex-row sm:items-center` |
| Input | pill, border `#3D2E2A`, flex-1 | | `rounded-full border border-[#3D2E2A] px-6 py-3.5 text-[18px]` |
| Subscribe btn | pill solid `#9A7B5B`, white text | | `rounded-full bg-[#9A7B5B] px-8 py-3.5 text-[18px] font-medium text-white` |
| Heading → form gap | ~16 px | ~22 px | covered by `mt-5` |

### D4 — Link columns

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Top row → columns gap | ~40 px | ~56 px | `mt-14` |
| Layout | 3 equal columns | same | `grid grid-cols-1 gap-10 sm:grid-cols-3` |
| Column heading | ~16 px semibold `#3D2E2A` | ~22 px | `text-[22px] font-semibold text-[#3D2E2A]` |
| Link | ~15 px regular `#3D2E2A` | ~21 px | `text-[21px] text-[#3D2E2A]` |
| Link stack gap | ~12 px | ~17 px | `mt-4 space-y-4` |
| Link hover | underline or opacity | | `hover:opacity-70` (reference shows no underline on column links) |

**Column titles (reference):** Pages · Information · Contact Us

### D5 — Bottom bar

| Token | @1024 | @1440 | Tailwind @1440 |
| ----- | ----- | ----- | -------------- |
| Columns → bar gap | ~32 px | ~45 px | `mt-12` |
| Divider | 1 px `#3D2E2A` @ ~20% opacity | same | `border-t border-[#3D2E2A]/20` |
| Bar padding Y | ~20 px | ~28 px | `py-7` |
| Layout | copyright left · links center-right · scroll-top far right | | `flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between` |
| Copyright | ~13 px `#6B5E57` | ~18 px | `text-[18px] text-[#6B5E57]` |
| Bottom meta links | ~13 px underlined `#3D2E2A` | ~18 px | `text-[18px] underline text-[#3D2E2A]` |
| Meta links gap | ~24 px | ~34 px | `flex gap-8` |
| Scroll-top button | circle ~40 px `#9A7B5B`, white `ArrowUp` | ~56 px | `size-14 rounded-full bg-[#9A7B5B] text-white` |

### D6 — Colors (from reference)

| Role | Hex | Usage |
| ---- | --- | ----- |
| Footer background | `#F7F3EE` | Full footer band (cream) |
| Primary text | `#3D2E2A` | Headings, links, input border |
| Muted text | `#6B5E57` | Tagline, subtext, copyright |
| Accent brown | `#9A7B5B` | Social circles, Subscribe, scroll-top |
| Input/button text on brown | `#FFFFFF` | Subscribe label, social icons |
| Reference logo tint | light blue in capture | **IMILI:** use brand logo from `public/blocks/` — do not ship Carevia heart icon |

### D7 — Content model

```ts
// _data/imili/footer.ts

export type FooterSocialLink = {
  id: "facebook" | "twitter" | "linkedin" | "instagram" | "youtube";
  href: string;
};

export type FooterNavLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterNavLink[];
};

export type FooterContactLine = {
  type: "email" | "phone";
  value: string;
  href?: string; // mailto: or tel:
};

export type FooterContent = {
  logo: { src: string; alt: string; wordmark: string };
  tagline: string;
  social: FooterSocialLink[];
  newsletter: {
    heading: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
  };
  columns: [FooterColumn, FooterColumn, FooterColumn]; // Pages, Information, Contact
  contactLines: FooterContactLine[];
  copyright: string;
  bottomLinks: FooterNavLink[];
};
```

### D8 — Logo (`public/` folder)

| Asset | Path | Usage |
| ----- | ---- | ----- |
| IMILI wordmark (existing) | `/blocks/imli-logo.svg` | Brand row — same as `components/custom/logo.tsx` |
| IMILI icon (optional compact mark) | `/blocks/imli-icon.png` | Alternative if wordmark too wide @ footer scale |

**Rule:** Do **not** use Carevia heart-hands artwork. Use **only** files under `public/blocks/`.

### D9 — Newsletter form

| Behavior | Spec |
| -------- | ---- |
| Markup | `<form>` with `type="email"` input + submit button |
| Placeholder | From content model |
| Submit v1 | `preventDefault` + optional `console`/noop — **no API** until product wires backend |
| Validation | HTML5 `required` + `type="email"` |
| Autocomplete | `email` on input |

### D10 — Interaction

| Behavior | Spec |
| -------- | ---- |
| Nav links | `Link` / `<a>` per `href` |
| Social (external) | `target="_blank"` `rel="noopener noreferrer"` when `http` |
| Scroll-to-top | `button` → `window.scrollTo({ top: 0, behavior: 'smooth' })` |
| Empty social href | **Omit** icon from DOM (do not render dead icons in production) |
| QA layout | May use `#` hrefs to render all **5** social circles for pixel QA |

### D11 — feat-0001 dark-shell conflict

[feat-0001](../feat-0001/PRODUCT.md) mandates **dark-only** shell. This reference is **cream**.

Treat as explicit feat-0001 exception for **global footer**; do not remap cream → `#0a0a0a` while claiming pixel accuracy.

---

## Acceptance criteria

- [ ] Footer matches `./assets/footer-reference.png` @ 1440px within **±2 px** on tokens in [D3–D5](#d3--top-row)
- [ ] Top row: brand + socials + newsletter form present
- [ ] Three link columns with headings Pages / Information / Contact Us
- [ ] Bottom bar: copyright + 3 underlined meta links + scroll-to-top circle
- [ ] Logo from `public/blocks/` (no 404)
- [ ] QA build uses [reference strings](#reference-strings-layout-qa-only--do-not-ship-for-imili); production uses [R1](#r1--imili-production-content)
- [ ] No invented legal routes shipped with fake copy
- [ ] `npm run build` passes

---

## Recommendations

### R1 — IMILI production content

| Field | Production value | Source |
| ----- | ---------------- | ------ |
| `logo.src` | `/blocks/imli-logo.svg` | `components/custom/logo.tsx` |
| `logo.wordmark` | IMILI | `siteConfig.name` |
| `tagline` | `siteConfig.tagline` | `_data/site-config.tsx` |
| `social` | Only platforms with non-empty `siteConfig.links.*` | `_data/site-config.tsx` |
| `newsletter.heading` / `description` | **TBD** | No IMILI newsletter copy in repo |
| `newsletter.placeholder` | Enter email address | Lowercase OK |
| `newsletter.buttonLabel` | Subscribe | Literal UI label from reference |
| Pages column links | `Home` + `headerNavItems[].name` / `href` | `_data/imili/header-nav.ts` |
| Information links | **TBD** hrefs | No `/privacy`, `/terms`, `/cookies` pages in app |
| Contact email | `siteConfig.contact.email` | `mailto:` link |
| Contact phone | **TBD** | `siteConfig.contact.telephone` is empty — omit line if empty |
| `copyright` | `© {year} {siteConfig.fullName}. All rights reserved.` | Derived — do not ship “Carevia” |
| `bottomLinks` | **TBD** or **omit** | Style Guide / Changelog / Licensing not in IMILI repo |

### R2 — IMILI brand CTA (optional)

Reference Subscribe uses brown `#9A7B5B`. IMILI site CTAs use `#0548bd` / hover `#5ce43a` — swapping Subscribe color requires product sign-off ([feat-0016 D11](../feat-0016/PRODUCT.md#d11--cta--imil-brand) pattern).

### R3 — Newsletter backend

Follow-up feat when API exists; v1 ships form UI only per [D9](#d9--newsletter-form).
