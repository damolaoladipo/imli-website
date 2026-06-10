# feat-0002: Header mega-menu dropdown

## Summary

Add a **hopely-style mega-menu** to desktop header nav items that have **defined child links** in the IMILI codebase. Layout matches `./assets/header-mega-menu-reference.png`: white panel, left column (heading + text links), right column (two rounded images). **No invented routes, copy, or images.**

**Reference:** Programs dropdown on hopely header (screenshot in assets). **IMILI mapping:** reference **Programs** pattern applies to **What We Do**; **About** and **News** get the same panel geometry where child links exist in repo/spec.

**Normative:** [Layout](#layout-pixel-spec-1440px), [Nav mapping](#nav-item-mapping), [Assets](#image-assets), [States](#interaction-states), [Mobile](#mobile).

---

## Problem

| Today | Gap |
| ----- | --- |
| Header nav is flat `Link` list | Reference shows expandable mega-menu with links + imagery |
| `NavigationMenu` UI exists but unused | No dropdown panel wired to header |
| Child destinations defined in feat-0001 for What We Do / News | Not surfaced in navigation |

**Goal:** Pixel-aligned mega-menu panel; only ship links and images that exist in `public/` or normative feat-0001 data.

---

## Design reference (`./assets/header-mega-menu-reference.png`)

Reference geometry and typography scale are **normative**. Reference strings (hopely Programs, Child Development, etc.) are **not** shipped.

### Reference layout (normative geometry)

| Element | Spec |
| ------- | ---- |
| Panel | White `#FFFFFF`, `border-radius: 16px`, soft shadow (`0 20px 50px rgba(0,0,0,0.08)`), no visible border |
| Panel padding | `40px` all sides |
| Panel min width | `960px` |
| Column gap | `48px` between link column and image column |
| Link column width | `~320px` flex-shrink-0 |
| Section heading | Bold, `20px` / `leading-7`, `#171717` |
| Link list | `16px` regular, `#171717`, `12px` vertical gap between items |
| Link hover | `#0548bd` (IMILI primary — same as `CustomButton`) |
| Images | Two equal cards, `280×200px` display, `object-fit: cover`, `border-radius: 12px`, `16px` gap |
| Nav trigger (closed) | `20px` medium, `#171717`, chevron down `12px` |
| Nav trigger (open) | `#0548bd`, chevron rotated 180° (points up) |
| Panel offset | `12px` below nav bar, horizontally aligned under active trigger (centered on item) |

---

## Nav item mapping

Only items with **verified child links** get a dropdown and chevron. Others remain plain links (no chevron).

### About (dropdown)

| Role | Value | Source |
| ---- | ----- | ------ |
| Heading | About IMILI | `app/about/page.tsx` H1 pattern |
| Link 1 | About IMILI → `/about` | `app/about/page.tsx` |
| Link 2 | FAQ → `/faq` | `app/faq/page.tsx` |
| Image 1 | `/new/mision.png` | `app/about/page.tsx` `Feature1` |
| Image 2 | `/new/vision.png` | `app/about/page.tsx` `Feature2` |

### What We Do (dropdown) — reference **Programs** analog

| Role | Value | Source |
| ---- | ----- | ------ |
| Heading | What We Do | feat-0001 Carousel 4 |
| Link labels | Opening clauses from normative box copy (table below) | feat-0001 PRODUCT § Carousel 4 |
| hrefs | `/what-we-do#research`, `#clearinghouse`, `#global-agenda`, `#convening` | feat-0001 TECH `WhatWeDoBox` |
| Image 1 | `/new/humans.png` | `public/new/` |
| Image 2 | `/new/corps.png` | `public/new/` |

| # | Menu label (substring of normative body) | href |
| - | -------------------------------------- | ---- |
| 1 | Advance media and information literacy knowledge | `/what-we-do#research` |
| 2 | Act as a clearinghouse on MIL best practices | `/what-we-do#clearinghouse` |
| 3 | Influence media and information literacy in global development agenda | `/what-we-do#global-agenda` |
| 4 | Leverage convening and networking power globally | `/what-we-do#convening` |

### News (dropdown)

| Role | Value | Source |
| ---- | ----- | ------ |
| Heading | Latest Updates | feat-0001 Carousel 5 |
| Links | Five `title` + `href` pairs | feat-0001 TECH `latestUpdates.items` (external) |
| Image 1 | `/new/bg-hero.png` | `public/new/` |
| Image 2 | `/new/humans.png` | `public/new/` |

**Do not** use `/brand/updates/*` images (not in `public/`).

### Plain links (no dropdown)

| Item | href | Reason |
| ---- | ---- | ------ |
| Who We Are | `/who-we-are` | No child routes or normative sub-links in repo |
| Gallery | `/gallery` | No child routes in repo |
| Contact | `/contact` | CTA also on `CustomButton`; no sub-links |

---

## Interaction states

- Desktop: Radix `NavigationMenu`; one panel open at a time.
- Open trigger: text `#0548bd`, chevron up.
- Closed triggers: `#171717`.
- Panel enter/exit: fade + slight zoom (existing `navigation-menu` animations).
- Keyboard: Radix default focus trap and escape to close.

---

## Mobile

Inside existing mobile drawer (`lg:hidden`):

- Parent with dropdown: tap expands nested `<ul>` of child links (no image column).
- Plain links: unchanged single row.
- External News links: `target="_blank"` `rel="noopener noreferrer"`.

---

## Acceptance criteria

- [ ] About, What We Do, News show chevron on desktop; Who We Are, Gallery, Contact do not
- [ ] Open panel matches reference geometry (white card, left links, right two images)
- [ ] All link labels and hrefs match tables above — no hopely copy
- [ ] All images load from `public/new/*` paths listed above
- [ ] Active/open nav item uses `#0548bd`
- [ ] Mobile shows nested links without images
- [ ] `npm run build` passes
