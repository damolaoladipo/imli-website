# feat-0042: Recurring IMILI Newsletter publication system

## Summary

Add a **reusable newsletter archive** at `/resources/newsletter` with per-edition detail URLs so the content team can publish each issue and **share one stable page link** (not the raw PDF).

| Route | Purpose |
| ----- | ------- |
| `/resources/newsletter` | Archive — all editions, newest first |
| `/resources/newsletter/[slug]` | Edition detail — shareable URL, reader, download, share |
| `/docs/<file>.pdf` | Static PDF asset (download / embed only) |

**Maiden edition PDF (already in repo):** `public/docs/IMILI-newsletter-april-july-2026.pdf`

**Related:** header Resources → Newsletter (`_data/imili/header-nav.ts`), project patterns from news/projects indices.

---

## How do we get the link to post?

**Post this (shareable page):**

| Environment | URL |
| ----------- | --- |
| Local | `http://localhost:3000/resources/newsletter/imili-newsletter-april-july-2026` |
| Production | `{siteConfig.url}/resources/newsletter/imili-newsletter-april-july-2026` |

Example when `NEXT_PUBLIC_SITE_URL` / site config resolves to the live host:

`https://www.imilinstitute.org/resources/newsletter/imili-newsletter-april-july-2026`  
(or whatever host is configured — **never hardcode localhost** in data or social posts)

**Do not post as the primary link:**

`/docs/IMILI-newsletter-april-july-2026.pdf`

Use the PDF URL only for download/view. The page URL carries branding, description, hashtags, OG preview, and analytics.

---

## Assumptions

1. **App Router** + TypeScript data file under `_data/imili/` (same family as article cards / about-us page data) — not a new CMS for v1.
2. One dynamic detail route `[slug]`; **no** new page file per edition.
3. Maiden edition copy and tags are **normative** (see Content).
4. PDF already exists at `/docs/IMILI-newsletter-april-july-2026.pdf`; do not re-upload unless replacing the file.
5. Embed PDF with a simple `<iframe>` (or object) — **no** new PDF.js dependency unless existing code already provides a viewer.
6. Share = Web Share API when available + copy-link fallback; shared URL is the **detail page**.
7. Metadata via existing Next.js `generateMetadata` + `siteConfig.url` / `absoluteOgImageUrl`.
8. Invalid slugs → `notFound()`.
9. Visual language matches Projects/News index cards (no new purple/cream “AI brochure” look).
10. Footer “newsletter subscribe” UI is **out of scope** (email capture stays as-is).

---

## Content (maiden edition — normative)

| Field | Value |
| ----- | ----- |
| Title | IMILI Newsletter |
| Edition | Maiden Edition |
| Period | April to July 2026 |
| Slug | `imili-newsletter-april-july-2026` |
| Description | We invite you to read and share the inaugural IMILI Newsletter (April to July 2026), which captures key milestones since the official launch of the world's first UNESCO Category 2 Institute dedicated to MIL. |
| PDF | `/docs/IMILI-newsletter-april-july-2026.pdf` |
| Tags | IMILI, MediaAndInformationLiteracy, MIL, InformationIntegrity, AI, DigitalLiteracy, UNESCO, Africa, CriticalThinking, Democracy, Innovation, AfAXP, Imilinstitute |
| `publishedAt` | `2026-07-31` (ISO; sort key) |

Social post body may append hashtags as `#Tag` when sharing; store tags without `#` in data.

---

## Data model

```ts
export type NewsletterEdition = {
  id: string;
  title: string;
  edition: string;
  slug: string;
  period: string;
  description: string;
  publishedAt: string; // ISO date YYYY-MM-DD
  pdfUrl: string;
  tags: readonly string[];
  featured?: boolean;
};
```

File: `_data/imili/newsletters.ts`  
Helpers: `getPublishedNewsletters()`, `getNewsletterBySlug(slug)`, sort by `publishedAt` descending.

---

## UX

### Listing `/resources/newsletter`

- H1: IMILI Newsletter
- Short intro (archive of institute editions)
- Cards newest-first: edition, period, description excerpt, **Read**, **Download PDF**

### Detail `/resources/newsletter/[slug]`

- Title, edition, period, description, tags
- Actions: Read/View (scroll or focus embed), Download, Share (copy + native share)
- Desktop: PDF embed; mobile: embed or prominent open/download (must not break layout)
- SEO title example: `IMILI Newsletter | Maiden Edition | April to July 2026`

---

## Adding the next edition (workflow)

1. Put PDF in `public/docs/` (e.g. `IMILI-newsletter-aug-oct-2026.pdf`).
2. Append one object to `newsletters` with new `slug`, `period`, `publishedAt`, `pdfUrl`, copy.
3. Deploy — listing updates; detail URL is `/resources/newsletter/<slug>`.
4. **Post the detail URL** from production, not localhost and not the raw PDF.

---

## Acceptance criteria

- [x] Spec feat-0042 complete (PRODUCT + TECH + TASKS)
- [x] `/resources/newsletter` lists maiden edition
- [x] `/resources/newsletter/imili-newsletter-april-july-2026` works with metadata, download, share, PDF access
- [x] Share copies detail page URL (not PDF)
- [x] Invalid slug → 404
- [x] Future editions = data + PDF only
- [x] Sitemap includes newsletter index + editions
- [x] Header Newsletter link resolves to real page (not Under Construction alone)
- [x] `npm run build` passes

---

## Out of scope

- Email subscribe / Resend / mailing list backend
- CMS admin UI
- MOOCs / annual reports / publications pages
- Redesigning footer newsletter form
- Hardcoding localhost or production domains in newsletter records
