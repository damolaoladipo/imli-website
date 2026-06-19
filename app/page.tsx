import { articleCardGridHomepageContent } from "@/_data/imili/article-cards";
import { imiliHomepageAbout, imiliHomepageDocumentary } from "@/_data/imili/homepage";
import { servicesReferenceContent } from "@/_data/imili/services";
import { testimonialsHomepageContent } from "@/_data/imili/testimonials";
import { AboutUs } from "@/components/custom/about-us";

import {
  ArticleCardGrid,
  DocumentarySection,
  HomepageHeroSection,
  ServicesCarousel,
  TestimonialsCarousel,
} from "@/components/custom/imili";

export default function Home() {
  return (
    <>
      <HomepageHeroSection />

      <AboutUs
        title={imiliHomepageAbout.title}
        description={imiliHomepageAbout.description}
        imageSrc={imiliHomepageAbout.imageSrc}
        imageAlt={imiliHomepageAbout.imageAlt}
      />

      <DocumentarySection content={imiliHomepageDocumentary} />

      <ServicesCarousel content={servicesReferenceContent} />

      <ArticleCardGrid content={articleCardGridHomepageContent} />

      <TestimonialsCarousel content={testimonialsHomepageContent} />
    </>
  );
}
