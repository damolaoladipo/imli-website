# feat-0001: Tech — IMILI identity, homepage, dark-only shell

## Context

See [PRODUCT.md](./PRODUCT.md). Foundational spec: rebrand to **IMILI**, implement **six-section homepage**, and enforce **dark-only** marketing theme via `<html class="dark">` and CSS variable defaults.

**Homepage content:** [Carousel 1–6](./PRODUCT.md#homepage-content-normative). **Token tables:** [Page shell](./PRODUCT.md#page-shell), [Typography](./PRODUCT.md#typography-colors), [Surfaces](./PRODUCT.md#surfaces--chips).

---

## Objective

1. Rename package and `siteConfig` to **imil-institute** / **IMILI**.
2. Replace `app/page.tsx` with six homepage sections per [D6](./PRODUCT.md#d6--homepage-stack).
3. Add `_data/imili/homepage.ts` with normative slider, about, documentary, what-we-do, and news data.
4. Force dark mode on `<html>`; remove marketing theme toggle if present.
5. Align `--background` and marketing tokens to near-black shell per [D3](./PRODUCT.md#d3--marketing-dark-tokens).
6. Update header/footer: IMILI social, contact (email, phone, address), repeated nav.
7. Strip legacy AssureUs homepage blocks and light-only marketing patterns.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| Styling | Tailwind v4 + CSS variables in `app/globals.css` |
| Config | `_data/site-config.tsx` |
| Fonts | `_data/fonts.tsx` (unchanged unless brand requires) |

---

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
```

Manual QA: 1440px / 375px — confirm dark shell, no flash of light theme, header/footer brand strings.

---

## Project structure

```text
./
├── package.json
├── _data/
│   ├── site-config.tsx                   # IMILI brand, social, contact
│   └── imili/
│       └── homepage.ts                   # NEW — all carousel content
├── app/
│   ├── layout.tsx                        # html.dark + metadata
│   ├── page.tsx                          # six-section homepage
│   └── globals.css
├── components/
│   ├── custom/
│   │   ├── header.tsx
│   │   ├── footer.tsx                    # social + contact + nav repeat
│   │   └── logo.tsx
│   └── containers/homepage/              # NEW
│       ├── HeroSliderSection.tsx         # Carousel 1
│       ├── AboutImiliSection.tsx         # Carousel 2
│       ├── DocumentarySection.tsx        # Carousel 3
│       ├── WhatWeDoSection.tsx           # Carousel 4
│       ├── LatestUpdatesSection.tsx      # Carousel 5
│       └── index.ts
└── public/brand/
    ├── imili-logo.svg
    ├── new-frontiers-banner-finale.png   # slider slide 2
    └── og-image.png
```

**Minimum v1:** `homepage.ts`, five section components + footer update, `page.tsx` wire-up, `site-config.tsx`, `layout.tsx`, `globals.css`.

---

## Site config

```ts
// _data/site-config.tsx
export const siteConfig = {
  name: 'IMILI',
  fullName: 'International Media and Information Literacy Institute',
  title: 'IMILI — International Media and Information Literacy Institute',
  description:
    'First international observatory dedicated to media and information literacy.',
  url: 'https://www.imili.org', // TBD — product-approved domain
  ogImage: '/brand/og-image.png',
  links: {
    twitter: '', // IMILI social — TBD
    instagram: '',
    linkedin: '',
    facebook: '',
    youtube: '',
    email: 'mailto:info@imili.org', // TBD
  },
  contact: {
    email: 'info@imili.org', // TBD
    telephone: '', // TBD
    address: '', // TBD — physical address for footer
  },
};
```

Product fills social URLs, phone, and address before launch. Slug **`imil-institute`** is fixed.

---

## Data model

```ts
// _data/imili/homepage.ts

export type HeroSlide = {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

export type WhatWeDoBox = {
  id: string;
  body: string;
  href: string; // What We Do menu destination
};

export type LatestUpdateItem = {
  id: string;
  title: string;
  snippet: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  external: boolean;
};

export type ImiliHomepageContent = {
  heroSlides: HeroSlide[];
  about: {
    heading: string;
    body: string;
  };
  documentary: {
    heading: string;
    embedUrl: string; // Online Version - IMILI Documentary
    posterSrc?: string;
  };
  whatWeDo: {
    heading: string;
    boxes: WhatWeDoBox[];
  };
  latestUpdates: {
    heading: string;
    items: LatestUpdateItem[];
  };
};

export const imiliHomepageContent: ImiliHomepageContent = {
  heroSlides: [
    {
      id: 'imili-launch',
      title: 'IMILI Launch',
      imageSrc: '/brand/slider-imili-launch.png',
      imageAlt: 'IMILI Launch',
    },
    {
      id: 'new-frontiers',
      title: 'New Frontiers Event',
      description:
        'Pioneering knowledge on the pivotal role of MIL in navigating the evolving digital landscape and raising awareness towards innovative MIL initiatives.',
      imageSrc: '/brand/new-frontiers-banner-finale.png',
      imageAlt: 'New Frontiers Event banner',
    },
    // slides 3–4: add when product supplies content
  ],
  about: {
    heading:
      'About the International Media and Information Literacy Institute',
    body: 'First international observatory dedicated to media and information literacy. The International Institute supports countries in monitoring progress, generating research, strengthening public–private partnerships, and advancing media and information literacy policies that promote informed, resilient and peaceful societies.',
  },
  documentary: {
    heading: 'IMILI Documentary',
    embedUrl: '', // TBD — Online Version - IMILI Documentary URL
  },
  whatWeDo: {
    heading: 'What We Do',
    boxes: [
      {
        id: 'research',
        body: 'Advance media and information literacy knowledge through evidence-based research and analysis of media and information literacy for peace, justice, and sustainable development.',
        href: '/what-we-do#research',
      },
      {
        id: 'clearinghouse',
        body: 'Act as a clearinghouse on MIL best practices while contributing to stimulating the development of sustainable international, regional, and national media and information policies and strategies.',
        href: '/what-we-do#clearinghouse',
      },
      {
        id: 'global-agenda',
        body: 'Influence media and information literacy in global development agenda, fostering open and transparent dialogue on MIL to achieve the Sustainable Development Goals (SDGs) and implement the Pact for the Future.',
        href: '/what-we-do#global-agenda',
      },
      {
        id: 'convening',
        body: 'Leverage convening and networking power globally for South-South and North-South cooperation on research, capacity enhancement, and advance consensus for integrating media and information literacy and digital competencies in educational planning, management, curriculum development and teacher trainings.',
        href: '/what-we-do#convening',
      },
    ],
  },
  latestUpdates: {
    heading: 'Latest Updates',
    items: [
      {
        id: 'unesco-abuja',
        title: 'UNESCO — IMILI launched in Abuja',
        snippet: 'TBD',
        href: 'https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja',
        imageSrc: '/brand/updates/unesco-abuja.jpg',
        imageAlt: 'UNESCO Abuja launch',
        external: true,
      },
      {
        id: 'arise-tv',
        title: 'Arise TV — Nigeria launches world’s first media literacy institute',
        snippet: 'TBD',
        href: 'https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/',
        imageSrc: '/brand/updates/arise-tv.jpg',
        imageAlt: 'Arise TV coverage',
        external: true,
      },
      {
        id: 'fmino',
        title: 'FMINO — Official launch and unveiling of IMILI',
        snippet: 'TBD',
        href: 'https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/',
        imageSrc: '/brand/updates/fmino.jpg',
        imageAlt: 'FMINO official launch',
        external: true,
      },
      {
        id: 'tvc-news',
        title: 'TVC News — Launch described as milestone against misinformation',
        snippet: 'TBD',
        href: 'https://www.tvcnews.tv/fg-describes-launch-of-media-literacy-institute-as-milestone-in-fight-against-misinformation/',
        imageSrc: '/brand/updates/tvc-news.jpg',
        imageAlt: 'TVC News coverage',
        external: true,
      },
      {
        id: 'unesco-policy',
        title: 'UNESCO — Towards African MIL policy framework',
        snippet: 'TBD',
        href: 'https://www.unesco.org/en/articles/towards-african-media-and-information-literacy-policy-framework',
        imageSrc: '/brand/updates/unesco-policy.jpg',
        imageAlt: 'African MIL policy framework',
        external: true,
      },
    ],
  },
};
```

---

## Dark shell implementation

### Root layout

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${useMont.className} ${useMont.variable} bg-background text-foreground antialiased overflow-x-hidden`}
      >
        <HeroHeader />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
```

**Reject:** `ThemeProvider`, `next-themes`, or client-side theme toggle on marketing layout.

### CSS variables (marketing defaults)

Set dark values as the effective marketing palette. Preferred approach: keep `.dark` block and always apply `dark` on `<html>`, **or** collapse marketing tokens into `:root` if removing light theme entirely.

```css
/* app/globals.css — marketing shell targets */
.dark {
  --background: oklch(0.082 0.017 16.3); /* ~#0a0a0a / #251F1E family */
  --foreground: oklch(0.985 0 0);
  /* primary green + gold accents unchanged from brand comments */
}
```

Ensure `bg-background` on `<body>` reads near-black in forced dark mode.

### Logo component

```tsx
// components/custom/logo.tsx — v1: single asset, no light/dark pair
<Image
  src="/brand/imili-logo.svg"
  alt="IMILI logo"
  width={360}
  height={150}
  style={{ width: '200px', height: 'auto' }}
/>
```

---

## Homepage integration

```tsx
// app/page.tsx
import {
  HeroSliderSection,
  AboutImiliSection,
  DocumentarySection,
  WhatWeDoSection,
  LatestUpdatesSection,
} from '@/components/containers/homepage';
import { imiliHomepageContent } from '@/_data/imili/homepage';

export default function Home() {
  const content = imiliHomepageContent;
  return (
    <>
      <HeroSliderSection slides={content.heroSlides} />
      <AboutImiliSection {...content.about} />
      <DocumentarySection {...content.documentary} />
      <WhatWeDoSection {...content.whatWeDo} />
      <LatestUpdatesSection {...content.latestUpdates} />
    </>
  );
}
```

Footer (Carousel 6) stays in `app/layout.tsx` via `FooterSection` — extend with social, contact, and repeated header nav.

### Hero slider (Carousel 1)

- Client component with keyboard-accessible prev/next + dot indicators
- Filter `heroSlides` to only slides with `imageSrc` for v1 (hides empty 3–4)
- Slide 2 uses `new-frontiers-banner-finale.png`; optional `description` overlay

### Documentary (Carousel 3)

```tsx
// Responsive 16:9 embed — YouTube/Vimeo or self-hosted MP4
<div className="relative aspect-video w-full overflow-hidden rounded-lg">
  <iframe
    src={embedUrl}
    title="IMILI Documentary"
    className="absolute inset-0 h-full w-full"
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>
```

Set `embedUrl` when **Online Version - IMILI Documentary** URL is confirmed.

### What We Do (Carousel 4)

- 2×2 grid desktop, stacked mobile
- Each box: entire card is `<Link href={box.href}>`

### Latest Updates (Carousel 5)

- Card grid: image, title, snippet, external link icon when `external: true`
- Section CTA link to `/news` or `/publications` (route TBD)

### Footer (Carousel 6)

| Column | Source |
| ------ | ------ |
| Social | `siteConfig.links` (twitter, linkedin, etc.) |
| Contact | `siteConfig.contact.email`, `.telephone`, `.address` |
| Nav | Reuse header nav data from `_data/navigation.tsx` or equivalent |

---

## Rebrand grep targets

Run and update user-visible strings on homepage + chrome:

```bash
rg -l 'AssureUs|assureus|asure-us' --glob '*.{tsx,ts,json}'
```

| File (typical) | Action |
| -------------- | ------ |
| `components/custom/footer.tsx` | Brand name + social URLs |
| `app/page.tsx` | Replace with six-section IMILI homepage |
| `components/custom/footer.tsx` | IMILI social, contact, nav repeat |
| `package.json` | `"name": "imil-institute"` |

Do **not** rename Supabase project IDs, env keys, or deployment secrets in this feat.

---

## Light-pattern removal (homepage path)

| Pattern | Action |
| ------- | ------ |
| `bg-gray-50` section bands | Replace with `bg-background` or remove band |
| `dark:hidden` / `hidden dark:block` image pairs | Keep dark variant only; delete light asset reference |
| `text-neutral-900` on marketing body | `text-zinc-400` or `text-foreground` |
| Optional `dark:` prefixes on marketing-only classes | Prefer unprefixed dark tokens when `html.dark` is guaranteed |

---

## Accessibility

| Requirement | Implementation |
| ----------- | -------------- |
| Forced dark | No reliance on `prefers-color-scheme` for contrast |
| Focus rings | Keep `focus-visible:ring-ring/50` from UI primitives |
| Logo | `alt="IMILI logo"` |
| Slider | `aria-roledescription="carousel"`; slide images have unique `alt` |
| Documentary iframe | `title="IMILI Documentary"` |
| External news links | `target="_blank"` `rel="noopener noreferrer"` |
| Color contrast | White / zinc-400 on `#0a0a0a` for text roles in [PRODUCT](./PRODUCT.md#typography-colors) |

---

## Implementation checklist

| Step | Task |
| ---- | ---- |
| 1 | `package.json` → `imil-institute` |
| 2 | `_data/site-config.tsx` — IMILI brand, social, contact |
| 3 | `_data/imili/homepage.ts` — normative carousel content |
| 4 | `HeroSliderSection` + slide assets (launch + New Frontiers banner) |
| 5 | `AboutImiliSection`, `DocumentarySection`, `WhatWeDoSection`, `LatestUpdatesSection` |
| 6 | `app/page.tsx` — wire six sections; remove legacy AssureUs blocks |
| 7 | Footer — social, email/phone/address, header nav repeat |
| 8 | `app/layout.tsx` → `className="dark"` on `<html>`, `bg-background` on body |
| 9 | `app/globals.css` — dark `--background` near-black |
| 10 | Header + logo → IMILI |
| 11 | Add `public/brand/` assets; documentary embed URL |
| 12 | Fill news snippets + update card images |
| 13 | Manual QA 1440 / 375 (slider, video, links) |
| 14 | `pnpm build` + `pnpm lint` |

---

## Testing

| Type | Coverage |
| ---- | -------- |
| Manual | No light flash on hard refresh |
| Manual | Header/footer show IMILI + contact block |
| Manual | Homepage six sections in order; slider slides 1–2 work |
| Manual | What We Do boxes navigate correctly |
| Manual | All five news URLs open correctly |
| Manual | Homepage has no gray-50 full-width bands |
| Manual | DevTools: `<html class="dark">` present |
| Build | `pnpm build` passes |
| Lint | `pnpm lint` passes |

---

## Rollback

Revert `package.json`, `site-config.tsx`, `layout.tsx`, and chrome copy in a single commit. Downstream specs (feat-0012) remain valid but should not ship until feat-0001 is merged or dark policy is temporarily waived in writing.

---

## Downstream contract

Specs that reference [feat-0001 PRODUCT](./PRODUCT.md) inherit:

- **Naming:** imil-institute / IMILI (not Troott, not AssureUs)
- **Theme:** dark tokens only; light references are layout-only
- **Data paths:** `_data/imili/` for IMILI marketing content
