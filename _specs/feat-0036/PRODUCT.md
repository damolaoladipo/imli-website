# feat-0036: Projects — grid index and nested AFAX-P URL

## Summary

Expand `/projects` into a **grid index** of four institute programmes and move AFAX-P to a **nested canonical URL** under a programme folder.

| Route | Project |
| ----- | ------- |
| `/projects` | Grid index — four programme cards |
| `/projects/Afax-p/africa-against-xenophobia-project` | Africa Against Xenophobia (AFAX-P) |
| `/projects/imili-test-series` | IMILI Test Series |
| `/projects/imili-visual-platform` | IMILI Visual Platform |
| `/projects/certificates-programmes` | Certificates Programmes |

**Related:** [feat-0032](../feat-0032/PRODUCT.md) (original projects MDX pipeline).

---

## Assumptions

1. AFAX-P canonical path is **`/projects/Afax-p/africa-against-xenophobia-project`** (program folder casing `Afax-p`).
2. Flat slug **`/projects/africa-against-xenophobia-project`** is **not** canonical; permanent redirect to nested URL.
3. Three additional projects ship as MDX stubs with summary copy; full detail pages can expand later.
4. Index uses a **responsive card grid** (1 col mobile, 2 cols tablet+).
5. AFAX-P retains full legacy call-for-papers MDX body from feat-0032.

---

## User stories

### US-1 — Browse projects grid

As a visitor, I open `/projects` and see four programme cards in a grid with image, title, short description, and status.

### US-2 — AFAX-P nested URL

As a researcher, I open `/projects/Afax-p/africa-against-xenophobia-project` and read the full AFAX-P call for papers.

### US-3 — Discover other programmes

As a visitor, I can open IMILI Test Series, IMILI Visual Platform, and Certificates Programmes from the grid.

---

## Acceptance criteria

- [x] Spec feat-0036 complete
- [x] `/projects` renders 2-column grid with four cards
- [x] AFAX-P at `/projects/Afax-p/africa-against-xenophobia-project`
- [x] Redirect from `/projects/africa-against-xenophobia-project`
- [x] Three additional project detail routes live
- [x] `npm run build` passes

---

## Out of scope

- Full long-form copy for Test Series, Visual Platform, Certificates (stubs only)
- `/activities` landing page
- External legacy host redirects
