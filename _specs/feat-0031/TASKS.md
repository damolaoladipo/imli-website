# feat-0031: Tasks — Unsplash stock images

**Reference:** [PRODUCT.md](./PRODUCT.md) inventory tables

---

## Phase 1 — Registry & attribution scaffold

- [ ] **T1** Create `public/stock/` directory
- [ ] **T2** Create `_data/imili/image-attributions.ts` with `ImageAttribution` type
- [ ] **T3** Create `_specs/feat-0031/assets/attributions.md` download log template
- [ ] **T4** Update `_data/imili/images.ts` paths to `/stock/*.jpg` (alts per PRODUCT)

---

## Phase 2 — Core four (Unsplash)

For each slot, search Unsplash per PRODUCT terms, download, optimize, commit, log attribution.

- [ ] **T5** `bg-hero.jpg` → `IMILI_IMAGES.bgHero`
- [ ] **T6** `humans.jpg` → `IMILI_IMAGES.humans`
- [ ] **T7** `mission.jpg` → `IMILI_IMAGES.mission`
- [ ] **T8** `vision.jpg` → `IMILI_IMAGES.vision`
  - **Verify:** Homepage About, bento tiles, mega-menus show new art

---

## Phase 3 — Hero & OG

- [ ] **T9** Source + add `hero-lobby.jpg`
- [ ] **T10** Update `photo-hero.ts` and `background-photo-hero.ts` (+ meaningful `backgroundImage.alt`)
- [ ] **T11** Crop `og-default.jpg` 1200×630; update `site-config.tsx` `ogImage`

---

## Phase 4 — News

- [ ] **T12** Source + add `news-tvc-launch.jpg`
- [ ] **T13** Update `news/content/fg-describes-imili-launch-as-milestone-against-misinformation.mdx` `heroImage` + alt
  - **Verify:** `/news/fg-describes-imili-launch-as-milestone-against-misinformation` hero @ 1440px

---

## Phase 5 — Cleanup & QA

- [ ] **T14** `rg '/new/|/blocks/hero\.jpeg'` — migrate or delete stale references in **in-scope** files
- [ ] **T15** Fix `about-us.tsx` default `imageSrc` to use `IMILI_IMAGES` import
- [ ] **T16** `npm run build` — no missing image 404s in build output
- [ ] **T17** Visual QA: homepage, all mega-menus, news index + article, OG meta

---

## Phase 6 — Optional v1.1

- [ ] **T18** Dedicated testimonial portraits (`testimonial-portrait-01` …)
- [ ] **T19** Unique thumbnails per homepage article card
- [ ] **T20** Gallery grid `gallery-01` … `gallery-12` when `/gallery` ships
- [ ] **T21** Public `/credits` page listing `imageAttributions`
