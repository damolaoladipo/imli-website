# feat-0021: Tech — Mobile navbar drawer & dropdowns

## Context

See [PRODUCT.md](./PRODUCT.md). Implement mobile **drawer shell** and **accordion dropdowns** for `HeroHeader` @ viewports **&lt; 1024px**.

**Authoritative for:** navbar dropdown mobile UX — supersedes [feat-0020 §D5.3–D5.5](../feat-0020/PRODUCT.md#d5--navbar-mobile) where they overlap.

**Do not modify:** desktop `NavigationMenu`, `HeaderMegaMenuPanel`, or `_data/imili/header-nav.ts` structure (values OK if already correct).

---

## Objective

1. Replace in-flow `MobileNavLinks` panel with fixed overlay drawer + backdrop.
2. Replace always-expanded nested lists with accordion (collapsed by default).
3. Wire accessibility: `aria-expanded`, `aria-controls`, scroll lock, `Escape`, focus return.
4. Single Contact CTA in drawer footer.
5. Manual QA @ **375**, **390**, **768** px.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (`"use client"` header) |
| Styling | Tailwind v4 responsive prefixes |
| Nav data | `headerNavItems` from `_data/imili/header-nav.ts` |
| Child rows | `HeaderMegaMenuLink` `variant="mobile"` |
| Accordion | Radix `Accordion` (`components/ui/accordion.tsx`) **or** `useState<Record<string, boolean>>` |
| Drawer | React state (`menuState`) + `fixed` panel — no new deps |
| Scroll lock | `useEffect` → `document.body.style.overflow = "hidden"` |
| Icons | `lucide-react` — `Menu`, `X`, `ChevronDown` |
| Font | Montserrat (unchanged) |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

### Manual QA script

1. `npm run dev` → open `/` @ **375×812**.
2. Tap hamburger — drawer slides from right; backdrop dims page; page does not jump.
3. Confirm About / What We Do / News sections collapsed.
4. Tap **About** — expands 2 child links; chevron rotates; label turns `#0548bd`.
5. Tap child link — navigates (or 404 if route missing) and drawer closes.
6. Re-open → tap **News** → expand → tap external link → new tab.
7. Tap backdrop, `Escape`, and X — each closes drawer.
8. Tab through drawer — focus stays in panel; on close focus returns to toggle.
9. Repeat @ **390px** and **768px** portrait.
10. @ **1024px** — hamburger hidden; desktop mega-menu works per feat-0002.

---

## Project structure

```text
./
├── components/custom/
│   ├── header.tsx                         # MODIFY — drawer, remove in-flow mobile panel
│   ├── header-mega-menu-link.tsx          # VERIFY — mobile variant unchanged
│   └── mobile-nav-drawer.tsx              # NEW (optional) — extract if header.tsx > ~220 lines
├── components/ui/accordion.tsx            # REUSE (optional)
├── _data/imili/header-nav.ts              # READ ONLY
└── _specs/feat-0021/
    ├── PRODUCT.md
    ├── TECH.md
    └── assets/README.md
```

---

## Component architecture

```text
HeroHeader
├── header bar (sticky)
│   ├── Logo
│   ├── hamburger toggle (lg:hidden)
│   └── NavigationMenu (hidden lg:block) — UNCHANGED
└── MobileNavDrawer (lg:hidden, when menuState)
    ├── backdrop button
    ├── dialog panel (#mobile-nav-drawer)
    │   ├── MobileNavAccordion
    │   │   ├── plain Link rows
    │   │   └── accordion rows (About, What We Do, News)
    │   │       └── HeaderMegaMenuLink[] variant="mobile"
    │   └── drawer footer
    │       └── CustomButton Contact us
```

---

## Implementation tasks

### Task 1 — Extract or inline `MobileNavDrawer`

**Files:** `header.tsx`, optionally `mobile-nav-drawer.tsx`

**Acceptance:**

- Backdrop + panel match [PRODUCT D4](./PRODUCT.md#d4--drawer-shell)
- `id="mobile-nav-drawer"`, `role="dialog"`, `aria-modal="true"`
- Safe-area padding on panel

**Verify:** Open drawer @ 375px — no document flow shift.

---

### Task 2 — Scroll lock, Escape, focus

**Files:** `header.tsx` or `mobile-nav-drawer.tsx`

```tsx
// Scroll lock
React.useEffect(() => {
  if (!menuState) return;
  const prev = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = prev;
  };
}, [menuState]);

// Escape
React.useEffect(() => {
  if (!menuState) return;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setMenuState(false);
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [menuState]);
```

**Acceptance:**

- Page does not scroll behind open drawer
- `Escape` closes drawer
- Toggle has `aria-expanded` + `aria-controls="mobile-nav-drawer"`

**Verify:** Keyboard-only close path works.

---

### Task 3 — `MobileNavAccordion`

**Files:** `header.tsx` or `mobile-nav-drawer.tsx`

Replace current `MobileNavLinks` (always-expanded nested `ul`).

**Option A — Radix Accordion:**

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

<Accordion type="multiple" className="w-full">
  {headerNavItems.map((item) =>
    item.dropdown ? (
      <AccordionItem key={item.name} value={item.name} className="border-b border-neutral-100">
        <AccordionTrigger className="min-h-11 py-3 text-xl font-medium text-black hover:no-underline data-[state=open]:text-[#0548bd] [&>svg]:text-black data-[state=open]:[&>svg]:text-[#0548bd]">
          {item.name}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2 pb-4">
            {item.dropdown.links.map((link) => (
              <li key={link.href}>
                <HeaderMegaMenuLink
                  {...link}
                  variant="mobile"
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    ) : null,
  )}
</Accordion>
```

Render plain `Link` rows **outside** or **between** accordion items in document order (preserve `headerNavItems` order).

**Option B — useState:**

```tsx
const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({});

React.useEffect(() => {
  if (!menuState) setOpenSections({});
}, [menuState]);
```

**Acceptance:**

- Dropdown parents are buttons, not links
- Collapsed by default; reset on drawer close
- No images rendered

**Verify:** About shows 2 links only after expand.

---

### Task 4 — Plain link rows + ordering

Preserve `headerNavItems` order:

```tsx
{headerNavItems.map((item) =>
  item.dropdown ? (
    /* accordion item */
  ) : (
    <Link
      key={item.name}
      href={item.href}
      onClick={onNavigate}
      className="flex min-h-11 items-center border-b border-neutral-100 text-xl font-medium text-black transition-colors hover:text-[#0548bd]"
    >
      {item.name}
    </Link>
  ),
)}
```

**Verify:** Who We Are, Gallery, Contact appear as single rows without chevron.

---

### Task 5 — Drawer footer CTA

**Remove** duplicate scroll-gated `CustomButton` pair from mobile drawer region.

**Add** single footer:

```tsx
<div className="shrink-0 border-t border-neutral-200 p-6">
  <CustomButton href="/contact" className="w-full min-h-11" onClick={onNavigate}>
    Contact us
  </CustomButton>
</div>
```

**Verify:** Exactly one Contact us @ 375px inside drawer.

---

### Task 6 — Reduced motion

```tsx
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

Apply `duration-0` or skip `transition-transform` on drawer when true.

**Verify:** OS “reduce motion” on — drawer appears without slide animation.

---

### Task 7 — Delete in-flow mobile panel

Remove from `header.tsx`:

```tsx
// DELETE: mb-6 hidden w-full ... in-data-[state=active]:block
// DELETE: MobileNavLinks inside in-flow container
```

Drawer renders via portal-like `fixed` siblings (can be fragment at end of `header`).

**Verify:** Opening menu does not increase page height.

---

## Boundaries

| Tier | Rule |
| ---- | ---- |
| **Always** | Reuse `headerNavItems`; keep desktop nav unchanged; run `npm run build` before merge |
| **Ask first** | New npm package for drawer; changing nav data or routes |
| **Never** | Render mega-menu images on mobile; push-layout mobile menu; remove `HeaderMegaMenuPanel` |

---

## Verification checklist

| Check | Command / action |
| ----- | ---------------- |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Drawer | Manual @ 375px |
| Accordion | Manual — 3 dropdown parents |
| Desktop regression | Manual @ 1024px — feat-0002 mega-menu |
| a11y | axe DevTools or VoiceOver spot-check `aria-expanded` |

---

## Dependencies

| Package | Status |
| ------- | ------ |
| `@radix-ui/react-accordion` | Already in repo (via `components/ui/accordion.tsx`) |
| `@radix-ui/react-navigation-menu` | Desktop only — unchanged |

No new packages.

---

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| `header.tsx` grows large | Extract `mobile-nav-drawer.tsx` |
| Accordion default styles (underline on hover) | Override `hover:no-underline` on triggers |
| Focus trap complexity | v1: soft trap via dialog focus on open; full trap optional follow-up |
| News accordion long list | Accept scroll inside drawer `overflow-y-auto` |
