# feat-0036: TECH — Projects grid and nested routes

## Routing

| Pattern | Handler |
| ------- | ------- |
| `app/projects/page.tsx` | Grid index |
| `app/projects/[...slug]/page.tsx` | Catch-all MDX detail (1 or 2 segments) |
| `app/projects/[...slug]/metadata.ts` | SEO per project |

### Canonical URLs

```
/projects/Afax-p/africa-against-xenophobia-project
/projects/imili-test-series
/projects/imili-visual-platform
/projects/certificates-programmes
```

### Redirect (`next.config.ts`)

```
/projects/africa-against-xenophobia-project
  → /projects/Afax-p/africa-against-xenophobia-project
```

## Content layout

```
projects/content/
├── Afax-p/
│   └── africa-against-xenophobia-project.mdx
├── imili-test-series.mdx
├── imili-visual-platform.mdx
└── certificates-programmes.mdx
```

## Schema addition

`sortOrder: z.number().optional()` on project frontmatter for index ordering.

## Index grid

`ProjectsIndexSection` — `grid grid-cols-1 gap-6 md:grid-cols-2`, card with image, status badge, title, description, date.

## `lib/project-source.ts`

- `getProjectPage(slug: string[])` via `projectsSource.getPage(slug)`
- `getPublishedProjectPages()` sorted by `sortOrder` then `date`

## Verification

```bash
npm run build
```

Manual:

1. `/projects` — four cards in grid
2. `/projects/Afax-p/africa-against-xenophobia-project` — full AFAX-P
3. `/projects/africa-against-xenophobia-project` — redirects
