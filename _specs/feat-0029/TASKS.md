# feat-0029: Tasks — MDX Essays

Ordered checklist. Complete sequentially unless noted.

**Package manager:** `npm` (not pnpm).

---

## Phase 1 — Tooling

- [ ] **T1** Add dependencies: `fumadocs-mdx`, `fumadocs-core`, `fumadocs-ui`, `@mdx-js/react`, `@mdx-js/loader`, `@types/mdx`, `remark-gfm`, `@tailwindcss/typography`
  - **Verify:** `npm install` succeeds
  - **Files:** `package.json`, `package-lock.json`

- [ ] **T2** Update scripts: `dev`, `build`, `postinstall` to run `fumadocs-mdx` first
  - **Verify:** `npm run dev` generates `.source/index.ts`
  - **Files:** `package.json`

- [ ] **T3** Wrap `next.config.ts` with `createMDX()` from `fumadocs-mdx/next`
  - **Verify:** Next dev starts without MDX config errors
  - **Files:** `next.config.ts`

- [ ] **T4** Create `source.config.ts` with Zod schema including `draft` (see [TECH §2](./TECH.md#2-sourceconfigts))
  - **Verify:** `npx fumadocs-mdx` exits 0
  - **Files:** `source.config.ts`

- [ ] **T5** Update `tsconfig.json` — include `.source/**/*.ts`
  - **Files:** `tsconfig.json`

- [ ] **T6** Create `mdx-components.tsx` — fumadocs defaults + `YouTube` + Accordion
  - **Verify:** TypeScript compiles
  - **Files:** `mdx-components.tsx`, `components/mdx/youtube.tsx`

- [ ] **T7** Enable `@tailwindcss/typography` + optional `fumadocs-ui/css/neutral.css` if Callouts unstyled
  - **Files:** `app/globals.css`

- [ ] **T8** Commit generated `.source/index.ts` after first successful `fumadocs-mdx` run
  - **Files:** `.source/index.ts`

---

## Phase 2 — Data layer & site config

- [ ] **T9** Create `types/essay.ts` (include `draft?`)
  - **Files:** `types/essay.ts`

- [ ] **T10** Create `lib/essay-source.ts` — loader + `getPublishedEssayPages()` + `getPublishedEssayPage()`
  - **Verify:** publish filter excludes `draft: true` in production
  - **Files:** `lib/essay-source.ts`

- [ ] **T11** Update `_data/site-config.tsx` — `getCanonicalSiteUrl()`, `baseLinks.essays`, `absoluteOgImageUrl()`
  - **Files:** `_data/site-config.tsx`

- [ ] **T12** Update `app/layout.tsx` — `metadataBase`, title template, RSS alternate link
  - **Verify:** View source shows `metadataBase` and RSS link
  - **Files:** `app/layout.tsx`

---

## Phase 3 — Content

- [ ] **T13** Create `essays/content/who-is-imili.mdx` — full starter copy from [TECH §10](./TECH.md#10-launch-content--who-is-imilmdx)
  - **Verify:** listed in `.source/index.ts`
  - **Files:** `essays/content/who-is-imili.mdx`

- [ ] **T14** Add thumbnail `public/essays/who-is-imili.png` (or `IMILI_IMAGES` path in frontmatter)
  - **Verify:** image returns 200
  - **Files:** `public/essays/who-is-imili.png`

---

## Phase 4 — UI components

- [ ] **T15** Create `components/essay-card.tsx`
  - **Files:** `components/essay-card.tsx`

- [ ] **T16** Create `components/tag-filter.tsx` — desktop pills; mobile Accordion (no Drawer)
  - **Files:** `components/tag-filter.tsx`

- [ ] **T17** Create `components/sections/essays.tsx` — published-only list, sort, filter, empty states
  - **Files:** `components/sections/essays.tsx`

- [ ] **T18** Port `components/table-of-contents.tsx`
  - **Files:** `components/table-of-contents.tsx`

- [ ] **T19** Create `components/essay-mobile-toc.tsx` — Accordion + floating trigger
  - **Files:** `components/essay-mobile-toc.tsx`

- [ ] **T20** Port `components/essay-share-buttons.tsx` — IMILI social URLs from `siteConfig.links`
  - **Files:** `components/essay-share-buttons.tsx`

- [ ] **T21** Port `components/hash-scroll-handler.tsx`
  - **Files:** `components/hash-scroll-handler.tsx`

- [ ] **T22** Port `components/read-more-section.tsx` — hide when `<2` other published essays
  - **Files:** `components/read-more-section.tsx`

---

## Phase 5 — Routes

- [ ] **T23** Create `app/essays/page.tsx` with full metadata (OG + Twitter)
  - **Verify:** `GET /essays` → 200
  - **Files:** `app/essays/page.tsx`

- [ ] **T24** Create `app/essays/[slug]/page.tsx` — full layout per [PRODUCT D4](./PRODUCT.md#d4--essay-page-layout)
  - **Verify:** `GET /essays/who-is-imili` → 200
  - **Files:** `app/essays/[slug]/page.tsx`

- [ ] **T25** Add `generateStaticParams` using `getPublishedEssayPages()` (**required**)
  - **Verify:** `npm run build` pre-renders essay routes

- [ ] **T26** Create `app/essays/[slug]/metadata.ts` — article OG + Twitter + canonical
  - **Files:** `app/essays/[slug]/metadata.ts`

- [ ] **T27** Add JSON-LD `Article` to essay page (inline or `json-ld.tsx`)
  - **Verify:** Rich results test / view-source shows `application/ld+json`

- [ ] **T28** Create `app/essays/feed/route.ts` — published essays only
  - **Verify:** `GET /essays/feed` valid RSS with who-is-imili

- [ ] **T29** Create or update `app/sitemap.ts` — include `/essays` + published slugs
  - **Verify:** `/sitemap.xml` contains `/essays/who-is-imili`

---

## Phase 6 — Site integration

- [ ] **T30** Add **Essays** to `_data/imili/header-nav.ts` (after News)
  - **Files:** `_data/imili/header-nav.ts`

- [ ] **T31** Update `components/custom/header.tsx` + `mobile-nav-drawer.tsx` — active state for `/essays/*`
  - **Verify:** Essays highlighted on essay pages
  - **Files:** `components/custom/header.tsx`, `components/custom/mobile-nav-drawer.tsx`

- [ ] **T32** Confirm footer Pages column lists Essays (auto via `headerNavItems` — no change if T30 done)
  - **Verify:** Footer link works

---

## Phase 7 — QA and ship

- [ ] **T33** `npm run build` — production build passes
- [ ] **T34** Manual QA — all [PRODUCT acceptance criteria](./PRODUCT.md#acceptance-criteria)
- [ ] **T35** Content team sign-off on `who-is-imili.mdx` prose (or confirm starter copy acceptable for v1)
- [ ] **T36** Vercel preview deploy — confirm `postinstall` regenerates `.source` on CI

---

## Definition of done

All acceptance criteria in [PRODUCT.md](./PRODUCT.md#acceptance-criteria) pass, `npm run build` succeeds, `/essays/who-is-imili` is reachable from header and footer, and sitemap/RSS/JSON-LD are live.
