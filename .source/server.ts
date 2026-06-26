// @ts-nocheck
import * as __fd_glob_2 from "../projects/content/africa-against-xenophobia-project.mdx?collection=projectDocs"
import * as __fd_glob_1 from "../news/content/fg-describes-imili-launch-as-milestone-against-misinformation.mdx?collection=newsDocs"
import * as __fd_glob_0 from "../essays/content/who-is-imili.mdx?collection=essayDocs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const essayDocs = await create.doc("essayDocs", "essays/content", {"who-is-imili.mdx": __fd_glob_0, });

export const essayMeta = await create.meta("essayMeta", "essays/content", {});

export const newsDocs = await create.doc("newsDocs", "news/content", {"fg-describes-imili-launch-as-milestone-against-misinformation.mdx": __fd_glob_1, });

export const newsMeta = await create.meta("newsMeta", "news/content", {});

export const projectDocs = await create.doc("projectDocs", "projects/content", {"africa-against-xenophobia-project.mdx": __fd_glob_2, });

export const projectMeta = await create.meta("projectMeta", "projects/content", {});