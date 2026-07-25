# feat-0040: News — IMILI Director speaks on xenophobia (YouTube)

## Summary

Add a **Latest News** card linking to a News Central TV YouTube interview where IMILI’s Director speaks on xenophobia.

| Field | Value |
| ----- | ----- |
| Title | IMILI's Director speaks on Xenophobia |
| URL | [https://youtu.be/iwXqV5gnok4](https://youtu.be/iwXqV5gnok4) |
| Source | News Central TV (external YouTube) |
| Placement | First (newest) in homepage Latest News + `/news` index |

**Related:** [feat-0034](../feat-0034/PRODUCT.md) (external press cards pattern).

---

## Assumptions

1. Card is **external** — opens YouTube in a new tab (`target="_blank"`, `rel="noopener noreferrer"`).
2. Display title is normative: **IMILI's Director speaks on Xenophobia** (not the YouTube oEmbed title).
3. Date is **July 25, 2026** so the item sorts as the latest news entry.
4. Thumbnail is stored locally at `/blocks/director-xenophobia.jpg` (YouTube hqdefault).
5. Category: `News`.
6. No owned `/news/[slug]` MDX page for v1 — same pattern as Peoples Daily / Leadership cards.
7. Canonical share URL uses `https://youtu.be/iwXqV5gnok4` (drop tracking query params).

---

## User stories

### US-1 — Discover the interview on homepage

As a visitor, I see “IMILI's Director speaks on Xenophobia” as the newest Latest News card and can open the video.

### US-2 — Find it on `/news`

As a visitor, I see the same item near the top of the News index, sorted by date.

---

## Acceptance criteria

- [x] Spec feat-0040 complete
- [x] Entry prepended to `articleCardHomepageItems` in `_data/imili/article-cards.ts`
- [x] Links to `https://youtu.be/iwXqV5gnok4`
- [x] Title exactly: `IMILI's Director speaks on Xenophobia`
- [x] Local image `/blocks/director-xenophobia.jpg` present
- [x] Appears first / newest on homepage and `/news`
- [x] `npm run build` passes

---

## Out of scope

- Embedding the video on an owned IMILI article page
- Transcript or MDX write-up
- Media-mentions sidebar entry (optional follow-up)
