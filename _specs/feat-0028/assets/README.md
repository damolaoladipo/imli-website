# feat-0028 assets

No pixel reference PNG for v1 — light theme is a **token inversion** of implemented [`ImiliFooter`](../../../components/custom/imili/ImiliFooter.tsx) (dark band today).

## QA method

1. Open `/` @ **1440×900** — scroll to bottom; confirm **two** footers stack without horizontal overflow.
2. **Upper footer:** [`ForestFooter`](../../../components/custom/imili/ForestFooter.tsx) — forest photo + white cards ([feat-0019](../../feat-0019/PRODUCT.md)).
3. **Lower footer:** light `ImiliFooter` — **white** band, **black** text ([D4](./../PRODUCT.md#d4--light-theme-tokens) in PRODUCT).
4. Repeat @ **375×812** — social icons wrap; newsletter form stacks.
5. Tab through social links and scroll-to-top in **both** footers — focus rings visible.

Optional: add `light-footer-reference.png` here after product sign-off.
