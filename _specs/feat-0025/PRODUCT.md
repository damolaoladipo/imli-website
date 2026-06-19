# feat-0025: IMILI social media accounts

## Summary

Wire **official IMILI social media profiles** into the live site so every footer social row links to real accounts instead of empty placeholders.

**Platforms (product-supplied):** Instagram, LinkedIn, X, YouTube, Facebook, TikTok.

**App:** root Next.js site (`imil-institute` package).

**Closes:** [feat-0001](../feat-0001/TECH.md) Carousel 6 — `siteConfig.links` social URLs (were TBD).

**Normative decisions:** [URLs](#d1--canonical-urls), [Source of truth](#d2--source-of-truth), [Surfaces](#d3--surfaces-in-scope), [Icons & a11y](#d4--icons--accessibility), [Forest layout](#d5--forest-footer-amendment), [Imili layout](#d6--imili-footer-layout), [Dual footer](#d7--dual-footer-strategy), [Icon order](#d8--icon-display-order), [Motion](#d9--motion), [YouTube](#d10--youtube-channel-consistency), [Acceptance](#acceptance-criteria).

**Related specs:**

| Spec | Relation |
| ---- | -------- |
| [feat-0001](../feat-0001/PRODUCT.md) | Parent — Carousel 6 footer requires IMILI social links |
| [feat-0017](../feat-0017/PRODUCT.md) | `ImiliFooter` — dark band footer; social row top-left |
| [feat-0019](../feat-0019/PRODUCT.md) | `ForestFooter` — social quadrant; **3-icon reference superseded for production** ([D5](#d5--forest-footer-amendment)) |
| [feat-0023](../feat-0023/PRODUCT.md) | Footer motion **deferred** — no animation in this feat ([D9](#d9--motion)) |
| [feat-0024](../feat-0024/PRODUCT.md) | Documentary embed — same `@imilinstitute` YouTube channel ([D10](#d10--youtube-channel-consistency)) |

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → [TASKS](./TASKS.md) → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Config → social-links → data → social-icon → footers |
| [security-and-hardening](../../.agents/skills/security-and-hardening/SKILL.md) | External links `rel="noopener noreferrer"`; no user-controlled hrefs |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | Next.js `Link` / `<a>` patterns already in footers |

---

## Assumptions (confirm or correct before implement)

1. **All six platforms** ship in v1 — no subset or “priority three” for production.
2. **Canonical URLs** strip tracking/query params (`igsh`, `utm_*`, `si`, `_r`, `_t`) — store clean permalinks in config ([D1](#d1--canonical-urls)).
3. **Facebook URL** is the product-supplied share link (`/share/1E2MreeYsa/`) until a vanity page URL is provided.
4. **LinkedIn URL** is the product-supplied `/in/imil-institute-7707a3377` profile — not a `/company/` page.
5. **X** is stored under existing `siteConfig.links.twitter` key (not renamed to `x`); href uses `https://x.com/IMILinstitute`; icon is lucide `Twitter` ([D4](#d4--icons--accessibility)).
6. **TikTok** is net-new — requires type + icon additions ([D4](#d4--icons--accessibility)).
7. **Both footers remain** in `app/layout.tsx` — users see 12 social icons per page (6 × 2) until a footer consolidation feat ([D7](#d7--dual-footer-strategy)).
8. **Legacy `components/blocks/*`** contact/team placeholders are **out of scope** — not wired in `app/layout.tsx` today.
9. **No header or mobile-nav social row** in v1 — footers only unless product requests otherwise.
10. **No motion** on social icons — [feat-0023](../feat-0023/PRODUCT.md) defers footer chrome ([D9](#d9--motion)).

---

## Problem

| Today | Gap |
| ----- | --- |
| [`siteConfig.links`](../../_data/site-config.tsx) has **empty strings** for all social keys | Footers render **no** social icons (`buildSocialLinks()` filters empty hrefs) |
| `ForestFooter` falls back to `#` placeholders when links empty | Users cannot reach IMILI social profiles |
| `ImiliFooter` supports 5 platforms — **no TikTok** | TikTok account cannot be linked |
| `ForestFooter` typed for **3** platforms only ([feat-0019](../feat-0019/PRODUCT.md)) | Cannot show LinkedIn, X, or TikTok |
| [feat-0001](../feat-0001/TECH.md) social URLs marked TBD | Launch blocker for Carousel 6 social requirement |

**Goal:** One canonical link set in `siteConfig`; both live footers render **all six** platforms with correct icons, labels, layout, and external-link behavior.

---

## Product-supplied URLs (raw)

| Platform | URL (as provided) |
| -------- | ----------------- |
| Instagram | `https://www.instagram.com/imilinstitute?igsh=MXBkdm93dm9qZXVkOA==` |
| LinkedIn | `https://www.linkedin.com/in/imil-institute-7707a3377?utm_source=share_via&utm_content=profile&utm_medium=member_android` |
| X | `https://x.com/IMILinstitute` |
| YouTube | `https://youtube.com/@imilinstitute?si=PwyvwwTj87tb95cd` |
| Facebook | `https://www.facebook.com/share/1E2MreeYsa/` |
| TikTok | `https://www.tiktok.com/@imilinstitute?_r=1&_t=ZS-960exHgjQqz` |

---

## D1 — Canonical URLs

**Normative values** to store in `siteConfig.links` (no query strings):

| Key | Canonical href | Public handle |
| --- | -------------- | ------------- |
| `instagram` | `https://www.instagram.com/imilinstitute` | `@imilinstitute` |
| `linkedin` | `https://www.linkedin.com/in/imil-institute-7707a3377` | IMIL Institute |
| `twitter` | `https://x.com/IMILinstitute` | `@IMILinstitute` |
| `youtube` | `https://www.youtube.com/@imilinstitute` | `@imilinstitute` |
| `facebook` | `https://www.facebook.com/share/1E2MreeYsa/` | *(share link — replace when vanity URL available)* |
| `tiktok` | `https://www.tiktok.com/@imilinstitute` | `@imilinstitute` |

**Rules:**

- Prefer `https://www.` host where both variants resolve (YouTube).
- Do **not** append UTM, `igsh`, `si`, or TikTok tracking params in stored hrefs.
- If product later supplies a Facebook page vanity URL, replace `facebook` only — no component changes.
- **Link health:** each URL must load the correct IMILI profile before sign-off (manual QA in [TECH.md](./TECH.md#task-7--link-health-check)).

---

## D2 — Source of truth

| Layer | File | Role |
| ----- | ---- | ---- |
| **Canonical** | `_data/site-config.tsx` → `links` | Single object all surfaces read |
| **Shared module** | `_data/imili/social-links.ts` | Display order, aria labels, `buildSocialLinkList()` — **required** |
| **ImiliFooter data** | `_data/imili/footer.ts` | Imports shared module → `FooterSocialLink[]` |
| **ForestFooter data** | `_data/imili/forest-footer.ts` | Imports shared module → `ForestFooterSocialLink[]` |
| **Icon render** | `components/custom/imili/social-icon.tsx` | `SocialIcon` — mixed lucide + Phosphor |

**Display order (both footers) — v1 normative:**

```text
facebook → instagram → linkedin → twitter → youtube → tiktok
```

This **replaces** the prior `ImiliFooter` order (`facebook → twitter → linkedin → instagram → youtube`) — see [D8](#d8--icon-display-order).

Omit any platform whose href is empty (future-proofing). After this feat, **all six** must be non-empty.

```ts
// _data/imili/social-links.ts (normative)
export const SOCIAL_PLATFORM_ORDER = [
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "youtube",
  "tiktok",
] as const;

export const SOCIAL_ARIA_LABELS: Record<SocialPlatformId, string> = {
  facebook: "IMILI on Facebook",
  instagram: "IMILI on Instagram",
  linkedin: "IMILI on LinkedIn",
  twitter: "IMILI on X",
  youtube: "IMILI on YouTube",
  tiktok: "IMILI on TikTok",
};
```

```ts
// _data/site-config.tsx (normative excerpt)
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

Add `tiktok: string` to the `links` object type (inferred from `siteConfig`).

---

## D3 — Surfaces in scope

| Surface | Component | File | v1 |
| ------- | --------- | ---- | -- |
| Forest footer social quadrant | `ForestFooter` | `components/custom/imili/ForestFooter.tsx` | **Yes** — wired in `app/layout.tsx` |
| Dark band footer social row | `ImiliFooter` | `components/custom/imili/ImiliFooter.tsx` | **Yes** — wired in `app/layout.tsx` |

**Not in scope v1:**

| Surface | Reason |
| ------- | ------ |
| `HeroHeader` / `MobileNavDrawer` | No social row in current design |
| `components/blocks/contact-us.tsx`, `form.tsx` | Legacy blocks; hardcoded `#` placeholders |
| `components/blocks/team.tsx` | Per-member social, not org accounts |
| `/contact` route | Page does not exist yet (`not-found.tsx` links to it) |
| JSON-LD `sameAs` / Open Graph | Follow-up feat ([R1](#r1--seo-follow-up)) |
| Footer consolidation (one footer only) | Separate feat — both footers stay for v1 ([D7](#d7--dual-footer-strategy)) |

---

## D4 — Icons & accessibility

### Icon mapping

| `id` | Icon | Library |
| ---- | ---- | ------- |
| `facebook` | `Facebook` | `lucide-react` |
| `instagram` | `Instagram` | `lucide-react` |
| `linkedin` | `Linkedin` | `lucide-react` |
| `twitter` | `Twitter` | `lucide-react` — **locked for v1** (not custom X SVG) |
| `youtube` | `Youtube` | `lucide-react` |
| `tiktok` | `TiktokLogo` | `@phosphor-icons/react` |

Render via shared `SocialIcon` in `social-icon.tsx` — do **not** use a single `Record<id, LucideIcon>` (TikTok breaks the type).

**Visual weight:** TikTok Phosphor icon `size-5` (ImiliFooter) / `size-5 lg:size-7` (ForestFooter) — match lucide siblings (~20–28 px).

### Link behavior

- External hrefs: `<a href="…" target="_blank" rel="noopener noreferrer">`
- `aria-hidden` on icon; **`aria-label`** from `SOCIAL_ARIA_LABELS` on the anchor (not `social.id`)

### Tap targets

| Footer | Hit area | Tailwind |
| ------ | -------- | -------- |
| `ImiliFooter` | 50 × 50 px circles | existing `size-[50px]` — keep |
| `ForestFooter` | ≥ 44 × 44 px | `inline-flex size-11 items-center justify-center` on each `<a>` |

### Focus-visible

Per [feat-0023](../feat-0023/PRODUCT.md) a11y guidance — preserve keyboard affordances:

| Footer | Focus ring |
| ------ | ---------- |
| `ImiliFooter` | `focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900` on social `<a>` |
| `ForestFooter` | `focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2` on social `<a>` |

---

## D5 — Forest footer amendment

[feat-0019](../feat-0019/PRODUCT.md) reference shows **3** social icons (Facebook, Instagram, YouTube). **Production IMILI** supersedes that cap:

| Rule | Detail |
| ---- | ------ |
| Show | All non-empty `siteConfig.links` social entries (6 after this feat) |
| Remove | `buildSocialLinks()` fallback to `#` placeholders; fix double `buildSocialLinks()` call in ternary |
| Types | Extend `ForestFooterSocialId` to include `linkedin`, `twitter`, `tiktok` |
| Reference QA | `forestFooterReferenceContent` keeps **3** `#` links for feat-0019 pixel capture — unchanged |

### Layout tokens (social quadrant)

| Token | @375 | @1440 | Tailwind |
| ----- | ---- | ----- | -------- |
| Container | flex wrap | same | `flex flex-wrap` |
| Row gap (horizontal) | 12 px | 16 px | `gap-x-3 lg:gap-x-4` |
| Row gap (vertical, wrapped) | 8 px | 12 px | `gap-y-2 lg:gap-y-3` |
| Top margin below heading | 8 px | 12 px | `mt-2 lg:mt-3` |
| Icon glyph | 20 px | 28 px | `size-5 lg:size-7` inside `size-11` anchor |
| Max rows | 2 acceptable | 1–2 rows | 6 icons × 44 px fits ~3 per row in quadrant |
| Overflow | none | none | No horizontal scroll on `main` @ 375px |

Second row of icons in the social quadrant is **acceptable** — do not shrink icons below `size-5` to force one row.

---

## D6 — ImiliFooter layout

| Token | @375 | @1440 | Tailwind |
| ----- | ---- | ----- | -------- |
| Container | flex wrap | same | `flex flex-wrap gap-3` |
| Icon button | 50 × 50 px circle | same | existing `size-[50px] rounded-full bg-neutral-800` |
| Icon glyph | 20 px | same | `size-5` via `SocialIcon` |
| Wrapped rows | 2 rows OK | typically 1 row | 6 × 50 + 5 × 12 = 360 px — fits 375px in one row; wrap regardless for smaller viewports |

Change from current `flex gap-3` (no wrap) to `flex flex-wrap gap-3` so six icons never overflow on narrow containers.

---

## D7 — Dual footer strategy

`app/layout.tsx` renders **both** `ForestFooterSection` and `FooterSection` (`ImiliFooter`) on every page.

| Decision | v1 normative |
| -------- | ------------ |
| Keep both footers | **Yes** — no layout swap in this feat |
| Duplicate social rows | **Yes** — 6 icons × 2 footers = 12 links per page; same URLs, same order |
| Consolidate to one footer | **Out of scope** — separate product decision (feat-0017 vs feat-0019) |

Rationale: feat-0019 forest footer and feat-0017 dark footer were never merged; this feat wires URLs only.

---

## D8 — Icon display order

| Version | Order |
| ------- | ----- |
| **Before** (ImiliFooter `buildSocialLinks`) | facebook → twitter → linkedin → instagram → youtube |
| **After** (v1 normative) | facebook → instagram → linkedin → twitter → youtube → tiktok |

Intentional reorder — product-supplied list order; both footers use `SOCIAL_PLATFORM_ORDER`.

---

## D9 — Motion

| Rule | Detail |
| ---- | ---- |
| framer-motion on social icons | **No** — [feat-0023](../feat-0023/PRODUCT.md) defers `ForestFooter` / `ImiliFooter` |
| Hover | Keep existing `hover:opacity-70` / `hover:opacity-90` CSS only |
| Reduced motion | N/A — no enter animations added |

---

## D10 — YouTube channel consistency

| Asset | URL / ID | Source |
| ----- | -------- | ------ |
| Social link | `https://www.youtube.com/@imilinstitute` | `siteConfig.links.youtube` |
| Documentary embed | video `oH2s7rjl8Os` | [feat-0024](../feat-0024/PRODUCT.md) `imiliHomepageDocumentary` |

Both belong to the **same IMILI YouTube channel** — no change to `homepage.ts` in this feat. Manual QA: confirm documentary video appears on `@imilinstitute` channel page.

---

## D11 — Type updates

```ts
// _data/imili/footer.ts
export type FooterSocialId =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "tiktok";

// _data/imili/forest-footer.ts
export type ForestFooterSocialId =
  | "facebook"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "twitter"
  | "tiktok";
```

Both `FooterSocialId` and `ForestFooterSocialId` must align with `SocialPlatformId` from `social-links.ts`.

---

## Acceptance criteria

- [ ] `siteConfig.links` contains all **six** canonical URLs from [D1](#d1--canonical-urls)
- [ ] `tiktok` key added to `siteConfig.links`
- [ ] `_data/imili/social-links.ts` exists — single source for order + aria labels
- [ ] `SocialIcon` component renders all six platforms with matched visual weight
- [ ] `ForestFooter` social quadrant shows **6** icons linking to correct URLs
- [ ] `ImiliFooter` social row shows **6** icons linking to correct URLs
- [ ] No `#` or empty-placeholder social links on **production** footer content
- [ ] Each icon opens in a **new tab** with `rel="noopener noreferrer"`
- [ ] Each link has **`aria-label`** from `SOCIAL_ARIA_LABELS`
- [ ] **Focus ring** visible on keyboard Tab through social links (both footers)
- [ ] TikTok icon visible and aligned with sibling icons
- [ ] **Both** footers: social row **wraps** cleanly @ **375 px** — no horizontal overflow
- [ ] **Link health:** each canonical URL loads correct IMILI profile (not 404)
- [ ] Documentary video `oH2s7rjl8Os` appears on `@imilinstitute` channel (sanity check)
- [ ] No framer-motion added to social icons
- [ ] `npm run build` passes

---

## Out of scope

| Item | Reason |
| ---- | ------ |
| Social links in site header / drawer | Not requested |
| Legacy `components/blocks/*` social rows | Not on live layout |
| Social share buttons on articles | Separate feat |
| Newsletter / contact form backend | Unrelated |
| Removing one footer from layout | Separate consolidation feat |
| JSON-LD / Open Graph `sameAs` | [R1](#r1--seo-follow-up) |
| feat-0019 reference pixel QA with 6 icons | Reference asset unchanged; production diverges per [D5](#d5--forest-footer-amendment) |
| Renaming `twitter` key to `x` in config | Locked: keep `twitter` key for v1 |

---

## Open questions (product)

| # | Question | Default if unanswered |
| - | -------- | --------------------- |
| 1 | Replace Facebook **share** link with a vanity page URL? | Keep share link until product supplies URL |
| 2 | LinkedIn **company** page instead of `/in/…`? | Keep supplied `/in/` profile |
| 3 | Social icons in **mobile nav** or **contact page**? | Follow-up feat |
| 4 | Consolidate to **one footer**? | Keep both for v1 |

---

## Recommendations

### R1 — SEO follow-up (feat TBD)

Add `sameAs` array to future JSON-LD `Organization` schema in `app/layout.tsx` metadata using canonical URLs from `siteConfig.links`.

### R2 — Footer consolidation (feat TBD)

Product chooses [feat-0017](../feat-0017/PRODUCT.md) `ImiliFooter` **or** [feat-0019](../feat-0019/PRODUCT.md) `ForestFooter` as the single global footer — removes duplicate 12-icon pattern.
