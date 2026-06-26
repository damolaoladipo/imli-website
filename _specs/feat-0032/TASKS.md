# feat-0032: Tasks — MDX Projects (`/projects`, AFAX-P)

Ordered checklist. Complete sequentially unless noted.

**Package manager:** `npm`.

---

## Phase 1 — Data layer

- [ ] **T1** Extend `source.config.ts` — add `projectDocs` / `projectMeta` collection (see [TECH §1](./TECH.md#1-sourceconfigts--projects-collection))
  - **Verify:** `npx fumadocs-mdx` exits 0
  - **Files:** `source.config.ts`, `.source/`

- [ ] **T2** Create `types/project.ts`
  - **Files:** `types/project.ts`

- [ ] **T3** Create `lib/project-source.ts` — mirror `lib/news-source.ts`
  - **Verify:** TypeScript compiles; imports resolve from `@/.source/server`
  - **Files:** `lib/project-source.ts`

- [ ] **T4** Update `_data/site-config.tsx` — `baseLinks.projects: "/projects"`
  - **Files:** `_data/site-config.tsx`

---

## Phase 2 — Content

- [ ] **T5** Create `projects/content/africa-against-xenophobia-project.mdx` — full copy from [TECH §10](./TECH.md#10-launch-content--africa-against-xenophobia-projectmdx)
  - **Verify:** Listed in `.source/index.ts` after `fumadocs-mdx`
  - **Files:** `projects/content/africa-against-xenophobia-project.mdx`

- [ ] **T6** Confirm hero image `/stock/nav-activities-1.jpg` exists (or update path to `STOCK_IMAGES`)
  - **Verify:** Image returns 200 in dev

---

## Phase 3 — UI components

- [ ] **T7** Create `ProjectSubmissionSidebar.tsx` — deadlines, word limit, mailto CTA
  - **Files:** `components/custom/imili/ProjectSubmissionSidebar.tsx`

- [ ] **T8** Create `ProjectDetailLayout.tsx` — breadcrumb, hero, badge, prose, sidebar
  - **Files:** `components/custom/imili/ProjectDetailLayout.tsx`

- [ ] **T9** Create `ProjectsIndexSection.tsx` — sorted cards, status badge, empty state
  - **Files:** `components/custom/imili/ProjectsIndexSection.tsx`

- [ ] **T10** Export new components from `components/custom/imili/index.ts`
  - **Files:** `components/custom/imili/index.ts`

---

## Phase 4 — Routes

- [ ] **T11** Create `app/projects/page.tsx` with metadata
  - **Verify:** `/projects` renders index
  - **Files:** `app/projects/page.tsx`

- [ ] **T12** Create `app/projects/[slug]/metadata.ts`
  - **Files:** `app/projects/[slug]/metadata.ts`

- [ ] **T13** Create `app/projects/[slug]/page.tsx` — `generateStaticParams`, JSON-LD, layout
  - **Verify:** `/projects/africa-against-xenophobia-project` renders full content
  - **Files:** `app/projects/[slug]/page.tsx`

- [ ] **T14** Update `app/sitemap.ts` — `/projects` + project slugs
  - **Files:** `app/sitemap.ts`

---

## Phase 5 — Navigation

- [ ] **T15** Update `_data/imili/header-nav.ts` — **Combating xenophobia** → `/projects/africa-against-xenophobia-project`
  - **Verify:** Mega menu link resolves in dev
  - **Files:** `_data/imili/header-nav.ts`

---

## Phase 6 — QA

- [ ] **T16** `npm run build` — no MDX/schema errors
- [ ] **T17** Manual pass — all [PRODUCT acceptance criteria](./PRODUCT.md#acceptance-criteria)
- [ ] **T18** Spot-check mailto link: `info@imilinstitute.org?subject=GJMIL`

---

## Definition of done

- `/projects` and `/projects/africa-against-xenophobia-project` live
- AFAX-P legacy copy complete with references
- Activities nav deep-links to project page
- Build green; sitemap includes project URLs
