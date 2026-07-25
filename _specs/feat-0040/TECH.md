# feat-0040: TECH — Director xenophobia YouTube news card

## Files

| File | Action |
| ---- | ------ |
| `_data/imili/article-cards.ts` | ADD homepage item (prepend) |
| `public/blocks/director-xenophobia.jpg` | ADD YouTube thumbnail |
| `_specs/feat-0040/*` | CREATE |

## Card data

```ts
{
  id: "director-speaks-xenophobia",
  href: "https://youtu.be/iwXqV5gnok4",
  imageSrc: "/blocks/director-xenophobia.jpg",
  imageAlt:
    "News Central TV interview — IMILI's Director speaks on xenophobia",
  date: "July 25, 2026",
  title: "IMILI's Director speaks on Xenophobia",
  summary:
    "IMILI's Director discusses xenophobia and related challenges in an interview on News Central TV.",
  category: "News",
}
```

## Surfaces

- Homepage: `ArticleCardGrid` via `articleCardGridHomepageContent` (array order — first item)
- `/news`: `NewsIndexSection` merges external `http` items and sorts by date

## Verification

```bash
npm run build
```

Manual: homepage Latest News first card + `/news` shows the YouTube item near the top.
