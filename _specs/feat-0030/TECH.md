# feat-0030: Tech — News article detail + index

## Context

See [PRODUCT.md](./PRODUCT.md). Implement `/news` and `/news/fg-describes-imili-launch-as-milestone-against-misinformation` with the two-column layout from `./assets/news-article-reference.png`.

---

## Objective

1. Add news content (MDX preferred, data fallback).
2. Implement `NewsArticleLayout` — main column + **Latest Media Mentions** sidebar.
3. Implement `app/news/page.tsx` (index) and `app/news/[slug]/page.tsx`.
4. Wire `_data/imili/media-mentions.ts` for sidebar.
5. Update homepage `articleCardHomepageItems` `tvc-news` href to internal slug.
6. SEO metadata + static generation.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js 16 App Router |
| Content | MDX via fumadocs-mdx **if feat-0029 landed**; else `_data/imili/news/` TS module |
| Typography | `@tailwindcss/typography` `prose` (add with feat-0029 or here) |
| Images | `next/image` (`unoptimized: true` in existing config) |
| Styling | Tailwind v4 + IMILI tokens |
| Sidebar data | `_data/imili/media-mentions.ts` |

---

## Commands

```bash
npm install   # + fumadocs deps if sharing feat-0029 pipeline
npm run dev
npm run build
npm run lint
```

Manual QA @ `1440×900` and `375×812` against `./assets/news-article-reference.png`.

---

## Project structure

```text
./
├── news/content/
│   └── fg-describes-imili-launch-as-milestone-against-misinformation.mdx
├── _data/imili/
│   ├── media-mentions.ts              # NEW — sidebar cards
│   └── news/
│       └── fg-describes-imili-launch.ts # FALLBACK if no MDX yet
├── lib/
│   └── news-source.ts                 # NEW — loader (mirror essay-source)
├── types/
│   └── news.ts                        # NEW
├── components/custom/imili/
│   ├── NewsArticleLayout.tsx          # NEW — two-column shell
│   ├── MediaMentionCard.tsx           # NEW — sidebar card
│   ├── MediaMentionsSidebar.tsx       # NEW
│   └── NewsIndexSection.tsx           # NEW — /news list
├── app/news/
│   ├── page.tsx
│   └── [slug]/
│       ├── page.tsx
│       └── metadata.ts
├── public/news/
│   └── fg-imili-launch-milestone.png
└── _specs/feat-0030/assets/news-article-reference.png
```

---

## Content strategy

### Preferred: MDX collection `news`

If [feat-0029](../feat-0029/TECH.md) `source.config.ts` exists, add a second collection:

```ts
export const { docs: newsDocs, meta: newsMeta } = defineDocs({
  dir: "news/content",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      heroImage: z.string(),
      heroImageAlt: z.string(),
      category: z.string().optional(),
      externalSourceUrl: z.string().url().optional(),
      externalSourceLabel: z.string().optional(),
      draft: z.boolean().optional().default(false),
    }),
  },
});
```

`lib/news-source.ts`:

```ts
export const newsSource = loader({
  baseUrl: "/news",
  source: { /* newsDocs */ },
});

export function getPublishedNewsPages() { /* filter draft */ }
export function getPublishedNewsPage(slug: string) { /* ... */ }
```

### Fallback without MDX (v1 only)

```ts
// _data/imili/news/fg-describes-imili-launch.ts
import type { NewsArticle } from "@/types/news";

export const fgDescribesImiliLaunchArticle: NewsArticle = {
  slug: "fg-describes-imili-launch-as-milestone-against-misinformation",
  title: "FG Describes IMILI Launch as Milestone Against Misinformation",
  description: "...",
  date: "2026-04-15",
  heroImage: "/news/fg-imili-launch-milestone.png",
  heroImageAlt: "IMILI launch event",
  externalSourceUrl: "https://www.tvcnews.tv/fg-describes-launch-of-media-literacy-institute-as-milestone-in-fight-against-misinformation/",
  externalSourceLabel: "TVC News",
  bodyParagraphs: [ /* string[] */ ],
};
```

