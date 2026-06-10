# feat-0002: Header mega-menu — technical spec

## Files

| File | Action |
| ---- | ------ |
| `_data/imili/header-nav.ts` | **Create** — nav items, dropdown headings, links, images |
| `components/custom/header-mega-menu-panel.tsx` | **Create** — shared panel layout (links + 2 images) |
| `components/custom/header.tsx` | **Update** — wire `NavigationMenu`, desktop triggers, mobile nested lists |

## Data model

```ts
// _data/imili/header-nav.ts

export type HeaderNavImage = {
  src: string;
  alt: string;
};

export type HeaderNavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type HeaderNavDropdown = {
  heading: string;
  links: HeaderNavLink[];
  images: [HeaderNavImage, HeaderNavImage];
};

export type HeaderNavItem = {
  name: string;
  href: string;
  dropdown?: HeaderNavDropdown;
};
```

## Panel component

```tsx
// components/custom/header-mega-menu-panel.tsx
// Props: dropdown: HeaderNavDropdown
// Layout: flex row, p-10, gap-12, w-[960px], bg-white rounded-2xl shadow-xl
// Left: h3 heading + ul of Link/a
// Right: two next/image 280x200 rounded-xl
```

## Header integration

- Import `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink` from `@/components/ui/navigation-menu`.
- `NavigationMenu` with `viewport={false}` so panel renders under trigger without shared viewport clipping.
- Items **with** `dropdown`: `NavigationMenuTrigger` styled like current ghost nav (`text-lg lg:text-xl font-medium`, open state `text-[#0548bd]`).
- Items **without** `dropdown`: `NavigationMenuLink` + `Link` (no chevron).
- `headerNavItems` from `_data/imili/header-nav.ts` replaces inline `menuItems` array.

### Trigger classes (desktop)

```
h-auto px-4 py-2 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent
text-lg lg:text-xl font-medium text-neutral-900 data-[state=open]:text-[#0548bd]
```

### Mobile nested list

```tsx
{item.dropdown && (
  <ul className="mt-3 space-y-3 border-l border-neutral-200 pl-4">
    {item.dropdown.links.map(...)}
  </ul>
)}
```

## Dependencies

- Existing: `@radix-ui/react-navigation-menu`, `next/image`, `next/link`
- No new packages

## Out of scope

- `/what-we-do`, `/news` page implementation (links may 404 until those routes ship)
- `/brand/updates/*` imagery from feat-0001 homepage spec
- Homepage carousel content (feat-0001)

## Verification

```bash
npm run build
```

Manual: desktop @ 1440px — open each dropdown, compare to `_specs/feat-0002/assets/header-mega-menu-reference.png`.
