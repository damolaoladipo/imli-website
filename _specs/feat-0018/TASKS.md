# feat-0018: Tasks — Homepage IMILI content (data only)

**Gate:** [PRODUCT.md](./PRODUCT.md) reviewed. **No `components/` edits.**

---

## Task 1 — `homepage.ts`

- [ ] Create `_data/imili/homepage.ts` per [TECH §1](./TECH.md#1-_dataimilhomepage.ts-create)
  - **Acceptance:** Slides 1–2, about, documentary (`embedUrl: ""`)
  - **Verify:** File exports `imiliHomepageContent`
  - **Files:** `_data/imili/homepage.ts`

---

## Task 2 — What We Do data

- [ ] Add `servicesHomepageContent` to `_data/imili/services.ts`
  - **Acceptance:** 4 boxes, normative copy, `/what-we-do#*` hrefs
  - **Verify:** `servicesHomepageContent.items.length === 4`
  - **Files:** `_data/imili/services.ts`

---

## Task 3 — Latest Updates data

- [ ] Complete `articleCardHomepageItems` + `articleCardGridHomepageContent`
  - **Acceptance:** 5 URLs; titles/snippets from [PRODUCT](./PRODUCT.md#carousel-5--latest-updates)
  - **Verify:** No `TBD` in `title` or `summary` fields
  - **Files:** `_data/imili/article-cards.ts`

---

## Task 4 — Site config

- [ ] Update `_data/site-config.tsx` contact/links
  - **Acceptance:** Email confirmed; social/phone/address `""` if unknown
  - **Files:** `_data/site-config.tsx`

---

## Task 5 — Page wiring

- [ ] Update `app/page.tsx` imports and props only
  - **Acceptance:** `servicesHomepageContent`, `articleCardGridHomepageContent`, `imiliHomepageContent.about` for `AboutUs`
  - **Verify:** No component imports added/removed except data paths
  - **Files:** `app/page.tsx`

---

## Task 6 — Assets (when supplied)

- [ ] Copy `New Frontiers Banner (Finale).png` → `public/brand/new-frontiers-banner-finale.png`
  - **Acceptance:** File exists; `homepage.ts` slide 2 `imageSrc` resolves
  - **Files:** `public/brand/new-frontiers-banner-finale.png`

---

## Task 7 — Build

- [ ] `npm run build`
  - **Acceptance:** [PRODUCT acceptance criteria](./PRODUCT.md#acceptance-criteria)
