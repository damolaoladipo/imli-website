# feat-0031: Tech — Unsplash stock image pipeline

## Context

See [PRODUCT.md](./PRODUCT.md). Implement downloaded Unsplash assets for every in-scope raster slot.

---

## Objective

1. Create `public/stock/` directory and naming convention.
2. Add `_data/imili/image-attributions.ts` for photographer metadata.
3. Update `_data/imili/images.ts` paths from `/new/*.png` → `/stock/*.jpg`.
4. Update hero, news, and config consumers listed in PRODUCT inventory.
5. Document downloads in `_specs/feat-0031/assets/attributions.md` (human audit log).

---

## File layout

```text
public/stock/
├── bg-hero.jpg              # IMILI_IMAGES.bgHero
├── humans.jpg               # IMILI_IMAGES.humans
├── mission.jpg              # IMILI_IMAGES.mission
├── vision.jpg               # IMILI_IMAGES.vision
├── hero-lobby.jpg           # photo + background hero
├── og-default.jpg           # siteConfig.ogImage (1200×630)
├── news-tvc-launch.jpg      # launch article hero
└── gallery-01.jpg …         # optional /gallery batch

_data/imili/
├── images.ts                # MODIFY — src paths + alt strings
└── image-attributions.ts    # CREATE — Unsplash credit map

_specs/feat-0031/assets/
├── attributions.md          # CREATE — download log (date, URL, photographer)
└── README.md
```

---

## Data model

### `images.ts` (after migration)

```ts
export const IMILI_IMAGES = {
  bgHero: {
    src: "/stock/bg-hero.jpg",
    alt: "Audience at an international education conference",
  },
  humans: {
    src: "/stock/humans.jpg",
    alt: "Participants in a media literacy workshop",
  },
  mission: {
    src: "/stock/mission.jpg",
    alt: "Students and researchers in a library setting",
  },
  vision: {
    src: "/stock/vision.jpg",
    alt: "Young adults engaging with digital media",
  },
} as const;
```

### `image-attributions.ts`

```ts
export type ImageAttribution = {
  /** Path under public/, e.g. /stock/bg-hero.jpg */
  path: string;
  photographer: string;
  unsplashUrl: string;
  /** ISO date downloaded */
  downloadedAt: string;
};

export const imageAttributions: ImageAttribution[] = [
  {
    path: "/stock/bg-hero.jpg",
    photographer: "Example Name",
    unsplashUrl: "https://unsplash.com/photos/…",
    downloadedAt: "2026-06-26",
  },
];
```

---

## Consumer updates (ordered)

| Order | File | Change |
| ----- | ---- | ------ |
| 1 | `_data/imili/images.ts` | Paths + alts |
| 2 | `_data/imili/photo-hero.ts` | `heroImage.src` → `/stock/hero-lobby.jpg` |
| 3 | `_data/imili/background-photo-hero.ts` | `backgroundImage.src` → `/stock/hero-lobby.jpg`; set non-empty `alt` |
| 4 | `_data/site-config.tsx` | `ogImage` → `/stock/og-default.jpg` |
| 5 | `news/content/fg-describes-*.mdx` | `heroImage` → `/stock/news-tvc-launch.jpg` |
| 6 | `components/custom/about-us.tsx` | Default `imageSrc` fallback → `IMILI_IMAGES.mission.src` (not hardcoded `/new/`) |

**No component changes required** if all data flows through `IMILI_IMAGES` and content files.

---

## Image dimensions (export targets)

| Slot | Min width × height | Notes |
| ---- | ------------------ | ----- |
| `bg-hero` | 2400 × 1350 | 16:9 cover |
| `humans`, `mission`, `vision` | 1600 × 1200 | 4:3; center-weighted for card crops |
| `hero-lobby` | 1920 × 2560 | Tall crop for `PhotoHeroSection` right column |
| `og-default` | 1200 × 630 | Exact OG |
| Mega-menu panel | 560 × 400 effective | Parent uses `h-[200px]` flex — wide landscape preferred |
| News hero | 1600 × 900 | 16:9 |
| Testimonial avatar | 400 × 400 | Square center crop from portrait-oriented source |

---

## Next.js `next/image`

Local files under `public/` need no `remotePatterns` config.

Recommended `sizes` (already in components — verify after swap):

| Component | `sizes` |
| --------- | ------- |
| `HeaderMegaMenuPanel` | `280px` |
| `ArticleCard` | `(max-width: 768px) 100vw, 33vw` |
| `PhotoHeroSection` hero | `(max-width: 1024px) 100vw, 50vw` |

---

## Unsplash API (optional automation)

If batching downloads:

1. Register app at [unsplash.com/oauth/applications](https://unsplash.com/developers)
2. Store `UNSPLASH_ACCESS_KEY` in `.env.local` — **never commit**
3. Search endpoint: `GET https://api.unsplash.com/search/photos?query=…&orientation=landscape`
4. Trigger download endpoint per [API guidelines](https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download)

v1 may be **manual download** only; script is optional.

---

## Commands

```bash
# After adding files to public/stock/
npm run dev
npm run build

# Optional optimize (sharp installed as devDep or npx)
npx sharp-cli -i _specs/feat-0031/assets/raw/bg-hero.jpg -o public/stock/bg-hero.jpg resize 2400 1350 --fit cover
```

---

## Migration / deprecation

| Legacy path | Action |
| ----------- | ------ |
| `/new/bg-hero.png` | Replace with `/stock/bg-hero.jpg`; delete references |
| `/new/humans.png` | Replace |
| `/new/mision.png` | Replace (`mission.jpg` — fix typo in filename) |
| `/new/vision.png` | Replace |
| `/blocks/hero.jpeg` | Replace with `/stock/hero-lobby.jpg` |

Grep before merge:

```bash
rg '/new/|/blocks/hero\.jpeg' --glob '*.{ts,tsx,mdx}'
```

---

## Testing checklist

- [ ] Open `/` — bento, photo, background heroes render
- [ ] Open each mega-menu dropdown — two images, no 404
- [ ] Open `/news` and launch article — hero renders
- [ ] Share debugger / view source — `og:image` points to `/stock/og-default.jpg`
- [ ] Lighthouse — no enormous unoptimized PNGs (>500 KB target per hero)
