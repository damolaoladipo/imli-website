# feat-0030: Tasks — News article (TVC / FG IMILI launch)

**Reference:** `./assets/news-article-reference.png`

---

## Phase 1 — Data & types

- [ ] **T1** Create `types/news.ts` — `NewsArticleData`, `NewsPage`, `MediaMention`
- [ ] **T2** Create `_data/imili/media-mentions.ts` — 4 sidebar items from nav press links
- [ ] **T3** Add launch content — MDX **or** `_data/imili/news/fg-describes-imili-launch.ts` fallback
- [ ] **T4** Create `lib/news-source.ts` (or wire into shared fumadocs config if feat-0029 merged)
- [ ] **T5** Add hero image `public/news/fg-imili-launch-milestone.png` (or `IMILI_IMAGES.humans` interim)

---

## Phase 2 — Layout components

- [ ] **T6** Create `MediaMentionCard.tsx` — thumbnail, outlet, headline, excerpt
- [ ] **T7** Create `MediaMentionsSidebar.tsx` — "Latest Media Mentions" heading + card list
- [ ] **T8** Create `NewsArticleLayout.tsx` — date → hero → H1 → body → source attribution | sidebar
  - **Verify:** Matches reference two-column structure @ `lg+`
- [ ] **T9** Create `NewsIndexSection.tsx` — `/news` list (reuse `NewsBlogCard` or row variant)

---

## Phase 3 — Routes

- [ ] **T10** Create `app/news/[slug]/page.tsx` + `generateStaticParams`
  - **Verify:** `/news/fg-describes-imili-launch-as-milestone-against-misinformation` → 200
- [ ] **T11** Create `app/news/[slug]/metadata.ts` — article OG + canonical
- [ ] **T12** Create `app/news/page.tsx` — index metadata + `NewsIndexSection`
  - **Verify:** `/news` → 200

---

## Phase 4 — Integration

- [ ] **T13** Update `articleCardHomepageItems` `tvc-news.href` → internal article URL
- [ ] **T14** Export new components from `components/custom/imili/index.ts`
- [ ] **T15** Enable `@tailwindcss/typography` if not already (feat-0029 T6)

---

## Phase 5 — QA

- [ ] **T16** Visual QA @ 1440px against `./assets/news-article-reference.png`
- [ ] **T17** Mobile QA @ 375px — single column, sidebar below body
- [ ] **T18** Comms sign-off on paraphrased body + TVC attribution
- [ ] **T19** `npm run build` passes

---

## Definition of done

[PRODUCT acceptance criteria](./PRODUCT.md#acceptance-criteria) pass; homepage TVC card opens owned article; sidebar shows external media mentions.
