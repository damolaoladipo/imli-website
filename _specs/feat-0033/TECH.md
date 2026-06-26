# feat-0033: Tech — About Us sections (What We Are, Vision, Mission)

## Context

See [PRODUCT.md](./PRODUCT.md). Extend `/about-us` with three sections using normative copy and user reference screenshots in `./assets/`.

**Already shipped:**

- `app/about-us/page.tsx`
- `components/custom/imili/PageHeroSection.tsx`
- `components/custom/imili/AboutUsIntroSection.tsx`
- `_data/imili/about-us-page.ts` (hero + intro only)

---

## Objective

1. Extend `about-us-page.ts` with `whatWeAre`, `vision`, `mission` content.
2. Implement section component(s) matching reference layouts.
3. Wire page stack in correct order.
4. Align `/about` navigation with `/about-us`.
5. Add sitemap entry.

---

## Commands

```bash
npm run dev
# http://localhost:3000/about-us
npm run build
npm run lint
```

Manual QA @ `1440×900` and `375×812` against `./assets/*-reference.png`.

---

## Project structure

```text
./
├── _data/imili/
│   ├── about-us-page.ts                 # EXTEND — whatWeAre, vision, mission
│   └── images.ts                        # EXTEND — aboutUs.* image keys (optional)
├── components/custom/imili/
│   ├── AboutSplitSection.tsx            # NEW — reusable text + image split
│   ├── AboutWhatWeAreSection.tsx        # NEW — thin wrapper
│   ├── AboutVisionSection.tsx           # NEW
│   ├── AboutMissionSection.tsx          # NEW — or reuse MissionSection
│   ├── PageHeroSection.tsx              # EXISTS
│   ├── AboutUsIntroSection.tsx          # EXISTS
│   └── MissionSection.tsx               # EXISTS (feat-0016)
├── app/
│   ├── about-us/page.tsx                # EXTEND
│   └── about/page.tsx                   # NEW — redirect (recommended)
├── app/sitemap.ts                       # EXTEND
├── public/stock/
│   ├── about-what-we-are.jpg            # TBD
│   ├── about-vision.jpg                 # TBD
│   └── about-mission-primary.jpg        # TBD
└── _specs/feat-0033/assets/
    ├── what-we-are-reference.png
    ├── vision-reference.png
    └── mission-reference.png
```

---

## Data model

```ts
// _data/imili/about-us-page.ts

export type AboutSectionImage = {
  src: string;
  alt: string;
};

export type AboutSplitSectionContent = {
  id: string;
  title: string;
  body: string;
  image: AboutSectionImage;
  layout: "text-first" | "image-first";
};

export const aboutUsPageContent = {
  hero: { … },
  intro: { … },
  whatWeAre: AboutSplitSectionContent,
  vision: AboutSplitSectionContent,
  mission: AboutSplitSectionContent | { variant: "mission-grid"; mission: MissionSectionContent },
} as const;
```

### Launch content (normative)

```ts
import { STOCK_IMAGES } from "./images";

whatWeAre: {
  id: "what-we-are",
  title: "What We Are",
  body: "IMILI serves as a global centre for research, training, policy innovation, and international cooperation aimed at strengthening information integrity, digital literacy, and responsible media engagement in the digital age. Our establishment is a direct response to the escalating global threats posed by misinformation, disinformation, hate speech, deepfakes, algorithmic manipulation, and the rapid expansion of Artificial Intelligence and emerging technologies.",
  image: STOCK_IMAGES.home.about,
  layout: "text-first",
},
vision: {
  id: "vision",
  title: "Vision",
  body: "A world that embraces the value of Media and Information Literacy for the future we desire, recognizes the importance of empirical evidence on the impact of MIL, and ensures that MIL is inclusively, sustainably, and rightfully accessible to all.",
  image: STOCK_IMAGES.mission.secondary,
  layout: "image-first",
},
mission: {
  id: "mission",
  title: "Mission",
  body: "To strengthen research and cooperation that bolster Media and Information Literacy for all for a just, peaceful, and sustainable future.",
  image: STOCK_IMAGES.mission.primary,
  layout: "text-first",
},
```

Adjust `mission` to feat-0016 grid after comparing `mission-reference.png`.

---

## Section layouts

### `AboutSplitSection.tsx`

Reusable two-column block for **What We Are**, **Vision**, and optionally **Mission**.

| Prop | Values |
| ---- | ------ |
| `content.layout` | `text-first` — copy left, image right on `lg+` |
| | `image-first` — image left, copy right on `lg+` |

Mobile: always stack heading → body → image.

```tsx
<section id={content.id} className="scroll-mt-28 bg-white">
  <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 lg:py-24">
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* text + image columns with lg:order-* for image-first */}
    </div>
  </div>
</section>
```

Use `next/image` with `fill`, `object-cover`, `rounded-2xl`, `aspect-[4/3]`.

### Mission block — decision tree

```text
mission-reference.png matches feat-0016 grid?
├── YES → AboutMissionSection renders <MissionSection content={…} />
└── NO  → AboutMissionSection renders <AboutSplitSection content={…} />
```

---

## Page wire-up

```tsx
// app/about-us/page.tsx
export default function AboutUsPage() {
  return (
    <>
      <PageHeroSection … />
      <AboutUsIntroSection … />
      <AboutWhatWeAreSection content={aboutUsPageContent.whatWeAre} />
      <AboutVisionSection content={aboutUsPageContent.vision} />
      <AboutMissionSection content={aboutUsPageContent.mission} />
    </>
  );
}
```

---

## Route alignment

```tsx
// app/about/page.tsx
import { redirect } from "next/navigation";

export default function AboutRedirect() {
  redirect("/about-us");
}
```

Update `_data/imili/header-nav.ts`, `site-config.tsx` `baseLinks.about`, and footer About links to `/about-us`.

---

## SEO

Add to `app/sitemap.ts`:

```ts
{ url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
```

---

## Component manifest

| Component | Server / Client |
| --------- | --------------- |
| `AboutSplitSection` | Server |
| `AboutWhatWeAreSection` | Server |
| `AboutVisionSection` | Server |
| `AboutMissionSection` | Server |

No `"use client"` unless motion added in a follow-up.

---

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Reference screenshots not in repo | Block pixel QA until assets in `./assets/` |
| Mission layout ambiguity | Ship split first; upgrade to grid if needed |
| `/about` 404 from nav | Redirect + nav update in same PR |
