# feat-0032: Tech — MDX Projects (`/projects`, AFAX-P)

## Context

See [PRODUCT.md](./PRODUCT.md). Add a third fumadocs-mdx collection for institute **projects**, ship index + AFAX-P detail page with submission sidebar.

---

## Objective

1. Extend `source.config.ts` with `projectsDocs` collection.
2. Create `lib/project-source.ts` mirroring `lib/news-source.ts`.
3. Add `projects/content/africa-against-xenophobia-project.mdx` with full legacy copy.
4. Implement `app/projects/page.tsx` and `app/projects/[slug]/page.tsx`.
5. Build `ProjectsIndexSection` and `ProjectDetailLayout`.
6. Wire Activities nav + sitemap + `siteConfig.baseLinks.projects`.

---

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | Next.js App Router (repo root) |
| MDX | fumadocs-mdx (existing) |
| Content loader | fumadocs-core `loader()` + `toFumadocsSource()` |
| Schema | Zod via `frontmatterSchema.extend()` |
| Markdown | remark-gfm (existing) |
| Typography | @tailwindcss/typography (existing) |
| Images | `next/image` + `STOCK_IMAGES` |
| Package manager | **npm** |

---

## Commands

```bash
npm run dev
npm run build
npm run lint
npx fumadocs-mdx   # regenerate .source after schema/content changes
```

Manual QA:

1. `http://localhost:3000/projects` — AFAX-P card visible
2. `http://localhost:3000/projects/africa-against-xenophobia-project` — full article + sidebar
3. Header **Activities → Combating xenophobia** → same detail URL
4. `npm run build` — static params include `africa-against-xenophobia-project`
5. View source — meta tags, canonical, JSON-LD

---

## Project structure

```text
./
├── source.config.ts                    # MODIFY — add projectsDocs
├── projects/content/
│   └── africa-against-xenophobia-project.mdx
├── types/project.ts                    # NEW
├── lib/project-source.ts               # NEW
├── app/
│   ├── sitemap.ts                      # MODIFY
│   └── projects/
│       ├── page.tsx                    # NEW
│       └── [slug]/
│           ├── page.tsx                # NEW
│           └── metadata.ts             # NEW
├── components/custom/imili/
│   ├── ProjectsIndexSection.tsx        # NEW
│   ├── ProjectDetailLayout.tsx         # NEW
│   ├── ProjectSubmissionSidebar.tsx    # NEW
│   └── index.ts                        # MODIFY — exports
├── _data/
│   ├── site-config.tsx                 # MODIFY — baseLinks.projects
│   └── imili/header-nav.ts             # MODIFY — xenophobia href
└── _specs/feat-0032/
```

---

## 1. `source.config.ts` — projects collection

Add after `newsDocs`:

```ts
export const { docs: projectDocs, meta: projectMeta } = defineDocs({
  dir: "projects/content",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      subtitle: z.string().optional(),
      acronym: z.string().optional(),
      status: z
        .enum(["call-for-papers", "active", "completed"])
        .default("active"),
      heroImage: z.string(),
      heroImageAlt: z.string(),
      abstractDeadline: z.string().optional(),
      firstDraftDeadline: z.string().optional(),
      submissionEmail: z.string().optional(),
      submissionEmailSubject: z.string().optional(),
      abstractWordLimit: z.number().optional(),
      draft: z.boolean().optional().default(false),
    }),
  },
});
```

Regenerate `.source` after change.

---

## 2. `types/project.ts`

```ts
import type { Page } from "fumadocs-core/source";

export type ProjectStatus = "call-for-papers" | "active" | "completed";

export type ProjectData = {
  title: string;
  description?: string;
  subtitle?: string;
  acronym?: string;
  status: ProjectStatus;
  date: string;
  heroImage: string;
  heroImageAlt: string;
  abstractDeadline?: string;
  firstDraftDeadline?: string;
  submissionEmail?: string;
  submissionEmailSubject?: string;
  abstractWordLimit?: number;
  draft?: boolean;
  body: React.ComponentType;
};

export type ProjectPage = Page & { data: ProjectData };
```

---

## 3. `lib/project-source.ts`

Mirror `lib/news-source.ts`:

```ts
import { projectDocs, projectMeta } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import type { ProjectData, ProjectPage } from "@/types/project";

const projectSourceInput = toFumadocsSource(projectDocs, projectMeta);

export const projectsSource = loader({
  baseUrl: "/projects",
  source: projectSourceInput,
});

function isPublished(data: ProjectData): boolean {
  if (!data.draft) return true;
  return process.env.NODE_ENV === "development";
}

export function getPublishedProjectPages(): ProjectPage[] {
  return (projectsSource.getPages() as unknown as ProjectPage[]).filter((p) =>
    isPublished(p.data),
  );
}

export function getPublishedProjectPage(slug: string): ProjectPage | undefined {
  const page = projectsSource.getPage([slug]) as ProjectPage | undefined;
  if (!page || !isPublished(page.data)) return undefined;
  return page;
}
```

