# feat-0028: Tasks — Light Imili footer + dual stack

Ordered slices. Run `npm run build` after slice 2 and slice 3.

| # | Task | Files | Verify |
| - | ---- | ----- | ------ |
| 1 | Add `variant` theme map to `ImiliFooter` | `ImiliFooter.tsx` | Dark default unchanged; light tokens per PRODUCT D3 |
| 2 | Wire light variant in `FooterSection` | `footer.tsx` | Renders white band + black text |
| 3 | Restore dual footer in layout | `app/layout.tsx` | Forest above light Imili on `/` |
| 4 | Mobile + a11y pass | `ImiliFooter.tsx` | 375px no overflow; focus rings on light social buttons |
| 5 | `npm run build` + manual QA | — | [Acceptance](./PRODUCT.md#acceptance-criteria) |

**Locked:** light Imili uses `/blocks/imili.svg`; both footers global in layout.
