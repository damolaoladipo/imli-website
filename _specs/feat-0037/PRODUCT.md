# feat-0037: AFAX-P hub and Digital Storytelling programme

## Summary

Add an **AFAX-P programme hub** at `/afax-p` listing two initiatives, and ship the **Digital Storytelling for Peace Building** call for participation using the same MDX + detail layout pattern as `/projects`.

| Route | Purpose |
| ----- | ------- |
| `/afax-p` | Hub — two AFAX-P programme cards |
| `/afax-p/digital-storytelling-for-peace-building` | Call for participation (new MDX) |
| `/projects/Afax-p/africa-against-xenophobia-project` | Call for papers (existing; linked from hub) |

**Related:** [feat-0032](../feat-0032/PRODUCT.md), [feat-0036](../feat-0036/PRODUCT.md).

---

## Assumptions

1. Storytelling content lives in `projects/content/Afax-p/digital-storytelling-for-peace-building.mdx` (same fumadocs collection as projects).
2. Canonical URL for storytelling is **`/afax-p/digital-storytelling-for-peace-building`**; call for papers stays at **`/projects/Afax-p/africa-against-xenophobia-project`**.
3. Online submission portal URL is **not yet available** — copy retains placeholder `(……..)`; no fabricated link.
4. Hero image for storytelling uses **`/blocks/capacity.jpeg`** until a dedicated asset is supplied.
5. Contact email **`info@imilinstitute.org`**; website **`www.imilinstitute.org`**.

---

## User stories

### US-1 — Browse AFAX-P programmes

As a visitor, I open `/afax-p` and see two cards: Digital Storytelling for Peace Building and the AFAX-P Call for Papers.

### US-2 — Read storytelling call for participation

As a young African creator, I open `/afax-p/digital-storytelling-for-peace-building` and read eligibility, categories, assessment criteria, prizes, and key dates.

### US-3 — Reach call for papers from hub

As a researcher, I open the second hub card and land on the existing call for papers page.

---

## Acceptance criteria

- [x] `/afax-p` renders two programme cards in a responsive grid
- [x] Storytelling detail page matches project detail layout (hero, status, prose, sidebar)
- [x] Sidebar shows participation key dates and contact
- [x] Copy matches supplied brief (no invented portal URL)
- [x] `npm run build` passes
