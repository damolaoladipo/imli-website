# feat-0039: TECH — Mobile-friendly MDX tables

## Context

- Page: `/afax-p/digital-storytelling-for-peace-building`
- Source: `projects/content/Afax-p/digital-storytelling-for-peace-building.mdx` (Submission Categories table)
- Render path: MDX → fumadocs default `table` → `.prose-imili` in `ProjectDetailLayout`
- Root layout: `<main className="overflow-x-clip">` — nested table wrappers must scroll themselves if needed; do not rely on page-level overflow

## Approach (preferred)

Override MDX `table` / `thead` / `tbody` / `tr` / `th` / `td` in `mdx-components.tsx` with a responsive presentation component:

| Breakpoint | Behaviour |
| ---------- | --------- |
| `< md` | Hide native table chrome; render each `tbody` row as a card using `th` labels from header |
| `md+` | Render semantic `<table>` with full width / readable wrap |

Implementation sketch:

```tsx
// components/mdx/responsive-table.tsx
// Client or server: parse children; detect header cells; map rows → cards on mobile
```

Register in `getMDXComponents`:

```tsx
table: ResponsiveTable,
// optional: thead, tbody, tr, th, td if using composed overrides
```

### CSS-only alternative (faster, weaker UX)

```css
.prose-imili :where(table) {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

Use only if stacked cards are deferred. Does not meet PRODUCT preferred UX alone.

## Files (expected)

| File | Action |
| ---- | ------ |
| `components/mdx/responsive-table.tsx` | CREATE — responsive table / row-card UI |
| `mdx-components.tsx` | MODIFY — wire `table` (and related) override |
| `app/globals.css` | OPTIONAL — prose table borders / th styles for `md+` |
| `_specs/feat-0039/*` | CREATE |

Avoid editing MDX body for layout.

## Accessibility

- Preserve a real `<table>` for `md+` (screen readers get row/column structure)
- Mobile cards: use the category name as heading (`h3` or strong); associate labels with content via `<dl>` or visible labels
- Do not remove header labels from the accessibility tree without an equivalent

## Verification

```bash
npm run build
```

Manual:

1. Open `/afax-p/digital-storytelling-for-peace-building` at 375×812 and 1280×800
2. Confirm four categories readable on mobile; table columns on desktop
3. Confirm sticky sidebar still works while scrolling the article
4. Spot-check any other MDX page with a table (if added later)
