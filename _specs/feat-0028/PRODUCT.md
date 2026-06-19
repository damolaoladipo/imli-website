# feat-0028: Light Imili footer + dual footer on homepage

## Summary

Add a **light-theme** variant of the [`ImiliFooter`](../../components/custom/imili/ImiliFooter.tsx) shell wired through [`components/custom/footer.tsx`](../../components/custom/footer.tsx): **white background**, **black text**, same layout as the current dark band footer.

Stack **two footers** at the bottom of every page (including `/`) so users always see:

1. **Forest footer** — [`ForestFooterSection`](../../components/custom/forest-footer.tsx) ([feat-0019](../feat-0019/PRODUCT.md))
2. **Light Imili footer** — [`FooterSection`](../../components/custom/footer.tsx) → `ImiliFooter` `variant="light"`

**App:** root Next.js site (`imil-institute` package).

**Normative decisions:** [Problem](#problem), [Dual stack](#d1--dual-footer-stack), [Light variant](#d2--light-imili-footer-variant), [Theme tokens](#d4--light-theme-tokens), [Logo assets](#d5--logo-assets), [Data](#d6--data-model), [Placement](#d7--placement), [Homepage](#d8--homepage-section-order), [Acceptance](#acceptance-criteria).

**Related specs:**

| Spec | Relation |
| ---- | -------- |
| [feat-0017](../feat-0017/PRODUCT.md) | Original cream/dark column footer layout — structure reused |
| [feat-0019](../feat-0019/PRODUCT.md) | `ForestFooter` — **upper** footer in dual stack |
| [feat-0025](../feat-0025/PRODUCT.md) | Social links + dual-footer strategy — **extends** with light theme |
| [feat-0023](../feat-0023/PRODUCT.md) | Footer motion **deferred** — CSS hover only |

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | SPECIFY → [TASKS.md](./TASKS.md) → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Variant prop → layout stack → QA |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | Reuse `FooterContent`, `SocialIcon`, existing markup |

---

## Assumptions

1. **Same DOM structure** as dark `ImiliFooter` — only color tokens and logo asset change for light variant.
2. **Same data** — `footerHomepageContent` from [`_data/imili/footer.ts`](../../_data/imili/footer.ts); no second data file in v1.
3. **Dark variant stays in repo** — `variant="dark"` remains available; layout uses **`light`** for `FooterSection`.
4. **Both footers global** — wired in `app/layout.tsx` (not homepage-only), so `/` and all routes show the stack.
5. **Forest footer returns to layout** — it was removed in a prior edit; this feat **restores** `ForestFooterSection` above `FooterSection`.
6. **No newsletter backend** — form UI only (unchanged from feat-0017).

---

## Problem

| Today | Gap |
| ----- | --- |
| `FooterSection` renders **dark** `ImiliFooter` (`bg-neutral-900`, light text) | Product wants **white band, black text** for the Imili column footer |
| `app/layout.tsx` renders **one** footer only | Product wants **two** footers visible together ([feat-0025](../feat-0025/PRODUCT.md) intent) |
| `ForestFooterSection` not in layout | Upper forest footer missing on live pages |
| No spec for light theme tokens | Cannot implement without contrast + logo rules |

**Goal:** Light `ImiliFooter` via `footer.tsx`; **Forest + Light Imili** stacked at page bottom; homepage `/` is primary QA surface.

---

## D1 — Dual footer stack

### Render order (bottom of `<body>`, after `<main>`)

| # | Wrapper | Component | Spec |
| - | ------- | --------- | ---- |
| 1 (upper) | `ForestFooterSection` | `ForestFooter` | [feat-0019](../feat-0019/PRODUCT.md) |
| 2 (lower) | `FooterSection` | `ImiliFooter` **`variant="light"`** | This feat |

```tsx
// app/layout.tsx (normative)
<main className="overflow-x-hidden">{children}</main>
<ForestFooterSection />
<FooterSection />
```

### ASCII

```text
┌ page content (homepage sections) ─────────────────────────────┐
│  Hero · About · Documentary · Services · News · Testimonials    │
└─────────────────────────────────────────────────────────────────┘
┌ ForestFooter — forest photo + white cards ────────────────────┐
│  newsletter card │ Pages · Address · Contact · Social          │
└─────────────────────────────────────────────────────────────────┘
┌ ImiliFooter LIGHT — white band, black text ─────────────────────┐
│  logo + tagline + socials │ newsletter (if shown)               │
│  Pages · Information · Contact                                │
│  ───────────────── copyright · scroll-to-top ─────────────────  │
└─────────────────────────────────────────────────────────────────┘
```

### Rules

| Rule | Detail |
| ---- | ------ |
| Both visible | **Yes** — no accordion, no tab switch |
| Duplicate nav/social | **Yes** — same URLs as feat-0025; acceptable until consolidation feat |
| Gap between footers | **None** — forest section sits flush above white band (no extra margin) |
| `id` landmarks | Forest: existing section root; Imili light: `<footer>` semantic (no duplicate `id="footer"`) |

---

## D2 — Light Imili footer variant

### API

```tsx
// components/custom/imili/ImiliFooter.tsx
type ImiliFooterProps = {
  content: FooterContent;
  variant?: "dark" | "light"; // default "dark" for backward compat
};

// components/custom/footer.tsx
export default function FooterSection() {
  return <ImiliFooter content={footerHomepageContent} variant="light" />;
}
```

**Do not** create a second footer component file in v1 — one `ImiliFooter` with theme prop.

### Layout (unchanged from dark)

Same grid regions as implemented today:

| Region | Markup |
| ------ | ------ |
| Top row | Logo + tagline + social row \| newsletter heading + form |
| Middle | 3 columns — Pages, Information, Contact Us |
| Bottom | Divider + copyright + bottom links + scroll-to-top |

Typography sizes unchanged (`text-[21px]` links, `text-[28px]` newsletter heading, etc.).

---

## D3 — Dark vs light (reference)

| Token | Dark (today) | Light (this feat) |
| ----- | ------------ | ----------------- |
| Footer `bg` | `bg-neutral-900` | `bg-white` |
| Primary text | `text-neutral-100` | `text-[#111111]` |
| Tagline / body | `text-neutral-100` | `text-[#111111]` |
| Muted / copyright | `text-neutral-100` | `text-[#6B7280]` |
| Column headings | `text-neutral-100` | `text-[#111111]` |
| Link hover | `hover:opacity-70` | `hover:opacity-70` |
| Divider | `border-neutral-400/30` | `border-[#E5E7EB]` |
| Social circle bg | `bg-neutral-800` | `bg-[#F3F4F6]` |
| Social icon color | white | `text-[#111111]` |
| Social focus ring | white ring | `ring-[#111111]` |
| Newsletter input border | `border-neutral-300` | `border-[#D1D5DB]` |
| Newsletter input text | `text-neutral-100` | `text-[#111111]` |
| Newsletter placeholder | `text-neutral-400` | `text-[#9CA3AF]` |
| Subscribe button | transparent + light border | `border-[#111111]` text `#111111`; hover invert optional |
| Scroll-top button | `bg-neutral-800` white icon | `bg-[#111111]` white icon |

Implement via `cn()` and a small `footerTheme` map — avoid duplicating the entire component.

---

## D4 — Light theme tokens

Normative Tailwind @ desktop:

```tsx
const lightFooterClass = "bg-white text-[#111111]";
const lightLinkClass = "text-[#111111] hover:opacity-70";
const lightSocialClass =
  "bg-[#F3F4F6] text-[#111111] focus-visible:ring-[#111111] focus-visible:ring-offset-white";
const lightDividerClass = "border-t border-[#E5E7EB]";
const lightInputClass =
  "border-[#D1D5DB] text-[#111111] placeholder:text-[#9CA3AF] focus-visible:ring-[#111111]/20";
```

**Contrast:** Primary text `#111111` on `#FFFFFF` — WCAG AA for body copy at 18–21px.

---

## D5 — Logo assets

| Variant | Logo `src` | Reason |
| ------- | ---------- | ------ |
| Dark | `/blocks/imli-white.svg` | Light mark on dark band (today) |
| Light | `/blocks/imili.svg` or `/blocks/imli-x-fullscreen.svg` | Dark mark on white band |

**Rule:** Light variant **must not** use `imli-white.svg`.

Optional: pass `logo.src` override in `footerHomepageContent` for light export — prefer **variant-driven logo** in component:

```tsx
const logoSrc =
  variant === "light" ? "/blocks/imili.svg" : content.logo.src;
```

---

## D6 — Data model

**No new types in v1.** Reuse `FooterContent` and `footerHomepageContent` from [`_data/imili/footer.ts`](../../_data/imili/footer.ts).

Optional follow-up (out of scope): `footerLightHomepageContent` if marketing copy diverges.

---

## D7 — Placement

| Surface | Footers |
| ------- | ------- |
| `app/layout.tsx` | **Both** — global |
| `app/page.tsx` | **No** footer imports — layout owns footers |
| Other routes | Same dual stack |

---

## D8 — Homepage section order

Homepage **content** sections unchanged; footers are **layout chrome** below `<main>`:

| Layer | Content |
| ----- | ------- |
| `<main>` | Hero → About → Documentary → Services → Articles → Testimonials |
| Below `<main>` | Forest footer → Light Imili footer |

Homepage QA: scroll `/` from hero to bottom — **two** distinct footer bands before end of document.

---

## D9 — Mobile responsiveness

Align with [feat-0022](../feat-0022/PRODUCT.md) and existing `ImiliFooter`:

| Rule | Spec |
| ---- | ---- |
| Container | `container mx-auto px-4 sm:px-6 lg:px-0` (match homepage sections) |
| Top row | Stack @ `< lg` |
| Social row | `flex flex-wrap gap-3` — six icons |
| Columns | 1 col → `sm:grid-cols-3` |
| Overflow | No horizontal scroll @ 375px |

Forest footer mobile rules unchanged ([feat-0019](../feat-0019/PRODUCT.md)).

---

## D10 — Motion & a11y

| Rule | Detail |
| ---- | ------ |
| framer-motion | **No** — [feat-0023](../feat-0023/PRODUCT.md) deferred |
| Scroll-to-top | Keep smooth scroll behavior |
| Social `aria-label` | Reuse `SOCIAL_ARIA_LABELS` from [`social-links.ts`](../../_data/imili/social-links.ts) |
| Newsletter | `type="email"` + `required`; submit prevents default (UI only) |

---

## Acceptance criteria

- [ ] `ImiliFooter` accepts `variant="light" | "dark"`; default `"dark"` preserves existing call sites
- [ ] Light variant: `bg-white`, primary text `#111111`, muted `#6B7280`
- [ ] Light variant uses dark logo asset (not `imli-white.svg`)
- [ ] `FooterSection` passes `variant="light"`
- [ ] `app/layout.tsx` renders **both** `ForestFooterSection` and `FooterSection`
- [ ] Homepage `/` shows forest footer **then** light Imili footer with no gap glitch
- [ ] Social icons use shared `SocialIcon` + production URLs ([feat-0025](../feat-0025/PRODUCT.md))
- [ ] No horizontal scroll @ 375px on either footer
- [ ] `npm run build` passes

---

## Out of scope (v1)

| Item | Reason |
| ---- | ------ |
| Merging forest + Imili into one footer | Separate product decision |
| Removing dark variant | Keep for reference / revert |
| Footer-only on homepage | Layout-global per [D7](#d7--placement) |
| Newsletter API / Resend | Backend TBD |
| feat-0023 motion on footers | Deferred |

---

## Open questions (product)

| # | Question | Default |
| - | -------- | ------- |
| 1 | Logo on light band — `imili.svg` vs `imli-x-fullscreen.svg`? | **`/blocks/imili.svg`** |
| 2 | Replace dark with light globally vs keep dark somewhere? | **Layout uses light only**; dark variant in code |
| 3 | Forest footer on all pages or homepage only? | **All pages** via layout |

---

## Success criteria

| Request | Testable outcome |
| ------- | ---------------- |
| Another footer from `footer.tsx` | Light `ImiliFooter` variant |
| Black text, white background | Token table [D3](#d3--dark-vs-light-reference) |
| Two footers on homepage | Forest + light Imili visible at bottom of `/` |