Ensure `.source/server` exports `projectDocs` / `projectMeta` after regen.

---

## 4. `app/projects/page.tsx`

```tsx
import type { Metadata } from "next";
import { siteConfig } from "@/_data/site-config";
import { ProjectsIndexSection } from "@/components/custom/imili/ProjectsIndexSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "IMILI research initiatives, programmes, and calls for papers across Africa.",
  openGraph: {
    url: `${siteConfig.url}/projects`,
    title: `Projects — ${siteConfig.name}`,
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsIndexSection />;
}
```

---

## 5. `app/projects/[slug]/page.tsx`

Pattern from `app/news/[slug]/page.tsx`:

- `generateStaticParams` from `getPublishedProjectPages()`
- `notFound()` when slug missing
- JSON-LD `Article` with `headline`, `datePublished`, `publisher`
- Render `<ProjectDetailLayout data={data} slug={slug}><MDX /></ProjectDetailLayout>`

Export `generateMetadata` from `./metadata.ts`.

---

## 6. `app/projects/[slug]/metadata.ts`

Mirror `app/news/[slug]/metadata.ts`:

- Title: `{data.title} — IMILI` or `{acronym} — IMILI` when acronym present
- `description` from frontmatter
- `openGraph.images`: `absoluteOgImageUrl(data.heroImage)`

---

## 7. `ProjectDetailLayout.tsx`

Props: `{ data: ProjectData; slug: string; children: React.ReactNode }`

Layout:

```tsx
<article className="bg-background">
  <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
    {/* Breadcrumb */}
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
      <Link href="/">Home</Link>
      <span className="mx-2">/</span>
      <Link href="/projects">Projects</Link>
      <span className="mx-2">/</span>
      <span className="text-foreground">{data.acronym ?? data.title}</span>
    </nav>

    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image src={data.heroImage} alt={data.heroImageAlt} fill className="object-cover" priority />
        </div>
        {data.status === "call-for-papers" && (
          <span className="mt-6 inline-flex rounded-full bg-[#4FAF50] px-4 py-1.5 text-sm font-medium text-white">
            Call for papers
          </span>
        )}
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">{data.title}</h1>
        {data.subtitle && (
          <p className="mt-2 text-lg text-muted-foreground">{data.subtitle}</p>
        )}
        <div className="prose prose-lg prose-neutral mt-8 max-w-none prose-headings:scroll-mt-28">
          {children}
        </div>
      </div>
      <aside className="mt-12 lg:col-span-4 lg:mt-0">
        <ProjectSubmissionSidebar data={data} />
      </aside>
    </div>
  </div>
</article>
```

---

## 8. `ProjectSubmissionSidebar.tsx`

Show when `data.status === "call-for-papers"` and submission fields present.

| Field | Display |
| ----- | ------- |
| Abstract deadline | Formatted `abstractDeadline` |
| First draft | Formatted `firstDraftDeadline` |
| Word limit | `abstractWordLimit` words |
| CTA | `mailto:{submissionEmail}?subject={submissionEmailSubject}` |

Use `CustomButton` with `href={mailtoUrl}` and label **Submit abstract**.

Note below CTA: *Only authors of accepted abstracts will be contacted.*

---

## 9. `ProjectsIndexSection.tsx`

Mirror `NewsIndexSection`:

- Sort by `date` desc
- Card: hero thumb, status badge, title, description, link to `page.url`
- Empty state copy when no published projects

---

## 10. Launch content — `africa-against-xenophobia-project.mdx`

