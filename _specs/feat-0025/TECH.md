# feat-0025: Tech — IMILI social media accounts

## Context

See [PRODUCT.md](./PRODUCT.md) and [TASKS.md](./TASKS.md). Populate `siteConfig.links` with six canonical IMILI profile URLs and surface them on both live footers.

**Closes:** [feat-0001](../feat-0001/TECH.md) Carousel 6 social URLs (`siteConfig.links` TBD).

---

## Objective

1. Add canonical social URLs + `tiktok` key to `_data/site-config.tsx`.
2. Create `_data/imili/social-links.ts` — shared order + aria labels (**required**).
3. Refactor `buildSocialLinks()` in `footer.ts` and `forest-footer.ts` to use shared module.
4. Add `renderSocialIcon` helper for mixed lucide/Phosphor icons.
5. Update `ImiliFooter` and `ForestFooter` — 6 icons, wrap layout, focus-visible, aria labels.
6. Remove `#` placeholder fallback + double `buildSocialLinks()` call in `forest-footer.ts`.
7. Manual link health check + `npm run build`.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Config | `_data/site-config.tsx` |
| Shared social | `_data/imili/social-links.ts` |
| Footer data | `_data/imili/footer.ts`, `_data/imili/forest-footer.ts` |
| Icon render | `components/custom/imili/social-icon.tsx` |
| UI | `ImiliFooter.tsx`, `ForestFooter.tsx` |
| Icons | `lucide-react` + `@phosphor-icons/react` (`TiktokLogo`) |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA:

