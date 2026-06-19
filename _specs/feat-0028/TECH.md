# feat-0028: Tech — Light Imili footer + dual stack

## Context

See [PRODUCT.md](./PRODUCT.md) and [TASKS.md](./TASKS.md).

**Target:** global layout footers + light theme on [`ImiliFooter`](../../components/custom/imili/ImiliFooter.tsx).

**Do not modify:** `ForestFooter` layout geometry (feat-0019); only restore it in layout.

---

## Objective

1. Add `variant?: "dark" | "light"` to `ImiliFooter` with theme class map.
2. Wire `FooterSection` → `variant="light"`.
3. Restore `ForestFooterSection` in `app/layout.tsx` above `FooterSection`.
4. QA `/` @ 375 / 1440 px; `npm run build`.

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA @ `/`:

1. Scroll to bottom — forest footer, then white Imili band.
2. Light footer — black text on white; dark logo visible.
3. Tab social icons + scroll-to-top in both footers.

---

## Files to touch

| File | Action |
| ---- | ------ |
| `components/custom/imili/ImiliFooter.tsx` | **UPDATE** — `variant` prop + theme tokens |
| `components/custom/footer.tsx` | **UPDATE** — `variant="light"` |
| `app/layout.tsx` | **UPDATE** — add `ForestFooterSection` before `FooterSection` |

**Do not touch:** `_data/imili/footer.ts` (unless logo override chosen), `ForestFooter.tsx` structure.

---

## Implementation sketch

### Theme map

```tsx
// ImiliFooter.tsx — illustrative
type FooterVariant = "dark" | "light";

const themes: Record<
  FooterVariant,
  {
    root: string;
    text: string;
    muted: string;
    heading: string;
    link: string;
    divider: string;
    social: string;
    input: string;
    scrollTop: string;
    logoSrc: (content: FooterContent) => string;
  }
> = {
  dark: {
    root: "bg-neutral-900 text-neutral-100",
    text: "text-neutral-100",
    muted: "text-neutral-100",
    heading: "text-neutral-100",
    link: "text-neutral-100",
    divider: "border-neutral-400/30",
    social:
      "bg-neutral-800 text-white focus-visible:ring-white focus-visible:ring-offset-neutral-900",
    input:
      "border-neutral-300 text-neutral-100 placeholder:text-neutral-400 focus-visible:ring-neutral-200/40",
    scrollTop: "bg-neutral-800 text-white",
    logoSrc: (c) => c.logo.src,
  },
  light: {
    root: "bg-white text-[#111111]",
    text: "text-[#111111]",
    muted: "text-[#6B7280]",
    heading: "text-[#111111]",
    link: "text-[#111111]",
    divider: "border-[#E5E7EB]",
    social:
      "bg-[#F3F4F6] text-[#111111] focus-visible:ring-[#111111] focus-visible:ring-offset-white",
    input:
      "border-[#D1D5DB] text-[#111111] placeholder:text-[#9CA3AF] focus-visible:ring-[#111111]/20",
    scrollTop: "bg-[#111111] text-white",
    logoSrc: () => "/blocks/imili.svg",
  },
};
```

Replace hard-coded `text-neutral-100` / `bg-neutral-900` in `FooterLink`, newsletter form, and bottom bar with theme values.

### `footer.tsx`

```tsx
import { footerHomepageContent } from "@/_data/imili/footer";
import { ImiliFooter } from "@/components/custom/imili/ImiliFooter";

export default function FooterSection() {
  return <ImiliFooter content={footerHomepageContent} variant="light" />;
}
```

### `app/layout.tsx`

```tsx
import ForestFooterSection from "@/components/custom/forest-footer";
import FooterSection from "@/components/custom/footer";

// inside body, after main:
<ForestFooterSection />
<FooterSection />
```

---

## Per-file checklist

### `ImiliFooter.tsx`

- [ ] Add `variant = "dark"` default on props
- [ ] `FooterLink` accepts theme link class or reads from context
- [ ] Newsletter `CustomButton` light styles — border dark, hover fill optional
- [ ] Logo `Image` uses `themes[variant].logoSrc(content)`
- [ ] Root `<footer className={themes[variant].root}>`

### `footer.tsx`

- [ ] Pass `variant="light"`

### `app/layout.tsx`

- [ ] Import and render `ForestFooterSection` before `FooterSection`
- [ ] Order: `HeroHeader` → `main` → forest → light Imili

---

## Testing

| Check | How |
| ----- | --- |
| Build | `npm run build` |
| Dual stack | Visual @ `/` bottom |
| Light contrast | H1/tagline readable on white |
| Dark compat | Storybook or grep — any `ImiliFooter` without variant still dark |
| Mobile 375 | Social wrap; no overflow |

---

## Boundaries

| Always | Two footers in layout; light variant for `FooterSection` |
| Ask first | Changing forest footer; new data file; homepage-only footers |
| Never | Delete `ForestFooter`; ship light footer without restoring forest in layout |

---

## Related specs

| Spec | Relation |
| ---- | -------- |
| [feat-0017](../feat-0017/PRODUCT.md) | Layout structure |
| [feat-0019](../feat-0019/PRODUCT.md) | Upper footer |
| [feat-0025](../feat-0025/PRODUCT.md) | Social URLs + dual strategy |
