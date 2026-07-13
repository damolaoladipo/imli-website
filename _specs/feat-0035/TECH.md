# feat-0035: TECH — What We Do pillar cards

## Files

| File | Action |
| ---- | ------ |
| `_data/imili/what-we-do-page.ts` | ADD `image` to pillar type + stock image refs |
| `components/custom/imili/WhatWeDoPillarsSection.tsx` | REWRITE — dark feature cards |
| `_specs/feat-0035/*` | CREATE |

## Content

Pillar descriptions (verbatim):

1. **Research & Analysis** — Conducts and promotes rigorous research on Media and Information Literacy, information integrity, artificial intelligence, digital citizenship, misinformation, disinformation, and hate speech to generate reliable evidence, identify emerging trends, and inform effective MIL practices and strategies.

2. **Capacity Development** — Strengthen the knowledge, skills and competencies of educators, information professionals, communicators, and community leaders to advance effective Media and Information Literacy education and initiative.

3. **Policy Innovation** — Develop and advocate for forward-looking policies that embed Media and Information Literacy in national priorities and support sustainable MIL environments.

4. **Curriculum Integration** — Promote the integration of Media and Information Literacy across formal and non-formal education systems to empower learners to critically access, evaluate, and create information responsibly.

5. **Global Cooperation** — Foster international collaboration and knowledge exchange to advance Media and Information Literacy and build a global community committed to informed, inclusive, and democratic societies.

## Images (`STOCK_IMAGES`)

| Pillar | Asset |
| ------ | ----- |
| research-analysis | `nav.about[0]` — library / research |
| capacity-development | `bento.classroom` — training session |
| policy-innovation | `nav.resources[0]` — planning / policy |
| curriculum-integration | `nav.activities[1]` — classroom learning |
| global-cooperation | `mentions.unescoAbuja` — international cooperation |

## Component tokens

```text
Card:     bg-neutral-900 rounded-3xl p-8 lg:p-12
Title:    text-2xl lg:text-3xl font-bold text-white
Body:     text-lg lg:text-xl leading-relaxed text-neutral-400
Image:    rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[280px]
Grid:     lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center
Section:  bg-neutral-100, scroll-mt-28 on each article id
```

## Verification

```bash
npm run build
```

Manual: `/what-we-do` — five cards, anchors work from header mega menu.
