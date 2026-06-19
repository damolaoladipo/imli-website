# feat-0024: Homepage — IMILI documentary video section

## Summary

Add a **homepage section** that embeds the IMILI documentary YouTube video:

**Source URL (product-supplied):** [https://youtu.be/oH2s7rjl8Os](https://youtu.be/oH2s7rjl8Os?si=SGTP5r-Qy8XGeV7q)

**Embed ID:** `oH2s7rjl8Os`  
**Normative embed:** `https://www.youtube.com/embed/oH2s7rjl8Os`

Implements [feat-0001 Carousel 3 — IMILI Documentary](../feat-0001/PRODUCT.md#carousel-3--imili-documentary) on the live homepage stack.

**App:** root Next.js site (`imil-institute` package).

**Normative decisions:** [Placement](#d1--placement-on-homepage), [Content](#d2--content), [Layout](#d3--layout), [Embed](#d4--youtube-embed), [Autoplay](#d4--youtube-embed), [Mobile](#d5--mobile-responsiveness), [Data model](#d6--data-model), [Acceptance](#acceptance-criteria).

**Related specs:**

| Spec | Relation |
| ---- | -------- |
| [feat-0001](../feat-0001/PRODUCT.md) | Parent — Carousel 3 documentary in homepage order |
| [feat-0018](../feat-0018/PRODUCT.md) | Staged `documentary` in `homepage.ts` — **this feat ships the component + wire-up** |
| [feat-0022](../feat-0022/PRODUCT.md) | Mobile left-align + section padding tokens |

**Agent skills (read before implement):**

| Skill | Use |
| ----- | --- |
| [spec-driven-development](../../.agents/skills/spec-driven-development/SKILL.md) | Gated SPECIFY → PLAN → TASKS → IMPLEMENT |
| [incremental-implementation](../../.agents/skills/incremental-implementation/SKILL.md) | Data → component → `app/page.tsx` |
| [source-driven-development](../../.agents/skills/source-driven-development/SKILL.md) | YouTube embed, Next.js iframe, a11y |
| [security-and-hardening](../../.agents/skills/security-and-hardening/SKILL.md) | `referrerPolicy`, no arbitrary embed URLs in client |

---

## Assumptions (confirm or correct before implement)

1. **One video only** — the YouTube link above is the sole embed for v1; no playlist or secondary clips.
2. **Section position** — after `AboutUs`, before `ServicesCarousel` ([feat-0001 stack](#d1--placement-on-homepage)).
3. **Autoplay on load** — video **starts automatically** when the section loads, **muted** (browser requirement); user may unmute via YouTube controls. See [D4](#d4--youtube-embed).
4. **Light homepage shell** — section matches current white/stone bands (`AboutUs`, `ServicesCarousel`); not feat-0001 dark-only migration.
5. **Copy** — heading and subtext from [D2](#d2--content) unless product overrides before implement.
6. **Privacy-enhanced embed** — optional `youtube-nocookie.com` host; default `youtube.com/embed` is acceptable for v1.
7. **Mobile responsiveness is in scope** — full [D5](#d5--mobile-responsiveness) rules apply; aligns with [feat-0022](../feat-0022/PRODUCT.md).

---

## Problem

| Today | Gap |
| ----- | --- |
| [feat-0001](../feat-0001/PRODUCT.md) defines Carousel 3 (documentary) | **No video section** on `/` |
| [feat-0018](../feat-0018/PRODUCT.md) staged documentary data | `homepage.ts` has no `documentary` export; no `DocumentarySection` component |
| Product supplied YouTube URL | Not reflected in repo |

**Goal:** Responsive, accessible YouTube embed section on the homepage at the correct stack position, driven by `_data/imili/homepage.ts`.

---

## D1 — Placement on homepage

### Stack order (`app/page.tsx`)

| # | Section | Component |
| - | ------- | --------- |
| 1 | Hero | `BentoHeroSection` |
| 2 | About | `AboutUs` |
| 3 | **Documentary** | **`DocumentarySection`** (new) |
| 4 | What We Do | `ServicesCarousel` |
| 5 | Latest Updates | `ArticleCardGrid` |
| 6 | Testimonials | `TestimonialsCarousel` |

```tsx
// app/page.tsx (after implement)
<BentoHeroSection ... />
<AboutUs ... />
<DocumentarySection content={imiliHomepageDocumentary} />
<ServicesCarousel ... />
...
```

---

## D2 — Content

| Field | v1 value | Notes |
| ----- | -------- | ----- |
| `badge` | optional — omit or `Documentary` | Match badge pattern from other sections if used |
| `heading` | **IMILI Documentary** | [feat-0001](../feat-0001/PRODUCT.md#carousel-3--imili-documentary) |
| `subtext` | **Online Version - IMILI Documentary** | Media label from feat-0001 |
| `youtubeId` | `oH2s7rjl8Os` | Parsed from product URL |
| `watchUrl` | `https://youtu.be/oH2s7rjl8Os` | Canonical share link (strip tracking `?si=` in data) |
| `embedUrl` | `https://www.youtube.com/embed/oH2s7rjl8Os?autoplay=1&mute=1&playsinline=1&rel=0` | iframe `src` — see [D4](#d4--youtube-embed) |

**Do not** invent alternate titles or a different video ID.

### URL normalization rule

| Input (product) | Stored in data |
| --------------- | -------------- |
| `https://youtu.be/oH2s7rjl8Os?si=SGTP5r-Qy8XGeV7q` | `youtubeId: "oH2s7rjl8Os"` |
| Any `watch?v=` form | Extract `v` query param → `youtubeId` |

---

## D3 — Layout

### Section shell

| Token | @ mobile (`&lt; lg`) | @ desktop (`lg+`) |
| ----- | -------------------- | ----------------- |
| Background | `bg-white` | same |
| Vertical padding | `py-12 md:py-20` | `lg:py-24` |
| Horizontal padding | `px-4 sm:px-6` | `lg:px-14` or `container mx-auto` |
| Text align | **left** ([feat-0022](../feat-0022/PRODUCT.md)) | left |
| Max content width | `max-w-5xl` on video block optional | centers video container only — **heading stays left** |

### ASCII (@ desktop)

```text
┌ DocumentarySection (bg-white) ─────────────────────────────────────┐
│  [optional badge]                                                  │
│  H2: IMILI Documentary                                             │
│  p:  Online Version - IMILI Documentary                             │
│                                                                    │
│  ┌ 16:9 embed ─────────────────────────────────────────────────┐  │
│  │  [ YouTube iframe — oH2s7rjl8Os ]                            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  a: Watch on YouTube (optional external link)                      │
└────────────────────────────────────────────────────────────────────┘
```

### Typography

| Element | Mobile | Desktop (`lg+`) |
| ------- | ------ | ----------------- |
| Heading | `text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]` | `lg:text-[40px]` |
| Subtext | `text-base text-[#6B7280]` | `lg:text-[20px]` |
| Heading → subtext gap | `mt-3` | `lg:mt-4` |
| Subtext → video gap | `mt-8` | `lg:mt-10` |

---

## D4 — YouTube embed

### Autoplay (required)

Video **must autoplay** when the homepage loads and the iframe is in view.

| Rule | Spec |
| ---- | ---- |
| Autoplay | **Yes** — `autoplay=1` on embed URL |
| Muted | **Yes** — `mute=1` (required by Chrome, Safari, Firefox for autoplay without user gesture) |
| Inline on iOS | `playsinline=1` — prevents forced fullscreen on mobile |
| Related videos | `rel=0` — limit unrelated suggestions at end (YouTube may still show some) |
| Sound | User unmutes via YouTube player controls after start |

**Normative embed URL:**

```text
https://www.youtube.com/embed/oH2s7rjl8Os?autoplay=1&mute=1&playsinline=1&rel=0
```

**Do not** ship without `autoplay=1`. Autoplay **with sound** on first paint is **not** possible in modern browsers without a user tap — muted autoplay is the correct implementation.

### iframe requirements

| Attribute | Value |
| --------- | ----- |
| `src` | `content.embedUrl` (includes autoplay params above) |
| `title` | `IMILI Documentary` |
| `allow` | `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share` |
| `allowFullScreen` | `true` |
| `referrerPolicy` | `strict-origin-when-cross-origin` |
| `loading` | `eager` — **not** `lazy` (lazy conflicts with autoplay on load) |

### Aspect ratio wrapper

```tsx
<div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#111111]/5">
  <iframe className="absolute inset-0 h-full w-full" ... />
</div>
```

| Token | Value |
| ----- | ----- |
| Aspect ratio | `16:9` (`aspect-video`) |
| Corner radius | `rounded-2xl` (match IMILI cards) |
| Border | optional `ring-1 ring-[#E5E7EB]` |

### Optional “Watch on YouTube” link

Below embed, left-aligned:

```tsx
<a href="https://youtu.be/oH2s7rjl8Os" target="_blank" rel="noopener noreferrer">
  Watch on YouTube
</a>
```

Style: `text-sm text-[#0548bd] hover:underline` — matches IMILI link accent.

---

## D5 — Mobile responsiveness

**Yes — mobile responsiveness is fully in scope.** This section follows [feat-0022](../feat-0022/PRODUCT.md) homepage rules.

### QA viewports (mandatory)

| Width | Device |
| ----- | ------ |
| **375px** | iPhone SE |
| **390px** | iPhone 14 |
| **768px** | iPad portrait |
| **1440px** | Desktop |

### Layout @ `&lt; lg`

| Token | Spec |
| ----- | ---- |
| Horizontal padding | `px-4 sm:px-6` |
| Vertical padding | `py-12 md:py-20` |
| Text alignment | **Left** — `text-left items-start` |
| Heading scale | `text-2xl sm:text-3xl md:text-4xl` |
| Subtext | `text-base` (≥ 16px) |
| Video width | `w-full` inside container — no fixed pixel width |
| Video height | `aspect-video` (16:9) — scales with viewport width |
| Overflow | **No horizontal scroll** on section @ 375px |
| Corner radius | `rounded-2xl` on embed wrapper |

### Video @ mobile

| Rule | Spec |
| ---- | ---- |
| Autoplay | Same as desktop — `autoplay=1&mute=1&playsinline=1` |
| `playsinline` | **Required** for iOS Safari inline playback |
| Touch | Native YouTube controls (play/pause, fullscreen, unmute) |
| Tap targets | YouTube chrome — no custom overlay blocking controls |

### Alignment (feat-0022)

| Rule | Spec |
| ---- | ---- |
| Copy | `text-left items-start` — no centered headings |
| CTA link | “Watch on YouTube” left-aligned below embed |
| Anti-patterns | No `text-center`, `mx-auto` on headings, or `justify-center` on copy |

### Optional enhancement (out of scope v1)

Intersection Observer to start autoplay only when section scrolls into view — **not required** for v1; autoplay on page load is normative.

---

## D6 — Data model

```ts
// _data/imili/homepage.ts

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

**Rule:** `embedUrl` must be derived from `youtubeId` in code or kept in sync — never accept arbitrary user input at runtime.

---

## D7 — Component API

```tsx
// components/custom/imili/DocumentarySection.tsx

type DocumentarySectionProps = {
  content: DocumentarySectionContent;
};

export function DocumentarySection({ content }: DocumentarySectionProps) {
  // section + heading + aspect-video iframe + optional watch link
}
```

Export from `components/custom/imili/index.ts`.

**No** `"use client"` unless lazy-loading or intersection observer is added — static iframe is fine in Server Component.

---

## Acceptance criteria

- [ ] `DocumentarySection` renders on `/` **between** `AboutUs` and `ServicesCarousel`
- [ ] iframe `src` embeds video `oH2s7rjl8Os` with **`autoplay=1&mute=1&playsinline=1`**
- [ ] Video **autoplays muted** on page load (desktop and mobile)
- [ ] iframe `title="IMILI Documentary"`; `loading="eager"`
- [ ] Responsive 16:9 embed; **no horizontal scroll @ 375px**
- [ ] Heading and subtext **left-aligned** @ mobile; scaled type per [D5](#d5--mobile-responsiveness)
- [ ] Content sourced from `_data/imili/homepage.ts` (`imiliHomepageDocumentary`)
- [ ] `npm run build` passes

---

## Out of scope

| Item | Reason |
| ---- | ------ |
| Hero slider (Carousel 1) | Separate feat |
| Self-hosted MP4 | Product supplied YouTube only |
| Video modal / lightbox | Inline embed sufficient |
| Multiple videos / playlist | Single URL only |
| feat-0001 dark-only shell | Current site is light bands |
| Changing other homepage sections | This feat adds one section only |

---

## Open questions (product)

| # | Question |
| - | -------- |
| 1 | Confirm heading **IMILI Documentary** and subtext **Online Version - IMILI Documentary**? |
| 2 | Include optional **Watch on YouTube** link below embed? **Default: yes.** |
| 3 | Use `youtube-nocookie.com` embed host for privacy? **Default: standard youtube.com embed.** |
| 4 | Add optional poster image before iframe loads? **Default: no — YouTube thumbnail via embed.** |
| 5 | Autoplay with sound on first paint? **Not supported by browsers — muted autoplay only (resolved).** |

---

## Success criteria (reframed)

| Request | Testable outcome |
| ------- | ---------------- |
| Add YouTube URL as homepage section | Section visible @ `/` with working embed |
| Correct video | `oH2s7rjl8Os` autoplays muted in iframe |
| Mobile | Left-aligned, full-width 16:9 @ 375px |
| Fits homepage | Position #3 in stack; matches section rhythm |
