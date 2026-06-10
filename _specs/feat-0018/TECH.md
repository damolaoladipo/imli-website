# feat-0018: Tech — Homepage IMILI content (data only)

## Context

See [PRODUCT.md](./PRODUCT.md). Implement **content migration only** — no `components/` changes.

**Normative copy:** [feat-0001 Carousel 1–6](../feat-0001/PRODUCT.md#homepage-content-normative).

---

## Objective

1. Create `_data/imili/homepage.ts` — Carousel 1–3 content (staged).
2. Add `servicesHomepageContent` to `_data/imili/services.ts` — Carousel 4.
3. Complete `articleCardHomepageItems` + `articleCardGridHomepageContent` in `_data/imili/article-cards.ts` — Carousel 5.
4. Update `_data/site-config.tsx` — Carousel 6 inputs.
5. Update `app/page.tsx` — wire homepage exports (imports/props only).

---

## Commands

```bash
npm run build
npm run lint
```

Manual QA: open `/` — About paragraph, What We Do copy, Latest Updates links (5 cards), footer email/tagline.

---

## Files to touch

| File | Action |
| ---- | ------ |
| `_data/imili/homepage.ts` | **CREATE** |
| `_data/imili/services.ts` | **ADD** `servicesHomepageContent` |
| `_data/imili/article-cards.ts` | **ADD** items 4–5; **ADD** `articleCardGridHomepageContent` |
| `_data/site-config.tsx` | **UPDATE** contact/tagline if needed |
| `app/page.tsx` | **UPDATE** imports + content props only |
| `public/brand/new-frontiers-banner-finale.png` | **ADD** when product supplies file |

**Do not touch:** `components/**`, `app/layout.tsx`, `app/globals.css`.

---

## 1. `_data/imili/homepage.ts` (CREATE)

```ts
import { IMILI_IMAGES } from "./images";

export type HeroSlide = {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

export type ImiliHomepageContent = {
  heroSlides: HeroSlide[];
  about: {
    heading: string;
    body: string;
    imageSrc: string;
    imageAlt: string;
  };
  documentary: {
    heading: string;
    mediaLabel: string;
    embedUrl: string;
    posterSrc?: string;
  };
};

export const imiliHomepageContent: ImiliHomepageContent = {
  heroSlides: [
    {
      id: "imili-launch",
      title: "IMILI Launch",
      imageSrc: IMILI_IMAGES.bgHero.src,
      imageAlt: "IMILI Launch",
    },
    {
      id: "new-frontiers",
      title: "New Frontiers Event",
      description:
        "Pioneering knowledge on the pivotal role of MIL in navigating the evolving digital landscape and raising awareness towards innovative MIL initiatives.",
      imageSrc: "/brand/new-frontiers-banner-finale.png",
      imageAlt: "New Frontiers Event banner",
    },
  ],
  about: {
    heading:
      "About the International Media and Information Literacy Institute",
    body: "First international observatory dedicated to media and information literacy. The International Institute supports countries in monitoring progress, generating research, strengthening public–private partnerships, and advancing media and information literacy policies that promote informed, resilient and peaceful societies.",
    imageSrc: IMILI_IMAGES.mission.src,
    imageAlt: IMILI_IMAGES.mission.alt,
  },
  documentary: {
    heading: "IMILI Documentary",
    mediaLabel: "Online Version - IMILI Documentary",
    embedUrl: "", // TBD
    posterSrc: IMILI_IMAGES.humans.src,
  },
};
```

**Wire-up:** None until feat-0001 hero slider + documentary components exist. Do not patch `bento-hero.ts` in this spec.

---

## 2. `_data/imili/services.ts` — add `servicesHomepageContent`

Append export (keep `servicesReferenceContent` for layout QA):

```ts
import { IMILI_IMAGES } from "./images";

export const servicesHomepageContent: ServicesSectionContent = {
  badge: "WHAT WE DO",
  headingPrefix: "What We Do",
  headingAccent: "",
  items: [
    {
      id: "research",
      href: "/what-we-do#research",
      iconSrc: "/services/icon-route.svg",
      iconAlt: "Research and analysis",
      title: "Research & analysis",
      description:
        "Advance media and information literacy knowledge through evidence-based research and analysis of media and information literacy for peace, justice, and sustainable development.",
      ctaLabel: "Learn more",
      illustrationSrc: "/services/art-truck.svg",
      illustrationAlt: "",
    },
    {
      id: "clearinghouse",
      href: "/what-we-do#clearinghouse",
      iconSrc: "/services/icon-freight.svg",
      iconAlt: "MIL clearinghouse",
      title: "MIL clearinghouse",
      description:
        "Act as a clearinghouse on MIL best practices while contributing to stimulating the development of sustainable international, regional, and national media and information policies and strategies.",
      ctaLabel: "Learn more",
      illustrationSrc: "/services/art-van.svg",
      illustrationAlt: "",
    },
    {
      id: "global-agenda",
      href: "/what-we-do#global-agenda",
      iconSrc: "/services/icon-fleet.svg",
      iconAlt: "Global development agenda",
      title: "Global development agenda",
      description:
        "Influence media and information literacy in global development agenda, fostering open and transparent dialogue on MIL to achieve the Sustainable Development Goals (SDGs) and implement the Pact for the Future.",
      ctaLabel: "Learn more",
      illustrationSrc: "/services/art-ship.svg",
      illustrationAlt: "",
    },
    {
      id: "convening",
      href: "/what-we-do#convening",
      iconSrc: "/services/icon-route.svg",
      iconAlt: "Convening and networking",
      title: "Convening & networking",
      description:
        "Leverage convening and networking power globally for South-South and North-South cooperation on research, capacity enhancement, and advance consensus for integrating media and information literacy and digital competencies in educational planning, management, curriculum development and teacher trainings.",
      ctaLabel: "Learn more",
      illustrationSrc: IMILI_IMAGES.humans.src,
      illustrationAlt: "",
    },
  ],
};
```

---

## 3. `_data/imili/article-cards.ts` — complete Carousel 5

Extend `articleCardHomepageItems` to **5** entries. Add grid wrapper:

```ts
export const articleCardGridHomepageContent: ArticleCardGridContent = {
  badgeLabel: "Latest Updates",
  heading: "Latest Updates",
  description:
    "Coverage and publications on IMILI and media and information literacy.",
  items: articleCardHomepageItems,
};
```

**Item 4 (add):**

```ts
{
  id: "tvc-news",
  href: "https://www.tvcnews.tv/fg-describes-launch-of-media-literacy-institute-as-milestone-in-fight-against-misinformation/",
  imageSrc: IMILI_IMAGES.humans.src,
  imageAlt: IMILI_IMAGES.humans.alt,
  date: "TBD",
  title: "TVC News story",
  summary: "Milestone against public misinformation",
  category: "News",
},
```

**Item 5 (add):**

```ts
{
  id: "unesco-policy",
  href: "https://www.unesco.org/en/articles/towards-african-media-and-information-literacy-policy-framework",
  imageSrc: IMILI_IMAGES.vision.src,
  imageAlt: IMILI_IMAGES.vision.alt,
  date: "TBD",
  title: "African MIL policy",
  summary: "Towards regional policy framework",
  category: "News",
},
```

**Update items 1–3:** Replace `TBD` titles/summaries with [PRODUCT Carousel 5 table](./PRODUCT.md#carousel-5--latest-updates) interim strings.

---

## 4. `_data/site-config.tsx`

Update only fields product has confirmed. Leave empty strings for unknowns:

```ts
contact: {
  email: "info@imili.org",
  telephone: "", // TBD
  address: "", // TBD
},
links: {
  twitter: "", // TBD — IMILI social
  instagram: "",
  linkedin: "",
  facebook: "",
  youtube: "",
  email: "mailto:info@imili.org",
},
```

`footerHomepageContent` already reads `siteConfig` + `headerNavItems` — no `footer.ts` edit required unless newsletter heading is supplied.

---

## 5. `app/page.tsx` (content wiring only)

```tsx
import { articleCardGridHomepageContent } from "@/_data/imili/article-cards";
import { servicesHomepageContent } from "@/_data/imili/services";
import { imiliHomepageContent } from "@/_data/imili/homepage";

// AboutUs — use imiliHomepageContent.about
<AboutUs
  title={imiliHomepageContent.about.heading}
  description={imiliHomepageContent.about.body}
  imageSrc={imiliHomepageContent.about.imageSrc}
  imageAlt={imiliHomepageContent.about.imageAlt}
/>

<ServicesCarousel content={servicesHomepageContent} />
<ArticleCardGrid content={articleCardGridHomepageContent} />
```

**Do not** remove `BentoHeroSection`, `TestimonialsCarousel`, or other sections in this spec.

**Do not** add `imiliHomepageContent.heroSlides` or `documentary` to the page — no component consumes them yet.

---

## Implementation tasks (ordered)

| # | Task | Verify |
| - | ---- | ------ |
| 1 | Create `homepage.ts` | Types + slides 1–2 + about + documentary TBD |
| 2 | Add `servicesHomepageContent` | 4 items, normative body copy |
| 3 | Complete `articleCardHomepageItems` + grid export | 5 URLs, no TBD titles |
| 4 | Update `site-config.tsx` | Known contact email |
| 5 | Wire `app/page.tsx` | Homepage exports for About, Services, Articles |
| 6 | Add `new-frontiers-banner-finale.png` to `public/brand/` | Slide 2 asset 200 (when file supplied) |
| 7 | `npm run build` | Passes |

---

## Boundaries

### Always

- Content-only diff; zero `components/` file changes.
- Normative body copy exactly as product brief — no paraphrase.
- External URLs exactly as listed in [PRODUCT](./PRODUCT.md#carousel-5--latest-updates).

### Ask first

- Changing homepage section order or removing interim sections (`BentoHeroSection`, testimonials).
- Inventing slide 3–4, documentary URL, or footer phone/address.

### Never

- Edit `ServiceCard.tsx`, `ServicesCarousel.tsx`, `ArticleCardGrid.tsx`, `ImiliFooter.tsx`, or other components.
- Ship `/brand/updates/*.jpg` paths without adding files to `public/`.
- Fabricate publication dates or article ledes not sourced from product or `header-nav`.
