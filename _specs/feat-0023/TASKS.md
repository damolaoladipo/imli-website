# feat-0023: Tasks — Homepage motion & micro-interactions

Ordered implementation slices. Complete one slice + `npm run build` before the next.

| # | Task | Files | Verify |
| - | ---- | ----- | ------ |
| 1 | Add `lib/motion.ts` tokens + `useReducedMotion` helpers | `lib/motion.ts` | Reduced-motion returns opacity-only variants |
| 2 | Create `CarouselNavButton` (dashed ring + arrows + motion) | `CarouselNavButton.tsx`, `index.ts` | Matches Services visual spec |
| 3 | `BentoHeroSection` + bento tiles mount stagger + tile hover | `BentoHeroSection.tsx`, `Bento*Tile.tsx` | Hero staggers on load; tiles lift on hover |
| 4 | `AboutUs` split-column `whileInView` | `about-us.tsx` | Copy + image reveal on scroll |
| 5 | `ServicesCarousel` header reveal + `CarouselNavButton` | `ServicesCarousel.tsx` | Nav uses shared component |
| 6 | `ServiceCard` scroll reveal + hover | `ServiceCard.tsx` | Card lift + CTA hover |
| 7 | `ArticleCardGrid` + `ArticleCard` stagger + image zoom (5 cards, row-aware delay) | `ArticleCardGrid.tsx`, `ArticleCard.tsx` | Grid stagger; `group-hover` + `group-focus-visible`; no sticky touch hover |
| 8 | `TestimonialsCarousel` — unified nav + Pause/Resume + **auto-advance** + header motion | `TestimonialsCarousel.tsx` | 5s advance when ≥35% visible; pause on hover/focus/nav/Pause; `visibilityState` hidden stops timer; off when reduced motion |
| 9 | Testimonial cards hover (hover-gated) | `TestimonialCardStandard.tsx`, `TestimonialCardFeatured.tsx` | Card lift / image scale; no transform when reduced |
| 10 | Hover gating + `focus-visible` pass | all card + nav files | `@media (hover: hover)` or `whileHover` gated; focus mirrors hover on ArticleCard |
| 11 | `prefers-reduced-motion` pass on all slices | all touched files | `initial={false}` hero; opacity-only elsewhere |
| 12 | Clip QA — card lift vs `main` overflow | `ServiceCard`, section roots | No clipped `translateY` at 1440px |
| 13 | `npm run build` + manual QA | — | [PRODUCT acceptance](./PRODUCT.md#acceptance-criteria) |

**Product locked:** testimonial auto-advance **yes**; nav visual unification **yes** (Services dashed-ring canonical).

**Out of scope for v1:** `HeroHeader`, `MobileNavDrawer`, `ImiliFooter`, `ForestFooterSection` — see [feat-0024](./PRODUCT.md#layout-chrome-feat-0024) stub in PRODUCT.

**Responsive nav (locked):** Services carousel nav hidden below `lg`; Testimonials nav visible on mobile (swipe + arrows).
