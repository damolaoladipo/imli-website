# feat-0035: What We Do — feature pillar cards

## Summary

Redesign `/what-we-do` pillar blocks to match the reference layout: **dark rounded feature cards** with title + description on one side and a photo panel on the other. No CTA button.

| Route | Component |
| ----- | --------- |
| `/what-we-do` | `WhatWeDoPillarsSection` (redesign) |

**Design reference:** dark UI feature block — text left (~40%), visual right (~60%), alternating on desktop.

**Related:** [feat-0018](../feat-0018/PRODUCT.md) (nav anchors), existing `_data/imili/what-we-do-page.ts`.

---

## Assumptions

1. Copy is **normative** — five pillars exactly as provided; no invented text.
2. No button or link inside each card.
3. Section `id` anchors match header nav (`#research-analysis`, etc.).
4. Images use existing `STOCK_IMAGES` assets only.
5. Light page background; each pillar is a self-contained dark card.

---

## Pillar copy (normative)

| id | Title |
| ---- | ----- |
| `research-analysis` | Research & Analysis |
| `capacity-development` | Capacity Development |
| `policy-innovation` | Policy Innovation |
| `curriculum-integration` | Curriculum Integration |
| `global-cooperation` | Global Cooperation |

Body text per pillar — see [TECH.md](./TECH.md#content).

---

## Layout

### Desktop (`lg+`)

```text
┌─────────────────────────────────────────────────────────────┐
│  dark card rounded-3xl                                      │
│  ┌──────────────────┬──────────────────────────────────┐   │
│  │ Title (white)    │  Image panel (rounded-2xl)       │   │
│  │ Description      │                                  │   │
│  │ (neutral-400)    │                                  │   │
│  └──────────────────┴──────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

- Odd-index pillars (2nd, 4th): **image left**, text right (`lg:flex-row-reverse`).
- Even-index (1st, 3rd, 5th): text left, image right.

### Mobile

Stack: **title + description**, then image below.

---

## Acceptance criteria

- [x] Spec feat-0035 complete
- [x] `WhatWeDoPillar` includes `image` field
- [x] Five pillars with exact user copy
- [x] Dark card styling matches reference intent
- [x] No button in cards
- [x] Anchor IDs preserved for header nav
- [x] `npm run build` passes

---

## Out of scope

- Homepage what-we-do teaser grid
- New photography uploads
