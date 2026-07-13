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
  projectDocs: create.doc("projectDocs", {"certificates-programmes.mdx": () => import("../projects/content/certificates-programmes.mdx?collection=projectDocs"), "imili-test-series.mdx": () => import("../projects/content/imili-test-series.mdx?collection=projectDocs"), "imili-visual-platform.mdx": () => import("../projects/content/imili-visual-platform.mdx?collection=projectDocs"), "Afax-p/africa-against-xenophobia-project.mdx": () => import("../projects/content/Afax-p/africa-against-xenophobia-project.mdx?collection=projectDocs"), "Afax-p/digital-storytelling-for-peace-building.mdx": () => import("../projects/content/Afax-p/digital-storytelling-for-peace-building.mdx?collection=projectDocs"), }),
};
export default browserCollections;