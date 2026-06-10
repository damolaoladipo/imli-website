# feat-0006: Tech — Services carousel (dark three-card row)

## Context

See [PRODUCT.md](./PRODUCT.md). Implement the **services carousel** from `./assets/services-carousel-reference.png` (**1024×456** capture; QA @ **1440px**).

**Pixel tables:** [Section shell](./PRODUCT.md#d3--section-shell), [Header](./PRODUCT.md#d4--header-anatomy), [Carousel](./PRODUCT.md#d5--carousel-behavior), [Service card](./PRODUCT.md#d6--service-card-anatomy), [Colors](./PRODUCT.md#d7--colors-from-reference).

**Homepage:** New section alongside feat-0003, feat-0004, feat-0005.

---

## Objective

1. Add `_data/imili/services.ts` with `ServicesSectionContent` (reference strings; icon/illustration paths TBD or QA placeholders).
2. Implement `ServiceCard` + `ServicesCarousel` under `components/custom/imili/`.
3. Add `ServicesCarousel` to `app/page.tsx` as a new section.
4. Pixel QA @ 1440px against `./assets/services-carousel-reference.png`.
5. Do **not** invent asset paths — follow [D9](./PRODUCT.md#d9--icons-and-illustrations-public-folder).

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| Images | `next/image` for icons + bottom illustrations when SVG/PNG exist |
| Icons + illustrations | `next/image` → `/services/icon-*.svg`, `/services/art-*.svg` |
| Nav | `ArrowLeft` / `ArrowRight` stroke 1.5 + `scrollBy` when `items.length > 3` |
| Font | Montserrat via `app/layout.tsx` |
| Styling | Tailwind v4 — hex from [PRODUCT D7](./PRODUCT.md#d7--colors-from-reference) |
| Data | `_data/imili/services.ts` |

**Do not use** `CustomButton` — reference CTA is a small dark pill, not split blue button.

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA @ **1440×900**:

1. Overlay `./assets/services-carousel-reference.png`.
2. Verify badge outline, lime “services”, dashed nav rings, 3 cards, “View detail” pills.
3. Click prev/next when `items.length > 3` — track scrolls one card.
4. Confirm card 1 description truncation is preserved.

---

## Project structure

```text
./
├── _data/imili/
│   └── services.ts                         # NEW
├── public/services/                        # NEW (product) — 6 SVG assets
│   ├── icon-freight.svg
│   ├── art-truck.svg
│   ├── icon-route.svg
│   ├── art-van.svg
│   ├── icon-fleet.svg
│   └── art-ship.svg
├── components/custom/imili/
│   ├── ServiceCard.tsx                     # NEW
│   ├── ServicesCarousel.tsx                # NEW — section + header + track
│   └── index.ts                            # UPDATE exports
├── app/page.tsx                            # ADD ServicesCarousel
└── _specs/feat-0006/assets/
    └── services-carousel-reference.png
```

---

## Data model

```ts
// _data/imili/services.ts

export type ServiceCardItem = {
  id: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  ctaLabel: string;
  illustrationSrc: string;
  illustrationAlt: string;
};

export type ServicesSectionContent = {
  badge: string;
  headingPrefix: string;
  headingAccent: string;
  items: ServiceCardItem[];
};

const QA_ICON = ""; // empty until public/services/ exists
const QA_ILLUSTRATION = "";

/**
 * Layout QA — reference strings verbatim.
 * iconSrc / illustrationSrc: set when public/services/*.svg exist.
 * Until then, ServiceCard uses lucide fallback (TECH — spacing QA only).
 */
export const servicesReferenceContent: ServicesSectionContent = {
  badge: "OUR SERVICES",
  headingPrefix: "Clean mobility & supply chain ",
  headingAccent: "services",
  items: [
    {
      id: "ref-1",
      href: "#",
      iconSrc: "/services/icon-freight.svg",
      iconAlt: "TBD — freight container icon",
      title: "Green freight solution",
      description:
        "Our Green Freight Solution is designed to help businesses minimize their environmental.",
      ctaLabel: "View detail",
      illustrationSrc: "/services/art-truck.svg",
      illustrationAlt: "TBD — truck line art",
    },
    {
      id: "ref-2",
      href: "#",
      iconSrc: "/services/icon-route.svg",
      iconAlt: "TBD — route icon",
      title: "Intelligent route optimization",
      description:
        "Cut down on miles and emissions through data-driven route optimization.",
      ctaLabel: "View detail",
      illustrationSrc: "/services/art-van.svg",
      illustrationAlt: "TBD — van line art",
    },
    {
      id: "ref-3",
      href: "#",
      iconSrc: "/services/icon-fleet.svg",
      iconAlt: "TBD — fleet icon",
      title: "Fleet management",
      description:
        "Eco-focused fleet operations for better sustainability control.",
      ctaLabel: "View detail",
      illustrationSrc: "/services/art-ship.svg",
      illustrationAlt: "TBD — ship line art",
    },
  ],
};
```

**v2:** All six paths resolve under `public/services/`. `ServiceCard` renders icons + bottom illustrations per [D6](./PRODUCT.md#d6--service-card-anatomy).

---

## Component sketches

### `ServiceCard.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import { Container, Map, Package } from "lucide-react";
import type { ServiceCardItem } from "@/_data/imili/services";

const LUCIDE_FALLBACK = [Container, Map, Package] as const;

type Props = {
  item: ServiceCardItem;
  index: number;
};

export function ServiceCard({ item, index }: Props) {
  const FallbackIcon = LUCIDE_FALLBACK[index] ?? Container;
  const useAssetIcons = item.iconSrc.startsWith("/services/"); // gate until files exist

  return (
    <article className="relative flex w-[382px] shrink-0 min-h-[394px] flex-col rounded-[22px] bg-[#1C1C1C] p-7">
      {useAssetIcons ? (
        <Image src={item.iconSrc} alt={item.iconAlt} width={45} height={45} />
      ) : (
        <FallbackIcon className="size-11 text-[#B8F43C]" strokeWidth={1.5} aria-hidden />
      )}

      <h3 className="mt-4 text-[22px] font-bold text-white">{item.title}</h3>
      <p className="mt-3 text-[18px] leading-relaxed text-white/80">{item.description}</p>

      <Link
        href={item.href}
        className="mt-5 inline-flex w-fit rounded-full bg-[#2A2A2A] px-5 py-2 text-[17px] text-white"
      >
        {item.ctaLabel}
      </Link>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[45%] opacity-35">
        {useAssetIcons ? (
          <Image
            src={item.illustrationSrc}
            alt={item.illustrationAlt}
            fill
            className="object-contain object-bottom px-4 pb-4"
          />
        ) : null}
      </div>
    </article>
  );
}
```

### `ServicesCarousel.tsx`

```tsx
"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import type { ServicesSectionContent } from "@/_data/imili/services";

const SCROLL_STEP = 382 + 23;

export function ServicesCarousel({ content }: { content: ServicesSectionContent }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" });
  };

  return (
    <section id="services" className="bg-[#141414] py-[68px]">
      <div className="px-14">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/80 px-4 py-1.5 text-[15px] font-medium uppercase tracking-wide text-white">
              {content.badge}
            </span>
            <h2 className="mt-5 text-[45px] font-bold leading-tight text-white">
              {content.headingPrefix}
              <span className="text-[#B8F43C]">{content.headingAccent}</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous service"
              onClick={() => scroll(-1)}
              className="flex size-[62px] items-center justify-center rounded-full border border-dashed border-white/70 bg-transparent text-white"
            >
              <ChevronLeft className="size-7" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next service"
              onClick={() => scroll(1)}
              className="flex size-[62px] items-center justify-center rounded-full border border-dashed border-white/70 bg-transparent text-white"
            >
              <ChevronRight className="size-7" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-11 flex gap-[23px] overflow-x-auto px-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {content.items.map((item, index) => (
          <ServiceCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
```

---

## Homepage wire-up

```tsx
// app/page.tsx (excerpt) — new section
import { ServicesCarousel } from "@/components/custom/imili";
import { servicesReferenceContent } from "@/_data/imili/services";

<ServicesCarousel content={servicesReferenceContent} />
```

Suggested stack order (after feat-0005):

```text
About → feat-0003 → feat-0004 → feat-0005 → feat-0006
```

---

## Implementation tasks (ordered)

| # | Task | Done when |
| - | ---- | --------- |
| 1 | Reference PNG in `_specs/feat-0006/assets/` | Done |
| 2 | Create `_data/imili/services.ts` | Reference strings compile |
| 3 | Export 6 SVGs to `public/services/` **or** document lucide QA waiver | Assets 200 or waiver in PR |
| 4 | `ServiceCard.tsx` | Card anatomy [D6](./PRODUCT.md#d6--service-card-anatomy) |
| 5 | `ServicesCarousel.tsx` | Header + track + nav [D4–D5](./PRODUCT.md#d4--header-anatomy) |
| 6 | Export from `index.ts` | Named exports |
| 7 | Wire `app/page.tsx` | New section on `/` |
| 8 | Overlay QA @ 1440 | PRODUCT acceptance checkboxes |

---

## Accessibility

| Requirement | Implementation |
| ----------- | -------------- |
| H2 | One per section; accent word inside same heading |
| Nav buttons | `aria-label` “Previous service” / “Next service” |
| Card CTA | Visible “View detail” link text |
| Decorative illustrations | `alt` from data; `pointer-events-none` on illustration layer |
| Keyboard | Focus ring on CTA links and nav buttons |

---

## Boundaries

### Always

- Read [PRODUCT.md](./PRODUCT.md) before coding.
- Preserve truncated card 1 description verbatim.
- Ship as **new** homepage section.

### Never

- Add “Get it for FREE” template widget.
- Complete card 1 sentence.
- Substitute random `public/*.svg` and claim reference fidelity.
- Use split `CustomButton` for “View detail”.
- Add dots, autoplay, or section subheading.

### Ask first

- Swapping lime `#B8F43C` → IMILI `#03A904` while claiming reference QA.
- Shipping without `public/services/` assets on production.
