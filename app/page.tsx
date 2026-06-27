import { articleCardGridHomepageContent } from "@/_data/imili/article-cards";
import { imiliHomepageAbout, imiliHomepageDocumentary } from "@/_data/imili/homepage";
import { homepageHeroContent } from "@/_data/imili/homepage-hero";
import { servicesReferenceContent } from "@/_data/imili/services";
import { testimonialsHomepageContent } from "@/_data/imili/testimonials";
import { AboutUs } from "@/components/custom/about-us";

import {
  ArticleCardGrid,
  DocumentarySection,
  PhotoHeroSection,
  ServicesCarousel,
  TestimonialsCarousel,
} from "@/components/custom/imili";

export default function Home() {
  return (
    <>

      <PhotoHeroSection content={homepageHeroContent.photo} />

      <AboutUs
        title={imiliHomepageAbout.title}
        description={imiliHomepageAbout.description}
        images={imiliHomepageAbout.images}
      />

      <DocumentarySection content={imiliHomepageDocumentary} />

      {/* <ServicesCarousel content={servicesReferenceContent} /> */}

      <ArticleCardGrid content={articleCardGridHomepageContent} />

      <TestimonialsCarousel content={testimonialsHomepageContent} />
    </>
  );
}