Render paragraphs in layout until MDX migration.

---

## types/news.ts

```ts
import type { ComponentType } from "react";

export interface NewsArticleData {
  title: string;
  description?: string;
  date: string;
  heroImage: string;
  heroImageAlt: string;
  category?: string;
  externalSourceUrl?: string;
  externalSourceLabel?: string;
  draft?: boolean;
  body?: ComponentType; // MDX
}

export interface NewsPage {
  url: string;
  data: NewsArticleData;
}

export type MediaMention = {
  id: string;
  outlet: string;
  outletLogoSrc?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  headline: string;
  excerpt: string;
};
```

---

## Launch article MDX

```mdx
---
title: "FG Describes IMILI Launch as Milestone Against Misinformation"
description: "The Federal Government describes the launch of IMILI as a major milestone in strengthening democratic resilience and combating misinformation."
date: "2026-04-15"
category: "News"
heroImage: "/news/fg-imili-launch-milestone.png"
heroImageAlt: "International Media and Information Literacy Institute launch event"
externalSourceUrl: "https://www.tvcnews.tv/fg-describes-launch-of-media-literacy-institute-as-milestone-in-fight-against-misinformation/"
externalSourceLabel: "TVC News"
---

The Federal Government has described the launch of the International Media and Information Literacy Institute (IMILI) as a major step toward strengthening responsible information use, democratic resilience, and the fight against misinformation.

Speaking at the close of the two-day launch held at the National Open University of Nigeria (NOUN), the Minister of Information and National Orientation, Mohammed Idris, said the institute marks a defining moment for Nigeria and the global community in advancing media and information literacy.

Represented by the Executive Secretary of the Nigerian Press Council, Dr. Dili Ezughah, the minister noted that the initiative aligns with the Renewed Hope Agenda of President Bola Ahmed Tinubu, particularly in promoting transparency, civic engagement, and inclusive development.

"This marks the beginning of a transformative journey, not just for Nigeria, but for Africa and the global community. IMILI is more than an institution; it is a platform for collaboration, innovation, and measurable impact in media and information literacy," he said.

Discussions at the event, including goodwill messages and the presentation of IMILI's Strategic Plan (2026–2030), have provided a clear roadmap for the institute's operations and long-term sustainability.

The minister emphasised the need for a collective approach involving government, private sector, academia, media, civil society, and international partners, including UNESCO, to address the challenges of misinformation and declining public trust.

"The ability to think critically, verify information, and engage responsibly is fundamental to building resilient societies and safeguarding democratic institutions," he said.

Nigeria's hosting of the UNESCO Category 2 institute dedicated to media and information literacy was described as both a moment of national pride and a call for global responsibility.

The event brought together stakeholders from government, academia, and the communications sector, including former Minister of Information and Culture, Lai Mohammed; Vice Chancellor of the National Open University of Nigeria, Prof. Uduma Oji Uduma; Director of IMILI, Dr. Sharon Omotosho; and President of the Nigerian Institute of Public Relations, Dr. Ike Neliaku, among others.
```

**Note:** Paraphrased from TVC coverage for owned page; legal/comms should approve. Link to original via attribution component.

---

## `_data/imili/media-mentions.ts`

