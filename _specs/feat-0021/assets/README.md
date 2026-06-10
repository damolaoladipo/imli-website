# feat-0021 reference assets

This feature has **no pixel design screenshot**. Mobile navbar dropdown behavior is defined against:

- Current implementation audit (`components/custom/header.tsx`, `MobileNavLinks`)
- [feat-0002 §Mobile](../feat-0002/PRODUCT.md#mobile) — nested links, no images
- [feat-0021 PRODUCT §D4–D10](../PRODUCT.md) — drawer, accordion, a11y, touch targets
- QA viewports: **375**, **390**, **768** px (portrait)

## QA method

Use browser DevTools device mode and manual tap testing — not image overlay.

### Scenarios to capture (optional screenshots for PR)

1. Drawer closed @ 375px — header bar only
2. Drawer open — all accordion sections collapsed
3. About expanded — 2 child link rows visible
4. News expanded — 5 external links, no images
5. Desktop @ 1024px — mega-menu unchanged (regression)

Store optional PR screenshots in this folder if the team wants visual regression records; they are **not** normative design references.
