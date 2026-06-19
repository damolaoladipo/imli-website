# feat-0025: Tasks — IMILI social media accounts

Ordered implementation slices. Complete one slice + `npm run build` before the next.

| # | Task | Files | Verify |
| - | ---- | ----- | ------ |
| 1 | Populate `siteConfig.links` + `tiktok` key | `_data/site-config.tsx` | All six canonical URLs non-empty |
| 2 | Add shared `social-links.ts` module | `_data/imili/social-links.ts` | Order + aria labels exported |
| 3 | Refactor footer data builders | `footer.ts`, `forest-footer.ts` | Both import `SOCIAL_PLATFORM_ORDER`; no `#` fallback in production; fix double `buildSocialLinks()` call |
| 4 | Add `renderSocialIcon` helper | `components/custom/imili/social-icon.tsx` | Lucide + Phosphor TikTok; matched visual weight |
| 5 | `ForestFooter` — 6 icons, layout tokens, a11y | `ForestFooter.tsx` | Wrap @ 375px; 44px targets; focus rings |
| 6 | `ImiliFooter` — 6 icons, wrap, a11y | `ImiliFooter.tsx` | `flex-wrap` @ 375px; focus rings |
| 7 | Update QA reference exports | `footer.ts`, `forest-footer.ts` | `footerReferenceContent` includes `tiktok` `#`; forest reference unchanged (3-icon pixel QA) |
| 8 | Link health + manual QA | — | [PRODUCT acceptance](./PRODUCT.md#acceptance-criteria) |
| 9 | `npm run build` + `npm run lint` | — | Clean |

**Product locked:** both footers stay in v1; duplicate 12 icons OK; icon order per [D2](./PRODUCT.md#d2--source-of-truth); lucide `Twitter` for X; `twitter` config key retained.

**Out of scope for v1:** header/drawer social row; footer motion ([feat-0023](../feat-0023/PRODUCT.md)); JSON-LD `sameAs`.
