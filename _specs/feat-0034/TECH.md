# feat-0034: TECH — Homepage AfAX-P press cards

## Data change

**File:** `_data/imili/article-cards.ts`

Add to `articleCardHomepageItems` (prepend — newest first):

```ts
{
  id: "peoples-daily-afax-p",
  href: "https://peoplesdaily.ng/imili-launches-africa-against-xenophobia-project/",
  imageSrc: "/blocks/xenophobi-paper-call.jpeg",
  imageAlt: "Call for Papers poster — Africa Against Xenophobia Project (AfAX-P)",
  date: "June 19, 2026",
  title: "IMILI Launches Africa Against Xenophobia Project",
  summary:
    "IMILI announced the virtual launch of the Africa Against Xenophobia Project (AfAX-P) on the International Day for Countering Hate Speech.",
  category: "News",
},
{
  id: "leadership-afax-p",
  href: "https://leadership.ng/international-media-institute-move-against-xenophobia-in-africa/",
  imageSrc: "/blocks/xenophobia.jpg",
  imageAlt: "Anti-xenophobia graphic with Africa silhouette and #NOTOXENOPHOBIA hashtag",
  date: "June 21, 2026",
  title: "International Media Institute Move Against Xenophobia In Africa",
  summary:
    "Leadership reports on IMILI's launch of AfAX-P to address xenophobia, hate speech, and misinformation threatening Africa's social cohesion.",
  category: "News",
},
```

## Rendering

No component changes. `ArticleCard` already supports external URLs (`target="_blank"`, `rel="noopener noreferrer"`).

## Assets

| Path | Use |
| ---- | --- |
| `public/blocks/xenophobi-paper-call.jpeg` | Peoples Daily card |
| `public/blocks/xenophobia.jpg` | Leadership card |

## Verification

```bash
npm run build
```

Homepage → Latest News section → two new cards with correct images and outbound links.
