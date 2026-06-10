# feat-0016: Tasks — Mission split section

**Gate:** Do not implement until [PRODUCT.md](./PRODUCT.md) is reviewed.

**Skills:** [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) → [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) → [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md).

**Reference:** `./assets/mission-section-reference.png` (1024×396). QA @ **1440px** width.

---

## Task 1 — Content model

- [ ] Create `_data/imili/mission-section.ts`
  - **Acceptance:** Exports `MissionSectionContent`, `missionSectionReferenceContent`, `missionSectionHomepageContent` per [TECH.md](./TECH.md)
  - **Verify:** Reference strings match [PRODUCT reference strings](./PRODUCT.md#reference-strings-layout-qa-only--do-not-ship-for-imili); production `heading` / `description` / `stat` are `TBD`; images use only `public/` paths
  - **Files:** `_data/imili/mission-section.ts`

---

## Task 2 — `MissionPhotoTile`

- [ ] Create `components/custom/imili/MissionPhotoTile.tsx`
  - **Acceptance:** `next/image` `fill` + `object-cover`; `rounded-[25px]`; optional green swirl SVG overlay ([PRODUCT D7](./PRODUCT.md#d7--decorative-swirl-on-primary-photo))
  - **Verify:** Primary tile shows swirl; secondary tile does not
  - **Files:** `MissionPhotoTile.tsx`

---

## Task 3 — `MissionStatTile`

- [ ] Create `components/custom/imili/MissionStatTile.tsx`
  - **Acceptance:** Light `#F3F4F6` card; centered `HeartHandshake` + value + label ([PRODUCT D6](./PRODUCT.md#stat-card))
  - **Verify:** Card is **not** dark `BentoStatTile` styling
  - **Files:** `MissionStatTile.tsx`

---

## Task 4 — `MissionSection` shell

- [ ] Create `components/custom/imili/MissionSection.tsx`
  - **Acceptance:** White section; left column (badge with green icon disc, H2, description, reference CTA pill); right 2×2 grid with 3 cells ([PRODUCT D3–D5](./PRODUCT.md#d3--section-shell))
  - **Verify:** Badge uses green disc + white icon; CTA is reference green pill (not `CustomButton`)
  - **Files:** `MissionSection.tsx`

---

## Task 5 — Barrel export

- [ ] Export `MissionSection` from `components/custom/imili/index.ts`
  - **Acceptance:** Named export available to `app/page.tsx`
  - **Verify:** `import { MissionSection } from "@/components/custom/imili"` resolves
  - **Files:** `index.ts`

---

## Task 6 — Homepage wire-up

- [ ] Add `MissionSection` to `app/page.tsx`
  - **Acceptance:** Renders after `AboutUs`, before `ArticleCardGrid` ([PRODUCT R2](./PRODUCT.md#r2--homepage-stack))
  - **Verify:** Homepage shows mission section at `/`
  - **Files:** `app/page.tsx`

---

## Task 7 — Build + pixel QA

- [ ] Run build and overlay QA
  - **Acceptance:** All [PRODUCT acceptance criteria](./PRODUCT.md#acceptance-criteria) pass
  - **Verify:**
    ```bash
    npm run build
    npm run dev
    ```
    Overlay `./assets/mission-section-reference.png` at 1440px — badge, grid, stat card, swirl, CTA within ±2 px
  - **Files:** none (verification only)

---

## Out of scope (do not add during implement)

- Site header / footer inside section
- Second CTA, carousel, tabs, ratings
- Fourth grid cell
- `CustomButton` for QA CTA
- Fabricated IMILI stats (“200+ volunteers”) on production homepage
- New image files under `public/` without product approval
