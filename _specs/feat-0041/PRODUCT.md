# feat-0041: AFAX-P — extend abstract deadline to August 15

## Summary

Update the Africa Against Xenophobia Project (AfAX-P) call-for-papers **abstract deadline** from **August 7, 2026** to **August 15, 2026**.

| Surface | Location |
| ------- | -------- |
| Detail page | `/projects/Afax-p/africa-against-xenophobia-project` |
| Sidebar | `ProjectSubmissionSidebar` (reads `abstractDeadline` frontmatter) |
| Body copy | Submission section in MDX |

**Related:** [feat-0032](../feat-0032/PRODUCT.md), [feat-0036](../feat-0036/PRODUCT.md).

---

## Assumptions

1. Normative new deadline is **August 15, 2026** (`2026-08-15`).
2. First draft deadline (**November 30, 2026**) is unchanged.
3. Update both frontmatter and body prose so sidebar and article stay in sync.
4. No other pages or press copy need changing for this deadline.

---

## Acceptance criteria

- [x] Spec feat-0041 complete
- [x] `abstractDeadline: "2026-08-15"` in AFAX-P MDX frontmatter
- [x] Body text says **August 15, 2026** (not August 7)
- [x] Sidebar shows August 15, 2026
- [x] `npm run build` passes

---

## Out of scope

- Digital Storytelling participation dates
- Email subject / submission address changes