1. Open `/` — scroll to **ForestFooter** then **ImiliFooter**.
2. Confirm **6** social icons in **each** footer (12 total — intentional per [PRODUCT D7](./PRODUCT.md#d7--dual-footer-strategy)).
3. Click each icon in both footers — correct profile opens in new tab; no 404.
4. DevTools **375px** — both footers wrap social rows; no horizontal overflow on `main`.
5. Keyboard — Tab through social links; **focus ring** visible on each anchor.
6. Inspect — `aria-label` reads e.g. “IMILI on Instagram”.
7. TikTok icon visual weight matches lucide siblings (~20–24 px).

---

## Project structure

```text
./
├── _data/
│   ├── site-config.tsx                 # MODIFY — links + tiktok
│   └── imili/
│       ├── social-links.ts             # NEW — shared order + aria map
│       ├── footer.ts                   # MODIFY — import social-links
│       └── forest-footer.ts            # MODIFY — import social-links; remove fallback
├── components/custom/imili/
│   ├── social-icon.tsx                 # NEW — renderSocialIcon helper
│   ├── ImiliFooter.tsx                 # MODIFY — 6 icons + wrap + a11y
│   └── ForestFooter.tsx                # MODIFY — 6 icons + wrap + a11y
└── _specs/feat-0025/
    ├── PRODUCT.md
    ├── TECH.md
    ├── TASKS.md
    └── assets/README.md
```

---

## Implementation tasks

### Task 1 — Site config

**File:** `_data/site-config.tsx`

Set `links` per [PRODUCT D1](./PRODUCT.md#d1--canonical-urls):

```ts
links: {
  twitter: "https://x.com/IMILinstitute",
  instagram: "https://www.instagram.com/imilinstitute",
  linkedin: "https://www.linkedin.com/in/imil-institute-7707a3377",
  facebook: "https://www.facebook.com/share/1E2MreeYsa/",
  youtube: "https://www.youtube.com/@imilinstitute",
  tiktok: "https://www.tiktok.com/@imilinstitute",
  email: "mailto:info@imilinstitute.org",
},
```

---

### Task 2 — Shared social module (required)

**File:** `_data/imili/social-links.ts`

```ts
import { siteConfig } from "@/_data/site-config";

export const SOCIAL_PLATFORM_ORDER = [
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "youtube",
  "tiktok",
] as const;

export type SocialPlatformId = (typeof SOCIAL_PLATFORM_ORDER)[number];

export const SOCIAL_ARIA_LABELS: Record<SocialPlatformId, string> = {
  facebook: "IMILI on Facebook",
  instagram: "IMILI on Instagram",
  linkedin: "IMILI on LinkedIn",
  twitter: "IMILI on X",
  youtube: "IMILI on YouTube",
  tiktok: "IMILI on TikTok",
};

export function getSocialHref(id: SocialPlatformId): string {
  return siteConfig.links[id];
}

export function buildSocialLinkList<T extends { id: SocialPlatformId; href: string }>(): T[] {
  return SOCIAL_PLATFORM_ORDER.map((id) => ({
    id,
    href: getSocialHref(id),
  })).filter((link) => link.href.length > 0) as T[];
}
```

Both `footer.ts` and `forest-footer.ts` call `buildSocialLinkList()` — **do not** duplicate order arrays.

---

### Task 3 — Footer data types & builders

**File:** `_data/imili/footer.ts`

- Add `"tiktok"` to `FooterSocialId` (alias `SocialPlatformId` or extend it).
- Replace inline `buildSocialLinks()` with `buildSocialLinkList<FooterSocialLink>()`.
- Add `{ id: "tiktok", href: "#" }` to `footerReferenceContent.social` for 6-icon QA layout.

**File:** `_data/imili/forest-footer.ts`

- Extend `ForestFooterSocialId` with `linkedin`, `twitter`, `tiktok`.
- Replace inline `buildSocialLinks()` with `buildSocialLinkList<ForestFooterSocialLink>()`.
- **Remove** double-call fallback:

```ts
// BEFORE (bug — calls buildSocialLinks twice)
links: buildSocialLinks().length > 0 ? buildSocialLinks() : [{ id: "facebook", href: "#" }, ...]

// AFTER
social: {
  title: "Social media",
  links: buildSocialLinkList<ForestFooterSocialLink>(),
},
```

Keep `forestFooterReferenceContent` at **3** `#` links for [feat-0019](../feat-0019/PRODUCT.md) pixel QA — production only uses `forestFooterHomepageContent`.

---

### Task 4 — Shared icon renderer

**File:** `components/custom/imili/social-icon.tsx`

Mixed libraries break a single `Record<id, Component>` type. Use a small renderer:

```tsx
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { TiktokLogo } from "@phosphor-icons/react";
import type { SocialPlatformId } from "@/_data/imili/social-links";
import { cn } from "@/lib/utils";

type SocialIconProps = {
  id: SocialPlatformId;
  className?: string;
};

export function SocialIcon({ id, className }: SocialIconProps) {
  const merged = cn("shrink-0", className);
  switch (id) {
    case "facebook":
      return <Facebook className={merged} aria-hidden />;
    case "instagram":
      return <Instagram className={merged} aria-hidden />;
    case "linkedin":
      return <Linkedin className={merged} aria-hidden />;
    case "twitter":
      return <Twitter className={merged} aria-hidden />;
    case "youtube":
      return <Youtube className={merged} aria-hidden />;
    case "tiktok":
      return <TiktokLogo className={merged} aria-hidden weight="regular" />;
  }
}
```

Import `SocialIcon` in both footers; delete per-footer `socialIcons` records.

**Size tokens:**

| Footer | Icon class | Anchor class |
| ------ | ---------- | ------------ |
| `ImiliFooter` | `size-5` inside `size-[50px]` circle | existing circle + `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900` |
| `ForestFooter` | `size-5 lg:size-7` | `inline-flex size-11 items-center justify-center` + `focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2` |

---

### Task 5 — ForestFooter layout

**File:** `components/custom/imili/ForestFooter.tsx`

Social container per [PRODUCT D5](./PRODUCT.md#d5--forest-footer-amendment):

```tsx
<div className="mt-2 flex flex-wrap gap-x-3 gap-y-2 lg:mt-3 lg:gap-x-4 lg:gap-y-3">
```

Import `SOCIAL_ARIA_LABELS` from `social-links.ts` for `aria-label`.

**No motion** — do not add framer-motion ([feat-0023](../feat-0023/PRODUCT.md) defers footer chrome).

---

### Task 6 — ImiliFooter layout

**File:** `components/custom/imili/ImiliFooter.tsx`

Change social container from `flex gap-3` to:

```tsx
<div className="mt-6 flex flex-wrap gap-3">
```

Keeps `size-[50px]` circles; wraps to second row @ 375px when six icons exceed viewport.

---

### Task 7 — Link health check

Before sign-off, open each canonical URL from [PRODUCT D1](./PRODUCT.md#d1--canonical-urls) in a browser:

| Check | Pass |
| ----- | ---- |
| Profile loads (not 404) | |
| Page shows IMILI branding or handle | |
| Facebook share link resolves | |

Documentary video `oH2s7rjl8Os` ([feat-0024](../feat-0024/PRODUCT.md)) lives on the same `@imilinstitute` YouTube channel — no change to `homepage.ts` in this feat.

---

### Task 8 — Verify no regressions

- `forestFooterReferenceContent` — keep 3 `#` links (feat-0019 pixel QA).
- `footerReferenceContent` — 6 `#` links including `tiktok`.
- `npm run build` — TypeScript resolves `siteConfig.links.tiktok`.
- Grep `siteConfig.links` — no empty social strings.

---

## Code style

- Match existing footer patterns: external `<a>`, internal `Link`.
- No `"use client"` changes — footers already client components.
- Do not add new npm dependencies — Phosphor and lucide already in `package.json`.
- Import aria labels from `social-links.ts` in components — do not duplicate strings.

---

## Testing strategy

| Level | Scope |
| ----- | ----- |
| Manual | 6 links × 2 footers; wrap @ 375px both footers; keyboard focus rings |
| Link health | Each canonical URL loads correct profile |
| Build | `npm run build` — typecheck |
| Lint | `npm run lint` on touched files |
| Automated | None required v1 — no existing footer unit tests |

---

## Boundaries

**Always:**

- Store URLs only in `siteConfig` / data layer — not hardcoded in components.
- Use `target="_blank"` + `rel="noopener noreferrer"` for external social hrefs.
- Preserve `focus-visible` rings per [PRODUCT D4](./PRODUCT.md#d4--icons--accessibility).

**Ask first:**

- Adding social row to header or contact page.
- Removing one of the two footers from `app/layout.tsx`.
- Changing feat-0019 reference PNG.

**Never:**

- Commit tracking/query params on canonical URLs.
- Add framer-motion to social icons in this feat.
- Use `javascript:` or dynamic user-supplied hrefs for social icons.
