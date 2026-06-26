// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  essayDocs: create.doc("essayDocs", {"who-is-imili.mdx": () => import("../essays/content/who-is-imili.mdx?collection=essayDocs"), }),
  newsDocs: create.doc("newsDocs", {"fg-describes-imili-launch-as-milestone-against-misinformation.mdx": () => import("../news/content/fg-describes-imili-launch-as-milestone-against-misinformation.mdx?collection=newsDocs"), }),
  projectDocs: create.doc("projectDocs", {"africa-against-xenophobia-project.mdx": () => import("../projects/content/africa-against-xenophobia-project.mdx?collection=projectDocs"), }),
};
export default browserCollections;