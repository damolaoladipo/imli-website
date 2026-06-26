# feat-0033 assets

Reference screenshots for About Us section layouts. **Add before pixel QA.**

| File | Section | Source |
| ---- | ------- | ------ |
| `what-we-are-reference.png` | What We Are — heading, body, image | User screenshot 2026-06-26 |
| `vision-reference.png` | Vision — heading, body, image | User screenshot 2026-06-26 |
| `mission-reference.png` | Mission — heading, body, image / grid | User screenshot 2026-06-26 |

## How to add

1. Export or save the three reference captures from design / user handoff.
2. Place files in this folder with the names above.
3. Run visual QA tasks T15–T17 in [TASKS.md](../TASKS.md).

## Production images (TBD)

When comms supplies photography, add to `public/stock/`:

| File | Used in |
| ---- | ------- |
| `about-what-we-are.jpg` | What We Are section |
| `about-vision.jpg` | Vision section |
| `about-mission-primary.jpg` | Mission section (primary / split) |
| `about-mission-secondary.jpg` | Mission section (grid only, if feat-0016 layout) |

Register paths in `_data/imili/images.ts` → `STOCK_IMAGES.aboutUs` and `_data/imili/image-attributions.ts`.

## Legacy IMILI assets (interim)

If stock files are not ready, interim QA may use:

| Section | Interim path | Key |
| ------- | ------------ | --- |
| What We Are | `/stock/home-about.jpg` | `STOCK_IMAGES.home.about` |
| Vision | `/stock/mission-secondary.jpg` | `STOCK_IMAGES.mission.secondary` |
| Mission | `/stock/mission-primary.jpg` | `STOCK_IMAGES.mission.primary` |

Do not ship interim placeholders as production without product sign-off.

## Related specs

| Spec | Relationship |
| ---- | ------------ |
| [feat-0016](../../feat-0016/PRODUCT.md) | `MissionSection` 3-cell grid — candidate for Mission block |
| Shipped `PageHeroSection` / `AboutUsIntroSection` | Already on `/about-us` — do not re-spec |
