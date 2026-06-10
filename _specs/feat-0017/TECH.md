# feat-0017: Tech — Cream footer (Carevia reference layout)

## Context

See [PRODUCT.md](./PRODUCT.md). Replace `components/custom/footer.tsx` with a pixel-aligned footer from `./assets/footer-reference.png` (**1024×417** capture; QA @ **1440px**).

**Parent:** [feat-0001 Carousel 6](../feat-0001/PRODUCT.md#carousel-6--footer).

**Replaces:** Dark `bg-black` footer in `app/layout.tsx`.

---

## Objective

1. Add `_data/imili/footer.ts` with `FooterContent` (reference + production exports).
2. Implement `ImiliFooter` (+ optional subcomponents) under `components/custom/imili/` or refactor `components/custom/footer.tsx`.
3. Swap footer in `app/layout.tsx`.
4. Pixel QA @ 1440px against `./assets/footer-reference.png`.
5. Logo from `public/blocks/` only ([D8](./PRODUCT.md#d8--logo-public-folder)).

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router |
| Logo | `next/image` — `/blocks/imli-logo.svg` |
| Social icons | `lucide-react` — `Facebook`, `Linkedin`, `Instagram`, `Youtube`; X via `Twitter` or custom |
| Scroll-top | `ArrowUp` + client `"use client"` on button only or whole footer |
| Form | Native `<form>` + controlled/uncontrolled email input |
| Styling | Tailwind v4 — hex from [PRODUCT D6](./PRODUCT.md#d6--colors-from-reference) |
| Data | `_data/imili/footer.ts`, `siteConfig`, `headerNavItems` |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA @ **1440px**: overlay `./assets/footer-reference.png`; check newsletter pill pair, 3 columns, bottom bar alignment.

---

## Project structure

```text
./
├── _data/imili/
│   └── footer.ts                       # NEW — FooterContent
├── components/custom/
│   ├── footer.tsx                      # REPLACE or delegate to ImiliFooter
│   └── imili/
│       ├── ImiliFooter.tsx             # NEW (recommended)
│       ├── FooterNewsletter.tsx        # NEW — optional split
│       ├── FooterSocialRow.tsx         # NEW — optional split
│       └── index.ts                    # UPDATE — export ImiliFooter
├── app/layout.tsx                      # UPDATE — import new footer
└── _specs/feat-0017/
    ├── PRODUCT.md
    ├── TECH.md
    └── assets/footer-reference.png
```

**Minimum v1:** `footer.ts` + single `ImiliFooter.tsx` (subcomponents optional).

---

## Data file

```ts
// _data/imili/footer.ts

import { headerNavItems } from "@/_data/imili/header-nav";
import { siteConfig } from "@/_data/site-config";

export type FooterContent = { /* see PRODUCT D7 */ };

export const footerReferenceContent: FooterContent = {
  logo: {
    src: "/blocks/imli-logo.svg",
    alt: "Carevia logo placeholder — use IMILI asset",
    wordmark: "Carevia",
  },
  tagline: "Built with care for a better future.",
  social: [
    { id: "facebook", href: "#" },
    { id: "twitter", href: "#" },
    { id: "linkedin", href: "#" },
    { id: "instagram", href: "#" },
    { id: "youtube", href: "#" },
  ],
  newsletter: {
    heading: "Stay Connected",
    description:
      "Get stories of impact, program updates, and ways to help — straight to your inbox.",
    placeholder: "Enter Email Address",
    buttonLabel: "Subscribe",
  },
  columns: [
    {
      title: "Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "Who We Are", href: "#" },
        { label: "Our Programs", href: "#" },
        { label: "Get Involved", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookies Settings", href: "#" },
      ],
    },
    { title: "Contact Us", links: [] },
  ],
  contactLines: [
    { type: "email", value: "hello@carevia.org", href: "mailto:hello@carevia.org" },
    { type: "phone", value: "+123 456 7890", href: "tel:+1234567890" },
  ],
  copyright: "© Carevia. All rights reserved.",
  bottomLinks: [
    { label: "Style Guide", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Licensing", href: "#" },
  ],
};

export const footerHomepageContent: FooterContent = {
  logo: {
    src: "/blocks/imli-logo.svg",
    alt: "IMILI logo",
    wordmark: siteConfig.name,
  },
  tagline: siteConfig.tagline,
  social: /* filter siteConfig.links — only non-empty */,
  newsletter: {
    heading: "TBD",
    description: "TBD",
    placeholder: "Enter email address",
    buttonLabel: "Subscribe",
  },
  columns: [
    {
      title: "Pages",
      links: [
        { label: "Home", href: "/" },
        ...headerNavItems.map(({ name, href }) => ({ label: name, href })),
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Privacy Policy", href: "TBD" },
        { label: "Terms of Service", href: "TBD" },
        { label: "Cookies Settings", href: "TBD" },
      ],
    },
    { title: "Contact Us", links: [] },
  ],
  contactLines: [
    {
      type: "email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    /* phone line only if siteConfig.contact.telephone non-empty */
  ],
  copyright: `© ${new Date().getFullYear()} ${siteConfig.fullName}. All rights reserved.`,
  bottomLinks: [], // TBD — omit bar links until routes exist
};
```

---

## Component sketch — `ImiliFooter.tsx`

```tsx
"use client"; // only if scroll-to-top + form handler live here

type ImiliFooterProps = {
  content: FooterContent;
};

// <footer className="bg-[#F7F3EE] text-[#3D2E2A]">
//   <div className="mx-auto max-w-7xl px-4 md:px-6 pt-[68px] pb-7">
//     {/* top row */}
//     {/* link columns */}
//     {/* bottom bar */}
//   </div>
// </footer>
```

### Scroll-to-top

```tsx
<button
  type="button"
  aria-label="Scroll to top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="flex size-14 items-center justify-center rounded-full bg-[#9A7B5B] text-white"
>
  <ArrowUp className="size-5" />
</button>
```

### Newsletter submit (v1)

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // TBD — wire API
};
```

---

## Implementation tasks (ordered)

| # | Task | Done when |
| - | ---- | --------- |
| 1 | `_data/imili/footer.ts` | Reference + homepage exports |
| 2 | `ImiliFooter.tsx` | Matches PRODUCT D3–D5 |
| 3 | `app/layout.tsx` | Uses `ImiliFooter` with `footerReferenceContent` or `footerHomepageContent` |
| 4 | Remove/retire dark footer styles | No `bg-black` footer on `/` |
| 5 | `npm run build` + overlay QA | Acceptance criteria pass |

---

## Boundaries

### Always

- Logo path under `public/blocks/`.
- Omit social icons when `href` empty (production).
- Mark legal/meta routes **TBD** — no fabricated policy pages.

### Ask first

- Brown Subscribe → IMILI blue/green CTA colors.
- Shipping `bottomLinks` without real routes.
- Wiring newsletter to Supabase/Resend.

### Never

- Ship “Carevia” / `hello@carevia.org` on production homepage.
- Invent `/privacy-policy` page content in this feat.
- Add fourth link column or footer columns not in reference.

---

## Verification

```bash
npm run build
```

| Check | Expected |
| ----- | -------- |
| All routes show new footer | Cream background |
| Logo | `/blocks/imli-logo.svg` loads |
| Scroll-top | Returns to top on click |
| Production build | No Carevia strings when using `footerHomepageContent` |
