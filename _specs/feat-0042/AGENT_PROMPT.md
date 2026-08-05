# Agent prompt: Implement IMILI recurring newsletter (feat-0042)

Use this prompt with an agent to implement the newsletter system. Specs are normative.

---

Implement **feat-0042** for the IMILI Next.js App Router site.

## Specs (read first)

- `_specs/feat-0042/PRODUCT.md`
- `_specs/feat-0042/TECH.md`
- `_specs/feat-0042/TASKS.md`

## Why

`/resources/newsletter` is linked in the header but has no page yet. We need a **recurring newsletter archive** so each edition gets a **shareable page URL**. The maiden PDF already exists at:

`public/docs/IMILI-newsletter-april-july-2026.pdf`

## Share link rule (important)

When stakeholders ask “How do we get the link to post?” the answer is the **edition page**, not the PDF:

- Local: `http://localhost:3000/resources/newsletter/imili-newsletter-april-july-2026`
- Production: `{siteConfig.url}/resources/newsletter/imili-newsletter-april-july-2026`

Never hardcode localhost or a production domain into newsletter data. Build absolute URLs from `siteConfig.url`.

## Maiden edition content (normative)

- Title: IMILI Newsletter  
- Edition: Maiden Edition  
- Period: April to July 2026  
- Slug: `imili-newsletter-april-july-2026`  
- Description: *We invite you to read and share the inaugural IMILI Newsletter (April to July 2026), which captures key milestones since the official launch of the world's first UNESCO Category 2 Institute dedicated to MIL.*  
- PDF: `/docs/IMILI-newsletter-april-july-2026.pdf`  
- Tags: IMILI, MediaAndInformationLiteracy, MIL, InformationIntegrity, AI, DigitalLiteracy, UNESCO, Africa, CriticalThinking, Democracy, Innovation, AfAXP, Imilinstitute  
- publishedAt: `2026-07-31`

## Implementation constraints

1. Inspect existing `/projects` and `/news` patterns before coding.  
2. Store editions in `_data/imili/newsletters.ts` (TypeScript array + getters).  
3. Dynamic route `app/resources/newsletter/[slug]` — do **not** create one page file per edition.  
4. Listing sorts by `publishedAt` descending.  
5. PDF: simple iframe embed + download link; **no** new PDF.js dependency.  
6. Share: Web Share API where available + copy-link fallback; copied URL = detail page.  
7. `generateMetadata` with title, description, canonical, Open Graph, Twitter — use existing `absoluteOgImageUrl` / `siteConfig`.  
8. Invalid slug → `notFound()`.  
9. Update `app/sitemap.ts`.  
10. Match existing IMILI UI (Projects/News card style). Do not redesign unrelated pages.  
11. Do not wire email subscribe / Resend.  

## Future editions workflow (document in PR)

1. Add PDF under `public/docs/`.  
2. Append one record to `newsletters`.  
3. Deploy.  
4. Post `/resources/newsletter/<slug>` on social.

## Done when

- Build passes (`npm run build`)  
- Maiden listing + detail work locally  
- Share copies the detail URL  
- Report: files touched, local URL, production URL pattern, how to add next edition  

Implement the code; do not stop at explanation.