```ts
import { IMILI_IMAGES } from "./images";
import type { MediaMention } from "@/types/news";

export const mediaMentions: MediaMention[] = [
  {
    id: "unesco-abuja",
    outlet: "UNESCO",
    href: "https://www.unesco.org/en/articles/international-media-and-information-literacy-institute-under-auspices-unesco-launched-abuja",
    imageSrc: IMILI_IMAGES.mission.src,
    imageAlt: IMILI_IMAGES.mission.alt,
    headline: "IMILI launched in Abuja under UNESCO auspices",
    excerpt:
      "UNESCO formally welcomed the International Media and Information Literacy Institute as a Category 2 centre.",
  },
  {
    id: "arise-tv",
    outlet: "Arise TV",
    href: "https://www.arise.tv/nigeria-launches-worlds-first-media-literacy-institute-in-partnership-with-unesco/",
    imageSrc: IMILI_IMAGES.vision.src,
    imageAlt: IMILI_IMAGES.vision.alt,
    headline: "Nigeria launches world's first media literacy institute",
    excerpt:
      "Coverage of Nigeria's partnership with UNESCO to establish the international institute.",
  },
  {
    id: "fmino",
    outlet: "FMINO",
    href: "https://fmino.gov.ng/official-launch-and-unveiling-of-the-international-media-and-information-literacy-institute-imili/",
    imageSrc: IMILI_IMAGES.bgHero.src,
    imageAlt: IMILI_IMAGES.bgHero.alt,
    headline: "Official launch and unveiling of IMILI",
    excerpt:
      "Federal Ministry of Information and National Orientation unveils the institute.",
  },
  {
    id: "unesco-policy",
    outlet: "UNESCO",
    href: "https://www.unesco.org/en/articles/towards-african-media-and-information-literacy-policy-framework",
    imageSrc: IMILI_IMAGES.humans.src,
    imageAlt: IMILI_IMAGES.humans.alt,
    headline: "Towards African MIL policy framework",
    excerpt:
      "UNESCO advances dialogue on a regional media and information literacy policy framework.",
  },
];

/** Sidebar list excluding the outlet of the current article if desired */
export function getMediaMentionsForArticle(_slug: string): MediaMention[] {
  return mediaMentions;
}
```

---

## `NewsArticleLayout.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import { MediaMentionsSidebar } from "./MediaMentionsSidebar";
import type { NewsArticleData } from "@/types/news";

type Props = {
  data: NewsArticleData;
  slug: string;
  children: React.ReactNode; // MDX body or rendered paragraphs
};

