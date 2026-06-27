import type { DocumentarySectionContent } from "@/_data/imili/homepage";
import { DocumentaryVideo } from "./DocumentaryVideo";

type DocumentarySectionProps = {
  content: DocumentarySectionContent;
};

export function DocumentarySection({ content }: DocumentarySectionProps) {
  return (
    <section id="documentary" className="bg-white py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 text-left sm:px-6 lg:px-0">
        <h2 className="text-2xl font-bold text-[#111111] sm:text-3xl md:text-4xl lg:text-[40px]">
          {content.heading}
        </h2>

        <div className="mt-8 lg:mt-10">
          <DocumentaryVideo
            youtubeId={content.youtubeId}
            title="IMILI at Glance"
          />
        </div>
      </div>
    </section>
  );
}
