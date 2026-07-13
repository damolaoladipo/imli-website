# feat-0037: TECH — AFAX-P hub and Digital Storytelling

## Routing

| Pattern | Handler |
| ------- | ------- |
| `app/afax-p/page.tsx` | Hub index |
| `app/afax-p/[...slug]/page.tsx` | Storytelling MDX detail |
| `app/afax-p/[...slug]/metadata.ts` | SEO |

Storytelling MDX path: `projects/content/Afax-p/digital-storytelling-for-peace-building.mdx`  
Loader slug: `['Afax-p', 'digital-storytelling-for-peace-building']`  
Public URL: `/afax-p/digital-storytelling-for-peace-building`

## Schema additions (`source.config.ts`)

- `status`: add `call-for-participation`
- `submissionDeadlineStart`, `submissionDeadlineEnd`
- `finalistsAnnouncementDate`, `winnersAnnouncementDate`
- `socialHashtags: z.array(z.string()).optional()`

## Components

| Component | Role |
| --------- | ---- |
| `AfaxPIndexSection` | Hub grid (mirrors `ProjectsIndexSection`) |
| `ProjectParticipationSidebar` | Key dates + contact for participation calls |
| `ProjectDetailLayout` | Render participation sidebar when status is `call-for-participation` |
| `ProjectStatusLabel` | Label for `call-for-participation` |

## Hub data (`_data/imili/afax-p-page.ts`)

Static list mapping MDX slugs to public hrefs (storytelling → `/afax-p/...`, papers → `/projects/Afax-p/...`).

## Verification

```bash
npx fumadocs-mdx
npm run build
```

Manual:

1. `/afax-p` — two cards
2. `/afax-p/digital-storytelling-for-peace-building` — full content + sidebar
3. Hub card 2 → `/projects/Afax-p/africa-against-xenophobia-project`
