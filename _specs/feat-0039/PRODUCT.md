# feat-0039: Mobile table UX — Digital Storytelling categories

## Summary

Improve the **Submission Categories** markdown table on the Digital Storytelling for Peacebuilding page for small screens.

| Route | Content |
| ----- | ------- |
| [`/afax-p/digital-storytelling-for-peace-building`](https://dev.imilinstitute.org/afax-p/digital-storytelling-for-peace-building) | MDX table: Category · Description · Duration/Format |

**Problem today:** Three wide columns with long text force horizontal overflow or clipping on phones. Site root uses `overflow-x-clip` on `<main>`, so a bare wide `<table>` can truncate instead of scroll, and cells remain hard to scan.

**Related:** [feat-0037](../feat-0037/PRODUCT.md), sticky sidebars / `overflow-x-clip` layout fix.

---

## Assumptions

1. **Scope is MDX tables in `prose-imili`**, starting with this page; solution should apply to any future MDX tables without per-page hacks.
2. **Normative table content stays unchanged** — same four categories and cell copy; layout only.
3. **Primary mobile pattern is stacked “row cards”** (not only horizontal scroll): each category becomes a card with labeled fields, so Description and Duration/Format are fully readable without sideways pan.
4. **Desktop (`md+`) keeps a normal table** — aligned columns, readable as today.
5. Implement via a **shared MDX `table` component** (or CSS + wrapper), not by rewriting this MDX into custom React on this page alone.
6. Touch targets and text follow existing body scale (`text-lg` / `text-xl` on body content).
7. Sticky “How to participate” sidebar behaviour is unchanged.

---

## User stories

### US-1 — Read categories on a phone

As a young applicant on mobile, I open Submission Categories and can read every category’s description and format rules without zooming or missing clipped text.

### US-2 — Scan four categories quickly

As a visitor, I can tell Video, Podcast, Interactive Media, and Photography apart at a glance (category name prominent; fields clearly labeled).

### US-3 — Same content as desktop

As a content editor, I keep authoring one markdown table; mobile and desktop both show the same information.

---

## Recommended UX

### Mobile (`< md`)

```text
┌─────────────────────────────────────┐
│ Video                               │  ← Category (bold)
│ Description                         │  ← label
│ Short films, documentaries…         │
│ Duration / Format                   │  ← label
│ MP4… Maximum 3 minutes              │
└─────────────────────────────────────┘
  …repeat for each row
```

- One card (or bordered block) per table body row
- Header row used only as field labels (not a separate wide table head)
- Full width of article column; no required horizontal scroll for this table

### Desktop (`md+`)

Standard HTML table inside `prose-imili`:

| Category | Description | Duration/Format |
| … | … | … |

Optional: light borders / header background consistent with site neutrals — not a new design system.

### Fallback / progressive enhancement

If stacked cards prove too complex for generic MDX tables, minimum acceptable bar is:

- Wrapper with `overflow-x-auto` + `-webkit-overflow-scrolling: touch`
- Sticky first column optional (nice-to-have, not required for v1)
- Visible scroll affordance (fade or scrollbar) so users know more content exists

**v1 preference:** stacked cards for mobile as assumption 3.

---

## Acceptance criteria

- [ ] Spec feat-0039 complete (PRODUCT + TECH + TASKS)
- [ ] On a ~375px-wide viewport, all four categories’ full Description and Duration/Format text are readable without horizontal page scroll
- [ ] Table content matches current MDX (no copy changes)
- [ ] Desktop (`md+`) still presents a multi-column table
- [ ] Solution works for other `prose-imili` MDX tables without page-specific code
- [ ] Does not reintroduce site-wide horizontal overflow (respect sticky layout / `overflow-x-clip`)
- [ ] `npm run build` passes

---

## Out of scope

- Changing Submission Categories copy or categories
- Mobile redesign of Assessment Criteria (lists, not tables)
- Sticky sidebar changes
- Spreadsheet download / CSV
- Custom component embedded only in this one MDX file (unless temporary spike; prefer shared MDX table override)

---

## Open questions (resolve before or during implementation)

| # | Question | Default if unanswered |
| - | -------- | --------------------- |
| 1 | Prefer stacked cards on mobile or horizontal scroll only? | Stacked cards |
| 2 | Apply to all MDX tables or only this page? | All `prose-imili` tables |
| 3 | Keep markdown table authoring or convert this section to a React block? | Keep markdown + shared `table` override |