```mdx
---
title: "Call for Papers: Africa Against Xenophobia Project. AfAX-P"
description: "Combating Xenophobia Misinformation and Hate Speech for a United Africa — IMILI invites scholars, researchers, policymakers, and media practitioners to submit original papers and evidence-based work."
subtitle: "(Combating Xenophobia Misinformation and Hate Speech for a United Africa)"
acronym: "AFAX-P"
status: call-for-papers
date: "2026-01-15"
heroImage: "/stock/nav-activities-1.jpg"
heroImageAlt: "Conference workshop with participants"
abstractDeadline: "2026-07-30"
firstDraftDeadline: "2026-11-30"
submissionEmail: "info@imilinstitute.org"
submissionEmailSubject: "GJMIL"
abstractWordLimit: 250
---

The International Media and Information Literacy Institute (IMILI), through the **Africa Against Xenophobia Project (AFAX-P)**, invites scholars, researchers, policymakers, media practitioners, and innovators to submit original papers, case studies, and evidence-based papers — not only presenting the realities, but also offering practical ways of curbing xenophobia misinformation and disinformation.

## Introduction

Xenophobia, generally described as a dislike for foreigners or that which is foreign exemplified by negative attitude towards foreigners, and in form of fear of the 'Other' (Nyamnjoh 2006). Xenophobia in Africa is a complex challenge rooted in socio-economic pressures such as unemployment, resource competition, and systemic inequality. These underlying tensions are frequently weaponized through political rhetoric and targeted misinformation campaigns that unfairly scapegoat migrants and foreign nationals.

In 2020, members of the international community met in San José, Costa Rica, to discuss and propose measures and actions against Xenophobia and disinformation. While the meeting focused mainly on Central America, Xenophobia in Africa dates back (Peters, 1991; Arndt 2018; Okeja, 2025), with studies substantiating significant media contributions to the challenge (Danso, & McDonald, 2001; Chomsky, 2002; Smith, 2011). Traditional and digital media platforms, while powerful tools for good, are often exploited to disseminate sensationalist and unverified content that fuels prejudice and incites hostility (Omotoso, 2018). The resulting social unrest not only strains diplomatic relations but also undermines the core objectives of the African Continental Free Trade Area (AfCFTA) by discouraging investment and disrupting cross-border trade.

Africa's digital landscape is undergoing a transformation, fueled by the rapid expansion of internet connectivity, mobile technology, and social media engagement. While these advancements have unlocked immense potential for innovation, civic participation, and regional connectivity, they have also created a fertile environment for the viral spread of misinformation, disinformation, hate, and digitally amplified xenophobic narratives. These harmful trends pose a direct threat to the continent's stability and the collective vision of a unified Africa.

The malignancy and resurgence of xenophobic attacks across Africa have also been theorized as Afrophobia, ultimately introducing the contrast 'Afrophilia' (Badru, 2024).

Addressing these systemic challenges requires a coordinated, evidence-based approach grounded in Media and Information Literacy (MIL), peace communication, and responsible journalism. Empowering citizens and institutions to critically evaluate information is essential for building inclusive societies that are resilient to the "brewing doom" of digital hate.

## Scope of Submissions

We encourage submissions that explore the critical intersections of:

- Xenophobia, misinformation, and social media dynamics in Africa
- The role of colonial legacies and post-colonial nationalism in shaping contemporary xenophobic attitudes in Africa
- The impact of populist rhetoric and political campaigning on the escalation of anti-immigrant sentiment
- Community-based approaches to combating discrimination and hate speech
- Media and Information Literacy as a tool for preventing xenophobia
- Innovative models for fostering dialogue and social cohesion between host communities and foreign nationals through Community-Based Reconciliation
- Analyzing the link between high unemployment, resource scarcity, and the scapegoating of foreign nationals
- Gender and inclusion issues in xenophobia mis/disinformation
- Peacebuilding & Regional Integration: The impact of information integrity on AfCFTA and continental stability
- Scaling grassroots fact-checking initiatives to combat real-time misinformation during social unrest
- Strengthening the capacity of Regional Economic Communities (ECOWAS, SADC, EAC) in managing cross-border tensions
- Misinformation & Digital Communication: The role of algorithms and social media in amplifying xenophobic narratives
- Migration & Social Cohesion: Grassroots strategies for fostering integration and countering discriminatory rhetoric
- MIL & Policy Innovation: Developing sustainable frameworks for media literacy and ethical AI governance in Africa
- Digital literacy and resilience against online hate speech
- Responsible journalism and ethical reporting on migration issues
- Peace communication and conflict-sensitive media practices
- Political communication and roles of key actors
- Artificial Intelligence, digital platforms, and information integrity
- Policy frameworks and regulatory responses to online misinformation
- Case studies, innovative interventions, and best practices from across Africa

## Objective

The AFAX-P Call for Papers aims to generate actionable knowledge and strengthen collaborative responses across the continent. Selected contributions will contribute to the development of a harmonized continental policy framework, fostering a more informed, equitable, and prosperous Africa for all.

## Plagiarism and the use of ChatGPT or similar LLMs

Papers that include text generated from a Large-scale Language Model (LLM) such as ChatGPT are prohibited unless the produced text is presented as a part of the paper's experimental analysis. Note that this policy does not prohibit authors from using LLMs for editing or polishing author-written text.

## Submission Categories

- **Academic Research Papers:** Peer-reviewed scholarly articles (4,000–6,000 words).
- **Policy Briefs:** Concise, action-oriented recommendations for government and regional bodies (1,500–2,000 words).
- **Innovation Case Studies:** Practical reports on technology-driven or community-led solutions (2,000–3,000 words).

## Publication & Recognition

Selected papers will be:

1. Published in the maiden edition of **Global Journal on Media and Information Literacy**.
2. The published issue will be officially launched at the Stakeholders Conference in Kigali (date to be determined).

## Submission

Not more than **250 words** abstract should be sent to [info@imilinstitute.org](mailto:info@imilinstitute.org?subject=GJMIL) by **July 30, 2026**. Please use the email subject: **GJMIL**.

**First draft submission:** November 30, 2026.

*Note: Only authors of the accepted abstract will be contacted.*

## References

- Arndt J. S. (2018). Struggles of land, language, and identity in post-apartheid South Africa: The case of the Hlubi. *Journal of the Middle East and Africa*, 9(1), 1–26.
- Badru, R. O. (2024). Xenophobia as Afro-Phobia: Towards a Political Philosophy of Change to Afro-philia. *Dialogue and Universalism*, 34(3), 85–105.
- Chomsky, N. (2002). *Media Control: The Spectacular Achievements of Propaganda*. New York: Seven Stories Press.
- Danso, R. and McDonald, D. (2001). Writing Xenophobia: Immigration and the Print Media in Post-Apartheid South Africa. *Africa Today*, 48(3), 114–137.
- Nyamnjoh, Francis (2006). *Insiders and Outsiders: Citizenship and Xenophobia in Contemporary Southern Africa*. CODESRIA and Zed Books: Dakar, London and New York.
- Okeja, U. (2025). Nationalism and Migration Ethics. In: Niederberger, A., Okeja, U., Gördemann, J. (eds) *Handbook of Migration Ethics*. Springer, Cham. https://doi.org/10.1007/978-3-031-89877-8_5
- Omotoso S. A. (2018). Media, Society, and the Postcolonial State. In: *The Palgrave Handbook of African Colonial and Postcolonial History*, Eds. Shanguhyia M., Falola T. Palgrave Macmillan, 1285–1303.
- Peters, J. (1991). When Fear Turns to Hate and Hate to Violence. *Human Rights*, 18(1), 22–30.
- Smith, M. J. (2011). Violence, Xenophobia and the Media: A Review of the South African Media's Coverage of Xenophobia and the Xenophobic Violence Prior to and Including the Events of 2008. *Politikon*, 38(1), 111–129. https://doi.org/10.1080/02589346.2011.548673
- UNESCO News (March 4, 2020). Fight against xenophobia in the age of disinformation.
```