export function NewsArticleLayout({ data, slug, children }: Props) {
  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Main column */}
          <div className="lg:col-span-7">
            <time className="text-sm font-medium text-muted-foreground">
              {formattedDate}
            </time>

            <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden">
              <Image
                src={data.heroImage}
                alt={data.heroImageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {data.title}
            </h1>

            <div className="prose prose-lg prose-neutral mt-8 max-w-none prose-a:text-primary prose-a:underline">
              {children}
            </div>

            {data.externalSourceUrl && (
              <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
                Source:{" "}
                <Link
                  href={data.externalSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline"
                >
                  {data.externalSourceLabel ?? "Original coverage"}
                </Link>
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="mt-12 lg:col-span-5 lg:mt-0">
            <div className="lg:sticky lg:top-28">
              <MediaMentionsSidebar slug={slug} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
```

---

## `MediaMentionCard.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import type { MediaMention } from "@/types/news";

export function MediaMentionCard({ mention }: { mention: MediaMention }) {
  return (
    <Link
      href={mention.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 border-b border-border py-6 first:pt-0"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-muted">
        <Image
          src={mention.imageSrc}
          alt={mention.imageAlt}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {mention.outlet}
        </p>
        <h3 className="mt-1 text-base font-bold leading-snug text-foreground group-hover:text-primary">
          {mention.headline}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {mention.excerpt}
        </p>
      </div>
    </Link>
  );
}
```

---

## `MediaMentionsSidebar.tsx`

```tsx
import { getMediaMentionsForArticle } from "@/_data/imili/media-mentions";
import { MediaMentionCard } from "./MediaMentionCard";

export function MediaMentionsSidebar({ slug }: { slug: string }) {
  const mentions = getMediaMentionsForArticle(slug);

  return (
    <section aria-labelledby="media-mentions-heading">
      <h2
        id="media-mentions-heading"
        className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
      >
        Latest Media Mentions
      </h2>
      <div className="mt-4">
        {mentions.map((m) => (
          <MediaMentionCard key={m.id} mention={m} />
        ))}
      </div>
    </section>
  );
}
```

---

## `app/news/[slug]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import { NewsArticleLayout } from "@/components/custom/imili/NewsArticleLayout";
import { getPublishedNewsPage, getPublishedNewsPages } from "@/lib/news-source";

export { generateMetadata } from "./metadata";

export function generateStaticParams() {
  return getPublishedNewsPages().map((p) => ({
    slug: p.url.replace("/news/", ""),
  }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPublishedNewsPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  return (
    <NewsArticleLayout data={page.data} slug={slug}>
      {MDX ? <MDX /> : null}
    </NewsArticleLayout>
  );
}
```

---

## `app/news/page.tsx`

```tsx
import type { Metadata } from "next";
import { siteConfig } from "@/_data/site-config";
import { NewsIndexSection } from "@/components/custom/imili/NewsIndexSection";

export const metadata: Metadata = {
  title: `News — ${siteConfig.name}`,
  description:
    "Press coverage, launches, and event reports on IMILI and media and information literacy.",
};

export default function NewsPage() {
  return <NewsIndexSection />;
}
```

`NewsIndexSection` lists cards from `getPublishedNewsPages()` — reuse `NewsBlogCard` with internal `href`s.

---

## Homepage wire-up

```ts
// _data/imili/article-cards.ts — update tvc-news item
{
  id: "tvc-news",
  href: "/news/fg-describes-imili-launch-as-milestone-against-misinformation",
  // ... rest unchanged
}
```

Optionally update `newsBlogHomepageContent` items similarly when those become owned pages.

---

## Metadata (`app/news/[slug]/metadata.ts`)

- `title`: frontmatter `title`
- `description`: frontmatter `description`
- `openGraph.type`: `article`
- `openGraph.images`: `[heroImage absolute URL]`
- `alternates.canonical`: `{siteUrl}/news/{slug}`

---

## File change summary

| File | Action |
| ---- | ------ |
| `news/content/fg-describes-....mdx` | CREATE |
| `types/news.ts` | CREATE |
| `lib/news-source.ts` | CREATE |
| `_data/imili/media-mentions.ts` | CREATE |
| `components/custom/imili/NewsArticleLayout.tsx` | CREATE |
| `components/custom/imili/MediaMentionCard.tsx` | CREATE |
| `components/custom/imili/MediaMentionsSidebar.tsx` | CREATE |
| `components/custom/imili/NewsIndexSection.tsx` | CREATE |
| `app/news/page.tsx` | CREATE |
| `app/news/[slug]/page.tsx` | CREATE |
| `app/news/[slug]/metadata.ts` | CREATE |
| `_data/imili/article-cards.ts` | UPDATE — `tvc-news` href |
| `public/news/fg-imili-launch-milestone.png` | CREATE |
| `source.config.ts` | UPDATE — news collection (if MDX) |
| `components/custom/imili/index.ts` | UPDATE — exports |

---

## Testing

| Check | Method |
| ----- | ------ |
| Layout | Visual compare to `./assets/news-article-reference.png` @ 1440px |
| Mobile | Sidebar stacks below @ 375px |
| Links | Homepage card → article; attribution → TVC; sidebar → externals |
| Build | `npm run build` exits 0 |
| SEO | View source — title, og:image, canonical |

---

## Coordination with feat-0029

| Scenario | Action |
| -------- | ------ |
| feat-0029 merged first | Add `news` collection to shared `source.config.ts`; share `fumadocs-mdx` scripts |
| feat-0030 first | Use `_data/imili/news/` fallback; migrate to MDX when feat-0029 lands |
| Both in parallel | Define `types/news.ts` + layout components first; plug MDX or data second |
