# feat-0019: Tasks — Dual-card forest footer

**Gate:** [PRODUCT.md](./PRODUCT.md) reviewed.

**Skills:** [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) → [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md).

**Reference:** `./assets/forest-footer-reference.png` (1024×396). QA @ **1440px** width.

---

## Task 1 — Content model

- [ ] Create `_data/imili/forest-footer.ts`
  - **Acceptance:** `forestFooterReferenceContent` + `forestFooterHomepageContent` per [TECH.md](./TECH.md)
  - **Verify:** Reference strings match [PRODUCT](./PRODUCT.md#reference-strings-layout-qa-only--do-not-ship-for-imili); background uses `/new/vision.png` interim
  - **Files:** `_data/imili/forest-footer.ts`

---

## Task 2 — `ForestFooter` component

- [ ] Create `components/custom/imili/ForestFooter.tsx`
  - **Acceptance:** Forest bg + two cards + bridge + left newsletter + right 2×2 grid ([PRODUCT D3–D6](./PRODUCT.md#d3--background))
  - **Verify:** Inset green Subscribe; 3 social icons; Pages has 2 link columns
  - **Files:** `ForestFooter.tsx`

---

## Task 3 — Wrapper + export

- [ ] Create `components/custom/forest-footer.tsx`
- [ ] Export `ForestFooter` from `components/custom/imili/index.ts`
  - **Files:** `forest-footer.tsx`, `index.ts`

---

## Task 4 — Layout swap

- [ ] Update `app/layout.tsx` to use `ForestFooterSection`
  - **Acceptance:** `ImiliFooter.tsx` **not modified**; global footer shows new design
  - **Files:** `app/layout.tsx`

---

## Task 5 — Build + pixel QA

- [ ] `npm run build` + overlay QA
  - **Acceptance:** [PRODUCT acceptance criteria](./PRODUCT.md#acceptance-criteria)

---

## Out of scope

- Editing `ImiliFooter.tsx` or feat-0017 files
- Forest photo asset (until product adds to `public/`)
- IMILI newsletter copy (production `TBD` fields)
- Scroll-to-top, LinkedIn, Twitter icons
