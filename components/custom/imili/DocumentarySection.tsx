import type { DocumentarySectionContent } from "@/_data/imili/homepage";

type DocumentarySectionProps = {
  content: DocumentarySectionContent;
};

export function DocumentarySection({ content }: DocumentarySectionProps) {
  return (
    <section id="documentary" className="bg-white py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-14">
        <div className="mx-auto max-w-5xl text-left">
          <h2 className="text-2xl font-bold text-[#111111] sm:text-3xl md:text-4xl lg:text-[40px]">
            {content.heading}
          </h2>
          {/* <p className="mt-3 max-w-2xl text-base text-[#6B7280] lg:mt-4 lg:text-[20px]">
            {content.subtext}
          </p> */}

          <div className="mt-8 lg:mt-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#111111]/5 ring-1 ring-[#E5E7EB]">
              <iframe
                src={content.embedUrl}
                title="IMILI Documentary"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                loading="eager"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
