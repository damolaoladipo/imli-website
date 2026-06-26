# feat-0033: Tasks — About Us sections

**References:** `./assets/what-we-are-reference.png`, `./assets/vision-reference.png`, `./assets/mission-reference.png`

---

## Phase 0 — Assets and decisions

- [ ] **T0** Save user screenshots to `_specs/feat-0033/assets/` (what-we-are, vision, mission)
- [ ] **T1** Compare `mission-reference.png` to [feat-0016](../feat-0016/assets/mission-section-reference.png) — choose **split** vs **mission-grid**
- [ ] **T2** Comms sign-off on [normative copy](../PRODUCT.md#normative-copy)

---

## Phase 1 — Data

- [ ] **T3** Extend `_data/imili/about-us-page.ts` — `whatWeAre`, `vision`, `mission` with normative strings
- [ ] **T4** Add `STOCK_IMAGES.aboutUs.*` keys in `images.ts` when production files exist (QA placeholders OK for T3)
- [ ] **T5** Update `image-attributions.ts` when final stock files assigned

---

## Phase 2 — Components

- [ ] **T6** Create `AboutSplitSection.tsx` — two-column text + image, `layout` prop
  - **Verify:** Text-first and image-first @ 1440px
- [ ] **T7** Create `AboutWhatWeAreSection.tsx` — wrapper using `AboutSplitSection`
- [ ] **T8** Create `AboutVisionSection.tsx` — wrapper, `image-first` layout
- [ ] **T9** Create `AboutMissionSection.tsx` — split **or** `MissionSection` reuse per T1 decision
- [ ] **T10** Export new components from `components/custom/imili/index.ts`

---

## Phase 3 — Routes and integration

- [ ] **T11** Wire sections on `app/about-us/page.tsx` below intro
  - **Verify:** `/about-us` shows all five blocks in order
- [ ] **T12** Add `app/about/page.tsx` redirect to `/about-us` (recommended)
- [ ] **T13** Update `header-nav.ts` + `site-config.tsx` `baseLinks.about` to `/about-us`
- [ ] **T14** Add `/about-us` to `app/sitemap.ts`

---

## Phase 4 — QA

- [ ] **T15** Visual QA — What We Are vs `what-we-are-reference.png` @ 1440px
- [ ] **T16** Visual QA — Vision vs `vision-reference.png` @ 1440px
- [ ] **T17** Visual QA — Mission vs `mission-reference.png` @ 1440px
- [ ] **T18** Mobile QA @ 375px — no overflow, readable stack
- [ ] **T19** Anchor links `#what-we-are`, `#vision`, `#mission` work with sticky header offset
- [ ] **T20** `npm run build` passes

---

## Definition of done

[PRODUCT acceptance criteria](./PRODUCT.md#acceptance-criteria) pass; `/about-us` tells the full What We Are / Vision / Mission story; `/about` no longer 404s from navigation.