---

## 11. Navigation update

`_data/imili/header-nav.ts` — Activities dropdown:

```ts
{
  label: "Combating xenophobia",
  description: "Countering hate through MIL education",
  href: "/projects/africa-against-xenophobia-project",
  icon: Shield,
},
```

---

## 12. `site-config.tsx`

```ts
baseLinks: {
  // ...
  projects: "/projects",
},
```

---

## 13. `app/sitemap.ts`

```ts
import { getPublishedProjectPages } from "@/lib/project-source";

const projects = getPublishedProjectPages().map((page) => ({
  url: `${base}${page.url}`,
  lastModified: new Date(page.data.date),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));

return [
  // ...
  { url: `${base}/projects`, changeFrequency: "weekly", priority: 0.8 },
  ...projects,
];
```

---

## Boundaries

### Always

- Reuse fumadocs-mdx pipeline; do not invent a second MDX compiler
- Run `fumadocs-mdx` before build
- Source all copy from MDX / frontmatter — no hardcoded body in components
- Use `getPublishedProjectPages()` for index and sitemap
- Match existing news/essay patterns for loader and draft filtering

### Ask first

- Adding top-level **Projects** nav item (not only Activities deep-link)
- Changing submission deadlines or email from legacy copy
- Adding online submission form

### Never

- Store project content only in React components without MDX
- Break existing essays/news collections when extending `source.config.ts`
- Remove Activities dropdown item — only update its href

---

## Testing strategy

| Level | What |
| ----- | ---- |
| Build | `npm run build` — MDX schema validation, static params |
| Manual | Routes, nav link, mailto CTA, prose lists |
| a11y | Single H1, breadcrumb `aria-label`, focusable mailto/button |

Unit tests optional in v1 — build + manual QA sufficient per prior feats.
