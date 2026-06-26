# feat-0031 assets

## Purpose

Working area for Unsplash sourcing QA — **not** normative design references.

| File | Use |
| ---- | --- |
| `attributions.md` | Human log: slot ID, Unsplash photo URL, photographer, download date |
| `raw/` (gitignored optional) | Full-resolution downloads before `sharp` resize into `public/stock/` |

## Workflow

1. Search on [unsplash.com](https://unsplash.com) using terms from [PRODUCT.md](../PRODUCT.md).
2. Record choice in `attributions.md`.
3. Save optimized JPEG to `public/stock/<slot-id>.jpg`.
4. Mirror entry in `_data/imili/image-attributions.ts`.

## Do not commit

- Unsplash API keys
- Unwatermarked third-party press photos (use owned or generic conference stock only)
