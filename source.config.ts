import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";
import remarkGfm from "remark-gfm";

export default defineConfig({
  mdxOptions: {
    providerImportSource: "@/mdx-components",
    remarkPlugins: [remarkGfm],
  },
});

export const { docs: essayDocs, meta: essayMeta } = defineDocs({
  dir: "essays/content",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      tags: z.array(z.string()).optional(),
      featured: z.boolean().optional().default(false),
      readTime: z.string().optional(),
      author: z.string().optional(),
      thumbnail: z.string().optional(),
      draft: z.boolean().optional().default(false),
    }),
  },
});

export const { docs: newsDocs, meta: newsMeta } = defineDocs({
  dir: "news/content",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      heroImage: z.string(),
      heroImageAlt: z.string(),
      category: z.string().optional(),
      externalSourceUrl: z.string().optional(),
      externalSourceLabel: z.string().optional(),
      draft: z.boolean().optional().default(false),
    }),
  },
});

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
