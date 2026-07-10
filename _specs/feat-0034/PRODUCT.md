# feat-0034: Homepage news — AfAX-P press coverage

## Summary

Add two **external press articles** about IMILI's Africa Against Xenophobia Project (AfAX-P) to the homepage **Latest News** grid (`ArticleCardGrid`).

| Card | Source | Image |
| ---- | ------ | ----- |
| Peoples Daily | [IMILI launches Africa Against Xenophobia Project](https://peoplesdaily.ng/imili-launches-africa-against-xenophobia-project/) | `/blocks/xenophobi-paper-call.jpeg` |
| Leadership | [International Media Institute Move Against Xenophobia In Africa](https://leadership.ng/international-media-institute-move-against-xenophobia-in-africa/) | `/blocks/xenophobia.jpg` |

**Target repo:** `imil-institute`.

**Related specs:**

| Spec | Relationship |
| ---- | ------------ |
| [feat-0003](../feat-0003/PRODUCT.md) | `ArticleCardGrid` homepage cards |
| [feat-0032](../feat-0032/PRODUCT.md) | AFAX-P owned project page at `/projects/africa-against-xenophobia-project` |

---

## Assumptions

1. Cards link **off-site** to original publisher URLs (external `href`, new tab).
2. Copy (title, date, summary) is derived from published articles — no invented claims.
3. Images are local assets under `public/blocks/` (already in repo).
4. No owned `/news/*` MDX pages required for v1 — homepage cards only.
5. Newest items appear **first** in `articleCardHomepageItems`.

---

## Problem

AfAX-P launch received national press coverage but is not represented on the homepage news grid. Visitors only see April 2026 IMILI launch stories.

**Goal:** Surface June 2026 AfAX-P coverage alongside existing homepage news cards.

---

## User stories

### US-1 — Discover AfAX-P press on homepage

As a visitor, I see Peoples Daily and Leadership coverage in the Latest News section with correct thumbnails and headlines.

### US-2 — Open original articles

As a visitor, I click a card and land on the publisher's article in a new tab.

---

## Acceptance criteria

- [x] Two new entries in `_data/imili/article-cards.ts` → `articleCardHomepageItems`
- [x] Peoples Daily card uses `xenophobi-paper-call.jpeg` and links to peoplesdaily.ng
- [x] Leadership card uses `xenophobia.jpg` and links to leadership.ng
- [x] Dates: June 19, 2026 (Peoples Daily); June 21, 2026 (Leadership)
- [x] Category: `News` for both
- [x] `npm run build` passes

---

## Out of scope

- Full republished MDX articles on `/news/*`
- Media mentions sidebar entries for these outlets (optional follow-up)
