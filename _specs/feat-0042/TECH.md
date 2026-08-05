# feat-0042: TECH — Newsletter archive + edition pages

## Current repo facts

| Fact | Detail |
| ---- | ------ |
| Router | Next.js App Router under `app/` |
| Newsletter route today | **Missing** — `/resources/newsletter` hits `not-found` / Under Construction |
| Nav | `_data/imili/header-nav.ts` → `href: "/resources/newsletter"` |
| PDF | `public/docs/IMILI-newsletter-april-july-2026.pdf` → public URL `/docs/IMILI-newsletter-april-july-2026.pdf` |
| Site URL | `siteConfig.url` from `NEXT_PUBLIC_SITE_URL` (fallback in `_data/site-config.tsx`) |
| Pattern to mirror | `/projects` index + `/projects/[...slug]` detail; `/news` index |

## Files to create / modify

| File | Action |
| ---- | ------ |
| `_data/imili/newsletters.ts` | CREATE — type + editions array + getters |
| `app/resources/newsletter/page.tsx` | CREATE — listing + metadata |
| `app/resources/newsletter/[slug]/page.tsx` | CREATE — detail + `generateStaticParams` |
| `app/resources/newsletter/[slug]/metadata.ts` | CREATE — SEO / OG |
| `components/custom/imili/NewsletterIndexSection.tsx` | CREATE — archive UI |
| `components/custom/imili/NewsletterDetailSection.tsx` | CREATE — detail + embed + actions |
| `components/custom/imili/NewsletterShareButton.tsx` | CREATE — client share/copy |
| `app/sitemap.ts` | MODIFY — add `/resources/newsletter` + edition URLs |
| `_data/site-config.tsx` | OPTIONAL — `baseLinks.newsletter` |
| `_specs/feat-0042/*` | CREATE |

## Maiden record (normative)

```ts
{
  id: "imili-newsletter-april-july-2026",
  title: "IMILI Newsletter",
  edition: "Maiden Edition",
  slug: "imili-newsletter-april-july-2026",
  period: "April to July 2026",
  description:
    "We invite you to read and share the inaugural IMILI Newsletter (April to July 2026), which captures key milestones since the official launch of the world's first UNESCO Category 2 Institute dedicated to MIL.",
  publishedAt: "2026-07-31",
  pdfUrl: "/docs/IMILI-newsletter-april-july-2026.pdf",
  tags: [
    "IMILI",
    "MediaAndInformationLiteracy",
    "MIL",
    "InformationIntegrity",
    "AI",
    "DigitalLiteracy",
    "UNESCO",
    "Africa",
    "CriticalThinking",
    "Democracy",
    "Innovation",
    "AfAXP",
    "Imilinstitute",
  ],
  featured: true,
}
```

## Share URL helper

```ts
const shareUrl = `${siteConfig.url.replace(/\/$/, "")}/resources/newsletter/${slug}`;
```

## PDF embed

Prefer:

```tsx
<iframe
  src={edition.pdfUrl}
  title={`${edition.title} — ${edition.period}`}
  className="h-[70vh] w-full rounded-sm border border-border"
/>
```

Plus Download `<a href={pdfUrl} download>` / `target="_blank"`.

## Verification

```bash
npm run build
```

Manual:

1. `/resources/newsletter` — maiden card visible  
2. `/resources/newsletter/imili-newsletter-april-july-2026` — copy, embed, download, share  
3. Copy link = detail path, not `/docs/...`  
4. `/resources/newsletter/does-not-exist` → 404  
5. Confirm OG tags in page metadata
