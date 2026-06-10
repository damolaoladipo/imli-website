# feat-0019: Tech — Dual-card forest footer

## Context

See [PRODUCT.md](./PRODUCT.md). Implement **new** `ForestFooter` from `./assets/forest-footer-reference.png` (**1024×396** capture; QA @ **1440px**).

**Do not modify:** `ImiliFooter.tsx`, [feat-0017](../feat-0017/PRODUCT.md) files.

**Pixel tables:** [Background](./PRODUCT.md#d3--background), [Cards](./PRODUCT.md#d4--card-shell), [Left card](./PRODUCT.md#d5--left-card-newsletter), [Right grid](./PRODUCT.md#d6--right-card-2×2-grid).

---

## Objective

1. Add `_data/imili/forest-footer.ts` with `ForestFooterContent` (reference + homepage exports).
2. Implement `ForestFooter` under `components/custom/imili/`.
3. Add `components/custom/forest-footer.tsx` wrapper.
4. Swap `app/layout.tsx` to use `ForestFooterSection` (or keep both behind product flag).
5. Pixel QA @ 1440px against `./assets/forest-footer-reference.png`.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| Background | `next/image` — `fill` + `object-cover` on section |
| Icons | `lucide-react` — `Facebook`, `Instagram`, `Youtube` only |
| Font | Montserrat via `_data/fonts.tsx` |
| Styling | Tailwind v4 — literal hex from [PRODUCT D7](./PRODUCT.md#d7--colors-from-reference) |
| Subscribe | Native `<form>` + inset green `<button type="submit">` — not `CustomButton` |
| Client | `"use client"` on `ForestFooter` (form `preventDefault`) |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA @ **1440×900**: overlay `./assets/forest-footer-reference.png` — card proportions, 2×2 grid, inset Subscribe, 3 social icons.

---

## Project structure

```text
./
├── _data/imili/
│   └── forest-footer.ts                 # NEW
├── components/custom/
│   ├── forest-footer.tsx                # NEW — layout wrapper
│   └── imili/
│       ├── ForestFooter.tsx             # NEW
│       └── index.ts                     # UPDATE — export
├── app/layout.tsx                       # UPDATE — swap footer import
└── _specs/feat-0019/
    ├── PRODUCT.md
    ├── TECH.md
    └── assets/forest-footer-reference.png
```

---

## Data file

```ts
// _data/imili/forest-footer.ts

export type ForestFooterNavLink = {
  label: string;
  href: string;
};

export type ForestFooterSocialId = "facebook" | "instagram" | "youtube";

export type ForestFooterSocialLink = {
  id: ForestFooterSocialId;
  href: string;
};

export type ForestFooterContent = {
  background: { src: string; alt: string };
  logo: { src: string; alt: string };
  newsletter: {
    headlineBefore: string;
    headlineEmphasis: string;
    headlineAfter: string;
    subtext: string;
    placeholder: string;
    buttonLabel: string;
  };
  attribution: string;
  pages: {
    title: string;
    columns: [ForestFooterNavLink[], ForestFooterNavLink[]];
  };
  address: {
    title: string;
    blocks: string[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
  };
  social: {
    title: string;
    links: ForestFooterSocialLink[];
  };
};

/** Layout QA — reference strings from forest-footer-reference.png */
export const forestFooterReferenceContent: ForestFooterContent = {
  background: {
    src: "/new/vision.png",
    alt: "Placeholder — forest footer background QA",
  },
  logo: {
    src: "/blocks/imli-logo.svg",
    alt: "IMILI logo",
  },
  newsletter: {
    headlineBefore: "We believe ",
    headlineEmphasis: "real change",
    headlineAfter: " starts deep within the supply chain.",
    subtext: "Join our eco-supply community.",
    placeholder: "Type your email",
    buttonLabel: "Subscribe",
  },
  attribution: "Designed by Webestica, Powered by Framer",
  pages: {
    title: "Pages",
    columns: [
      [
        { label: "Home", href: "/" },
        { label: "Home 2", href: "#" },
        { label: "About", href: "/about" },
        { label: "Service Static", href: "#" },
        { label: "Case Studies", href: "#" },
      ],
      [
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "#" },
        { label: "Privacy policy", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    ],
  },
  address: {
    title: "Address",
    blocks: [
      "123 Remote Work Avenue, San Francisco, CA 94105",
      "144 Creative Street, Suite 456, New York, NY 10001, USA",
    ],
  },
  contact: {
    title: "Contact",
    email: "hello@yourbrand.com",
    phone: "+1 202 555 0147",
  },
  social: {
    title: "Social media",
    links: [
      { id: "facebook", href: "#" },
      { id: "instagram", href: "#" },
      { id: "youtube", href: "#" },
    ],
  },
};
```

### Homepage export (IMILI)

```ts
import { headerNavItems } from "./header-nav";
import { siteConfig } from "../site-config";

function splitNavIntoColumns(): [ForestFooterNavLink[], ForestFooterNavLink[]] {
  const links = [
    { label: "Home", href: "/" },
    ...headerNavItems.map(({ name, href }) => ({ label: name, href })),
  ];
  const mid = Math.ceil(links.length / 2);
  return [links.slice(0, mid), links.slice(mid)];
}

function buildSocialLinks(): ForestFooterSocialLink[] {
  const ids: ForestFooterSocialId[] = ["facebook", "instagram", "youtube"];
  return ids
    .map((id) => ({ id, href: siteConfig.links[id] }))
    .filter((l) => l.href.length > 0);
}

export const forestFooterHomepageContent: ForestFooterContent = {
  background: {
    src: "/new/vision.png", // TBD — forest asset
    alt: "TBD — footer background",
  },
  logo: { src: "/blocks/imli-logo.svg", alt: "IMILI logo" },
  newsletter: {
    headlineBefore: "TBD",
    headlineEmphasis: "TBD",
    headlineAfter: "",
    subtext: "TBD",
    placeholder: "Type your email",
    buttonLabel: "Subscribe",
  },
  attribution: "", // omit when empty
  pages: { title: "Pages", columns: splitNavIntoColumns() },
  address: {
    title: "Address",
    blocks: siteConfig.contact.address ? [siteConfig.contact.address] : [],
  },
  contact: {
    title: "Contact",
    email: siteConfig.contact.email,
    phone: siteConfig.contact.telephone,
  },
  social: { title: "Social media", links: buildSocialLinks() },
};
```

---

## Component sketch — `ForestFooter.tsx`

```tsx
"use client";

// section.relative.min-h-[556px].overflow-hidden
//   Image background fill object-cover (priority false)
//   div.relative.z-10.mx-auto.flex... (cards row)
//     div.left-card (flex flex-col, lg:w-[52%])
//       logo Image
//       h2 with emphasis span
//       p subtext
//       form inline subscribe
//       p attribution (if content.attribution)
//     div.bridge (hidden lg:block) — white tab
//     div.right-card (lg:flex-1, grid 2x2)
//       PagesQuadrant | AddressQuadrant
//       ContactQuadrant | SocialQuadrant
```

### Center bridge (desktop)

```tsx
<div
  aria-hidden
  className="hidden w-3 shrink-0 self-center rounded-sm bg-white lg:block lg:h-14"
/>
```

Tune width/height in overlay QA.

### Inline subscribe (reference)

```tsx
<form onSubmit={handleSubmit} className="relative mt-8 flex items-center rounded-full border border-[#D1D5DB] bg-white">
  <input
    type="email"
    required
    autoComplete="email"
    placeholder={content.newsletter.placeholder}
    className="flex-1 bg-transparent px-6 py-4 text-[18px] outline-none placeholder:text-[#9CA3AF]"
  />
  <button
    type="submit"
    className="m-1 shrink-0 rounded-full bg-[#4FAF50] px-8 py-3 text-[17px] font-medium text-white"
  >
    {content.newsletter.buttonLabel}
  </button>
</form>
```

### Right grid cell example

```tsx
<div className="border-b border-r border-[#E5E7EB] p-6">
  <h3 className="text-[21px] font-semibold text-[#111111]">{title}</h3>
  ...
</div>
```

Adjust borders on bottom-right / top-left cells so outer card edge has no double border.

### Social icons map

```tsx
const socialIcons = { facebook: Facebook, instagram: Instagram, youtube: Youtube };
```

**Only these three** — do not add LinkedIn/Twitter.

---

## Layout swap

```tsx
// components/custom/forest-footer.tsx
import { forestFooterReferenceContent } from "@/_data/imili/forest-footer";
import { ForestFooter } from "@/components/custom/imili/ForestFooter";

export default function ForestFooterSection() {
  return <ForestFooter content={forestFooterReferenceContent} />;
}
```

```tsx
// app/layout.tsx — replace FooterSection import
import ForestFooterSection from "@/components/custom/forest-footer";
// ...
<ForestFooterSection />
```

Use `forestFooterHomepageContent` when IMILI copy is ready.

---

## Implementation tasks (ordered)

| # | Task | Done when |
| - | ---- | --------- |
| 1 | `_data/imili/forest-footer.ts` | Reference + homepage exports |
| 2 | `ForestFooter.tsx` | Full section matches reference |
| 3 | `forest-footer.tsx` wrapper | Thin export |
| 4 | `index.ts` export | `ForestFooter` named export |
| 5 | `app/layout.tsx` | Swapped footer (product approval) |
| 6 | `npm run build` + overlay QA | PRODUCT acceptance criteria |

---

## Boundaries

### Always

- New component — do not refactor `ImiliFooter`.
- Match reference geometry before IMILI production copy.
- Use `public/` paths from [PRODUCT D9](./PRODUCT.md#d9--images-public-folder) only.
- Exactly **3** social icons in reference QA build.

### Ask first

- Removing attribution line on QA build (needed for pixel match).
- Adding dark overlay on forest background.

### Never

- Ship Webestica / eco-supply copy on IMILI production homepage.
- Invent forest background path without file in `public/`.
- Add scroll-to-top, fourth social icon, or feat-0017 column layout to this footer.
- Use `imli-white.svg` on white cards.

---

## Verification

```bash
npm run build
```

| Check | Expected |
| ----- | -------- |
| Footer renders | Two white cards over background image |
| Left card | Logo, H2 with emphasis, inline Subscribe |
| Right card | 2×2 grid with dividers |
| Social | 3 icons only |
| `ImiliFooter` | File unchanged |
| Images | All `src` return 200 |
