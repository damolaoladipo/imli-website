# feat-0020: Tech — Mobile experience (navbar, footer, homepage)

## Context

See [PRODUCT.md](./PRODUCT.md). Responsive pass for **navbar**, **footer**, and **homepage sections** — industry-standard mobile UX without desktop layout regressions.

**Normative rules:** [Navbar](./PRODUCT.md#d5--navbar-mobile), [Footer](./PRODUCT.md#d6--footer-mobile), [Homepage](./PRODUCT.md#d7--homepage-mobile), [Standards](./PRODUCT.md#d4--industry-standards-applied).

---

## Objective

1. Refactor mobile nav in `header.tsx` → overlay drawer + accordion + scroll lock.
2. Scale `Logo` responsively (shared header + footer).
3. Tune `ImiliFooter.tsx` mobile spacing, type, newsletter stack.
4. Add responsive classes to homepage section components listed in `app/page.tsx`.
5. Manual QA @ **375**, **390**, **768** px.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router |
| Styling | Tailwind v4 responsive prefixes |
| Nav drawer | React state + `fixed` panel (no new deps) |
| Accordion | Local `useState<Record<string, boolean>>` per nav item id |
| Scroll lock | `useEffect` toggles `document.body.style.overflow` |
| A11y | `aria-expanded`, `aria-controls`, `Escape` listener, focus return |
| Font | Montserrat (unchanged) |

**Reuse:** `HeaderMegaMenuLink` (`variant="mobile"`), `headerNavItems` from `_data/imili/header-nav.ts`.

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA:

1. DevTools → 375×812 → open `/`.
2. Open mobile nav — drawer, backdrop, accordion, Contact CTA, close paths.
3. Scroll homepage — no horizontal overflow; bento grid readable.
4. Footer — stack, newsletter full width, tap social + scroll-top.
5. Repeat @ 390px and 768px portrait.
6. `lg` @ 1024px — confirm desktop mega-menu unchanged.

---

## Project structure

```text
./
├── components/custom/
│   ├── header.tsx                    # MODIFY — drawer, accordion, a11y
│   ├── logo.tsx                      # MODIFY — responsive width
│   └── imili/
│       ├── ImiliFooter.tsx           # MODIFY — mobile spacing/type
│       ├── BentoHeroSection.tsx      # MODIFY — responsive grid
│       ├── ServicesCarousel.tsx      # MODIFY — heading, scroll, nav lg+
│       ├── ArticleCardGrid.tsx       # MODIFY — heading, padding
│       └── TestimonialsCarousel.tsx  # MODIFY — header stack, padding
├── components/custom/about-us.tsx    # MODIFY — padding scale
├── app/
│   ├── page.tsx                      # VERIFY — no structural change required
│   └── layout.tsx                    # VERIFY — main overflow-x-hidden ok
└── _specs/feat-0020/
    ├── PRODUCT.md
    └── TECH.md
```

**Optional extract:** `MobileNavDrawer.tsx` in `components/custom/` if `header.tsx` exceeds ~220 lines — not required for v1.

---

## Shared tokens

Add to implementer notes (apply consistently):

```tsx
// Section shell (homepage)
const sectionX = "px-4 sm:px-6 lg:px-14";
const sectionY = "py-12 md:py-20 lg:py-32";

// Mobile heading ladder → desktop literal from feat specs
const headingLg = "text-2xl sm:text-3xl md:text-4xl lg:text-[48px]"; // tune per component desktop token
```

---

## Implementation detail

### 1. `logo.tsx`

```tsx
className="h-auto w-36 sm:w-40 lg:w-56"
```

### 2. `header.tsx` — mobile drawer

**Remove** in-flow mobile panel:

```tsx
// DELETE pattern: mb-6 hidden w-full ... in-data-[state=active]:block
```

**Add** (when `menuState &&` below `lg`):

```tsx
<>
  <button
    type="button"
    aria-label="Close menu"
    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
    onClick={() => setMenuState(false)}
  />
  <div
    id="mobile-nav-drawer"
    role="dialog"
    aria-modal="true"
    aria-label="Main navigation"
    className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-xl lg:hidden"
    style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <MobileNavAccordion onNavigate={() => setMenuState(false)} />
    </div>
    <div className="border-t border-neutral-200 p-6">
      <CustomButton href="/contact" fullWidth onClick={() => setMenuState(false)}>
        Contact us
      </CustomButton>
    </div>
  </div>
</>
```

**Menu button:**

```tsx
<button
  aria-expanded={menuState}
  aria-controls="mobile-nav-drawer"
  ...
/>
```

**Scroll lock:**

```tsx
React.useEffect(() => {
  if (!menuState) return;
  const prev = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => { document.body.style.overflow = prev; };
}, [menuState]);
```

**Escape:**

```tsx
React.useEffect(() => {
  if (!menuState) return;
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuState(false); };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [menuState]);
```

### 3. `MobileNavAccordion` (inline or new file)

```tsx
const [open, setOpen] = React.useState<Record<string, boolean>>({});

{headerNavItems.map((item) =>
  item.dropdown ? (
    <div key={item.name}>
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between text-xl font-medium"
        aria-expanded={!!open[item.name]}
        onClick={() => setOpen((s) => ({ ...s, [item.name]: !s[item.name] }))}
      >
        {item.name}
        <ChevronDown className={cn("size-5 transition-transform", open[item.name] && "rotate-180")} />
      </button>
      {open[item.name] && (
        <ul className="mt-3 space-y-3 pb-4">
          {item.dropdown.links.map((link) => (
            <li key={link.href}>
              <HeaderMegaMenuLink ... variant="mobile" onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <Link key={item.name} href={item.href} className="flex min-h-11 items-center text-xl font-medium" onClick={onNavigate}>
      {item.name}
    </Link>
  ),
)}
```

**Desktop `lg:hidden` / `hidden lg:block`** split unchanged for `NavigationMenu`.

### 4. `ImiliFooter.tsx`

| Change | Classes |
| ------ | ------- |
| Top padding | `pt-12 lg:pt-[68px]` |
| Link text | `text-base lg:text-[21px]` |
| Column titles | `text-lg lg:text-[22px]` |
| Newsletter heading | `text-xl lg:text-[28px]` |
| Form | `flex flex-col gap-3 sm:flex-row sm:items-center` (already partial — ensure `w-full` on input + button @ default) |
| Input | `text-base` |

### 5. `BentoHeroSection.tsx`

```tsx
// Section
className="... py-12 md:py-20 lg:py-20 px-4 md:px-[68px]"

// Grid wrapper
className="grid h-auto min-h-[320px] flex-1 grid-cols-1 gap-5 md:grid-cols-2 md:min-h-[480px] lg:h-[619px] lg:grid-cols-2 lg:grid-rows-[1.15fr_0.95fr_0.9fr]"
```

### 6. `TestimonialsCarousel.tsx`

```tsx
// Section
className="bg-white py-12 lg:pb-32 lg:pt-32"

// Header wrapper
<div className="px-4 sm:px-6 lg:px-14">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

// Heading
className="mt-3 text-2xl font-bold leading-[1.12] sm:text-3xl lg:text-[51px]"

// Track
className="mt-11 flex gap-[23px] overflow-x-auto px-4 sm:px-6 lg:px-14 ..."
```

### 7. `ServicesCarousel.tsx`

```tsx
// Heading
className="text-2xl sm:text-3xl lg:text-[45px] ..."

// Section
className="bg-white py-12 lg:py-[68px]"

// Track @ < lg — horizontal scroll; @ lg — keep grid when items <= 3
className="mt-11 flex gap-[23px] overflow-x-auto px-4 snap-x snap-mandatory ... lg:grid lg:grid-cols-3"
// ServiceCard wrapper: shrink-0 snap-start w-[min(100%,340px)] lg:w-auto
```

Uncomment nav `flex` with `hidden lg:flex` on button cluster.

### 8. `ArticleCardGrid.tsx`

```tsx
className="bg-stone-100 py-12 lg:py-32"
// h2: text-2xl sm:text-3xl lg:text-[48px]
// description: text-base lg:text-[20px] text-left lg:text-right
```

### 9. `about-us.tsx`

```tsx
className={cn("py-12 md:py-20 lg:py-32 px-4 sm:px-6", className)}
```

Remove `sm:px-50`.

### 10. `app/page.tsx`

No required changes if sections self-contain padding. Add comment block referencing feat-0020 if helpful.

---

## Implementation tasks (ordered)

Per [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md):

| # | Task | Done when |
| - | ---- | --------- |
| 1 | Responsive `logo.tsx` | Header + footer logo scaled @ 375px |
| 2 | Mobile drawer + scroll lock + a11y in `header.tsx` | Drawer QA passes |
| 3 | Accordion nested nav | Dropdowns collapsed by default |
| 4 | Single mobile Contact CTA | No duplicate / hidden buttons |
| 5 | `ImiliFooter.tsx` mobile tokens | Footer QA passes |
| 6 | `BentoHeroSection.tsx` responsive grid | No fixed 619px @ mobile |
| 7 | `TestimonialsCarousel.tsx` stack + padding | Header readable @ 375px |
| 8 | `ServicesCarousel.tsx` + `ArticleCardGrid.tsx` | Headings + padding |
| 9 | `about-us.tsx` padding fix | `sm:px-50` removed |
| 10 | Full QA @ 375 / 390 / 768 | PRODUCT acceptance checkboxes |
| 11 | Regression @ 1440 desktop | Mega-menu + footer layout unchanged |

---

## Files to modify

| File | Action |
| ---- | ------ |
| `components/custom/logo.tsx` | **Modify** |
| `components/custom/header.tsx` | **Modify** |
| `components/custom/imili/ImiliFooter.tsx` | **Modify** |
| `components/custom/imili/BentoHeroSection.tsx` | **Modify** |
| `components/custom/imili/TestimonialsCarousel.tsx` | **Modify** |
| `components/custom/imili/ServicesCarousel.tsx` | **Modify** |
| `components/custom/imili/ArticleCardGrid.tsx` | **Modify** |
| `components/custom/about-us.tsx` | **Modify** |
| `app/page.tsx` | **Verify** (optional comment only) |

---

## Accessibility checklist

| Requirement | Implementation |
| ----------- | -------------- |
| Menu toggle | `aria-expanded`, `aria-controls` |
| Drawer | `role="dialog"` `aria-modal="true"` `aria-label` |
| Focus | Return to menu button on close |
| Escape | Closes drawer |
| Touch targets | `min-h-11 min-w-11` on nav rows and icon buttons |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — drawer without transform transition |
| External links | Unchanged `rel` / `target` |

---

## QA checklist

| Check | Viewport |
| ----- | -------- |
| No horizontal scroll | 375 |
| Drawer open/close | 375 |
| Accordion expand/collapse | 375 |
| Bento readable | 375 |
| Testimonials heading fits | 375 |
| Footer newsletter full width | 375 |
| Desktop mega-menu | 1440 |
| `npm run build` | CI |

---

## Boundaries

**Always:**

- Read [PRODUCT.md](./PRODUCT.md) before coding.
- Preserve desktop `lg+` layouts from feat-0002 / feat-0017 / section specs.
- Fix overflow at source — do not rely only on `overflow-x-hidden`.

**Never:**

- Add new nav items, routes, or footer columns.
- Introduce new UI libraries for drawer only.
- Change IMILI production copy.
- Redesign desktop mega-menu panel geometry.

**Ask first:**

- Footer column accordions on mobile.
- Drawer from left instead of right.
- Re-enable Services carousel arrows on tablet.
