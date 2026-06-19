# feat-0024: Tech — Homepage documentary video section

## Context

See [PRODUCT.md](./PRODUCT.md). Ship **Carousel 3** on `/` with YouTube embed `oH2s7rjl8Os`.

**Video:** [https://youtu.be/oH2s7rjl8Os](https://youtu.be/oH2s7rjl8Os?si=SGTP5r-Qy8XGeV7q)

---

## Objective

1. Extend `_data/imili/homepage.ts` with `DocumentarySectionContent` + `imiliHomepageDocumentary`.
2. Implement `DocumentarySection` under `components/custom/imili/`.
3. Export from `components/custom/imili/index.ts`.
4. Wire `app/page.tsx` between `AboutUs` and `ServicesCarousel`.
5. Manual QA @ **375**, **390**, **768**, **1440** px; `npm run build`.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router — Server Component OK |
| Embed | Native `<iframe>` — no react-player dep |
| Styling | Tailwind v4 — [PRODUCT D3–D5](./PRODUCT.md#d3--layout) |
| Data | `_data/imili/homepage.ts` |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Manual QA:

1. Open `/` — documentary section between About and Services.
2. Video `oH2s7rjl8Os` **autoplays muted** without user tap (desktop).
3. DevTools **375px** — left-aligned copy, full-width 16:9, no horizontal overflow; autoplay muted on mobile Safari/Chrome.
4. User can **unmute** via YouTube controls.
5. Keyboard — iframe focusable; `title` attribute present.

---

## Project structure

```text
./
├── _data/imili/
│   └── homepage.ts                    # MODIFY — add documentary export
├── components/custom/imili/
│   ├── DocumentarySection.tsx         # NEW
│   └── index.ts                       # MODIFY — export
├── app/page.tsx                       # MODIFY — wire section
└── _specs/feat-0024/
    ├── PRODUCT.md
    ├── TECH.md
    └── assets/README.md
```

---

## Implementation tasks

### Task 1 — Data

**File:** `_data/imili/homepage.ts`

```ts
export type DocumentarySectionContent = {
  heading: string;
  subtext: string;
  youtubeId: string;
  watchUrl: string;
  embedUrl: string;
};

export const imiliHomepageDocumentary: DocumentarySectionContent = {
  heading: "IMILI Documentary",
  subtext: "Online Version - IMILI Documentary",
  youtubeId: "oH2s7rjl8Os",
  watchUrl: "https://youtu.be/oH2s7rjl8Os",
  embedUrl:
    "https://www.youtube.com/embed/oH2s7rjl8Os?autoplay=1&mute=1&playsinline=1&rel=0",
};
```

**Verify:** Typecheck; no hardcoded URL in component beyond `content.embedUrl`.

---

### Task 2 — `DocumentarySection.tsx`

**File:** `components/custom/imili/DocumentarySection.tsx`

```tsx
import type { DocumentarySectionContent } from "@/_data/imili/homepage";

type DocumentarySectionProps = {
  content: DocumentarySectionContent;
};

export function DocumentarySection({ content }: DocumentarySectionProps) {
  return (
    <section id="documentary" className="bg-white py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 text-left sm:px-6 lg:px-14">
        <h2 className="text-2xl font-bold text-[#111111] sm:text-3xl md:text-4xl lg:text-[40px]">
          {content.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-[#6B7280] lg:mt-4 lg:text-[20px]">
          {content.subtext}
        </p>

        <div className="mt-8 max-w-5xl lg:mt-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#111111]/5 ring-1 ring-[#E5E7EB]">
            <iframe
              src={content.embedUrl}
              title="IMILI Documentary"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              loading="eager"
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <a
            href={content.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-[#0548bd] hover:underline"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Acceptance:** Matches [PRODUCT D4](./PRODUCT.md#d4--youtube-embed).

---

### Task 3 — Export + wire page

**`index.ts`:**

```ts
export { DocumentarySection } from "./DocumentarySection";
```

**`app/page.tsx`:**

```tsx
import { imiliHomepageAbout, imiliHomepageDocumentary } from "@/_data/imili/homepage";
import { DocumentarySection, ... } from "@/components/custom/imili";

// ...
<AboutUs ... />
<DocumentarySection content={imiliHomepageDocumentary} />
<ServicesCarousel ... />
```

---

### Task 4 — Verify

| Check | Command / action |
| ----- | ---------------- |
| Build | `npm run build` |
| Embed | Manual — muted autoplay on load @ desktop + 375px |
| Mobile | 375 / 390 / 768 — left align, aspect-video, no overflow |
| a11y | iframe `title` in DOM |

---

## Boundaries

| Tier | Rule |
| ---- | ---- |
| **Always** | Use `imiliHomepageDocumentary` data; `title` on iframe; **`autoplay=1&mute=1&playsinline=1`** on embed URL |
| **Ask first** | Adding `react-player` or other video dep; autoplay-with-sound (blocked by browsers) |
| **Never** | `loading="lazy"` on autoplay iframe; arbitrary embed URL from query strings |

---

## Security notes

- `embedUrl` is static from trusted data file — not user input.
- `rel="noopener noreferrer"` on external watch link.
- Consider CSP `frame-src https://www.youtube.com` if CSP headers are added later.
